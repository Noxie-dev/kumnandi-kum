import {
  boolean,
  decimal,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// AIDT Assessments
export const assessments = mysqlTable("assessments", {
  id: varchar("id", { length: 36 }).primaryKey(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  sector: varchar("sector", { length: 50 }).notNull(),
  teamSize: int("teamSize").notNull(),
  roleInProcess: varchar("roleInProcess", { length: 50 }).notNull(),
  algorithmVersion: varchar("algorithmVersion", { length: 20 }).notNull().default("aidt_algo_v1.0.0"),
  aiStatus: varchar("aiStatus", { length: 20 }),
  userAgent: text("userAgent"),
  locale: varchar("locale", { length: 10 }),
  referrer: text("referrer"),
  status: varchar("status", { length: 20 }).default("NEW"),
  // Store full answers as JSON
  answers: json("answers"),
});

export type Assessment = typeof assessments.$inferSelect;
export type InsertAssessment = typeof assessments.$inferInsert;

// Diagnostic Results
export const diagnosticResults = mysqlTable("diagnostic_results", {
  id: varchar("id", { length: 36 }).primaryKey(),
  assessmentId: varchar("assessmentId", { length: 36 }).notNull(),
  teamPulseScore: decimal("teamPulseScore", { precision: 5, scale: 2 }).notNull(),
  healthScore: decimal("healthScore", { precision: 5, scale: 2 }).notNull(),
  riskScore: decimal("riskScore", { precision: 5, scale: 2 }).notNull(),
  readinessScore: decimal("readinessScore", { precision: 5, scale: 2 }).notNull(),
  riskLevel: varchar("riskLevel", { length: 20 }).notNull(),
  dimensions: json("dimensions").notNull(),
  topFocusAreas: json("topFocusAreas").notNull(),
  strengths: json("strengths"),
  recommendationType: varchar("recommendationType", { length: 30 }).notNull(),
  recommendationConfidence: decimal("recommendationConfidence", { precision: 5, scale: 2 }).notNull(),
  recommendationScores: json("recommendationScores").notNull(),
  rationaleBullets: json("rationaleBullets"),
  expectedOutcomes: json("expectedOutcomes"),
  suggestedModules: json("suggestedModules"),
  enrichment: json("enrichment"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type DiagnosticResult = typeof diagnosticResults.$inferSelect;
export type InsertDiagnosticResult = typeof diagnosticResults.$inferInsert;

// Lead Signals (internal scoring)
export const leadSignals = mysqlTable("lead_signals", {
  id: varchar("id", { length: 36 }).primaryKey(),
  assessmentId: varchar("assessmentId", { length: 36 }).notNull(),
  clsCore: decimal("clsCore", { precision: 5, scale: 2 }).notNull(),
  clsFinal: decimal("clsFinal", { precision: 5, scale: 2 }).notNull(),
  band: varchar("band", { length: 1 }).notNull(),
  planningStageScore: decimal("planningStageScore", { precision: 5, scale: 2 }).notNull(),
  approvalProcessScore: decimal("approvalProcessScore", { precision: 5, scale: 2 }).notNull(),
  buyerRoleScore: decimal("buyerRoleScore", { precision: 5, scale: 2 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type LeadSignal = typeof leadSignals.$inferSelect;
export type InsertLeadSignal = typeof leadSignals.$inferInsert;

// Contact Form Submissions
export const contactSubmissions = mysqlTable("contact_submissions", {
  id: varchar("id", { length: 36 }).primaryKey(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
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
