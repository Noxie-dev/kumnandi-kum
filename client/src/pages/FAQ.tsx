import { useState } from "react";
import { Link } from "wouter";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqCategories = [
  {
    category: "About the Service",
    faqs: [
      {
        q: "What makes Kumnandi Kum different from other team building companies?",
        a: "Most team building providers focus on activities and entertainment. Kumnandi Kum focuses on diagnosis and outcomes. We begin every engagement with a thorough assessment of your team's specific dynamics, and every activity is tied to a measurable outcome. Our AI Team Pulse Diagnostic tool helps us understand your team's challenges before we design a single session.",
      },
      {
        q: "Is this just 'fun activities' or is there real substance?",
        a: "There's real substance. While sessions are engaging and often enjoyable, they're designed to address specific team challenges — conflict, trust deficits, communication breakdowns, toxic dynamics. Participants leave with practical tools, shared agreements, and a team charter they can actually use.",
      },
      {
        q: "How long does a typical engagement last?",
        a: "It depends on your needs. Half-day sessions run 3–4 hours. Weekend camps are two full days. Tailored workshops are designed around your timeline. Most clients see meaningful change within the first session, with lasting transformation requiring 2–3 touchpoints over 6 months.",
      },
      {
        q: "Do you work virtually or only in-person?",
        a: "Our most impactful work is done in-person, as the physical presence creates conditions for deeper connection. However, we do offer virtual facilitation for teams that are geographically distributed. Contact us to discuss what would work best for your team.",
      },
    ],
  },
  {
    category: "Process & Preparation",
    faqs: [
      {
        q: "What happens before the session?",
        a: "Every engagement begins with a pre-session consultation — typically a 30-minute call with the HR manager or team leader. We use this to understand your team's context, challenges, and goals. We also recommend completing the AI Team Pulse Diagnostic beforehand, which gives us a detailed picture of your team's health across 10 dimensions.",
      },
      {
        q: "How do I prepare my team for the session?",
        a: "Minimal preparation is needed from participants. We recommend communicating the purpose of the session clearly — emphasising that it's a safe space, not a performance review. We provide a brief pre-session guide for team leaders on how to set expectations.",
      },
      {
        q: "What if some team members are resistant or sceptical?",
        a: "Scepticism is normal and actually healthy. Neziswa is experienced in working with resistant participants and has specific techniques for creating safety and buy-in even with the most sceptical team members. The key is not to force participation — the session design naturally draws people in.",
      },
      {
        q: "Do you need to know about our team's issues in advance?",
        a: "A general understanding is helpful, but we don't need (or want) detailed gossip or complaints about individuals. The AI diagnostic gives us a structured picture of team dynamics without requiring you to share sensitive information. What matters most is your goals and desired outcomes.",
      },
    ],
  },
  {
    category: "Outcomes & Impact",
    faqs: [
      {
        q: "How do you measure the impact of the sessions?",
        a: "We use a combination of pre and post-session assessments, participant feedback, and agreed-upon outcome metrics. For longer engagements, we track indicators like team satisfaction scores, conflict incidents, and productivity metrics. Every session includes a post-session summary with observations and recommendations.",
      },
      {
        q: "How long do the results last?",
        a: "This depends on the depth of the intervention and what happens after the session. A single half-day session creates momentum, but lasting change requires follow-through. We recommend a 90-day check-in after any session, and we offer follow-up support packages for teams that want sustained transformation.",
      },
      {
        q: "What if the session doesn't achieve the desired outcomes?",
        a: "We have a thorough pre-session consultation process specifically to ensure alignment on outcomes before we begin. If a session doesn't meet agreed objectives, we will work with you to understand why and provide a follow-up session at no additional cost.",
      },
    ],
  },
  {
    category: "Logistics & Pricing",
    faqs: [
      {
        q: "Where do sessions take place?",
        a: "Sessions can take place at your offices, an off-site venue of your choice, or a venue we recommend. For weekend camps, we work with a network of retreat facilities in the Western Cape. Venue costs are separate from facilitation fees.",
      },
      {
        q: "How far in advance should I book?",
        a: "We recommend booking at least 3–4 weeks in advance to allow time for pre-session consultation and preparation. For weekend camps, 6–8 weeks is ideal. We do accommodate urgent requests when our calendar allows.",
      },
      {
        q: "Do you offer payment plans?",
        a: "Yes. We understand that budget cycles don't always align with team needs. We offer flexible payment arrangements, particularly for NGOs and public sector organisations. A 50% deposit is typically required to confirm a booking.",
      },
      {
        q: "Are there discounts for repeat bookings?",
        a: "Yes. Clients who book multiple sessions or sign up for ongoing support packages receive preferential pricing. We value long-term relationships and reward loyalty.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/5 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-white/2 transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-white">{q}</span>
        <ChevronDown className={`w-4 h-4 text-[#A7A7A9] shrink-0 mt-0.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-sm text-[#A7A7A9] leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="min-h-screen bg-[#0F0F10] text-white pt-20">
      {/* Header */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(184,115,51,0.08) 0%, transparent 70%)" }} />
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <div className="text-xs text-[#B87333] font-semibold tracking-widest uppercase mb-3">FAQ</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5" style={{ fontFamily: "'Sora', sans-serif" }}>
            Frequently Asked{" "}
            <span className="text-copper-gradient">Questions</span>
          </h1>
          <p className="text-[#A7A7A9] text-lg leading-relaxed">
            Everything you need to know about working with Kumnandi Kum. Can't find your answer? Book a free discovery call.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-10 px-4 pb-20">
        <div className="container mx-auto max-w-3xl space-y-12">
          {faqCategories.map((cat) => (
            <div key={cat.category}>
              <h2 className="text-lg font-bold text-[#F6C58F] mb-5" style={{ fontFamily: "'Sora', sans-serif" }}>{cat.category}</h2>
              <div className="space-y-3">
                {cat.faqs.map((faq) => (
                  <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-[#0a0a0b]">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
            Still Have Questions?
          </h2>
          <p className="text-[#A7A7A9] mb-8">
            Book a free 30-minute discovery call with Neziswa. No obligation, no sales pitch — just an honest conversation about your team's needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="text-[#0F0F10] font-semibold px-8"
                style={{ background: "linear-gradient(135deg, #B87333 0%, #F6C58F 50%, #8A3A12 100%)" }}
              >
                Book a Discovery Call
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/aidt">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 px-8">
                Try the Team Assessment
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
