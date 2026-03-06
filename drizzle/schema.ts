import {
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: userRoleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull(),
  lastSignedIn: timestamp("lastSignedIn", { withTimezone: true }).defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// AIDT Assessments
export const assessments = pgTable("assessments", {
  id: varchar("id", { length: 36 }).primaryKey(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull(),
  sector: varchar("sector", { length: 50 }).notNull(),
  teamSize: integer("teamSize").notNull(),
  roleInProcess: varchar("roleInProcess", { length: 50 }).notNull(),
  algorithmVersion: varchar("algorithmVersion", { length: 20 }).notNull().default("aidt_algo_v1.0.0"),
  aiStatus: varchar("aiStatus", { length: 20 }),
  userAgent: text("userAgent"),
  locale: varchar("locale", { length: 10 }),
  referrer: text("referrer"),
  status: varchar("status", { length: 20 }).default("NEW"),
  // Store full answers as JSON
  answers: jsonb("answers"),
});

export type Assessment = typeof assessments.$inferSelect;
export type InsertAssessment = typeof assessments.$inferInsert;

// Diagnostic Results
export const diagnosticResults = pgTable("diagnostic_results", {
  id: varchar("id", { length: 36 }).primaryKey(),
  assessmentId: varchar("assessmentId", { length: 36 }).notNull(),
  teamPulseScore: numeric("teamPulseScore", { precision: 5, scale: 2 }).notNull(),
  healthScore: numeric("healthScore", { precision: 5, scale: 2 }).notNull(),
  riskScore: numeric("riskScore", { precision: 5, scale: 2 }).notNull(),
  readinessScore: numeric("readinessScore", { precision: 5, scale: 2 }).notNull(),
  riskLevel: varchar("riskLevel", { length: 20 }).notNull(),
  dimensions: jsonb("dimensions").notNull(),
  topFocusAreas: jsonb("topFocusAreas").notNull(),
  strengths: jsonb("strengths"),
  recommendationType: varchar("recommendationType", { length: 30 }).notNull(),
  recommendationConfidence: numeric("recommendationConfidence", { precision: 5, scale: 2 }).notNull(),
  recommendationScores: jsonb("recommendationScores").notNull(),
  rationaleBullets: jsonb("rationaleBullets"),
  expectedOutcomes: jsonb("expectedOutcomes"),
  suggestedModules: jsonb("suggestedModules"),
  enrichment: jsonb("enrichment"),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
});

export type DiagnosticResult = typeof diagnosticResults.$inferSelect;
export type InsertDiagnosticResult = typeof diagnosticResults.$inferInsert;

// Lead Signals (internal scoring)
export const leadSignals = pgTable("lead_signals", {
  id: varchar("id", { length: 36 }).primaryKey(),
  assessmentId: varchar("assessmentId", { length: 36 }).notNull(),
  clsCore: numeric("clsCore", { precision: 5, scale: 2 }).notNull(),
  clsFinal: numeric("clsFinal", { precision: 5, scale: 2 }).notNull(),
  band: varchar("band", { length: 1 }).notNull(),
  planningStageScore: numeric("planningStageScore", { precision: 5, scale: 2 }).notNull(),
  approvalProcessScore: numeric("approvalProcessScore", { precision: 5, scale: 2 }).notNull(),
  buyerRoleScore: numeric("buyerRoleScore", { precision: 5, scale: 2 }).notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
});

export type LeadSignal = typeof leadSignals.$inferSelect;
export type InsertLeadSignal = typeof leadSignals.$inferInsert;

// Contact Form Submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id", { length: 36 }).primaryKey(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  organisation: varchar("organisation", { length: 255 }),
  role: varchar("role", { length: 100 }),
  service: varchar("service", { length: 100 }),
  teamSize: varchar("teamSize", { length: 20 }),
  budget: varchar("budget", { length: 20 }),
  timeline: varchar("timeline", { length: 50 }),
  message: text("message").notNull(),
  assessmentId: varchar("assessmentId", { length: 36 }),
  status: varchar("status", { length: 20 }).default("NEW"),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;
