"use client";

import { useState } from "react";
import Link from "next/link";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  async function signInWithGoogle() {
    setGoogleLoading(true);
    setError("");

    const { error } = await getSupabaseBrowser().auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setGoogleLoading(false);
    }
    // On success the browser redirects to Google, so no further state change needed here.
  }

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;

    setStatus("loading");
    setError("");

    try {
      const { error } = await getSupabaseBrowser().auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      setStatus("sent");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Couldn't send link. Try again.");
    }
  }

  if (status === "sent") {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-sm animate-fade-up text-center">
          <div className="w-14 h-14 rounded-full bg-wine/10 flex items-center justify-center mx-auto mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-wine">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m2 7 10 7 10-7" />
            </svg>
          </div>
          <h1 className="font-serif text-[32px] leading-tight text-ink mb-3">
            Check your inbox.
          </h1>
          <p className="text-[15px] text-ink-soft mb-8">
            We sent a login link to <span className="text-ink font-medium">{email}</span>.
            <br />Tap it and you&apos;re in.
          </p>
          <button
            onClick={() => { setStatus("idle"); setEmail(""); }}
            className="text-[13px] text-ink-soft hover:text-ink transition-colors"
          >
            Use a different email
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="block mb-10 text-[13px] text-ink-soft hover:text-ink transition-colors"
        >
          ← back to cycle
        </Link>

        <div className="animate-fade-up">
          <h1 className="font-serif text-[32px] leading-tight text-ink mb-2">
            Sign up or log in.
          </h1>
          <p className="text-[15px] text-ink-soft mb-8">
            Enter your email — we&apos;ll send you a magic link. No password needed.
          </p>

          <button
            type="button"
            onClick={signInWithGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 py-4 bg-white border border-line rounded-full text-[15px] font-medium text-ink hover:border-ink-soft active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.87 2.7-6.62Z" />
              <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.83.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 0 0 9 18Z" />
              <path fill="#FBBC05" d="M3.95 10.7A5.41 5.41 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.03l2.99-2.33Z" />
              <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.97l2.99 2.33C4.66 5.17 6.65 3.58 9 3.58Z" />
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-line" />
            <span className="text-[12px] text-ink-soft">or</span>
            <div className="flex-1 h-px bg-line" />
          </div>

          <form onSubmit={sendMagicLink} className="space-y-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="your@email.com"
              autoFocus
              className="w-full px-5 py-4 bg-white/50 rounded-full text-[15px] text-ink border border-line outline-none focus:border-wine focus:bg-white/80 transition-colors"
            />

            {error && <p className="text-[13px] text-rust">{error}</p>}

            <button
              type="submit"
              disabled={status === "loading" || !email.includes("@")}
              className="w-full py-4 bg-wine text-cream rounded-full text-[15px] font-medium hover:bg-wine-deep active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending…" : "Send login link"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
