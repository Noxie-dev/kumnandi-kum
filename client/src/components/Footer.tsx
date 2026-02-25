import { Link } from "wouter";
import { Mail, Phone, MapPin, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0b] border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img
                src="/footer-logo.png"
                alt="Kumnandi Kum"
                className="h-auto w-36 object-contain"
              />
            </div>
            <p className="text-sm text-[#A7A7A9] leading-relaxed mb-5">
              Human-centered team alignment and workplace wellness facilitation. Transforming cultures through intelligent diagnostics and experiential learning.
            </p>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#A7A7A9] hover:text-[#F6C58F] hover:border-[#B87333]/50 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#A7A7A9] hover:text-[#F6C58F] hover:border-[#B87333]/50 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">Services</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Half-Day Team Building", href: "/services/half-day" },
                { label: "Weekend Team Camps", href: "/services/weekend-camps" },
                { label: "Tailored Workshops", href: "/services/workshops" },
                { label: "Team Pulse AI", href: "/aidt" },
                { label: "Pricing", href: "/pricing" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-[#A7A7A9] hover:text-[#F6C58F] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Neziswa", href: "/about" },
                { label: "Who We Help", href: "/who-we-help" },
                { label: "Testimonials", href: "/testimonials" },
                { label: "FAQ", href: "/faq" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-[#A7A7A9] hover:text-[#F6C58F] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#B87333] mt-0.5 shrink-0" />
                <a href="mailto:neziswa@kumnandikum.co.za" className="text-sm text-[#A7A7A9] hover:text-[#F6C58F] transition-colors">
                  neziswa@kumnandikum.co.za
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#B87333] mt-0.5 shrink-0" />
                <a href="tel:+27000000000" className="text-sm text-[#A7A7A9] hover:text-[#F6C58F] transition-colors">
                  +27 (0) 61 6352890
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B87333] mt-0.5 shrink-0" />
                <span className="text-sm text-[#A7A7A9]">4 DEBEZA STREET|ILITHA PARK|7784, Western Cape, South Africa</span>
              </li>
            </ul>
            <div className="mt-5 p-3 rounded-lg border border-[#B87333]/20 bg-[#B87333]/5">
              <p className="text-xs text-[#A7A7A9] leading-relaxed">
                <span className="text-[#F6C58F] font-medium">Free Discovery Call</span> — 30 minutes to discuss your team's needs. No obligation.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#A7A7A9]">
            © {new Date().getFullYear()} Kumnandi Kum. All rights reserved. Facilitated by Neziswa Ntante.
          </p>
          <p className="text-xs text-[#A7A7A9]">
            Team Pulse AI is a facilitation readiness guide, not a clinical diagnostic tool.
          </p>
        </div>
      </div>
    </footer>
  );
}
