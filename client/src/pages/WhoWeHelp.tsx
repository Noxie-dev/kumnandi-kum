import { Link } from "wouter";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const sectors = [
  {
    id: "corporate",
    emoji: "🏢",
    title: "Corporate & SME",
    subtitle: "Building high-performance cultures in competitive environments",
    description: "From startups to established corporates, we help organisations align their teams around shared purpose, improve cross-functional communication, and address the toxic dynamics that silently drain productivity and talent.",
    challenges: ["High staff turnover", "Siloed departments", "Leadership-team disconnect", "Post-merger culture clashes", "Remote team disengagement"],
    outcomes: ["Reduced attrition", "Improved cross-team collaboration", "Stronger leadership trust", "Aligned organisational culture"],
    quote: "Our leadership team had been avoiding the real conversations for months. Neziswa created the space where we could finally have them.",
    quoteAuthor: "CEO, Cape Town Tech Company",
  },
  {
    id: "ngo",
    emoji: "🤝",
    title: "NGO & Non-Profit",
    subtitle: "Sustaining mission-driven teams through compassion fatigue and resource pressure",
    description: "NGO teams carry a unique burden — they're driven by purpose but often stretched beyond capacity. We specialise in helping non-profit teams address compassion fatigue, internal conflict, and the burnout that threatens both people and mission.",
    challenges: ["Compassion fatigue", "Resource-driven conflict", "Volunteer-staff tensions", "Mission drift", "Leadership burnout"],
    outcomes: ["Renewed sense of purpose", "Healthier team dynamics", "Sustainable work practices", "Stronger community impact"],
    quote: "Neziswa understood our context immediately. She didn't treat us like a corporate — she met us where we were.",
    quoteAuthor: "Programme Manager, Western Cape NGO",
  },
  {
    id: "education",
    emoji: "🎓",
    title: "Schools & Education",
    subtitle: "Creating staff cultures that model the values we teach learners",
    description: "Schools are complex social ecosystems. Staff room dynamics, leadership pressure, and community expectations create unique tensions. We help educational teams build the psychological safety and collaborative culture that ultimately benefits learners.",
    challenges: ["Staff room conflict", "Principal-teacher tensions", "Curriculum pressure stress", "Parent community dynamics", "Departmental silos"],
    outcomes: ["Improved staff wellbeing", "Better learner outcomes", "Stronger school culture", "Reduced staff absenteeism"],
    quote: "The change in our staff room after the workshop was immediate. People were actually talking to each other again.",
    quoteAuthor: "Principal, Cape Town Primary School",
  },
  {
    id: "public",
    emoji: "🏛️",
    title: "Public Sector",
    subtitle: "Transforming service delivery through team alignment and accountability",
    description: "Public sector teams operate under unique pressures — political accountability, resource constraints, and the weight of serving communities. We help government departments and municipalities build the internal cohesion needed to deliver on their mandates.",
    challenges: ["Bureaucratic disengagement", "Accountability avoidance", "Interdepartmental conflict", "Change resistance", "Public service burnout"],
    outcomes: ["Improved service delivery", "Greater accountability", "Stronger interdepartmental relationships", "Renewed public service motivation"],
    quote: "We've done many team building sessions before. This was the first one where we actually talked about the real issues.",
    quoteAuthor: "HR Director, Western Cape Municipality",
  },
];

export default function WhoWeHelp() {
  return (
    <div className="min-h-screen bg-[#0F0F10] text-white pt-20">
      {/* Header */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(184,115,51,0.08) 0%, transparent 70%)" }} />
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <div className="text-xs text-[#B87333] font-semibold tracking-widest uppercase mb-3">Who We Help</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5" style={{ fontFamily: "'Sora', sans-serif" }}>
            Built for Teams Across{" "}
            <span className="text-copper-gradient">Every Sector</span>
          </h1>
          <p className="text-[#A7A7A9] text-lg leading-relaxed">
            Team dysfunction doesn't discriminate by industry. Our facilitation approach adapts to the unique culture, language, and challenges of each sector we serve.
          </p>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-5xl space-y-12">
          {sectors.map((sector, i) => (
            <div key={sector.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-start ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="text-4xl mb-4">{sector.emoji}</div>
                <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>{sector.title}</h2>
                <p className="text-[#B87333] text-sm mb-4">{sector.subtitle}</p>
                <p className="text-[#A7A7A9] leading-relaxed mb-6">{sector.description}</p>

                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wide mb-3">Common Challenges We Address</h4>
                  <div className="flex flex-wrap gap-2">
                    {sector.challenges.map((c) => (
                      <span key={c} className="text-xs px-3 py-1.5 rounded-full text-[#A7A7A9]" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <Link href="/aidt">
                  <Button
                    size="sm"
                    className="text-[#0F0F10] font-semibold"
                    style={{ background: "linear-gradient(135deg, #B87333 0%, #F6C58F 50%, #8A3A12 100%)" }}
                  >
                    Assess Your Team
                    <ArrowRight className="w-3.5 h-3.5 ml-2" />
                  </Button>
                </Link>
              </div>

              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div className="glass-card rounded-xl p-6 mb-4">
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wide mb-4">Outcomes We Deliver</h4>
                  <ul className="space-y-3">
                    {sector.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-[#B87333] mt-0.5 shrink-0" />
                        <span className="text-sm text-[#A7A7A9]">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="rounded-xl p-5"
                  style={{ background: "linear-gradient(135deg, rgba(184,115,51,0.1), rgba(138,58,18,0.05))", border: "1px solid rgba(184,115,51,0.2)" }}
                >
                  <p className="text-sm text-[#A7A7A9] italic mb-3">"{sector.quote}"</p>
                  <p className="text-xs text-[#F6C58F] font-medium">— {sector.quoteAuthor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-[#0a0a0b]">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-5" style={{ fontFamily: "'Sora', sans-serif" }}>
            Don't See Your Sector?
          </h2>
          <p className="text-[#A7A7A9] mb-8">
            We work with healthcare, hospitality, and many other industries. Every team is unique — let's talk about yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="text-[#0F0F10] font-semibold px-8"
                style={{ background: "linear-gradient(135deg, #B87333 0%, #F6C58F 50%, #8A3A12 100%)" }}
              >
                Get in Touch
              </Button>
            </Link>
            <Link href="/aidt">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 px-8">
                Free Team Assessment
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
