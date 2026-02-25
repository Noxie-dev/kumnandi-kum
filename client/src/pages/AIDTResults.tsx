import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Zap, TrendingUp, AlertTriangle, CheckCircle, Target, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────
interface DiagnosticResult {
  teamPulseScore: number;
  riskLevel: string;
  healthScore: number;
  riskScore: number;
  readinessScore: number;
  dimensions: Record<string, number>;
  topFocusAreas: string[];
  strengths: string[];
}

interface Recommendation {
  type: string;
  confidence: number;
  scores: Record<string, number>;
  rationaleBullets: string[];
  expectedOutcomes: string[];
  suggestedModules: string[];
}

interface ResultsData {
  assessmentId: string;
  diagnostic: DiagnosticResult;
  recommendation: Recommendation;
  leadBand: string;
}

// ─── Gauge Component ──────────────────────────────────────────────────────────
function ScoreGauge({ score, riskLevel }: { score: number; riskLevel: string }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedScore((prev) => {
          if (prev >= score) {
            clearInterval(interval);
            return score;
          }
          return prev + 2;
        });
      }, 20);
      return () => clearInterval(interval);
    }, 300);
    return () => clearTimeout(timer);
  }, [score]);

  const riskColors: Record<string, string> = {
    LOW: "#10A37F",
    MODERATE: "#F59E0B",
    ELEVATED: "#F97316",
    HIGH: "#EF4444",
    CRITICAL: "#DC2626",
  };

  const riskLabels: Record<string, string> = {
    LOW: "Healthy",
    MODERATE: "Moderate Risk",
    ELEVATED: "Elevated Risk",
    HIGH: "High Risk",
    CRITICAL: "Critical",
  };

  const color = riskColors[riskLevel] ?? "#B87333";
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-44 h-44">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 0.05s linear", filter: `drop-shadow(0 0 8px ${color}60)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>{animatedScore}</span>
          <span className="text-xs text-[#A7A7A9]">/ 100</span>
        </div>
      </div>
      <div className="mt-3 text-center">
        <span
          className="text-sm font-semibold px-3 py-1 rounded-full"
          style={{ background: `${color}20`, border: `1px solid ${color}40`, color }}
        >
          {riskLabels[riskLevel] ?? riskLevel}
        </span>
        <p className="text-xs text-[#A7A7A9] mt-1">Team Pulse Score</p>
      </div>
    </div>
  );
}

// ─── Dimension Bar ────────────────────────────────────────────────────────────
function DimensionBar({ label, score, inverted = false }: { label: string; score: number; inverted?: boolean }) {
  const displayScore = inverted ? 100 - score : score;
  const color = displayScore >= 70 ? "#10A37F" : displayScore >= 50 ? "#F59E0B" : "#EF4444";

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-[#A7A7A9]">{label}</span>
        <span className="text-xs font-medium" style={{ color }}>{Math.round(displayScore)}</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${displayScore}%`, background: color }}
        />
      </div>
    </div>
  );
}

// ─── Recommendation Card ──────────────────────────────────────────────────────
const recommendationDetails: Record<string, {
  title: string;
  duration: string;
  price: string;
  href: string;
  icon: string;
}> = {
  HALF_DAY: {
    title: "Half-Day Team Building",
    duration: "3–4 Hours",
    price: "From R5,500",
    href: "/services/half-day",
    icon: "⚡",
  },
  WEEKEND_CAMP: {
    title: "Weekend Team Building Camp",
    duration: "2 Days",
    price: "R25,000 – R50,000",
    href: "/services/weekend-camps",
    icon: "🏕️",
  },
  WORKSHOP: {
    title: "Tailored Workshop",
    duration: "Custom",
    price: "Custom Quote",
    href: "/services/workshops",
    icon: "🎯",
  },
  DISCOVERY_CALL: {
    title: "Free Discovery Call",
    duration: "30 Minutes",
    price: "Free",
    href: "/contact",
    icon: "💬",
  },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AIDTResults() {
  const [location] = useLocation();
  const [results, setResults] = useState<ResultsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load results from sessionStorage (set by AIDT page via router)
    const stored = sessionStorage.getItem("aidt_results");
    if (stored) {
      try {
        setResults(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F10] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-[#B87333]/30 border-t-[#B87333] animate-spin mx-auto mb-4" />
          <p className="text-[#A7A7A9] text-sm">Analysing your team's pulse...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-[#0F0F10] flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-md">
          <AlertTriangle className="w-12 h-12 text-[#F59E0B] mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-3">No Results Found</h2>
          <p className="text-[#A7A7A9] mb-6">It looks like you haven't completed the assessment yet, or your results have expired.</p>
          <Link href="/aidt">
            <Button className="text-[#0F0F10] font-semibold" style={{ background: "linear-gradient(135deg, #B87333 0%, #F6C58F 50%, #8A3A12 100%)" }}>
              Take the Assessment
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const { diagnostic, recommendation } = results;
  const recDetails = recommendationDetails[recommendation.type];
  const dimLabels: Record<string, { label: string; inverted: boolean }> = {
    communicationQuality: { label: "Communication Quality", inverted: false },
    trustSafety: { label: "Trust & Safety", inverted: false },
    respectCulture: { label: "Respect & Culture", inverted: false },
    teamCohesion: { label: "Team Cohesion", inverted: false },
    conflictPressure: { label: "Conflict Pressure", inverted: true },
    toxicIndicators: { label: "Toxic Indicators", inverted: true },
    burnoutStrain: { label: "Burnout & Strain", inverted: true },
    leadershipSupport: { label: "Leadership Support", inverted: false },
    changeStress: { label: "Change Stress", inverted: true },
    collaborationReadiness: { label: "Collaboration Readiness", inverted: false },
  };

  const riskBannerColors: Record<string, { bg: string; border: string; text: string; icon: string }> = {
    LOW: { bg: "rgba(16,163,127,0.1)", border: "rgba(16,163,127,0.3)", text: "#10A37F", icon: "✅" },
    MODERATE: { bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)", text: "#F59E0B", icon: "⚠️" },
    ELEVATED: { bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.3)", text: "#F97316", icon: "🔶" },
    HIGH: { bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.3)", text: "#EF4444", icon: "🔴" },
    CRITICAL: { bg: "rgba(220,38,38,0.1)", border: "rgba(220,38,38,0.3)", text: "#DC2626", icon: "🚨" },
  };
  const riskBanner = riskBannerColors[diagnostic.riskLevel] ?? riskBannerColors.MODERATE;

  const riskMessages: Record<string, string> = {
    LOW: "Your team is in a healthy state. Consider a maintenance session to sustain momentum.",
    MODERATE: "Your team has some areas to address. A targeted intervention can prevent escalation.",
    ELEVATED: "Your team is showing signs of strain. Timely intervention is recommended.",
    HIGH: "Your team is experiencing significant challenges. Prompt action is needed.",
    CRITICAL: "Your team is in crisis. Immediate, intensive intervention is strongly recommended.",
  };

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white pt-20">
      <div className="container mx-auto max-w-4xl px-4 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B87333]/30 bg-[#B87333]/10 text-[#F6C58F] text-xs font-medium mb-4">
            <Zap className="w-3 h-3" />
            Your Team Pulse Results
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
            Team Pulse Assessment Results
          </h1>
          <p className="text-[#A7A7A9] text-sm">Based on your responses, here is your personalised team health report.</p>
        </div>

        {/* Risk Banner */}
        <div
          className="rounded-xl p-4 mb-8 flex items-start gap-3"
          style={{ background: riskBanner.bg, border: `1px solid ${riskBanner.border}` }}
        >
          <span className="text-xl">{riskBanner.icon}</span>
          <div>
            <span className="text-sm font-semibold" style={{ color: riskBanner.text }}>
              {diagnostic.riskLevel} Risk Level
            </span>
            <p className="text-sm text-[#A7A7A9] mt-0.5">{riskMessages[diagnostic.riskLevel]}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Score Gauge */}
          <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center">
            <ScoreGauge score={diagnostic.teamPulseScore} riskLevel={diagnostic.riskLevel} />
            <div className="w-full mt-5 grid grid-cols-3 gap-3">
              {[
                { label: "Health", score: diagnostic.healthScore, icon: TrendingUp },
                { label: "Risk", score: diagnostic.riskScore, icon: AlertTriangle, inverted: true },
                { label: "Readiness", score: diagnostic.readinessScore, icon: Target },
              ].map((sub) => {
                const displayScore = sub.inverted ? 100 - sub.score : sub.score;
                const color = displayScore >= 70 ? "#10A37F" : displayScore >= 50 ? "#F59E0B" : "#EF4444";
                return (
                  <div key={sub.label} className="text-center p-2 rounded-lg bg-white/3 border border-white/5">
                    <div className="text-lg font-bold" style={{ color }}>{Math.round(displayScore)}</div>
                    <div className="text-xs text-[#A7A7A9]">{sub.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Focus Areas & Strengths */}
          <div className="space-y-4">
            <div className="glass-card rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
                Top Focus Areas
              </h3>
              <ul className="space-y-2">
                {diagnostic.topFocusAreas.map((area, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[#A7A7A9]">
                    <span className="w-5 h-5 rounded-full bg-[#F59E0B]/20 border border-[#F59E0B]/30 flex items-center justify-center text-xs text-[#F59E0B] font-bold shrink-0">{i + 1}</span>
                    {area}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#10A37F]" />
                Team Strengths
              </h3>
              <ul className="space-y-2">
                {(diagnostic.strengths ?? []).map((strength, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[#A7A7A9]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#10A37F] shrink-0" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Dimensions */}
          <div className="glass-card rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Dimension Breakdown</h3>
            {Object.entries(diagnostic.dimensions).map(([key, score]) => {
              const dim = dimLabels[key];
              if (!dim) return null;
              return <DimensionBar key={key} label={dim.label} score={score as number} inverted={dim.inverted} />;
            })}
          </div>
        </div>

        {/* Recommendation */}
        {recDetails && (
          <div
            className="rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(184,115,51,0.12) 0%, rgba(138,58,18,0.06) 100%)", border: "1px solid rgba(184,115,51,0.3)" }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #F6C58F, transparent)", transform: "translate(30%, -30%)" }} />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs text-[#B87333] font-semibold uppercase tracking-wide mb-1">Recommended Intervention</div>
                  <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {recDetails.icon} {recDetails.title}
                  </h2>
                  <div className="flex items-center gap-4 mt-2 text-sm text-[#A7A7A9]">
                    <span>{recDetails.duration}</span>
                    <span className="text-[#F6C58F] font-semibold">{recDetails.price}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#F6C58F]">{recommendation.confidence}%</div>
                  <div className="text-xs text-[#A7A7A9]">Confidence</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wide mb-3">Why This Recommendation</h4>
                  <ul className="space-y-2">
                    {recommendation.rationaleBullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#A7A7A9]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#B87333] mt-1.5 shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wide mb-3">Expected Outcomes</h4>
                  <ul className="space-y-2">
                    {recommendation.expectedOutcomes.map((outcome, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#A7A7A9]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#10A37F] mt-0.5 shrink-0" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact">
                  <Button
                    className="text-[#0F0F10] font-semibold"
                    style={{ background: "linear-gradient(135deg, #B87333 0%, #F6C58F 50%, #8A3A12 100%)" }}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book This Session
                  </Button>
                </Link>
                <Link href={recDetails.href}>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="glass-card rounded-2xl p-6 text-center">
          <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
            Ready to Take the Next Step?
          </h3>
          <p className="text-sm text-[#A7A7A9] mb-5 max-w-lg mx-auto">
            Share these results with Neziswa in a free 30-minute discovery call. She'll help you understand what they mean and design the right intervention for your team.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <Button
                className="text-[#0F0F10] font-semibold"
                style={{ background: "linear-gradient(135deg, #B87333 0%, #F6C58F 50%, #8A3A12 100%)" }}
              >
                Book a Free Discovery Call
              </Button>
            </Link>
            <Link href="/aidt">
              <Button variant="outline" className="border-white/15 text-white hover:bg-white/5">
                Retake Assessment
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
