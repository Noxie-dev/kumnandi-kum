import { Link } from "wouter";
import { ArrowRight, CheckCircle, X, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const packages = [
  {
    name: "Half-Day",
    duration: "3–4 Hours",
    price: "R5,500",
    priceNote: "Up to 25 pax",
    priceAlt: "R10,000",
    priceAltNote: "Up to 40 pax",
    description: "A focused, high-energy reset for teams that need alignment without a major time commitment.",
    features: [
      { label: "Pre-session consultation", included: true },
      { label: "Motivational facilitation", included: true },
      { label: "Interactive team activities", included: true },
      { label: "Group reflection session", included: true },
      { label: "Team commitment charter", included: true },
      { label: "Post-session summary", included: true },
      { label: "2-day immersive experience", included: false },
      { label: "Leadership coaching", included: false },
      { label: "Comprehensive post-report", included: false },
    ],
    cta: "Book Half-Day",
    href: "/contact",
    highlight: false,
    tag: "Most Popular",
  },
  {
    name: "Weekend Camp",
    duration: "2 Days",
    price: "R25,000",
    priceNote: "Standard package",
    priceAlt: "R50,000",
    priceAltNote: "Premium package",
    description: "An immersive two-day transformation experience for teams ready to do the deep work.",
    features: [
      { label: "Pre-session consultation", included: true },
      { label: "Motivational facilitation", included: true },
      { label: "Interactive team activities", included: true },
      { label: "Group reflection session", included: true },
      { label: "Team commitment charter", included: true },
      { label: "Post-session summary", included: true },
      { label: "2-day immersive experience", included: true },
      { label: "Leadership coaching", included: true },
      { label: "Comprehensive post-report", included: true },
    ],
    cta: "Book Weekend Camp",
    href: "/contact",
    highlight: true,
    tag: "High Impact",
  },
  {
    name: "Tailored Workshop",
    duration: "Custom",
    price: "Custom",
    priceNote: "Based on scope",
    priceAlt: null,
    priceAltNote: null,
    description: "Bespoke facilitation designed around your organisation's unique challenges and goals.",
    features: [
      { label: "Pre-session consultation", included: true },
      { label: "Motivational facilitation", included: true },
      { label: "Interactive team activities", included: true },
      { label: "Group reflection session", included: true },
      { label: "Team commitment charter", included: true },
      { label: "Post-session summary", included: true },
      { label: "2-day immersive experience", included: "optional" },
      { label: "Leadership coaching", included: "optional" },
      { label: "Comprehensive post-report", included: true },
    ],
    cta: "Get a Quote",
    href: "/contact",
    highlight: false,
    tag: "Bespoke",
  },
];

const faqs = [
  {
    q: "What's included in the price?",
    a: "All packages include a pre-session consultation, facilitation materials, on-site facilitation by Neziswa, and a post-session summary. Weekend camps include a comprehensive written report.",
  },
  {
    q: "Are travel costs included?",
    a: "Pricing is based on sessions in the Western Cape. Travel to other provinces is quoted separately and depends on location and logistics.",
  },
  {
    q: "Can I split the cost across budget cycles?",
    a: "Yes. We offer flexible payment arrangements for NGOs and public sector organisations. Contact us to discuss options.",
  },
  {
    q: "Do you offer discounts for non-profits?",
    a: "We have a special pricing structure for registered NGOs and NPOs. Please mention your organisation type when you get in touch.",
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-[#0F0F10] text-white pt-20">
      {/* Header */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(184,115,51,0.08) 0%, transparent 70%)" }} />
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <div className="text-xs text-[#B87333] font-semibold tracking-widest uppercase mb-3">Transparent Pricing</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5" style={{ fontFamily: "'Sora', sans-serif" }}>
            Investment in Your{" "}
            <span className="text-copper-gradient">Team's Future</span>
          </h1>
          <p className="text-[#A7A7A9] text-lg leading-relaxed">
            Clear, honest pricing with no hidden costs. Every package is designed to deliver measurable value that far exceeds the investment.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-2xl p-6 flex flex-col relative overflow-hidden transition-all ${
                  pkg.highlight
                    ? "border border-[#B87333]/50 copper-glow"
                    : "glass-card"
                }`}
                style={pkg.highlight ? { background: "linear-gradient(135deg, rgba(184,115,51,0.12) 0%, rgba(138,58,18,0.06) 100%)" } : {}}
              >
                {pkg.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-copper-gradient-h" />
                )}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-[#F6C58F] px-2.5 py-1 rounded-full" style={{ background: "rgba(184,115,51,0.15)", border: "1px solid rgba(184,115,51,0.3)" }}>
                      {pkg.tag}
                    </span>
                    <span className="text-xs text-[#A7A7A9]">{pkg.duration}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>{pkg.name}</h3>
                  <p className="text-sm text-[#A7A7A9] mb-4">{pkg.description}</p>
                  <div className="py-4 border-y border-white/5">
                    <div className="text-3xl font-bold text-[#F6C58F]">{pkg.price}</div>
                    <div className="text-xs text-[#A7A7A9] mt-0.5">{pkg.priceNote}</div>
                    {pkg.priceAlt && (
                      <div className="mt-2 text-sm text-[#A7A7A9]">
                        <span className="text-white font-medium">{pkg.priceAlt}</span> {pkg.priceAltNote}
                      </div>
                    )}
                  </div>
                </div>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {pkg.features.map((feature) => (
                    <li key={feature.label} className="flex items-center gap-2.5 text-sm">
                      {feature.included === true ? (
                        <CheckCircle className="w-4 h-4 text-[#10A37F] shrink-0" />
                      ) : feature.included === "optional" ? (
                        <HelpCircle className="w-4 h-4 text-[#F59E0B] shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-[#A7A7A9]/40 shrink-0" />
                      )}
                      <span className={feature.included ? "text-[#A7A7A9]" : "text-[#A7A7A9]/40"}>
                        {feature.label}
                        {feature.included === "optional" && <span className="text-[#F59E0B] text-xs ml-1">(optional)</span>}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href={pkg.href}>
                  <Button
                    className={`w-full font-semibold ${pkg.highlight ? "text-[#0F0F10]" : "border-white/20 text-white hover:bg-white/5"}`}
                    variant={pkg.highlight ? "default" : "outline"}
                    style={pkg.highlight ? { background: "linear-gradient(135deg, #B87333 0%, #F6C58F 50%, #8A3A12 100%)" } : {}}
                  >
                    {pkg.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-[#A7A7A9]">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#10A37F]" /> Included</span>
            <span className="flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5 text-[#F59E0B]" /> Optional add-on</span>
            <span className="flex items-center gap-1.5"><X className="w-3.5 h-3.5 text-[#A7A7A9]/40" /> Not included</span>
          </div>
        </div>
      </section>

      {/* Budget Guidance */}
      <section className="py-16 px-4 bg-[#0a0a0b]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
              Budget <span className="text-copper-gradient">Guidance</span>
            </h2>
            <p className="text-[#A7A7A9]">Understanding the real ROI of team building investment</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                range: "R0 – R15,000",
                label: "Starter Budget",
                desc: "Half-day sessions are ideal. Perfect for smaller teams or organisations doing their first structured team building.",
                color: "#10A37F",
              },
              {
                range: "R15,000 – R35,000",
                label: "Growth Budget",
                desc: "Opens up weekend camp options for smaller groups. Significant transformation possible with this investment.",
                color: "#F59E0B",
              },
              {
                range: "R35,000+",
                label: "Transformation Budget",
                desc: "Full weekend camps for larger groups or premium tailored programmes. Maximum impact and lasting culture change.",
                color: "#B87333",
              },
            ].map((tier) => (
              <div key={tier.range} className="glass-card rounded-xl p-5">
                <div className="text-lg font-bold mb-1" style={{ color: tier.color }}>{tier.range}</div>
                <div className="text-sm font-semibold text-white mb-2">{tier.label}</div>
                <p className="text-sm text-[#A7A7A9] leading-relaxed">{tier.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-8" style={{ fontFamily: "'Sora', sans-serif" }}>
            Pricing <span className="text-copper-gradient">FAQs</span>
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="glass-card rounded-xl p-5">
                <h3 className="text-sm font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-[#A7A7A9] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-[#0a0a0b]">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
            Not Sure What Fits Your Budget?
          </h2>
          <p className="text-[#A7A7A9] mb-8">
            Use our free Team Pulse Assessment to get a personalised recommendation, or book a discovery call to discuss your options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/aidt">
              <Button
                size="lg"
                className="text-[#0F0F10] font-semibold px-8"
                style={{ background: "linear-gradient(135deg, #B87333 0%, #F6C58F 50%, #8A3A12 100%)" }}
              >
                Free Team Assessment
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 px-8">
                Discuss Your Budget
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
