"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowser } from "@/lib/supabase-browser";
import { predictNextPeriod } from "@/lib/predict";

const STEPS = ["name", "period", "cycle", "address"] as const;
type Step = (typeof STEPS)[number];

export default function OnboardPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("name");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [address, setAddress] = useState("");

  const stepIndex = STEPS.indexOf(step);
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  function next() {
    setError("");
    setStep(STEPS[stepIndex + 1]);
  }

  function back() {
    setError("");
    setStep(STEPS[stepIndex - 1]);
  }

  async function finish() {
    setSaving(true);
    setError("");

    try {
      const supabase = getSupabaseBrowser();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      // upsert handles both new users (no trigger row yet) and existing ones.
      const { error } = await supabase
        .from("users")
        .upsert({
          id: user.id,
          email: user.email,
          name: name.trim(),
          last_period_date: lastPeriodDate,
          cycle_length: cycleLength,
          address: address.trim(),
          onboarded: true,
        });

      if (error) throw error;

      const { next } = predictNextPeriod(lastPeriodDate, cycleLength);
      fetch("/api/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          name: name.trim(),
          nextPeriodLabel: next.toLocaleDateString("en-IN", { day: "numeric", month: "long" }),
        }),
      }).catch(() => {});

      router.replace("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Progress bar */}
        <div className="mb-10">
          <div className="h-0.5 bg-line rounded-full overflow-hidden">
            <div
              className="h-full bg-wine rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-[12px] text-ink-soft">
            {stepIndex + 1} of {STEPS.length}
          </p>
        </div>

        <div className="animate-fade-up" key={step}>
          {step === "name" && (
            <NameStep
              value={name}
              onChange={setName}
              onNext={next}
            />
          )}

          {step === "period" && (
            <PeriodStep
              value={lastPeriodDate}
              onChange={setLastPeriodDate}
              onNext={next}
              onBack={back}
            />
          )}

          {step === "cycle" && (
            <CycleStep
              value={cycleLength}
              onChange={setCycleLength}
              onNext={next}
              onBack={back}
            />
          )}

          {step === "address" && (
            <AddressStep
              value={address}
              onChange={setAddress}
              onFinish={finish}
              onBack={back}
              saving={saving}
              error={error}
            />
          )}
        </div>
      </div>
    </main>
  );
}

function NameStep({
  value,
  onChange,
  onNext,
}: {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
}) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (value.trim()) onNext(); }} className="space-y-6">
      <div>
        <h1 className="font-serif text-[32px] leading-tight text-ink mb-2">
          What should we call you?
        </h1>
        <p className="text-[15px] text-ink-soft">Just your first name is fine.</p>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Your name"
        autoFocus
        className="w-full px-5 py-4 bg-white/50 rounded-full text-[15px] text-ink border border-line outline-none focus:border-wine focus:bg-white/80 transition-colors"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="w-full py-4 bg-wine text-cream rounded-full text-[15px] font-medium hover:bg-wine-deep active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </form>
  );
}

function PeriodStep({
  value,
  onChange,
  onNext,
  onBack,
}: {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (value) onNext(); }} className="space-y-6">
      <div>
        <h1 className="font-serif text-[32px] leading-tight text-ink mb-2">
          When did your last period start?
        </h1>
        <p className="text-[15px] text-ink-soft">
          Approximate is fine — we&apos;ll refine over time.
        </p>
      </div>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        max={today}
        autoFocus
        className="w-full px-5 py-4 bg-white/50 rounded-2xl text-[15px] text-ink border border-line outline-none focus:border-wine focus:bg-white/80 transition-colors"
      />
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-4 border border-line text-ink-soft rounded-full text-[15px] hover:border-ink-soft transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!value}
          className="flex-1 py-4 bg-wine text-cream rounded-full text-[15px] font-medium hover:bg-wine-deep active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </form>
  );
}

function CycleStep({
  value,
  onChange,
  onNext,
  onBack,
}: {
  value: number;
  onChange: (v: number) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-6">
      <div>
        <h1 className="font-serif text-[32px] leading-tight text-ink mb-2">
          How long is your cycle?
        </h1>
        <p className="text-[15px] text-ink-soft">
          Most cycles are 21–35 days. Default is 28.
        </p>
      </div>
      <div className="flex items-center gap-5 px-5 py-4 bg-white/50 rounded-2xl border border-line">
        <button
          type="button"
          onClick={() => onChange(Math.max(21, value - 1))}
          className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink-soft hover:border-wine hover:text-wine transition-colors text-lg"
        >
          −
        </button>
        <span className="flex-1 text-center font-serif text-[32px] text-ink">
          {value}
          <span className="text-[16px] text-ink-soft font-sans ml-1">days</span>
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(35, value + 1))}
          className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink-soft hover:border-wine hover:text-wine transition-colors text-lg"
        >
          +
        </button>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-4 border border-line text-ink-soft rounded-full text-[15px] hover:border-ink-soft transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          className="flex-1 py-4 bg-wine text-cream rounded-full text-[15px] font-medium hover:bg-wine-deep active:scale-[0.98] transition-all"
        >
          Continue
        </button>
      </div>
    </form>
  );
}

function AddressStep({
  value,
  onChange,
  onFinish,
  onBack,
  saving,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  onFinish: () => void;
  onBack: () => void;
  saving: boolean;
  error: string;
}) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (value.trim()) onFinish(); }} className="space-y-6">
      <div>
        <h1 className="font-serif text-[32px] leading-tight text-ink mb-2">
          Where should we deliver?
        </h1>
        <p className="text-[15px] text-ink-soft">
          Your Instamart delivery address.
        </p>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Flat 4B, Sunshine Apartments, MG Road, Bengaluru 560001"
        rows={3}
        autoFocus
        className="w-full px-5 py-4 bg-white/50 rounded-2xl text-[15px] text-ink border border-line outline-none focus:border-wine focus:bg-white/80 transition-colors resize-none"
      />
      {error && <p className="text-[13px] text-rust">{error}</p>}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={saving}
          className="flex-1 py-4 border border-line text-ink-soft rounded-full text-[15px] hover:border-ink-soft transition-colors disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!value.trim() || saving}
          className="flex-1 py-4 bg-wine text-cream rounded-full text-[15px] font-medium hover:bg-wine-deep active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving…" : "Done"}
        </button>
      </div>
    </form>
  );
}
