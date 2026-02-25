import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight, ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────
type Likert5 = 0 | 1 | 2 | 3 | 4;

interface FormState {
  sector: string;
  teamSize: string;
  roleInProcess: string;
  planningStage: string;
  approvalProcess: string;
  morale: Likert5;
  trust: Likert5;
  communication: Likert5;
  respect: Likert5;
  conflictSeverity: Likert5;
  gossipIndicator: Likert5;
  competitionIndicator: Likert5;
  silosIndicator: Likert5;
  burnoutIndicator: Likert5;
  changeStress: Likert5;
  leadershipBuyIn: Likert5;
  leadershipParticipation: Likert5;
  urgency: Likert5;
  budgetRange: string;
  timeAvailable: string;
  preferredFormat: string;
  timeline: string;
  notes: string;
}

const initialState: FormState = {
  sector: "",
  teamSize: "",
  roleInProcess: "",
  planningStage: "",
  approvalProcess: "",
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
  budgetRange: "",
  timeAvailable: "",
  preferredFormat: "",
  timeline: "",
  notes: "",
};

// ─── Likert Scale Component ───────────────────────────────────────────────────
const likertLabels = ["Very Low", "Low", "Moderate", "High", "Very High"];
const severityLabels = ["None", "Mild", "Moderate", "Significant", "Severe"];

function LikertScale({
  label,
  sublabel,
  value,
  onChange,
  type = "likert",
}: {
  label: string;
  sublabel?: string;
  value: Likert5;
  onChange: (v: Likert5) => void;
  type?: "likert" | "severity";
}) {
  const labels = type === "severity" ? severityLabels : likertLabels;
  const colors = type === "severity"
    ? ["#10A37F", "#F59E0B", "#F59E0B", "#EF4444", "#DC2626"]
    : ["#EF4444", "#F59E0B", "#F59E0B", "#10A37F", "#059669"];

  return (
    <div className="mb-5">
      <div className="flex items-start justify-between mb-2">
        <div>
          <span className="text-sm font-medium text-white">{label}</span>
          {sublabel && <p className="text-xs text-[#A7A7A9] mt-0.5">{sublabel}</p>}
        </div>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full ml-4 shrink-0"
          style={{ background: `${colors[value]}20`, color: colors[value], border: `1px solid ${colors[value]}40` }}
        >
          {labels[value]}
        </span>
      </div>
      <div className="flex gap-2">
        {([0, 1, 2, 3, 4] as Likert5[]).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            className="flex-1 h-8 rounded-lg transition-all text-xs font-medium"
            style={{
              background: value === v ? colors[v] : "rgba(255,255,255,0.04)",
              border: value === v ? `1px solid ${colors[v]}` : "1px solid rgba(255,255,255,0.08)",
              color: value === v ? "#fff" : "#A7A7A9",
            }}
          >
            {v + 1}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-[#A7A7A9]">{labels[0]}</span>
        <span className="text-xs text-[#A7A7A9]">{labels[4]}</span>
      </div>
    </div>
  );
}

// ─── Option Grid Component ────────────────────────────────────────────────────
function OptionGrid({
  label,
  options,
  value,
  onChange,
  cols = 2,
}: {
  label: string;
  options: { value: string; label: string; desc?: string }[];
  value: string;
  onChange: (v: string) => void;
  cols?: number;
}) {
  return (
    <div className="mb-5">
      <label className="text-sm font-medium text-white mb-3 block">{label}</label>
      <div className={`grid grid-cols-1 sm:grid-cols-${cols} gap-2`}>
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className="text-left p-3 rounded-xl transition-all"
            style={{
              background: value === opt.value ? "rgba(184,115,51,0.15)" : "rgba(255,255,255,0.03)",
              border: value === opt.value ? "1px solid rgba(184,115,51,0.5)" : "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="flex items-start gap-2">
              <div
                className="w-4 h-4 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center"
                style={{ borderColor: value === opt.value ? "#B87333" : "rgba(255,255,255,0.2)" }}
              >
                {value === opt.value && <div className="w-2 h-2 rounded-full bg-[#B87333]" />}
              </div>
              <div>
                <div className="text-sm font-medium text-white">{opt.label}</div>
                {opt.desc && <div className="text-xs text-[#A7A7A9] mt-0.5">{opt.desc}</div>}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Step Definitions ─────────────────────────────────────────────────────────
const steps = [
  { id: 1, title: "Team Context", desc: "Tell us about your team and your role" },
  { id: 2, title: "Team State", desc: "How is your team performing right now?" },
  { id: 3, title: "Pain Points", desc: "What challenges is your team facing?" },
  { id: 4, title: "Wellness & Leadership", desc: "Burnout, stress, and leadership alignment" },
  { id: 5, title: "Constraints", desc: "Budget, time, and format preferences" },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AIDT() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [, navigate] = useLocation();

  const submitMutation = trpc.aidt.submit.useMutation({
    onSuccess: (data) => {
      // Store results in sessionStorage for the results page
      sessionStorage.setItem("aidt_results", JSON.stringify(data));
      navigate("/aidt/results");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const canProceed = () => {
    if (step === 1) return !!(form.sector && form.teamSize && form.roleInProcess && form.planningStage && form.approvalProcess);
    if (step === 5) return !!(form.budgetRange && form.timeAvailable && form.preferredFormat && form.timeline);
    return true;
  };

  const handleSubmit = () => {
    submitMutation.mutate({
      sector: form.sector,
      teamSize: parseInt(form.teamSize),
      roleInProcess: form.roleInProcess,
      planningStage: form.planningStage,
      approvalProcess: form.approvalProcess,
      morale: form.morale,
      trust: form.trust,
      communication: form.communication,
      respect: form.respect,
      conflictSeverity: form.conflictSeverity,
      gossipIndicator: form.gossipIndicator,
      competitionIndicator: form.competitionIndicator,
      silosIndicator: form.silosIndicator,
      burnoutIndicator: form.burnoutIndicator,
      changeStress: form.changeStress,
      leadershipBuyIn: form.leadershipBuyIn,
      leadershipParticipation: form.leadershipParticipation,
      urgency: form.urgency,
      budgetRange: form.budgetRange,
      timeAvailable: form.timeAvailable,
      preferredFormat: form.preferredFormat,
      timeline: form.timeline,
      notes: form.notes,
    });
  };

  const progress = ((step - 1) / (steps.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white pt-20">
      <div className="container mx-auto max-w-2xl px-4 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B87333]/30 bg-[#B87333]/10 text-[#F6C58F] text-xs font-medium mb-4">
            <Zap className="w-3 h-3" />
            AI Team Pulse Diagnostic
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
            Team Pulse Assessment
          </h1>
          <p className="text-[#A7A7A9] text-sm">5 minutes · Free · Personalised results</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                  style={{
                    background: step > s.id ? "#10A37F" : step === s.id ? "linear-gradient(135deg, #B87333, #F6C58F)" : "rgba(255,255,255,0.05)",
                    border: step >= s.id ? "none" : "1px solid rgba(255,255,255,0.1)",
                    color: step >= s.id ? "#fff" : "#A7A7A9",
                  }}
                >
                  {step > s.id ? <CheckCircle className="w-4 h-4" /> : s.id}
                </div>
              </div>
            ))}
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: "linear-gradient(90deg, #B87333, #F6C58F)" }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-[#A7A7A9]">Step {step} of {steps.length}</span>
            <span className="text-xs text-[#A7A7A9]">{steps[step - 1].title}</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
          <h2 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>
            {steps[step - 1].title}
          </h2>
          <p className="text-sm text-[#A7A7A9] mb-6">{steps[step - 1].desc}</p>

          {/* Step 1 */}
          {step === 1 && (
            <div>
              <OptionGrid
                label="What sector does your organisation operate in?"
                cols={2}
                value={form.sector}
                onChange={(v) => update("sector", v)}
                options={[
                  { value: "CORPORATE", label: "Corporate / SME" },
                  { value: "NGO_NPO", label: "NGO / Non-Profit" },
                  { value: "EDUCATION", label: "Education / Schools" },
                  { value: "PUBLIC_SECTOR", label: "Public Sector / Government" },
                  { value: "HEALTHCARE", label: "Healthcare" },
                  { value: "HOSPITALITY", label: "Hospitality / Retail" },
                  { value: "FAITH_COMMUNITY", label: "Faith / Community" },
                  { value: "OTHER", label: "Other" },
                ]}
              />

              <div className="mb-5">
                <label className="text-sm font-medium text-white mb-2 block">Approximate team size</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { value: "8", label: "1–10" },
                    { value: "18", label: "11–25" },
                    { value: "33", label: "26–40" },
                    { value: "50", label: "40+" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => update("teamSize", opt.value)}
                      className="p-3 rounded-xl text-sm font-medium transition-all"
                      style={{
                        background: form.teamSize === opt.value ? "rgba(184,115,51,0.15)" : "rgba(255,255,255,0.03)",
                        border: form.teamSize === opt.value ? "1px solid rgba(184,115,51,0.5)" : "1px solid rgba(255,255,255,0.08)",
                        color: form.teamSize === opt.value ? "#F6C58F" : "#A7A7A9",
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <OptionGrid
                label="What is your role in this process?"
                cols={2}
                value={form.roleInProcess}
                onChange={(v) => update("roleInProcess", v)}
                options={[
                  { value: "HR_PEOPLE_CULTURE", label: "HR / People & Culture" },
                  { value: "FOUNDER_OWNER", label: "Founder / Owner" },
                  { value: "TEAM_LEADER_MANAGER", label: "Team Leader / Manager" },
                  { value: "OPERATIONS_ADMIN", label: "Operations / Admin" },
                  { value: "PROGRAMME_PROJECT_MANAGER", label: "Programme Manager" },
                  { value: "OTHER", label: "Other" },
                ]}
              />

              <OptionGrid
                label="Where are you in the planning process?"
                cols={1}
                value={form.planningStage}
                onChange={(v) => update("planningStage", v)}
                options={[
                  { value: "EXPLORING", label: "Just exploring options", desc: "Not committed yet, gathering information" },
                  { value: "COMPARING", label: "Comparing providers", desc: "Actively evaluating different options" },
                  { value: "NEED_PROPOSAL", label: "Need a proposal", desc: "Ready to receive a formal proposal" },
                  { value: "READY_SOON", label: "Ready to book soon", desc: "Decision made, finalising details" },
                  { value: "URGENT_ASAP", label: "Urgent — need this ASAP", desc: "Immediate need, ready to proceed now" },
                ]}
              />

              <OptionGrid
                label="What does the approval process look like?"
                cols={1}
                value={form.approvalProcess}
                onChange={(v) => update("approvalProcess", v)}
                options={[
                  { value: "I_CAN_APPROVE", label: "I can approve this myself" },
                  { value: "ONE_APPROVER", label: "One other person needs to approve" },
                  { value: "MULTI_STAKEHOLDER", label: "Multiple stakeholders need to sign off" },
                  { value: "NEED_INTERNAL_ALIGNMENT", label: "I need to build internal alignment first" },
                  { value: "FUTURE_PLANNING", label: "This is for future planning purposes" },
                ]}
              />
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <p className="text-xs text-[#A7A7A9] mb-5 p-3 rounded-lg bg-white/3 border border-white/5">
                Rate each dimension from 1 (very low) to 5 (very high) based on your team's current state.
              </p>
              <LikertScale label="Team Morale" sublabel="Overall energy, enthusiasm, and motivation" value={form.morale} onChange={(v) => update("morale", v)} />
              <LikertScale label="Trust" sublabel="Confidence in colleagues' intentions and reliability" value={form.trust} onChange={(v) => update("trust", v)} />
              <LikertScale label="Communication Quality" sublabel="Clarity, openness, and effectiveness of team communication" value={form.communication} onChange={(v) => update("communication", v)} />
              <LikertScale label="Respect & Dignity" sublabel="How team members treat each other day-to-day" value={form.respect} onChange={(v) => update("respect", v)} />
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <p className="text-xs text-[#A7A7A9] mb-5 p-3 rounded-lg bg-white/3 border border-white/5">
                Rate the severity of each challenge from 1 (none) to 5 (severe).
              </p>
              <LikertScale label="Conflict Severity" sublabel="Frequency and intensity of interpersonal or team conflict" value={form.conflictSeverity} onChange={(v) => update("conflictSeverity", v)} type="severity" />
              <LikertScale label="Gossip & Rumour" sublabel="Prevalence of informal negative communication" value={form.gossipIndicator} onChange={(v) => update("gossipIndicator", v)} type="severity" />
              <LikertScale label="Unhealthy Competition" sublabel="Team members working against each other rather than together" value={form.competitionIndicator} onChange={(v) => update("competitionIndicator", v)} type="severity" />
              <LikertScale label="Silos & Isolation" sublabel="Departments or individuals working in isolation" value={form.silosIndicator} onChange={(v) => update("silosIndicator", v)} type="severity" />
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div>
              <p className="text-xs text-[#A7A7A9] mb-5 p-3 rounded-lg bg-white/3 border border-white/5">
                These factors significantly influence the type of intervention needed.
              </p>
              <LikertScale label="Burnout & Exhaustion" sublabel="Visible signs of burnout, fatigue, or disengagement" value={form.burnoutIndicator} onChange={(v) => update("burnoutIndicator", v)} type="severity" />
              <LikertScale label="Change-Related Stress" sublabel="Stress from recent restructuring, leadership changes, or uncertainty" value={form.changeStress} onChange={(v) => update("changeStress", v)} type="severity" />
              <LikertScale label="Leadership Buy-In" sublabel="How committed is leadership to team building?" value={form.leadershipBuyIn} onChange={(v) => update("leadershipBuyIn", v)} />
              <LikertScale label="Leadership Participation" sublabel="Will leaders actively participate in the session?" value={form.leadershipParticipation} onChange={(v) => update("leadershipParticipation", v)} />
              <LikertScale label="Urgency" sublabel="How urgently does your team need this intervention?" value={form.urgency} onChange={(v) => update("urgency", v)} type="severity" />
            </div>
          )}

          {/* Step 5 */}
          {step === 5 && (
            <div>
              <OptionGrid
                label="What is your approximate budget?"
                cols={2}
                value={form.budgetRange}
                onChange={(v) => update("budgetRange", v)}
                options={[
                  { value: "LOW", label: "Under R15,000", desc: "Half-day sessions" },
                  { value: "MID", label: "R15,000 – R35,000", desc: "Weekend camps (smaller groups)" },
                  { value: "HIGH", label: "R35,000+", desc: "Full weekend camps / premium" },
                  { value: "NOT_SURE", label: "Not sure yet", desc: "Open to recommendations" },
                ]}
              />

              <OptionGrid
                label="How much time can your team commit?"
                cols={2}
                value={form.timeAvailable}
                onChange={(v) => update("timeAvailable", v)}
                options={[
                  { value: "HALF_DAY", label: "Half day (3–4 hours)" },
                  { value: "FULL_DAY", label: "Full day (6–8 hours)" },
                  { value: "WEEKEND", label: "Full weekend (2 days)" },
                  { value: "NOT_SURE", label: "Flexible / not sure" },
                ]}
              />

              <OptionGrid
                label="Preferred format"
                cols={2}
                value={form.preferredFormat}
                onChange={(v) => update("preferredFormat", v)}
                options={[
                  { value: "IN_PERSON", label: "In-person" },
                  { value: "VIRTUAL", label: "Virtual / online" },
                  { value: "HYBRID", label: "Hybrid" },
                  { value: "NO_PREFERENCE", label: "No preference" },
                ]}
              />

              <OptionGrid
                label="Desired timeline"
                cols={2}
                value={form.timeline}
                onChange={(v) => update("timeline", v)}
                options={[
                  { value: "ASAP", label: "As soon as possible" },
                  { value: "1_MONTH", label: "Within 1 month" },
                  { value: "3_MONTHS", label: "Within 3 months" },
                  { value: "PLANNING_AHEAD", label: "Planning ahead (3+ months)" },
                ]}
              />

              <div className="mb-4">
                <label className="text-sm font-medium text-white mb-2 block">
                  Anything else you'd like us to know?{" "}
                  <span className="text-[#A7A7A9] font-normal">(optional)</span>
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder="Any specific challenges, context, or goals you'd like to share..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder:text-[#A7A7A9]/50 focus:border-[#B87333]/50 focus:outline-none resize-none min-h-[80px]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            className="border-white/15 text-white hover:bg-white/5"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {step < steps.length ? (
            <Button
              className="text-[#0F0F10] font-semibold px-8"
              style={{ background: "linear-gradient(135deg, #B87333 0%, #F6C58F 50%, #8A3A12 100%)" }}
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              className="text-[#0F0F10] font-semibold px-8"
              style={{ background: "linear-gradient(135deg, #B87333 0%, #F6C58F 50%, #8A3A12 100%)" }}
              onClick={handleSubmit}
              disabled={!canProceed() || submitMutation.isPending}
            >
              {submitMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analysing...
                </span>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Get My Results
                </>
              )}
            </Button>
          )}
        </div>

        <p className="text-xs text-[#A7A7A9] text-center mt-4">
          Free · No sign-up required · Results in seconds
        </p>
      </div>
    </div>
  );
}
