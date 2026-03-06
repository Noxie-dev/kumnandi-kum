import { AccountView, SignedIn, SignedOut, UserButton } from "@neondatabase/auth-ui";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

type AccountPageProps = {
  path?: string;
};

export default function AccountPage({ path }: AccountPageProps) {
  return (
    <div className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(184,115,51,0.16),_transparent_35%),linear-gradient(180deg,_rgba(15,15,16,1)_0%,_rgba(10,10,11,1)_100%)]">
      <div className="container py-16">
        <SignedIn>
          <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center rounded-full border border-[#F6C58F]/20 bg-[#B87333]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#F6C58F]">
                  Account
                </div>
                <div>
                  <h1 className="text-3xl font-semibold text-white md:text-5xl">
                    Manage your Neon Auth account
                  </h1>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-[#C8C8CB]">
                    Update your profile, change your password, and review active
                    sessions from one place.
                  </p>
                </div>
              </div>
              <div className="self-start md:self-auto">
                <UserButton />
              </div>
            </div>

            <div className="glass-card rounded-[2rem] border border-white/10 p-6 md:p-8">
              <AccountView path={path} />
            </div>
          </div>
        </SignedIn>

        <SignedOut>
          <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
            <div className="glass-card copper-glow-sm w-full max-w-xl rounded-[2rem] border border-white/10 p-8 text-center">
              <div className="inline-flex items-center rounded-full border border-[#F6C58F]/20 bg-[#B87333]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#F6C58F]">
                Sign In Required
              </div>
              <h1 className="mt-6 text-3xl font-semibold text-white">
                Access your account settings
              </h1>
              <p className="mt-4 text-base leading-7 text-[#C8C8CB]">
                Sign in or create an account first. Once authenticated, this page
                will show password management and active session controls.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
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
              </div>
            </div>
          </div>
        </SignedOut>
      </div>
    </div>
  );
}
