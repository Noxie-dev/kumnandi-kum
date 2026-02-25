import { describe, it, expect } from "vitest";
import {
  calculateDiagnostic,
  calculateRecommendation,
  calculateLeadScore,
  type AIDTAnswers,
} from "./aidtEngine";

const baseAnswers: AIDTAnswers = {
  version: "aidt_algo_v1.0.0",
  sector: "CORPORATE",
  teamSize: 20,
  roleInProcess: "HR_PEOPLE_CULTURE",
  planningStage: "COMPARING",
  approvalProcess: "ONE_APPROVER",
  morale: 2,
  trust: 2,
  communication: 2,
  respect: 2,
  conflictSeverity: 2,
  gossipIndicator: 2,
  competitionIndicator: 2,
  silosIndicator: 2,
  burnoutIndicator: 2,
  changeStress: 2,
  leadershipBuyIn: 2,
  leadershipParticipation: 2,
  urgency: 2,
  budgetRange: "MID",
  timeAvailable: "HALF_DAY",
  preferredFormat: "IN_PERSON",
  timeline: "1_MONTH",
};

const highRiskAnswers: AIDTAnswers = {
  ...baseAnswers,
  morale: 0,
  trust: 0,
  communication: 0,
  respect: 0,
  conflictSeverity: 4,
  gossipIndicator: 4,
  competitionIndicator: 4,
  silosIndicator: 4,
  burnoutIndicator: 4,
  changeStress: 4,
  leadershipBuyIn: 0,
  leadershipParticipation: 0,
  urgency: 4,
};

const lowRiskAnswers: AIDTAnswers = {
  ...baseAnswers,
  morale: 4,
  trust: 4,
  communication: 4,
  respect: 4,
  conflictSeverity: 0,
  gossipIndicator: 0,
  competitionIndicator: 0,
  silosIndicator: 0,
  burnoutIndicator: 0,
  changeStress: 0,
  leadershipBuyIn: 4,
  leadershipParticipation: 4,
  urgency: 0,
};

describe("AIDT Scoring Engine", () => {
  describe("calculateDiagnostic", () => {
    it("returns a score between 0 and 100", () => {
      const result = calculateDiagnostic(baseAnswers);
      expect(result.teamPulseScore).toBeGreaterThanOrEqual(0);
      expect(result.teamPulseScore).toBeLessThanOrEqual(100);
    });

    it("returns CRITICAL or HIGH risk for high-risk answers", () => {
      const result = calculateDiagnostic(highRiskAnswers);
      expect(["CRITICAL", "HIGH"]).toContain(result.riskLevel);
      expect(result.teamPulseScore).toBeLessThan(30);
    });

    it("returns LOW risk for low-risk answers", () => {
      const result = calculateDiagnostic(lowRiskAnswers);
      expect(result.riskLevel).toBe("LOW");
      expect(result.teamPulseScore).toBeGreaterThanOrEqual(75);
    });

    it("returns exactly 3 top focus areas", () => {
      const result = calculateDiagnostic(baseAnswers);
      expect(result.topFocusAreas).toHaveLength(3);
    });

    it("returns exactly 3 strengths", () => {
      const result = calculateDiagnostic(baseAnswers);
      expect(result.strengths).toHaveLength(3);
    });

    it("returns all 10 dimensions", () => {
      const result = calculateDiagnostic(baseAnswers);
      expect(Object.keys(result.dimensions)).toHaveLength(10);
    });

    it("all dimension scores are between 0 and 100", () => {
      const result = calculateDiagnostic(baseAnswers);
      for (const score of Object.values(result.dimensions)) {
        expect(score).toBeGreaterThanOrEqual(0);
        expect(score).toBeLessThanOrEqual(100);
      }
    });

    it("sub-scores are between 0 and 100", () => {
      const result = calculateDiagnostic(baseAnswers);
      expect(result.healthScore).toBeGreaterThanOrEqual(0);
      expect(result.healthScore).toBeLessThanOrEqual(100);
      expect(result.riskScore).toBeGreaterThanOrEqual(0);
      expect(result.riskScore).toBeLessThanOrEqual(100);
      expect(result.readinessScore).toBeGreaterThanOrEqual(0);
      expect(result.readinessScore).toBeLessThanOrEqual(100);
    });
  });

  describe("calculateRecommendation", () => {
    it("returns a valid recommendation type", () => {
      const diagnostic = calculateDiagnostic(baseAnswers);
      const rec = calculateRecommendation(baseAnswers, diagnostic);
      expect(["HALF_DAY", "WEEKEND_CAMP", "WORKSHOP", "DISCOVERY_CALL"]).toContain(rec.type);
    });

    it("confidence is between 0 and 100", () => {
      const diagnostic = calculateDiagnostic(baseAnswers);
      const rec = calculateRecommendation(baseAnswers, diagnostic);
      expect(rec.confidence).toBeGreaterThanOrEqual(0);
      expect(rec.confidence).toBeLessThanOrEqual(100);
    });

    it("returns rationale bullets", () => {
      const diagnostic = calculateDiagnostic(baseAnswers);
      const rec = calculateRecommendation(baseAnswers, diagnostic);
      expect(rec.rationaleBullets.length).toBeGreaterThan(0);
    });

    it("returns expected outcomes", () => {
      const diagnostic = calculateDiagnostic(baseAnswers);
      const rec = calculateRecommendation(baseAnswers, diagnostic);
      expect(rec.expectedOutcomes.length).toBeGreaterThan(0);
    });

    it("high-risk team should recommend WEEKEND_CAMP, WORKSHOP, or DISCOVERY_CALL", () => {
      const diagnostic = calculateDiagnostic(highRiskAnswers);
      const rec = calculateRecommendation(highRiskAnswers, diagnostic);
      expect(["WEEKEND_CAMP", "WORKSHOP", "DISCOVERY_CALL"]).toContain(rec.type);
    });
  });

  describe("calculateLeadScore", () => {
    it("returns a score between 0 and 100", () => {
      const lead = calculateLeadScore(baseAnswers);
      expect(lead.clsFinal).toBeGreaterThanOrEqual(0);
      expect(lead.clsFinal).toBeLessThanOrEqual(100);
    });

    it("returns a valid band (A, B, C, or D)", () => {
      const lead = calculateLeadScore(baseAnswers);
      expect(["A", "B", "C", "D"]).toContain(lead.band);
    });

    it("high-intent buyer gets band A", () => {
      const highIntentAnswers: AIDTAnswers = {
        ...baseAnswers,
        planningStage: "URGENT_ASAP",
        approvalProcess: "I_CAN_APPROVE",
        roleInProcess: "FOUNDER_OWNER",
      };
      const lead = calculateLeadScore(highIntentAnswers);
      expect(lead.band).toBe("A");
    });

    it("low-intent buyer gets band C or D", () => {
      const lowIntentAnswers: AIDTAnswers = {
        ...baseAnswers,
        planningStage: "EXPLORING",
        approvalProcess: "FUTURE_PLANNING",
        roleInProcess: "STUDENT_RESEARCH",
      };
      const lead = calculateLeadScore(lowIntentAnswers);
      expect(["C", "D"]).toContain(lead.band);
    });
  });
});
