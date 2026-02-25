import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Zap, Users, Award, TrendingUp, Star, CheckCircle, Calendar, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Particle Canvas ──────────────────────────────────────────────────────────
function ParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const clamp = (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value));

    const resize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(canvas.offsetWidth * dpr);
      canvas.height = Math.floor(canvas.offsetHeight * dpr);
      // Reset transform on resize so scaling does not accumulate.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    const count = 80;
    type Particle = {
      x: number; y: number; vx: number; vy: number;
      r: number; alpha: number; color: string; phase: number;
    };

    const colors = ["#B87333", "#F6C58F", "#8A3A12", "#D4956A", "#ffffff"];
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2.5 + 0.5,
      alpha: Math.random() * 0.55 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      phase: Math.random() * Math.PI * 2,
    }));

    const mouse = {
      x: W() / 2,
      y: H() / 2,
      prevX: W() / 2,
      prevY: H() / 2,
      intensity: 0,
      inside: false,
      lastMoveAt: 0,
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!inside) {
        mouse.inside = false;
        return;
      }

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const speed = Math.hypot(x - mouse.prevX, y - mouse.prevY);

      mouse.prevX = x;
      mouse.prevY = y;
      mouse.x = x;
      mouse.y = y;
      mouse.inside = true;
      mouse.lastMoveAt = performance.now();
      mouse.intensity = clamp(0.18 + speed / 26, 0.18, 1);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    let t = 0;

    const drawGrid = () => {
      const width = W();
      const height = H();
      const targetHorizontalDivisions = width < 640 ? 10 : 12;
      const startX = 0;
      const startY = 0;
      const endX = width;
      const endY = height;
      // Use a shared cell size so cells remain square-like; allow more vertical
      // lines than horizontal on wide screens.
      const cellSize = height / targetHorizontalDivisions;

      const getLinePositions = (length: number) => {
        const positions = [0];
        for (let pos = cellSize; pos < length; pos += cellSize) {
          positions.push(pos);
        }
        if (positions[positions.length - 1] !== length) {
          positions.push(length);
        }
        return positions;
      };

      const xLines = getLinePositions(width);
      const yLines = getLinePositions(height);

      const baseGridGrad = ctx.createLinearGradient(startX, startY, endX, endY);
      baseGridGrad.addColorStop(0, "rgba(184,115,51,0.09)");
      baseGridGrad.addColorStop(0.5, "rgba(246,197,143,0.13)");
      baseGridGrad.addColorStop(1, "rgba(138,58,18,0.09)");

      const shimmerRadius = cellSize * 2.4;
      const shimmerX = clamp(mouse.x, startX, endX);
      const shimmerY = clamp(mouse.y, startY, endY);
      const shimmerStrength = mouse.inside ? mouse.intensity : mouse.intensity * 0.55;

      // Soft ambient glow that follows the cursor and sits behind the line shimmer.
      if (shimmerStrength > 0.02) {
        const glow = ctx.createRadialGradient(
          shimmerX,
          shimmerY,
          0,
          shimmerX,
          shimmerY,
          Math.max(width, height) * 0.35
        );
        glow.addColorStop(0, `rgba(246,197,143,${0.05 * shimmerStrength})`);
        glow.addColorStop(0.45, `rgba(184,115,51,${0.025 * shimmerStrength})`);
        glow.addColorStop(1, "rgba(184,115,51,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(startX, startY, width, height);
      }

      const drawLine = (
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        proximity: number
      ) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = baseGridGrad;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.42;
        ctx.stroke();

        if (proximity <= 0) return;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "#F6C58F";
        ctx.lineWidth = 1.15 + proximity * 0.35;
        ctx.globalAlpha = 0.06 + proximity * 0.24;
        ctx.shadowColor = "rgba(246,197,143,0.55)";
        ctx.shadowBlur = 6 + proximity * 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
      };

      for (const x of xLines) {
        const distToMouse = Math.abs(x - shimmerX);
        const proximity =
          shimmerStrength *
          Math.max(0, 1 - distToMouse / shimmerRadius) *
          (mouse.intensity > 0.22 ? 1 : 0.8);
        drawLine(x, startY, x, endY, proximity);
      }

      for (const y of yLines) {
        const distToMouse = Math.abs(y - shimmerY);
        const proximity =
          shimmerStrength *
          Math.max(0, 1 - distToMouse / shimmerRadius) *
          (mouse.intensity > 0.22 ? 1 : 0.8);
        drawLine(startX, y, endX, y, proximity);
      }

      // Subtle outer frame using the same gold language as the header border line.
      ctx.strokeStyle = "rgba(246,197,143,0.08)";
      ctx.lineWidth = 1;
      ctx.globalAlpha = 1;
      ctx.strokeRect(0.5, 0.5, Math.max(0, width - 1), Math.max(0, height - 1));

      ctx.globalAlpha = 1;
    };

    const draw = () => {
      ctx.clearRect(0, 0, W(), H());
      t += 0.005;

      if (mouse.lastMoveAt && performance.now() - mouse.lastMoveAt > 80) {
        mouse.intensity *= 0.93;
      } else {
        mouse.intensity *= 0.975;
      }
      mouse.intensity = Math.max(0, mouse.intensity);

      drawGrid();

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W();
        if (p.x > W()) p.x = 0;
        if (p.y < 0) p.y = H();
        if (p.y > H()) p.y = 0;

        // Draw connections
        particles.slice(i + 1).forEach((q) => {
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(184,115,51,${(1 - dist / 120) * 0.22})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        });

        // Draw particle
        const pulse = Math.sin(t * 2 + p.phase) * 0.3 + 0.7;
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        glow.addColorStop(
          0,
          p.color +
            Math.round(clamp(p.alpha * pulse * 0.7, 0, 1) * 255)
              .toString(16)
              .padStart(2, "0")
        );
        glow.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color +
          Math.round(clamp(p.alpha * pulse, 0, 1) * 255)
            .toString(16)
            .padStart(2, "0");
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.92 }}
    />
  );
}

// ─── Trust Signals ────────────────────────────────────────────────────────────
const trustSignals = [
  { icon: Users, label: "500+ Professionals Served", sub: "Across SA and beyond" },
  { icon: Award, label: "10+ Years Experience", sub: "Neziswa Ntante, Founder" },
  { icon: TrendingUp, label: "94% Report Improvement", sub: "Post-session surveys" },
  { icon: Shield, label: "Sector-Specific Expertise", sub: "NGO, Corporate, Education" },
];

// ─── Services ─────────────────────────────────────────────────────────────────
const services = [
  {
    icon: "⚡",
    title: "Half-Day Team Building",
    duration: "3–4 Hours",
    price: "From R5,500",
    desc: "High-impact, focused sessions that reset team dynamics, rebuild trust, and reignite motivation — all in a single morning or afternoon.",
    outcomes: ["Improved communication", "Renewed morale", "Shared team values"],
    href: "/services/half-day",
    highlight: false,
  },
  {
    icon: "🏕️",
    title: "Weekend Team Building Camp",
    duration: "2 Days",
    price: "R25,000 – R50,000",
    desc: "Immersive two-day experiences that go deep — addressing root causes of dysfunction and creating lasting cultural transformation.",
    outcomes: ["Deep trust rebuilding", "Culture reset", "Leadership alignment"],
    href: "/services/weekend-camps",
    highlight: true,
  },
  {
    icon: "🎯",
    title: "Tailored Workshops",
    duration: "Custom",
    price: "Custom Quote",
    desc: "Bespoke facilitated workshops designed around your team's specific challenges — from conflict resolution to change management.",
    outcomes: ["Targeted interventions", "Measurable outcomes", "Ongoing support"],
    href: "/services/workshops",
    highlight: false,
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    quote: "Neziswa has a rare gift — she creates a safe space where real conversations happen. Our team came out of the weekend camp completely transformed. The gossip stopped, the silos broke down, and we actually started working as one unit.",
    name: "Thandi M.",
    role: "HR Director",
    org: "National NGO",
    rating: 5,
  },
  {
    quote: "We were sceptical about team building — we'd done the rope courses and trust falls before. This was completely different. Neziswa got to the heart of what was actually going wrong. Three months later, our team is unrecognisable.",
    name: "David K.",
    role: "CEO",
    org: "SME, Cape Town",
    rating: 5,
  },
  {
    quote: "The half-day session was exactly what we needed. Practical, honest, and deeply impactful. Our staff morale scores went up by 40% in the next quarterly survey.",
    name: "Nomsa P.",
    role: "Principal",
    org: "Secondary School, Gauteng",
    rating: 5,
  },
];

// ─── Process Steps ────────────────────────────────────────────────────────────
const processSteps = [
  { num: "01", title: "Take the Free Assessment", desc: "Complete the 5-minute AI Team Pulse Diagnostic to get a personalised health score and recommendation." },
  { num: "02", title: "Discovery Call", desc: "Book a free 30-minute call with Neziswa to discuss your results and explore the right intervention." },
  { num: "03", title: "Custom Programme Design", desc: "We design a session tailored to your team's specific context, challenges, and goals." },
  { num: "04", title: "Transformative Experience", desc: "Your team experiences a carefully facilitated session that creates real, lasting change." },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#0F0F10] text-white">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <ParticleHero />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F10]/40 via-transparent to-[#0F0F10]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #B87333, transparent)" }} />

        <div className="container mx-auto px-4 md:px-6 relative z-10 pt-24 pb-16">
          <div
            className="max-w-4xl mx-auto text-center transition-all duration-1000"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(30px)" }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B87333]/30 bg-[#B87333]/10 text-[#F6C58F] text-xs font-medium mb-6">
              <Zap className="w-3 h-3" />
              South Africa's Premier Team Alignment Consultancy
            </div>

            {/* Headline */}
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              From{" "}
              <span className="relative">
                <span style={{ background: "linear-gradient(135deg, #B87333, #F6C58F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Fragmented
                </span>
              </span>{" "}
              to{" "}
              <span style={{ background: "linear-gradient(135deg, #F6C58F, #B87333)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Aligned
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#A7A7A9] mb-8 max-w-2xl mx-auto leading-relaxed">
              Kumnandi Kum transforms dysfunctional teams into high-performing, psychologically safe workplaces through experiential learning and evidence-based facilitation.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/aidt">
                <Button
                  size="lg"
                  className="text-[#0F0F10] font-semibold text-base px-8"
                  style={{ background: "linear-gradient(135deg, #B87333 0%, #F6C58F 50%, #8A3A12 100%)" }}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Take the Free Team Assessment
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 text-base px-8">
                  Book a Discovery Call
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Social proof strip */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#A7A7A9]">
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-[#F6C58F] text-[#F6C58F]" />)}
                </div>
                <span>5.0 rating</span>
              </div>
              <span className="text-white/20">·</span>
              <span>500+ professionals served</span>
              <span className="text-white/20">·</span>
              <span>10+ years experience</span>
              <span className="text-white/20">·</span>
              <span>Free assessment · No commitment</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
          <div className="w-px h-8 bg-white/30" />
          <div className="w-1 h-1 rounded-full bg-white/50" />
        </div>
      </section>

      {/* ── Trust Signals ── */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustSignals.map((signal) => (
              <div key={signal.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(184,115,51,0.1)", border: "1px solid rgba(184,115,51,0.2)" }}>
                  <signal.icon className="w-5 h-5 text-[#B87333]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{signal.label}</div>
                  <div className="text-xs text-[#A7A7A9]">{signal.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AIDT CTA Banner ── */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div
            className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(184,115,51,0.12) 0%, rgba(138,58,18,0.06) 100%)", border: "1px solid rgba(184,115,51,0.25)" }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, #F6C58F, transparent)", transform: "translate(30%, -30%)" }} />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-[#F6C58F]" />
                  <span className="text-xs font-semibold text-[#F6C58F] uppercase tracking-wide">AI Team Pulse Diagnostic</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
                  How healthy is your team, really?
                </h2>
                <p className="text-[#A7A7A9] text-sm md:text-base">
                  Take our free 5-minute assessment and get a personalised Team Pulse Score, risk level, and session recommendation — instantly.
                </p>
              </div>
              <div className="flex flex-col items-center gap-3 shrink-0">
                <Link href="/aidt">
                  <Button
                    size="lg"
                    className="text-[#0F0F10] font-semibold whitespace-nowrap"
                    style={{ background: "linear-gradient(135deg, #B87333 0%, #F6C58F 50%, #8A3A12 100%)" }}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Start Free Assessment
                  </Button>
                </Link>
                <span className="text-xs text-[#A7A7A9]">No sign-up · Results in seconds</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/3 text-[#A7A7A9] text-xs font-medium mb-4">
              Our Services
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              Interventions That Actually Work
            </h2>
            <p className="text-[#A7A7A9] max-w-xl mx-auto">
              Every programme is rooted in evidence-based facilitation, African ubuntu philosophy, and deep respect for your team's unique context.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                style={{
                  background: service.highlight
                    ? "linear-gradient(135deg, rgba(184,115,51,0.12) 0%, rgba(138,58,18,0.06) 100%)"
                    : "rgba(255,255,255,0.02)",
                  border: service.highlight ? "1px solid rgba(184,115,51,0.3)" : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {service.highlight && (
                  <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-xs font-semibold text-[#0F0F10]"
                    style={{ background: "linear-gradient(135deg, #B87333, #F6C58F)" }}>
                    Most Popular
                  </div>
                )}
                <div className="text-3xl mb-4">{service.icon}</div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-[#A7A7A9] border border-white/10 px-2 py-0.5 rounded-full">{service.duration}</span>
                  <span className="text-xs font-semibold text-[#F6C58F]">{service.price}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>{service.title}</h3>
                <p className="text-sm text-[#A7A7A9] mb-4 flex-1">{service.desc}</p>
                <ul className="space-y-1.5 mb-5">
                  {service.outcomes.map((o) => (
                    <li key={o} className="flex items-center gap-2 text-xs text-[#A7A7A9]">
                      <CheckCircle className="w-3.5 h-3.5 text-[#10A37F] shrink-0" />
                      {o}
                    </li>
                  ))}
                </ul>
                <Link href={service.href}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-white/15 text-white hover:bg-white/5"
                  >
                    Learn More
                    <ArrowRight className="w-3.5 h-3.5 ml-2" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/services">
              <Button variant="outline" className="border-white/15 text-white hover:bg-white/5">
                View All Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-16 bg-white/[0.01] border-y border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              How It Works
            </h2>
            <p className="text-[#A7A7A9] max-w-lg mx-auto">From first contact to lasting transformation — a clear, supported journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#B87333]/30 to-transparent" />

            {processSteps.map((step, i) => (
              <div key={step.num} className="relative text-center">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4 relative z-10"
                  style={{
                    background: i === 0 ? "linear-gradient(135deg, #B87333, #F6C58F)" : "rgba(255,255,255,0.04)",
                    border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.08)",
                    color: i === 0 ? "#0F0F10" : "#B87333",
                    fontFamily: "'Sora', sans-serif",
                  }}
                >
                  {step.num}
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-[#A7A7A9] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              Real Teams. Real Results.
            </h2>
            <p className="text-[#A7A7A9]">Hear from the people who've experienced the Kumnandi Kum difference.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 flex flex-col"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#F6C58F] text-[#F6C58F]" />
                  ))}
                </div>
                <blockquote className="text-sm text-[#A7A7A9] leading-relaxed mb-5 flex-1 italic">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-[#0F0F10] shrink-0"
                    style={{ background: "linear-gradient(135deg, #B87333, #F6C58F)" }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-[#A7A7A9]">{t.role} · {t.org}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/testimonials">
              <Button variant="outline" className="border-white/15 text-white hover:bg-white/5">
                Read More Stories
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── About Teaser ── */}
      <section className="py-16 bg-white/[0.01] border-y border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/3 text-[#A7A7A9] text-xs font-medium mb-4">
                Meet the Founder
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
                Neziswa Ntante
              </h2>
              <p className="text-[#A7A7A9] mb-4 leading-relaxed">
                With over a decade of experience in organisational development, HR, and experiential facilitation, Neziswa founded Kumnandi Kum to bring authentic, African-centred workplace transformation to organisations across South Africa.
              </p>
              <p className="text-[#A7A7A9] mb-6 leading-relaxed">
                Her approach blends evidence-based psychology with ubuntu philosophy — creating spaces where teams feel safe enough to be honest, vulnerable, and ultimately, transformed.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Organisational Development", "HR Practitioner", "Experiential Facilitator", "Ubuntu Philosophy"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs text-[#A7A7A9] border border-white/10 bg-white/3">
                    {tag}
                  </span>
                ))}
              </div>
              <Link href="/about">
                <Button variant="outline" className="border-white/15 text-white hover:bg-white/5">
                  Read Neziswa's Story
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div
                className="rounded-2xl p-8 text-center relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, rgba(184,115,51,0.1) 0%, rgba(138,58,18,0.05) 100%)", border: "1px solid rgba(184,115,51,0.2)" }}
              >
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
                  style={{ background: "radial-gradient(circle, #F6C58F, transparent)", transform: "translate(30%, -30%)" }} />
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold text-[#0F0F10] mx-auto mb-4"
                  style={{ background: "linear-gradient(135deg, #B87333, #F6C58F)" }}
                >
                  N
                </div>
                <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>Neziswa Ntante</h3>
                <p className="text-sm text-[#F6C58F] mb-4">Founder & Lead Facilitator</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "10+ Years", sub: "Experience" },
                    { label: "500+", sub: "Professionals" },
                    { label: "50+", sub: "Organisations" },
                    { label: "94%", sub: "Satisfaction" },
                  ].map((stat) => (
                    <div key={stat.label} className="p-3 rounded-xl bg-white/3 border border-white/5">
                      <div className="text-lg font-bold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>{stat.label}</div>
                      <div className="text-xs text-[#A7A7A9]">{stat.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <Heart className="w-10 h-10 text-[#B87333] mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              Your Team Deserves Better
            </h2>
            <p className="text-[#A7A7A9] mb-8 text-lg">
              Stop managing dysfunction. Start building a team that thrives. The first step takes just 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/aidt">
                <Button
                  size="lg"
                  className="text-[#0F0F10] font-semibold text-base px-8"
                  style={{ background: "linear-gradient(135deg, #B87333 0%, #F6C58F 50%, #8A3A12 100%)" }}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Take the Free Assessment
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 text-base px-8">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book a Discovery Call
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
