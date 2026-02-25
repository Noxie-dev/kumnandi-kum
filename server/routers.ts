import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { nanoid } from "nanoid";
import { getDb } from "./db";
import { assessments, diagnosticResults, leadSignals, contactSubmissions } from "../drizzle/schema";
import { calculateDiagnostic, calculateRecommendation, calculateLeadScore } from "./aidtEngine";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // AIDT Assessment Router
  aidt: router({
    submit: publicProcedure
      .input(z.object({
        sector: z.string(),
        teamSize: z.number().int().min(1).max(1000),
        roleInProcess: z.string(),
        planningStage: z.string(),
        approvalProcess: z.string(),
        morale: z.number().int().min(0).max(4),
        trust: z.number().int().min(0).max(4),
        communication: z.number().int().min(0).max(4),
        respect: z.number().int().min(0).max(4),
        conflictSeverity: z.number().int().min(0).max(4),
        gossipIndicator: z.number().int().min(0).max(4),
        competitionIndicator: z.number().int().min(0).max(4),
        silosIndicator: z.number().int().min(0).max(4),
        burnoutIndicator: z.number().int().min(0).max(4),
        changeStress: z.number().int().min(0).max(4),
        leadershipBuyIn: z.number().int().min(0).max(4),
        leadershipParticipation: z.number().int().min(0).max(4),
        urgency: z.number().int().min(0).max(4),
        budgetRange: z.string(),
        timeAvailable: z.string(),
        preferredFormat: z.string(),
        timeline: z.string(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        const assessmentId = nanoid();
        const resultId = nanoid();
        const leadId = nanoid();

        // Run scoring engine
        const answers = { ...input, version: "aidt_algo_v1.0.0" } as Parameters<typeof calculateDiagnostic>[0];
        const diagnostic = calculateDiagnostic(answers);
        const recommendation = calculateRecommendation(answers, diagnostic);
        const leadScore = calculateLeadScore(answers);

        if (db) {
          // Store assessment
          await db.insert(assessments).values({
            id: assessmentId,
            sector: input.sector,
            teamSize: input.teamSize,
            roleInProcess: input.roleInProcess,
            algorithmVersion: "aidt_algo_v1.0.0",
            status: "COMPLETE",
            answers: input,
          });

          // Store diagnostic result
          await db.insert(diagnosticResults).values({
            id: resultId,
            assessmentId,
            teamPulseScore: diagnostic.teamPulseScore.toString(),
            healthScore: diagnostic.healthScore.toString(),
            riskScore: diagnostic.riskScore.toString(),
            readinessScore: diagnostic.readinessScore.toString(),
            riskLevel: diagnostic.riskLevel,
            dimensions: diagnostic.dimensions,
            topFocusAreas: diagnostic.topFocusAreas,
            strengths: diagnostic.strengths,
            recommendationType: recommendation.type,
            recommendationConfidence: recommendation.confidence.toString(),
            recommendationScores: recommendation.scores,
            rationaleBullets: recommendation.rationaleBullets,
            expectedOutcomes: recommendation.expectedOutcomes,
            suggestedModules: recommendation.suggestedModules,
          });

          // Store lead signal
          await db.insert(leadSignals).values({
            id: leadId,
            assessmentId,
            clsCore: leadScore.clsCore.toString(),
            clsFinal: leadScore.clsFinal.toString(),
            band: leadScore.band,
            planningStageScore: leadScore.signals.planningStageScore.toString(),
            approvalProcessScore: leadScore.signals.approvalProcessScore.toString(),
            buyerRoleScore: leadScore.signals.buyerRoleScore.toString(),
          });
        }

        // Notify owner of new assessment
        await notifyOwner({
          title: `New AIDT Assessment — ${diagnostic.riskLevel} Risk (Score: ${diagnostic.teamPulseScore})`,
          content: `Sector: ${input.sector} | Team: ${input.teamSize} | Recommendation: ${recommendation.type} | Lead Band: ${leadScore.band}`,
        }).catch(() => {});

        return {
          assessmentId,
          diagnostic,
          recommendation,
          leadBand: leadScore.band,
        };
      }),
  }),

  // Contact Form Router
  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        organisation: z.string().optional(),
        role: z.string().optional(),
        service: z.string().optional(),
        teamSize: z.string().optional(),
        budget: z.string().optional(),
        timeline: z.string().optional(),
        message: z.string().min(1),
        assessmentId: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        const id = nanoid();

        if (db) {
          await db.insert(contactSubmissions).values({
            id,
            name: input.name,
            email: input.email,
            organisation: input.organisation,
            role: input.role,
            service: input.service,
            teamSize: input.teamSize,
            budget: input.budget,
            timeline: input.timeline,
            message: input.message,
            assessmentId: input.assessmentId,
            status: "NEW",
          });
        }

        // Notify owner
        await notifyOwner({
          title: `New Contact Form Submission from ${input.name}`,
          content: `Email: ${input.email} | Org: ${input.organisation ?? "N/A"} | Service: ${input.service ?? "N/A"} | Budget: ${input.budget ?? "N/A"}\n\n${input.message}`,
        }).catch(() => {});

        return { success: true, id };
      }),
  }),
});

export type AppRouter = typeof appRouter;
