import { Link, useRoute } from "wouter";
import { ArrowRight, Clock, Users, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const serviceData = {
  "half-day": {
    title: "Half-Day Team Building",
    subtitle: "A focused reset for teams that need alignment without a major time commitment",
    duration: "3–4 Hours",
    capacity: "Up to 40 participants",
    pricing: [
      { label: "Up to 25 participants", price: "R5,500" },
      { label: "Up to 40 participants", price: "R10,000" },
    ],
    description: `The Half-Day Team Building session is Kumnandi Kum's most accessible and popular offering. Designed for teams that recognise the need for change but are constrained by time and budget, this session delivers a powerful combination of motivational facilitation, interactive team activities, and structured reflection.

In just 3–4 hours, participants experience a carefully sequenced journey from individual awareness to collective commitment. The session is energising without being exhausting, and the outcomes are practical and immediately applicable.`,
    outcomes: [
      "Improved communication and active listening",
      "Renewed team energy and shared morale",
      "Shared understanding of team values and expectations",
      "Practical conflict de-escalation tools",
      "Strengthened interpersonal relationships",
      "A team commitment charter",
    ],
    agenda: [
      { time: "00:00", title: "Welcome & Scene Setting", desc: "Establishing psychological safety and session intentions" },
      { time: "00:30", title: "Motivational Talk", desc: "Inspiring reflection on team purpose and individual contribution" },
      { time: "01:00", title: "Interactive Team Activities", desc: "Structured games designed to surface team dynamics" },
      { time: "02:00", title: "Group Reflection", desc: "Facilitated conversation on what the activities revealed" },
      { time: "02:45", title: "Commitment Setting", desc: "Creating shared agreements for how the team will operate" },
      { time: "03:15", title: "Close & Next Steps", desc: "Celebrating progress and defining accountability" },
    ],
    bestFor: ["Teams experiencing low morale", "New team formations", "Post-conflict reset", "Annual team refresh", "Budget-conscious organisations"],
    tag: "Most Popular",
    color: "#10A37F",
  },
  "weekend-camps": {
    title: "Weekend Team Building Camps",
    subtitle: "An immersive two-day transformation experience for teams ready to do the deep work",
    duration: "2 Days",
    capacity: "Custom group sizes",
    pricing: [
      { label: "Standard package", price: "R25,000" },
      { label: "Premium package", price: "R50,000" },
    ],
    description: `The Weekend Team Building Camp is Kumnandi Kum's most comprehensive and transformative offering. Over two full days, teams engage in a carefully designed sequence of experiences that move from surface-level team dynamics to deep cultural transformation.

Day 1 features five to six structured facilitation sessions that progressively build trust, surface conflict, and create new shared understandings. Day 2 focuses on presentations, commitments, and the creation of a team charter that participants take back to the workplace.`,
    outcomes: [
      "Deep trust rebuilding across all levels",
      "Leadership and team alignment",
      "Culture reset and establishment of new norms",
      "Conflict resolution and emotional healing",
      "Shared vision and strategic alignment",
      "A comprehensive team charter and accountability framework",
    ],
    agenda: [
      { time: "Day 1 AM", title: "Arrival & Orientation", desc: "Scene setting, safety agreements, and initial team assessment" },
      { time: "Day 1 Mid", title: "Deep Diagnostic Sessions", desc: "Structured activities surfacing team dynamics and pain points" },
      { time: "Day 1 PM", title: "Conflict & Trust Work", desc: "Facilitated conversations addressing core team tensions" },
      { time: "Day 1 Eve", title: "Celebration & Bonding", desc: "Informal connection and relationship building" },
      { time: "Day 2 AM", title: "Presentations & Insights", desc: "Teams present their learnings and commitments" },
      { time: "Day 2 PM", title: "Charter & Close", desc: "Creating the team charter and commitment ceremony" },
    ],
    bestFor: ["Teams in deep conflict", "Post-restructuring alignment", "Leadership team retreats", "Culture transformation initiatives", "High-stakes team rebuilding"],
    tag: "High Impact",
    color: "#B87333",
  },
  "workshops": {
    title: "Tailored Workshops",
    subtitle: "Bespoke facilitation designed around your organisation's unique challenges and goals",
    duration: "Custom",
    capacity: "Flexible",
    pricing: [
      { label: "All packages", price: "Custom Quote" },
    ],
    description: `Tailored Workshops are Kumnandi Kum's most flexible offering, designed for organisations with specific needs that don't fit a standard format. Whether you need a focused intervention on a particular challenge, a series of sessions over time, or a unique format for a special context, Neziswa will design a bespoke programme that meets your exact requirements.

The process begins with a thorough needs assessment — often informed by the AI Team Pulse Diagnostic — and results in a custom facilitation plan with agreed-upon outcomes, timelines, and success metrics.`,
    outcomes: [
      "Targeted interventions for specific challenges",
      "Measurable, agreed-upon outcomes",
      "Flexible format, timing, and delivery",
      "Ongoing support and follow-up options",
      "Post-session report and recommendations",
      "Integration with existing HR and OD initiatives",
    ],
    agenda: [
      { time: "Phase 1", title: "Needs Assessment", desc: "Deep-dive consultation to understand your specific context" },
      { time: "Phase 2", title: "Programme Design", desc: "Custom facilitation plan with agreed outcomes and metrics" },
      { time: "Phase 3", title: "Delivery", desc: "Expert facilitation of your bespoke programme" },
      { time: "Phase 4", title: "Post-Session Report", desc: "Comprehensive report with findings and recommendations" },
    ],
    bestFor: ["Organisations with unique needs", "Sector-specific challenges", "Multi-session programmes", "Integration with OD initiatives", "Research-informed interventions"],
    tag: "Bespoke",
    color: "#7A261A",
  },
};

export default function ServiceDetail() {
  const [matchHalfDay] = useRoute("/services/half-day");
  const [matchWeekend] = useRoute("/services/weekend-camps");
  const [matchWorkshops] = useRoute("/services/workshops");

  const key = matchHalfDay ? "half-day" : matchWeekend ? "weekend-camps" : "workshops";
  const service = serviceData[key];

  if (!service) return null;

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white pt-20">
      {/* Header */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${service.color}15 0%, transparent 70%)` }} />
        <div className="container mx-auto max-w-4xl relative z-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm text-[#A7A7A9] hover:text-[#F6C58F] transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
          <div className="flex items-start gap-4 mb-4">
            <span
              className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{ background: `${service.color}20`, border: `1px solid ${service.color}50`, color: service.color }}
            >
              {service.tag}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
            {service.title}
          </h1>
          <p className="text-xl text-[#A7A7A9] mb-6">{service.subtitle}</p>
          <div className="flex items-center gap-6 text-sm text-[#A7A7A9]">
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#B87333]" />{service.duration}</span>
            <span className="flex items-center gap-2"><Users className="w-4 h-4 text-[#B87333]" />{service.capacity}</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>Overview</h2>
              {service.description.split("\n\n").map((para, i) => (
                <p key={i} className="text-[#A7A7A9] leading-relaxed mb-4">{para}</p>
              ))}
            </div>

            {/* Outcomes */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>What You'll Achieve</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.outcomes.map((outcome) => (
                  <div key={outcome} className="flex items-start gap-3 glass-card rounded-lg p-3">
                    <CheckCircle className="w-4 h-4 text-[#B87333] mt-0.5 shrink-0" />
                    <span className="text-sm text-[#A7A7A9]">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Agenda */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>Session Structure</h2>
              <div className="space-y-3">
                {service.agenda.map((item, i) => (
                  <div key={i} className="flex gap-4 glass-card rounded-lg p-4">
                    <div className="text-xs font-mono text-[#B87333] w-20 shrink-0 pt-0.5">{item.time}</div>
                    <div>
                      <div className="text-sm font-semibold text-white mb-1">{item.title}</div>
                      <div className="text-sm text-[#A7A7A9]">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Best For */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>Best For</h2>
              <div className="flex flex-wrap gap-2">
                {service.bestFor.map((item) => (
                  <span
                    key={item}
                    className="text-sm px-3 py-1.5 rounded-full text-[#A7A7A9]"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Pricing */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Investment</h3>
              {service.pricing.map((p) => (
                <div key={p.label} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <span className="text-sm text-[#A7A7A9]">{p.label}</span>
                  <span className="text-sm font-bold text-[#F6C58F]">{p.price}</span>
                </div>
              ))}
              <div className="mt-4 p-3 rounded-lg bg-[#B87333]/5 border border-[#B87333]/15">
                <p className="text-xs text-[#A7A7A9]">All packages include pre-session consultation, facilitation materials, and a post-session summary.</p>
              </div>
            </div>

            {/* CTA */}
            <div className="glass-card rounded-xl p-6 space-y-3">
              <h3 className="text-sm font-semibold text-white mb-2">Ready to Book?</h3>
              <Link href="/contact">
                <Button
                  className="w-full text-[#0F0F10] font-semibold"
                  style={{ background: "linear-gradient(135deg, #B87333 0%, #F6C58F 50%, #8A3A12 100%)" }}
                >
                  Book This Session
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/aidt">
                <Button variant="outline" className="w-full border-white/15 text-white hover:bg-white/5 text-sm">
                  Take Team Assessment First
                </Button>
              </Link>
              <p className="text-xs text-[#A7A7A9] text-center">Free discovery call available</p>
            </div>

            {/* Facilitator */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-sm font-semibold text-white mb-3">Your Facilitator</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#B87333]/20 border border-[#B87333]/30 flex items-center justify-center text-[#F6C58F] font-bold text-sm">NN</div>
                <div>
                  <div className="text-sm font-medium text-white">Neziswa Ntante</div>
                  <div className="text-xs text-[#A7A7A9]">16+ years experience</div>
                </div>
              </div>
              <p className="text-xs text-[#A7A7A9] leading-relaxed">Senior Research Assistant at Stellenbosch University. Expert in communication, facilitation, and team culture transformation.</p>
              <Link href="/about" className="text-xs text-[#F6C58F] hover:underline mt-2 inline-block">Read full profile →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
