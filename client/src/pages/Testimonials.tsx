import { Link } from "wouter";
import { ArrowRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote: "Neziswa has a rare gift — she creates a safe space where real conversations happen. Our team left with tools we still use months later. The shift in team dynamics was immediate and lasting.",
    author: "Thandi M.",
    role: "HR Manager",
    org: "Western Cape NGO",
    service: "Half-Day Team Building",
    rating: 5,
    outcome: "Reduced staff conflict by 60% in 3 months",
  },
  {
    quote: "The weekend camp was transformational. We came in as a fractured team and left with a shared vision and genuine respect for each other. I've never seen anything like it.",
    author: "David K.",
    role: "Operations Director",
    org: "Corporate Services Firm",
    service: "Weekend Team Building Camp",
    rating: 5,
    outcome: "Team retention improved significantly post-camp",
  },
  {
    quote: "What sets Kumnandi Kum apart is the depth of diagnosis. Neziswa understood our team's dynamics before we even started the session. The AI assessment was surprisingly accurate.",
    author: "Principal Nomsa",
    role: "School Principal",
    org: "Cape Town Primary School",
    service: "Tailored Workshop",
    rating: 5,
    outcome: "Staff absenteeism reduced by 40%",
  },
  {
    quote: "We've done many team building sessions before. This was the first one where we actually talked about the real issues. Neziswa doesn't let you hide behind corporate speak.",
    author: "Sipho L.",
    role: "HR Director",
    org: "Western Cape Municipality",
    service: "Half-Day Team Building",
    rating: 5,
    outcome: "Interdepartmental communication measurably improved",
  },
  {
    quote: "The tailored workshop Neziswa designed for us addressed exactly the issues we'd been struggling with for two years. She got to the root cause, not just the symptoms.",
    author: "Dr. Fatima A.",
    role: "Programme Manager",
    org: "Healthcare NGO",
    service: "Tailored Workshop",
    rating: 5,
    outcome: "Team cohesion scores improved by 45%",
  },
  {
    quote: "Our leadership team had been avoiding the real conversations for months. Neziswa created the space where we could finally have them — and come out stronger.",
    author: "Mark T.",
    role: "CEO",
    org: "Cape Town Tech Startup",
    service: "Weekend Team Building Camp",
    rating: 5,
    outcome: "Leadership alignment achieved within 2 sessions",
  },
];

const caseStories = [
  {
    title: "From Fractured to Focused: A Corporate Team's Journey",
    sector: "Corporate",
    challenge: "A 35-person operations team was experiencing high conflict, low morale, and a 40% turnover rate. The HR manager described the environment as 'toxic and unsustainable.'",
    intervention: "Two-day Weekend Team Building Camp with pre-session AI diagnostic. The assessment revealed deep trust deficits and communication breakdowns at the leadership level.",
    outcomes: ["Turnover reduced by 65% in 6 months", "Team satisfaction scores increased from 3.2 to 7.8/10", "Leadership team committed to monthly check-ins", "New team charter adopted company-wide"],
    quote: "We didn't just do team building. We did team healing.",
    quoteAuthor: "HR Manager",
  },
  {
    title: "Rebuilding Trust After Restructuring: An NGO Story",
    sector: "NGO",
    challenge: "A non-profit had just undergone a major restructuring that left staff feeling unheard, resentful, and disengaged. Programme delivery was suffering.",
    intervention: "Tailored half-day workshop designed specifically around post-restructuring trauma and the unique pressures of NGO work. Included compassion fatigue tools.",
    outcomes: ["Staff engagement scores improved by 55%", "Programme delivery targets met for first time in 18 months", "New peer support system established", "Leadership communication improved significantly"],
    quote: "Neziswa met us where we were — exhausted, hurt, and uncertain. She helped us find our way back to our purpose.",
    quoteAuthor: "Programme Director",
  },
];

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-[#0F0F10] text-white pt-20">
      {/* Header */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(184,115,51,0.08) 0%, transparent 70%)" }} />
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <div className="text-xs text-[#B87333] font-semibold tracking-widest uppercase mb-3">Social Proof</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5" style={{ fontFamily: "'Sora', sans-serif" }}>
            Teams That Have{" "}
            <span className="text-copper-gradient">Transformed</span>
          </h1>
          <p className="text-[#A7A7A9] text-lg leading-relaxed">
            Real stories from real organisations. The outcomes speak for themselves.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="glass-card glass-card-hover rounded-xl p-6 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-[#F6C58F] text-[#F6C58F]" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#B87333]/40" />
                </div>
                <blockquote className="text-sm text-[#A7A7A9] leading-relaxed flex-1 italic mb-5">
                  "{t.quote}"
                </blockquote>
                <div className="border-t border-white/5 pt-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white">{t.author}</div>
                      <div className="text-xs text-[#A7A7A9]">{t.role}, {t.org}</div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs px-2.5 py-1 rounded-full inline-block" style={{ background: "rgba(184,115,51,0.1)", border: "1px solid rgba(184,115,51,0.2)", color: "#F6C58F" }}>
                    {t.service}
                  </div>
                  {t.outcome && (
                    <div className="mt-2 text-xs text-[#10A37F] flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#10A37F]" />
                      {t.outcome}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Stories */}
      <section className="py-20 px-4 bg-[#0a0a0b]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              Case <span className="text-copper-gradient">Stories</span>
            </h2>
            <p className="text-[#A7A7A9] max-w-xl mx-auto">
              Deep dives into real transformation journeys.
            </p>
          </div>
          <div className="space-y-8">
            {caseStories.map((story, i) => (
              <div key={i} className="glass-card rounded-2xl p-8">
                <div className="flex items-start gap-3 mb-5">
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium text-[#F6C58F]" style={{ background: "rgba(184,115,51,0.15)", border: "1px solid rgba(184,115,51,0.3)" }}>
                    {story.sector}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "'Sora', sans-serif" }}>{story.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-xs font-semibold text-[#B87333] uppercase tracking-wide mb-2">The Challenge</div>
                    <p className="text-sm text-[#A7A7A9] leading-relaxed">{story.challenge}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#B87333] uppercase tracking-wide mb-2">The Intervention</div>
                    <p className="text-sm text-[#A7A7A9] leading-relaxed">{story.intervention}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#B87333] uppercase tracking-wide mb-2">The Outcomes</div>
                    <ul className="space-y-1.5">
                      {story.outcomes.map((outcome) => (
                        <li key={outcome} className="text-sm text-[#A7A7A9] flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#10A37F] mt-1.5 shrink-0" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 rounded-lg" style={{ background: "linear-gradient(135deg, rgba(184,115,51,0.08), rgba(138,58,18,0.04))", border: "1px solid rgba(184,115,51,0.15)" }}>
                  <p className="text-sm text-[#A7A7A9] italic">"{story.quote}"</p>
                  <p className="text-xs text-[#F6C58F] mt-2">— {story.quoteAuthor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-5" style={{ fontFamily: "'Sora', sans-serif" }}>
            Your Team's Story{" "}
            <span className="text-copper-gradient">Starts Here</span>
          </h2>
          <p className="text-[#A7A7A9] mb-8">
            Join the organisations that have transformed their team culture with Kumnandi Kum.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/aidt">
              <Button
                size="lg"
                className="text-[#0F0F10] font-semibold px-8"
                style={{ background: "linear-gradient(135deg, #B87333 0%, #F6C58F 50%, #8A3A12 100%)" }}
              >
                Start Free Assessment
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 px-8">
                Book a Discovery Call
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
