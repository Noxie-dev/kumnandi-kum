import { Link } from "wouter";
import { ArrowRight, Clock, Users, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Half-Day Team Building",
    duration: "3–4 Hours",
    capacity: "Up to 40 participants",
    price: "From R5,500",
    description: "A focused, high-energy session designed to rebuild connection, reset team dynamics, and leave participants energised and aligned. Perfect for teams that need a reset without a major time commitment.",
    outcomes: [
      "Improved communication and listening",
      "Renewed team energy and morale",
      "Shared understanding of team values",
      "Practical conflict resolution tools",
    ],
    modules: ["Motivational talks", "Interactive team games", "Group reflection activities", "Commitment setting"],
    href: "/services/half-day",
    tag: "Most Popular",
    tagColor: "#10A37F",
  },
  {
    title: "Weekend Team Building Camps",
    duration: "2 Days",
    capacity: "Custom group sizes",
    price: "R25,000 – R50,000",
    description: "An immersive two-day experience that goes deep into team culture, leadership alignment, and systemic change. Day 1 features five to six structured sessions; Day 2 includes presentations and commitment ceremonies.",
    outcomes: [
      "Deep trust rebuilding across all levels",
      "Leadership and team alignment",
      "Culture reset and new norms",
      "Conflict resolution and healing",
    ],
    modules: ["Day 1: Structured diagnostic sessions", "Day 2: Presentations & commitments", "Leadership coaching", "Team charter creation"],
    href: "/services/weekend-camps",
    tag: "High Impact",
    tagColor: "#B87333",
  },
  {
    title: "Tailored Workshops",
    duration: "Custom",
    capacity: "Flexible",
    price: "Custom Quote",
    description: "Bespoke facilitation designed around your organisation's specific challenges, goals, and team composition. Ideal for organisations with unique needs that don't fit a standard format.",
    outcomes: [
      "Targeted interventions for specific issues",
      "Measurable, agreed-upon outcomes",
      "Flexible format and timing",
      "Ongoing support options",
    ],
    modules: ["Needs assessment", "Custom session design", "Facilitation delivery", "Post-session report"],
    href: "/services/workshops",
    tag: "Bespoke",
    tagColor: "#7A261A",
  },
];

const sectors = [
  { name: "Corporate", icon: "🏢", desc: "SMEs, large corporates, professional services" },
  { name: "NGO / NPO", icon: "🤝", desc: "Non-profits, community organisations, charities" },
  { name: "Education", icon: "🎓", desc: "Schools, universities, training institutions" },
  { name: "Public Sector", icon: "🏛️", desc: "Government departments, municipalities" },
  { name: "Healthcare", icon: "🏥", desc: "Hospitals, clinics, healthcare teams" },
  { name: "Hospitality", icon: "🌟", desc: "Hotels, restaurants, service industries" },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-[#0F0F10] text-white pt-20">
      {/* Header */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(184,115,51,0.08) 0%, transparent 70%)" }} />
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <div className="text-xs text-[#B87333] font-semibold tracking-widest uppercase mb-3">Our Services</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5" style={{ fontFamily: "'Sora', sans-serif" }}>
            Experiences Designed for{" "}
            <span className="text-copper-gradient">Real Change</span>
          </h1>
          <p className="text-[#A7A7A9] text-lg leading-relaxed">
            Three distinct formats, each crafted to address different team needs, timelines, and transformation goals. All grounded in evidence-based facilitation.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-5xl space-y-8">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="glass-card rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-5" style={{ background: `radial-gradient(circle, ${service.tagColor}, transparent)`, transform: "translate(30%, -30%)" }} />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                <div className="lg:col-span-2">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-medium mr-3"
                        style={{ background: `${service.tagColor}20`, border: `1px solid ${service.tagColor}50`, color: service.tagColor }}
                      >
                        {service.tag}
                      </span>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>{service.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-[#A7A7A9] mb-4">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#B87333]" />{service.duration}</span>
                    <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-[#B87333]" />{service.capacity}</span>
                  </div>
                  <p className="text-[#A7A7A9] leading-relaxed mb-5">{service.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.outcomes.map((outcome) => (
                      <div key={outcome} className="flex items-start gap-2 text-sm text-[#A7A7A9]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#B87333] mt-0.5 shrink-0" />
                        {outcome}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="bg-white/3 rounded-xl p-5 border border-white/5 mb-4">
                    <div className="text-xs text-[#A7A7A9] uppercase tracking-wide mb-2">Investment</div>
                    <div className="text-2xl font-bold text-[#F6C58F] mb-1">{service.price}</div>
                    <div className="text-xs text-[#A7A7A9] mb-4">Per session</div>
                    <div className="text-xs text-[#A7A7A9] uppercase tracking-wide mb-2">Includes</div>
                    <ul className="space-y-1.5">
                      {service.modules.map((mod) => (
                        <li key={mod} className="text-xs text-[#A7A7A9] flex items-center gap-1.5">
                          <Star className="w-3 h-3 text-[#B87333]" />{mod}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <Link href={service.href}>
                      <Button
                        className="w-full text-[#0F0F10] font-semibold"
                        style={{ background: "linear-gradient(135deg, #B87333 0%, #F6C58F 50%, #8A3A12 100%)" }}
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button variant="outline" className="w-full border-white/15 text-white hover:bg-white/5">
                        Get a Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sectors */}
      <section className="py-20 px-4 bg-[#0a0a0b]">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              Sectors We <span className="text-copper-gradient">Serve</span>
            </h2>
            <p className="text-[#A7A7A9] max-w-xl mx-auto">
              Our facilitation approach adapts to the unique culture and needs of each sector.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sectors.map((sector) => (
              <div key={sector.name} className="glass-card glass-card-hover rounded-xl p-5 text-center">
                <div className="text-3xl mb-3">{sector.icon}</div>
                <div className="text-sm font-semibold text-white mb-1">{sector.name}</div>
                <div className="text-xs text-[#A7A7A9]">{sector.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-5" style={{ fontFamily: "'Sora', sans-serif" }}>
            Not Sure Which Service Is Right?
          </h2>
          <p className="text-[#A7A7A9] mb-8">
            Take our free Team Pulse Assessment and get a personalised recommendation in under 5 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/aidt">
              <Button
                size="lg"
                className="text-[#0F0F10] font-semibold px-8"
                style={{ background: "linear-gradient(135deg, #B87333 0%, #F6C58F 50%, #8A3A12 100%)" }}
              >
                Take the Free Assessment
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 px-8">
                Talk to Neziswa
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
