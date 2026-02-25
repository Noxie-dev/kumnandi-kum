import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  size: number;
  opacity: number;
  color: string;
  phase: "scatter" | "converge" | "aligned";
  delay: number;
}

interface Connection {
  a: number;
  b: number;
  opacity: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 35 : 70;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#B87333", "#F6C58F", "#C08A5A", "#8A3A12", "#D4956A"];

    const particles: Particle[] = Array.from({ length: COUNT }, (_, i) => {
      const angle = (i / COUNT) * Math.PI * 2;
      const radius = 80 + Math.random() * 120;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        targetX: cx + Math.cos(angle) * radius,
        targetY: cy + Math.sin(angle) * radius,
        size: 1.5 + Math.random() * 2.5,
        opacity: 0.3 + Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        phase: "scatter",
        delay: i * 40,
      };
    });

    const connections: Connection[] = [];

    const getConnections = (time: number) => {
      connections.length = 0;
      const progress = Math.min(1, (time - 2000) / 3000);
      if (progress <= 0) return;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = isMobile ? 80 : 100;
          if (dist < maxDist) {
            connections.push({
              a: i,
              b: j,
              opacity: (1 - dist / maxDist) * 0.3 * progress,
            });
          }
        }
      }
    };

    let startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      timeRef.current = elapsed;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const convergeProgress = Math.min(1, Math.max(0, (elapsed - 1500) / 4000));

      particles.forEach((p, i) => {
        if (elapsed < p.delay) return;

        if (convergeProgress > 0) {
          const ease = 1 - Math.pow(1 - convergeProgress, 3);
          p.x += (p.targetX - p.x) * ease * 0.015;
          p.y += (p.targetY - p.y) * ease * 0.015;
          p.vx *= 0.98;
          p.vy *= 0.98;
        } else {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        }

        // Gentle float after alignment
        if (convergeProgress > 0.8) {
          const floatAmt = (convergeProgress - 0.8) / 0.2;
          p.x += Math.sin(elapsed * 0.001 + i) * 0.3 * floatAmt;
          p.y += Math.cos(elapsed * 0.0013 + i * 0.7) * 0.3 * floatAmt;
        }

        // Draw glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        gradient.addColorStop(0, p.color + Math.round(p.opacity * 255).toString(16).padStart(2, "0"));
        gradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Draw connections
      getConnections(elapsed);
      connections.forEach((conn) => {
        const a = particles[conn.a];
        const b = particles[conn.b];
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, `rgba(184,115,51,${conn.opacity})`);
        grad.addColorStop(0.5, `rgba(246,197,143,${conn.opacity * 1.5})`);
        grad.addColorStop(1, `rgba(138,58,18,${conn.opacity})`);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.7 }}
      aria-hidden="true"
    />
  );
}
