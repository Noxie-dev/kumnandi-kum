import { useState } from "react";
import { Mail, Phone, MapPin, Clock, CheckCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const contactInfo = [
  { icon: Mail, label: "Email", value: "neziswa@kumnandikum.co.za", href: "mailto:neziswa@kumnandikum.co.za" },
  { icon: Phone, label: "Phone", value: "+27 (0) 00 000 0000", href: "tel:+27000000000" },
  { icon: MapPin, label: "Location", value: "Stellenbosch, Western Cape, South Africa", href: null },
  { icon: Clock, label: "Response Time", value: "Within 24 hours on business days", href: null },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organisation: "",
    role: "",
    service: "",
    teamSize: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Message sent! We'll be in touch within 24 hours.");
    },
    onError: (_err: unknown) => {
      toast.error("Something went wrong. Please try again or email us directly.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    submitContact.mutate(formData);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0F0F10] text-white pt-20 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-[#10A37F]/20 border border-[#10A37F]/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-[#10A37F]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>Message Received!</h2>
          <p className="text-[#A7A7A9] mb-6">
            Thank you for reaching out. Neziswa will personally review your message and respond within 24 hours on business days.
          </p>
          <p className="text-sm text-[#A7A7A9]">
            In the meantime, why not take the{" "}
            <a href="/aidt" className="text-[#F6C58F] hover:underline">free Team Pulse Assessment</a>?
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white pt-20">
      {/* Header */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(184,115,51,0.08) 0%, transparent 70%)" }} />
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <div className="text-xs text-[#B87333] font-semibold tracking-widest uppercase mb-3">Get in Touch</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5" style={{ fontFamily: "'Sora', sans-serif" }}>
            Let's Talk About{" "}
            <span className="text-copper-gradient">Your Team</span>
          </h1>
          <p className="text-[#A7A7A9] text-lg leading-relaxed">
            Every transformation starts with a conversation. Fill in the form below or book a free 30-minute discovery call with Neziswa.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="space-y-5">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-sm font-semibold text-white mb-5 uppercase tracking-wide">Contact Details</h3>
              <ul className="space-y-4">
                {contactInfo.map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#B87333]/10 border border-[#B87333]/20 flex items-center justify-center shrink-0">
                      <item.icon className="w-3.5 h-3.5 text-[#B87333]" />
                    </div>
                    <div>
                      <div className="text-xs text-[#A7A7A9] mb-0.5">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-white hover:text-[#F6C58F] transition-colors">{item.value}</a>
                      ) : (
                        <span className="text-sm text-white">{item.value}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-xl p-5"
              style={{ background: "linear-gradient(135deg, rgba(184,115,51,0.1), rgba(138,58,18,0.05))", border: "1px solid rgba(184,115,51,0.2)" }}
            >
              <h4 className="text-sm font-semibold text-white mb-2">Free Discovery Call</h4>
              <p className="text-xs text-[#A7A7A9] leading-relaxed mb-3">
                30 minutes with Neziswa to discuss your team's needs. No obligation, no sales pitch.
              </p>
              <div className="text-xs text-[#F6C58F]">Available Mon–Fri, 9am–5pm SAST</div>
            </div>

            <div className="glass-card rounded-xl p-5">
              <h4 className="text-sm font-semibold text-white mb-3">Not Ready to Book?</h4>
              <p className="text-xs text-[#A7A7A9] mb-3">Take the free Team Pulse Assessment first to understand your team's needs.</p>
              <a href="/aidt" className="text-xs text-[#F6C58F] hover:underline">Start free assessment →</a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-lg font-bold text-white mb-6" style={{ fontFamily: "'Sora', sans-serif" }}>Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm text-[#A7A7A9] mb-1.5 block">
                      Full Name <span className="text-[#B87333]">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      className="bg-white/5 border-white/10 text-white placeholder:text-[#A7A7A9]/50 focus:border-[#B87333]/50"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm text-[#A7A7A9] mb-1.5 block">
                      Email Address <span className="text-[#B87333]">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="bg-white/5 border-white/10 text-white placeholder:text-[#A7A7A9]/50 focus:border-[#B87333]/50"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="organisation" className="text-sm text-[#A7A7A9] mb-1.5 block">Organisation</Label>
                    <Input
                      id="organisation"
                      value={formData.organisation}
                      onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                      placeholder="Your organisation name"
                      className="bg-white/5 border-white/10 text-white placeholder:text-[#A7A7A9]/50 focus:border-[#B87333]/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role" className="text-sm text-[#A7A7A9] mb-1.5 block">Your Role</Label>
                    <Select onValueChange={(v) => setFormData({ ...formData, role: v })}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hr">HR / People & Culture</SelectItem>
                        <SelectItem value="founder">Founder / Owner</SelectItem>
                        <SelectItem value="manager">Team Leader / Manager</SelectItem>
                        <SelectItem value="operations">Operations / Admin</SelectItem>
                        <SelectItem value="programme">Programme Manager</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm text-[#A7A7A9] mb-1.5 block">Service Interest</Label>
                    <Select onValueChange={(v) => setFormData({ ...formData, service: v })}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="half-day">Half-Day Team Building</SelectItem>
                        <SelectItem value="weekend">Weekend Camp</SelectItem>
                        <SelectItem value="workshop">Tailored Workshop</SelectItem>
                        <SelectItem value="not-sure">Not Sure Yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm text-[#A7A7A9] mb-1.5 block">Team Size</Label>
                    <Select onValueChange={(v) => setFormData({ ...formData, teamSize: v })}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Team size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1–10 people</SelectItem>
                        <SelectItem value="11-25">11–25 people</SelectItem>
                        <SelectItem value="26-40">26–40 people</SelectItem>
                        <SelectItem value="40+">40+ people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm text-[#A7A7A9] mb-1.5 block">Budget Range</Label>
                    <Select onValueChange={(v) => setFormData({ ...formData, budget: v })}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Under R15,000</SelectItem>
                        <SelectItem value="mid">R15,000–R35,000</SelectItem>
                        <SelectItem value="high">R35,000+</SelectItem>
                        <SelectItem value="unknown">Not Sure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-sm text-[#A7A7A9] mb-1.5 block">
                    Tell Us About Your Team <span className="text-[#B87333]">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your team's current challenges and what you're hoping to achieve..."
                    className="bg-white/5 border-white/10 text-white placeholder:text-[#A7A7A9]/50 focus:border-[#B87333]/50 min-h-[120px]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitContact.isPending}
                  className="w-full text-[#0F0F10] font-semibold py-6"
                  style={{ background: "linear-gradient(135deg, #B87333 0%, #F6C58F 50%, #8A3A12 100%)" }}
                >
                  {submitContact.isPending ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>

                <p className="text-xs text-[#A7A7A9] text-center">
                  We respond within 24 hours on business days. Your information is kept strictly confidential.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
