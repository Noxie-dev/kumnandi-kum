import { Link } from "wouter";
import { ArrowRight, BookOpen, Users, Award, Heart, Lightbulb, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const credentials = [
  { icon: BookOpen, label: "16+ Years", desc: "Communication & Language expertise" },
  { icon: Award, label: "Stellenbosch University", desc: "Senior Research Assistant since 2017" },
  { icon: Users, label: "Diverse Communities", desc: "Facilitation across all sectors" },
  { icon: Heart, label: "Human-Centred", desc: "Emotionally intelligent approach" },
];

const values = [
  {
    title: "Dignity First",
    desc: "Every session begins with the belief that all participants deserve to be seen, heard, and respected — regardless of role or rank.",
  },
  {
    title: "Evidence-Based Practice",
    desc: "Facilitation grounded in research, not guesswork. Academic rigour meets practical wisdom in every intervention.",
  },
  {
    title: "Outcomes Over Activities",
    desc: "We don't do team building for the sake of it. Every activity, conversation, and exercise is tied to a measurable outcome.",
  },
  {
    title: "Safe to Be Real",
    desc: "Psychological safety is non-negotiable. We create conditions where teams can have the conversations they've been avoiding.",
  },
];

const featuredArticle = {
  title: "Mom donates sanitary towels to clinic where she gave birth",
  description:
    "A Cape Town wellness foundation director celebrates her birthday by donating supplies to new mothers at the same clinic where she once gave birth.",
  href: "https://scrolla.africa/mom-donates-sanitary-towels-to-clinic-where-she-gave-birth/",
  publisher: "Scrolla.Africa",
  publishedAt: "March 12, 2025",
  image: "https://cdn.scrolla.africa/content/media/2025/03/12185608/250312-Donate.jpeg",
};

export default function About() {
  return (
    <div className="min-h-screen bg-[#0F0F10] text-white pt-20">
      {/* Header */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(184,115,51,0.08) 0%, transparent 70%)" }} />
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <div className="text-xs text-[#B87333] font-semibold tracking-widest uppercase mb-3">About the Founder</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5" style={{ fontFamily: "'Sora', sans-serif" }}>
            Meet <span className="text-copper-gradient">Neziswa Ntante</span>
          </h1>
          <p className="text-[#A7A7A9] text-lg leading-relaxed">
            The heart and mind behind Kumnandi Kum. A facilitator, researcher, and culture transformation specialist with a deep commitment to human dignity in the workplace.
          </p>
        </div>
      </section>

      {/* Bio */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[minmax(0,380px)_minmax(0,1fr)_minmax(0,340px)] gap-12 items-start">
            {/* Profile card */}
            <div>
              <div
                className="rounded-2xl p-8 mb-6"
                style={{ background: "linear-gradient(135deg, rgba(184,115,51,0.12) 0%, rgba(138,58,18,0.06) 100%)", border: "1px solid rgba(184,115,51,0.2)" }}
              >
                <div className="flex items-center gap-5 mb-6">
                  <div
                    className="w-24 h-24 rounded-full p-[2px] shrink-0"
                    style={{ background: "linear-gradient(135deg, #B87333, #F6C58F)" }}
                  >
                    <img
                      src="/profile-image.png"
                      alt="Neziswa Ntante portrait"
                      className="w-full h-full rounded-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>Neziswa Ntante</h2>
                    <p className="text-sm text-[#B87333]">Founder & Lead Facilitator</p>
                    <p className="text-xs text-[#A7A7A9] mt-1">Kumnandi Kum</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Specialisation", value: "Communication & Language" },
                    { label: "Academic Role", value: "Senior Research Assistant" },
                    { label: "Institution", value: "Stellenbosch University" },
                    { label: "Since", value: "2017" },
                    { label: "Experience", value: "16+ Years" },
                    { label: "Languages", value: "Multiple South African languages" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <span className="text-xs text-[#A7A7A9]">{item.label}</span>
                      <span className="text-xs font-medium text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Credentials grid */}
              <div className="grid grid-cols-2 gap-3">
                {credentials.map((cred) => (
                  <div key={cred.label} className="glass-card rounded-xl p-4">
                    <cred.icon className="w-5 h-5 text-[#B87333] mb-2" />
                    <div className="text-sm font-semibold text-white">{cred.label}</div>
                    <div className="text-xs text-[#A7A7A9] mt-0.5">{cred.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Story + Approach + Image layout */}
            <div className="lg:col-span-2 xl:col-span-2 grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,340px)] gap-8 xl:gap-10 items-start">
              <div className="xl:col-start-1 xl:row-start-1">
                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>The Story</h3>
                <p className="text-[#A7A7A9] leading-relaxed mb-4">
                  Neziswa Ntante founded Kumnandi Kum out of a deeply personal conviction: that workplaces should be spaces of dignity, not dysfunction. After more than 16 years working at the intersection of communication, language, and human behaviour, she witnessed firsthand how toxic team cultures destroy not just productivity — but people.
                </p>
                <p className="text-[#A7A7A9] leading-relaxed mb-4">
                  Her background as a Senior Research Assistant at Stellenbosch University since 2017 gave her the academic framework to understand team dynamics at a systemic level. Her extensive experience in translation, transcription, data collection, and facilitation across diverse communities gave her the human insight to address those dynamics with empathy and precision.
                </p>
                <p className="text-[#A7A7A9] leading-relaxed">
                  Kumnandi Kum — which means "it is good here" — is her answer to the question: "What would it take to make every workplace a place where people actually want to be?"
                </p>
              </div>

              <div className="xl:col-start-1 xl:row-start-2 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>The Approach</h3>
                  <p className="text-[#A7A7A9] leading-relaxed mb-4">
                    Neziswa's facilitation philosophy is built on a simple but powerful premise: before you can fix a team, you have to understand it. That's why every engagement begins with a thorough diagnostic — often using the AI Team Pulse tool — before a single activity is designed.
                  </p>
                  <p className="text-[#A7A7A9] leading-relaxed">
                    Her sessions are characterised by warmth without softness, challenge without judgment, and depth without drama. Participants consistently describe her as someone who "gets it" — who understands the unspoken dynamics and creates the conditions for real conversations to happen.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Link href="/contact">
                    <Button
                      className="text-[#0F0F10] font-semibold"
                      style={{ background: "linear-gradient(135deg, #B87333 0%, #F6C58F 50%, #8A3A12 100%)" }}
                    >
                      Book a Discovery Call
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/aidt">
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
                      Try Team Pulse AI
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Full image aligned to the Story section on desktop */}
              <div className="xl:col-start-2 xl:row-start-1 xl:self-stretch xl:min-h-0">
                <img
                  src="/full-image.png"
                  alt="Neziswa Ntante seated at a table"
                  className="block w-full h-full object-contain object-top"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 px-4 bg-[#0a0a0b] border-y border-white/5">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <div className="text-xs text-[#B87333] font-semibold tracking-widest uppercase mb-3">Community Impact</div>
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              In the <span className="text-copper-gradient">News</span>
            </h2>
            <p className="text-[#A7A7A9] max-w-2xl mx-auto">
              Neziswa's work beyond facilitation reflects the same commitment to dignity and care that guides every Kumnandi Kum engagement.
            </p>
          </div>

          <article className="glass-card rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
              <div className="relative min-h-[240px]">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/65 via-transparent to-transparent" />
              </div>

              <div className="p-6 md:p-8">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 border border-[#B87333]/25 bg-[#B87333]/10 text-[#F6C58F]">
                  {featuredArticle.publisher} • {featuredArticle.publishedAt}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
                  {featuredArticle.title}
                </h3>
                <p className="text-[#A7A7A9] leading-relaxed mb-6">
                  {featuredArticle.description}
                </p>
                <Button
                  asChild
                  className="text-[#0F0F10] font-semibold"
                  style={{ background: "linear-gradient(135deg, #B87333 0%, #F6C58F 50%, #8A3A12 100%)" }}
                >
                  <a href={featuredArticle.href} target="_blank" rel="noopener noreferrer">
                    Read Full Article
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-[#0a0a0b]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              What <span className="text-copper-gradient">Guides</span> Every Session
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value) => (
              <div key={value.title} className="glass-card glass-card-hover rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#B87333]/20 border border-[#B87333]/30 flex items-center justify-center shrink-0">
                    <Lightbulb className="w-4 h-4 text-[#F6C58F]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">{value.title}</h3>
                    <p className="text-sm text-[#A7A7A9] leading-relaxed">{value.desc}</p>
                  </div>
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
            Work With <span className="text-copper-gradient">Neziswa</span>
          </h2>
          <p className="text-[#A7A7A9] mb-8 max-w-xl mx-auto">
            Every engagement starts with a conversation. Book a free 30-minute discovery call to discuss your team's needs and explore how Kumnandi Kum can help.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="text-[#0F0F10] font-semibold px-10"
              style={{ background: "linear-gradient(135deg, #B87333 0%, #F6C58F 50%, #8A3A12 100%)" }}
            >
              Book a Free Discovery Call
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
