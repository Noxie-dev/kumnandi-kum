import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Half-Day Team Building", href: "/services/half-day" },
      { label: "Weekend Camps", href: "/services/weekend-camps" },
      { label: "Tailored Workshops", href: "/services/workshops" },
    ],
  },
  { label: "Who We Help", href: "/who-we-help" },
  { label: "About", href: "/about" },
  { label: "Team Pulse AI", href: "/aidt", highlight: true },
  { label: "Pricing", href: "/pricing" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0F0F10]/20 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/header-logo.png"
              alt="Kumnandi Kum"
              className="h-14 w-14 md:h-[4.75rem] md:w-[4.75rem] shrink-0 object-contain"
            />
            <div className="flex flex-col leading-none">
              <span
                className="text-xs sm:text-sm font-bold text-copper-gradient tracking-wider"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                KUMNANDI KUM
              </span>
              <span
                className="hidden xl:block text-[10px] text-[#A7A7A9] tracking-[0.18em] uppercase leading-tight max-w-[11rem]"
                style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700 }}
              >
                Culture & Team Alignment
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative group">
                  <button
                    className="flex items-center gap-1 px-3 py-2 text-sm text-[#A7A7A9] hover:text-white transition-colors rounded-md hover:bg-white/5"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                  </button>
                  <div
                    className={`absolute top-full left-0 mt-1 w-56 bg-[#141416] border border-white/10 rounded-lg shadow-xl overflow-hidden transition-all duration-200 ${
                      servicesOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-3 text-sm text-[#A7A7A9] hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : link.highlight ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium rounded-md transition-colors"
                  style={{
                    background: "linear-gradient(135deg, rgba(184,115,51,0.2), rgba(246,197,143,0.1))",
                    border: "1px solid rgba(184,115,51,0.4)",
                    color: "#F6C58F",
                  }}
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    location === link.href
                      ? "text-white bg-white/5"
                      : "text-[#A7A7A9] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link href="/contact" className="hidden md:block">
              <Button
                size="sm"
                className="bg-copper-gradient text-[#0F0F10] font-semibold hover:opacity-90 transition-opacity"
                style={{ background: "linear-gradient(135deg, #B87333 0%, #F6C58F 50%, #8A3A12 100%)" }}
              >
                Book a Call
              </Button>
            </Link>
            <button
              className="lg:hidden p-2 text-[#A7A7A9] hover:text-white transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r transition-opacity duration-300 ${
          scrolled
            ? "from-transparent via-[#F6C58F]/80 to-transparent opacity-100"
            : "from-transparent via-[#B87333]/70 to-transparent opacity-90"
        }`}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#0F0F10]/98 border-t border-white/5 px-4 py-4 space-y-1">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label}>
                <button
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-[#A7A7A9] hover:text-white transition-colors rounded-md"
                  onClick={() => setServicesOpen(!servicesOpen)}
                >
                  {link.label}
                  <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                </button>
                {servicesOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-3 py-2 text-sm text-[#A7A7A9] hover:text-white transition-colors rounded-md"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2.5 text-sm rounded-md transition-colors ${
                  link.highlight
                    ? "text-[#F6C58F] border border-[#B87333]/40 bg-[#B87333]/10"
                    : location === link.href
                    ? "text-white bg-white/5"
                    : "text-[#A7A7A9] hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
          <div className="pt-3 border-t border-white/5">
            <Link href="/contact">
              <Button
                className="w-full font-semibold text-[#0F0F10]"
                style={{ background: "linear-gradient(135deg, #B87333 0%, #F6C58F 50%, #8A3A12 100%)" }}
              >
                Book a Discovery Call
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
