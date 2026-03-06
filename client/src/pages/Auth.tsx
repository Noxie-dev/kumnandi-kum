import { AuthView } from "@neondatabase/auth-ui";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

type AuthPageProps = {
  path?: string;
};

export default function AuthPage({ path = "sign-in" }: AuthPageProps) {
  return (
    <div className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(246,197,143,0.18),_transparent_40%),linear-gradient(180deg,_rgba(15,15,16,1)_0%,_rgba(10,10,11,1)_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(184,115,51,0.1),transparent_35%,transparent_65%,rgba(246,197,143,0.08))]" />
      <div className="container relative flex min-h-screen items-center py-16">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
          <section className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-[#F6C58F]/20 bg-[#B87333]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#F6C58F]">
              Neon Auth
            </div>
            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
                Secure access for the Kumnandi Kum workspace.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-[#C8C8CB] md:text-lg">
                Create your first user with Neon Auth, then use the account area to
                manage sessions, credentials, and profile settings.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-copper-gradient text-[#0F0F10]">
                <Link href="/auth/sign-in">Sign In</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/15 bg-white/5 text-white hover:bg-white/10"
              >
                <Link href="/auth/sign-up">Create Account</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="text-[#F6C58F] hover:bg-white/5 hover:text-white"
              >
                <Link href="/account">Go To Account</Link>
              </Button>
            </div>
          </section>

          <div className="glass-card copper-glow-sm rounded-[2rem] border border-white/10 p-6 md:p-8">
            <AuthView path={path} redirectTo="/account" />
          </div>
        </div>
      </div>
    </div>
  );
}
