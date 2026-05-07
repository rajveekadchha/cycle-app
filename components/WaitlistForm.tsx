"use client";

import { useState } from "react";

export default function WaitlistForm({
  variant = "hero",
}: {
  variant?: "hero" | "final";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("success");
      setMessage(data.message || "You're in.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Try again?");
    }
  }

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className={`flex gap-2.5 max-w-[480px] ${
          variant === "final" ? "mx-auto" : ""
        } max-md:flex-col`}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          aria-label="Email address"
          className="flex-1 px-5 py-4 bg-white/50 rounded-full text-[15px] text-ink border border-line outline-none focus:border-wine focus:bg-white/80 transition-colors"
          disabled={status === "loading" || status === "success"}
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="px-7 py-4 bg-wine text-cream rounded-full text-[15px] font-medium whitespace-nowrap hover:bg-wine-deep active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed max-md:w-full"
        >
          {status === "loading"
            ? "..."
            : status === "success"
            ? "✓ You're in"
            : "Join the waitlist"}
        </button>
      </form>

      {variant === "hero" && (
        <p className="mt-4 text-[13px] text-ink-soft animate-fade-up [animation-delay:0.65s] opacity-0">
          <strong className="text-wine font-medium">
            Free for a year for the first 10 founding members.
          </strong>
          &nbsp;After that, ₹99/month.
        </p>
      )}

      {status === "success" && (
        <div className="mt-3.5 px-5 py-4 bg-wine/[0.08] border border-wine/20 rounded-xl text-[14px] text-wine animate-fade-up">
          You&apos;re in. We&apos;ll be in touch when access opens — and you&apos;ll
          be one of the founding 10.
        </div>
      )}

      {status === "error" && (
        <div className="mt-3.5 px-5 py-4 bg-rust/[0.08] border border-rust/20 rounded-xl text-[14px] text-rust">
          {message || "Something went wrong. Try again?"}
        </div>
      )}
    </div>
  );
}
