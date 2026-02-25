// AIDT Scoring Engine - Deterministic Algorithm
// Based on PRD Appendix D specifications

export type Likert5 = 0 | 1 | 2 | 3 | 4;
export type Severity5 = 0 | 1 | 2 | 3 | 4;
export type RiskLevel = "LOW" | "MODERATE" | "ELEVATED" | "HIGH" | "CRITICAL";
export type RecommendationType = "HALF_DAY" | "WEEKEND_CAMP" | "WORKSHOP" | "DISCOVERY_CALL";
export type LeadBand = "A" | "B" | "C" | "D";

export interface AIDTAnswers {
  version: string;
  sector: string;
  teamSize: number;
  roleInProcess: string;
  planningStage: string;
  approvalProcess: string;
  morale: Likert5;
  trust: Likert5;
  communication: Likert5;
  respect: Likert5;
  conflictSeverity: Severity5;
  gossipIndicator: Severity5;
  competitionIndicator: Severity5;
  silosIndicator: Severity5;
  burnoutIndicator: Severity5;
  changeStress: Severity5;
  leadershipBuyIn: Likert5;
  leadershipParticipation: Likert5;
  urgency: Severity5;
  budgetRange: string;
  timeAvailable: string;
  preferredFormat: string;
  timeline: string;
  notes?: string;
}

export interface DiagnosticDimensions {
  communicationQuality: number;
  trustSafety: number;
  respectCulture: number;
  teamCohesion: number;
  conflictPressure: number;
  toxicIndicators: number;
  burnoutStrain: number;
  leadershipSupport: number;
  changeStress: number;
  collaborationReadiness: number;
}

export interface AIDTDiagnosticResult {
  teamPulseScore: number;
  riskLevel: RiskLevel;
  healthScore: number;
  riskScore: number;
  readinessScore: number;
  dimensions: DiagnosticDimensions;
  topFocusAreas: string[];
  strengths: string[];
}

export interface RecommendationScores {
  halfDay: number;
  weekendCamp: number;
  workshop: number;
  discoveryCall: number;
}

export interface AIDTRecommendationResult {
  type: RecommendationType;
  confidence: number;
  scores: RecommendationScores;
  rationaleBullets: string[];
  expectedOutcomes: string[];
  suggestedModules: string[];
}

export interface AIDTLeadScore {
  clsCore: number;
  clsFinal: number;
  band: LeadBand;
  signals: {
    planningStageScore: number;
    approvalProcessScore: number;
    buyerRoleScore: number;
  };
}

// Normalise Likert5 (0-4) to 0-100 scale
function likertToScore(val: Likert5): number {
  return (val / 4) * 100;
}

// Normalise Severity5 (0-4) to 0-100 scale (higher = worse)
function severityToScore(val: Severity5): number {
  return (val / 4) * 100;
}

export function calculateDiagnostic(answers: AIDTAnswers): AIDTDiagnosticResult {
  // Calculate dimensions
  const communicationQuality = likertToScore(answers.communication);
  const trustSafety = likertToScore(answers.trust);
  const respectCulture = likertToScore(answers.respect);
  const teamCohesion = (likertToScore(answers.morale) + likertToScore(answers.trust)) / 2;
  const conflictPressure = severityToScore(answers.conflictSeverity);
  const toxicIndicators = (
    severityToScore(answers.gossipIndicator) +
    severityToScore(answers.competitionIndicator) +
    severityToScore(answers.silosIndicator)
  ) / 3;
  const burnoutStrain = severityToScore(answers.burnoutIndicator);
  const leadershipSupport = (likertToScore(answers.leadershipBuyIn) + likertToScore(answers.leadershipParticipation)) / 2;
  const changeStress = severityToScore(answers.changeStress);
  const collaborationReadiness = (communicationQuality + teamCohesion) / 2;

  const dimensions: DiagnosticDimensions = {
    communicationQuality,
    trustSafety,
    respectCulture,
    teamCohesion,
    conflictPressure,
    toxicIndicators,
    burnoutStrain,
    leadershipSupport,
    changeStress,
    collaborationReadiness,
  };

  // Team Pulse Score (weighted sum per PRD Appendix D)
  const teamPulseScore = Math.round(
    communicationQuality * 0.14 +
    trustSafety * 0.14 +
    respectCulture * 0.12 +
    teamCohesion * 0.12 +
    (100 - conflictPressure) * 0.14 +
    (100 - toxicIndicators) * 0.12 +
    (100 - burnoutStrain) * 0.10 +
    leadershipSupport * 0.06 +
    (100 - changeStress) * 0.04 +
    collaborationReadiness * 0.02
  );

  // Risk Level
  let riskLevel: RiskLevel;
  if (teamPulseScore >= 75) riskLevel = "LOW";
  else if (teamPulseScore >= 60) riskLevel = "MODERATE";
  else if (teamPulseScore >= 45) riskLevel = "ELEVATED";
  else if (teamPulseScore >= 30) riskLevel = "HIGH";
  else riskLevel = "CRITICAL";

  // Sub-scores
  const healthScore = Math.round(
    (communicationQuality + trustSafety + respectCulture + teamCohesion) / 4
  );
  const riskScore = Math.round(
    (conflictPressure + toxicIndicators + burnoutStrain) / 3
  );
  const readinessScore = Math.round(
    (leadershipSupport + collaborationReadiness + (100 - changeStress)) / 3
  );

  // Top Focus Areas (dimensions with worst scores)
  const dimensionMap: { name: string; score: number; inverted: boolean }[] = [
    { name: "Communication Quality", score: communicationQuality, inverted: false },
    { name: "Trust & Safety", score: trustSafety, inverted: false },
    { name: "Respect & Culture", score: respectCulture, inverted: false },
    { name: "Team Cohesion", score: teamCohesion, inverted: false },
    { name: "Conflict Management", score: conflictPressure, inverted: true },
    { name: "Toxic Indicators", score: toxicIndicators, inverted: true },
    { name: "Burnout & Wellness", score: burnoutStrain, inverted: true },
    { name: "Leadership Support", score: leadershipSupport, inverted: false },
    { name: "Change Readiness", score: changeStress, inverted: true },
    { name: "Collaboration", score: collaborationReadiness, inverted: false },
  ];

  // Sort by "how bad" (low positive scores or high negative scores are worst)
  const scored = dimensionMap.map((d) => ({
    name: d.name,
    badness: d.inverted ? d.score : 100 - d.score,
  }));
  scored.sort((a, b) => b.badness - a.badness);
  const topFocusAreas = scored.slice(0, 3).map((d) => d.name);

  // Strengths (best performing dimensions)
  const strengths = scored.slice(-3).reverse().map((d) => d.name);

  return {
    teamPulseScore,
    riskLevel,
    healthScore,
    riskScore,
    readinessScore,
    dimensions,
    topFocusAreas,
    strengths,
  };
}

export function calculateRecommendation(
  answers: AIDTAnswers,
  diagnostic: AIDTDiagnosticResult
): AIDTRecommendationResult {
  const { dimensions, teamPulseScore } = diagnostic;

  // Derived indices
  const severityIndex = (dimensions.conflictPressure + dimensions.toxicIndicators + dimensions.burnoutStrain) / 3;
  const complexityIndex = Object.values(dimensions).filter((v) => v > 60).length / Object.values(dimensions).length * 100;
  const recoveryIndex = (likertToScore(answers.morale) + likertToScore(answers.trust) + likertToScore(answers.respect)) / 3;
  const alignmentIndex = (dimensions.teamCohesion + dimensions.communicationQuality) / 2;
  const readinessIndex = (dimensions.leadershipSupport + likertToScore(answers.leadershipBuyIn)) / 2;

  // Feasibility based on constraints
  const budgetScore = { LOW: 30, MID: 60, HIGH: 90, NOT_SURE: 40 }[answers.budgetRange] ?? 40;
  const timeScore = {
    "1_2_HOURS": 20,
    HALF_DAY: 50,
    FULL_DAY: 70,
    WEEKEND: 90,
    NOT_SURE: 40,
  }[answers.timeAvailable] ?? 40;
  const feasibilityIndex = (budgetScore + timeScore) / 2;

  // Score each recommendation type
  const halfDayScore = Math.round(
    (alignmentIndex * 0.3 + feasibilityIndex * 0.4 + (100 - complexityIndex) * 0.3)
  );

  const weekendCampScore = Math.round(
    (severityIndex * 0.35 + recoveryIndex * 0.25 + complexityIndex * 0.2 + readinessIndex * 0.2)
  );

  const workshopScore = Math.round(
    (dimensions.communicationQuality < 50 ? 70 : 40) * 0.4 +
    (dimensions.conflictPressure > 60 ? 70 : 30) * 0.3 +
    feasibilityIndex * 0.3
  );

  const discoveryCallScore = Math.round(
    (teamPulseScore < 30 ? 80 : 20) * 0.5 +
    (readinessIndex < 30 ? 70 : 20) * 0.3 +
    (answers.planningStage === "EXPLORING" ? 60 : 20) * 0.2
  );

  const scores: RecommendationScores = {
    halfDay: Math.min(100, halfDayScore),
    weekendCamp: Math.min(100, weekendCampScore),
    workshop: Math.min(100, workshopScore),
    discoveryCall: Math.min(100, discoveryCallScore),
  };

  // Select highest scoring recommendation
  const entries = Object.entries(scores) as [keyof RecommendationScores, number][];
  entries.sort((a, b) => b[1] - a[1]);
  const topKey = entries[0][0];
  const topScore = entries[0][1];
  const secondScore = entries[1][1];
  const confidence = Math.min(100, Math.round((topScore - secondScore) * 1.5 + 50));

  const typeMap: Record<keyof RecommendationScores, RecommendationType> = {
    halfDay: "HALF_DAY",
    weekendCamp: "WEEKEND_CAMP",
    workshop: "WORKSHOP",
    discoveryCall: "DISCOVERY_CALL",
  };
  const type = typeMap[topKey];

  // Generate rationale and outcomes based on recommendation
  const rationaleMap: Record<RecommendationType, string[]> = {
    HALF_DAY: [
      `Team size of ${answers.teamSize} is well-suited to a focused half-day format`,
      `Current team dynamics suggest a targeted reset rather than deep immersion`,
      `Budget and time constraints align with the half-day offering`,
      `Communication and cohesion improvements are achievable in 3–4 hours`,
    ],
    WEEKEND_CAMP: [
      `Elevated conflict and trust deficits require immersive intervention`,
      `The depth of team challenges warrants a two-day structured experience`,
      `Leadership buy-in is sufficient to support a full weekend programme`,
      `Complex team dynamics need sustained facilitation to achieve lasting change`,
    ],
    WORKSHOP: [
      `Specific skill gaps and targeted challenges identified in the assessment`,
      `A bespoke workshop can address your unique organisational context`,
      `The assessment reveals focused areas that benefit from specialised facilitation`,
      `Your team's needs go beyond standard formats — a tailored approach is recommended`,
    ],
    DISCOVERY_CALL: [
      `The assessment reveals complexity that warrants a deeper consultation first`,
      `A discovery call will help clarify the most appropriate intervention`,
      `Some indicators suggest unique circumstances that need direct discussion`,
      `We want to ensure the right fit before recommending a specific programme`,
    ],
  };

  const outcomesMap: Record<RecommendationType, string[]> = {
    HALF_DAY: ["Improved team communication", "Renewed morale and energy", "Shared team values and norms", "Practical conflict tools"],
    WEEKEND_CAMP: ["Deep trust rebuilding", "Culture reset and new norms", "Leadership alignment", "Lasting behavioural change"],
    WORKSHOP: ["Targeted skill development", "Specific challenge resolution", "Measurable behavioural outcomes", "Ongoing support framework"],
    DISCOVERY_CALL: ["Clarity on team needs", "Tailored programme recommendation", "Budget and timeline alignment", "Confidence in the right intervention"],
  };

  const modulesMap: Record<RecommendationType, string[]> = {
    HALF_DAY: ["Motivational facilitation", "Team dynamics activities", "Reflection and dialogue", "Commitment charter"],
    WEEKEND_CAMP: ["Diagnostic deep-dive", "Trust and conflict work", "Leadership coaching", "Team charter creation"],
    WORKSHOP: ["Needs assessment", "Custom module design", "Skills practice", "Post-session report"],
    DISCOVERY_CALL: ["Team context review", "Challenge mapping", "Programme options", "Investment discussion"],
  };

  return {
    type,
    confidence,
    scores,
    rationaleBullets: rationaleMap[type],
    expectedOutcomes: outcomesMap[type],
    suggestedModules: modulesMap[type],
  };
}

export function calculateLeadScore(answers: AIDTAnswers): AIDTLeadScore {
  const planningStageScores: Record<string, number> = {
    EXPLORING: 20,
    COMPARING: 50,
    NEED_PROPOSAL: 70,
    READY_SOON: 90,
    URGENT_ASAP: 95,
  };

  const approvalProcessScores: Record<string, number> = {
    I_CAN_APPROVE: 100,
    ONE_APPROVER: 80,
    MULTI_STAKEHOLDER: 60,
    NEED_INTERNAL_ALIGNMENT: 40,
    FUTURE_PLANNING: 20,
  };

  const buyerRoleScores: Record<string, number> = {
    FOUNDER_OWNER: 95,
    HR_PEOPLE_CULTURE: 90,
    TEAM_LEADER_MANAGER: 75,
    LND_OD_TRAINING: 70,
    PROGRAMME_PROJECT_MANAGER: 65,
    OPERATIONS_ADMIN: 55,
    CONSULTANT_ADVISOR: 50,
    TEAM_MEMBER: 30,
    STUDENT_RESEARCH: 10,
    OTHER: 40,
  };

  const planningStageScore = planningStageScores[answers.planningStage] ?? 30;
  const approvalProcessScore = approvalProcessScores[answers.approvalProcess] ?? 40;
  const buyerRoleScore = buyerRoleScores[answers.roleInProcess] ?? 40;

  const clsCore = Math.round(
    planningStageScore * 0.45 +
    approvalProcessScore * 0.35 +
    buyerRoleScore * 0.20
  );

  const clsFinal = Math.min(100, clsCore);

  let band: LeadBand;
  if (clsFinal >= 75) band = "A";
  else if (clsFinal >= 55) band = "B";
  else if (clsFinal >= 35) band = "C";
  else band = "D";

  return {
    clsCore,
    clsFinal,
    band,
    signals: { planningStageScore, approvalProcessScore, buyerRoleScore },
  };
}
