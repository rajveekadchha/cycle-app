"use client";

import { useState } from "react";
import Link from "next/link";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [error, setError] = useState("");

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
