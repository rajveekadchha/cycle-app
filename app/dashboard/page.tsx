"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

type Profile = {
  name: string;
  email: string;
  last_period_date: string;
  cycle_length: number;
  address: string;
};

function predictNextPeriod(lastPeriodDate: string, cycleLength: number) {
  const last = new Date(lastPeriodDate);
  const next = new Date(last);
  next.setDate(last.getDate() + cycleLength);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  next.setHours(0, 0, 0, 0);

  const daysUntil = Math.round((next.getTime() - today.getTime()) / 86400000);

  return { next, daysUntil };
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const supabase = getSupabaseBrowser();

    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        router.replace("/login");
        return;
      }

      const { data, error } = await supabase
        .from("users")
        .select("name, email, last_period_date, cycle_length, address")
        .eq("id", user.id)
        .single();

      if (error || !data) {
        router.replace("/onboard");
        return;
      }

      setProfile(data);
      setLoading(false);
    });
  }, [router]);

  async function save() {
    if (!profile) return;
    setSaving(true);
    setError("");
    setSaved(false);

    try {
      const supabase = getSupabaseBrowser();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/login");
        return;
      }

      const { error } = await supabase
        .from("users")
        .update({
          name: profile.name.trim(),
          last_period_date: profile.last_period_date,
          cycle_length: profile.cycle_length,
          address: profile.address.trim(),
        })
        .eq("id", user.id);

      if (error) throw error;
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Couldn't save. Try again.");
    } finally {
      setSaving(false);
    }
  }

  async function logOut() {
    await getSupabaseBrowser().auth.signOut();
    router.replace("/login");
  }

  if (loading || !profile) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-wine border-t-transparent animate-spin" />
      </main>
    );
  }

  const { next, daysUntil } = predictNextPeriod(profile.last_period_date, profile.cycle_length);

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm animate-fade-up">
        <h1 className="font-serif text-[32px] leading-tight text-ink mb-1">
          Hey {profile.name.split(" ")[0] || "there"}.
        </h1>
        <p className="text-[15px] text-ink-soft mb-8">Your details, kept up to date.</p>

        <div className="bg-white/60 border border-line rounded-2xl px-6 py-5 mb-8">
          <p className="text-[12px] uppercase tracking-[0.14em] text-ink-soft mb-1">
            Next period predicted
          </p>
          <p className="font-serif text-[22px] text-ink">
            {next.toLocaleDateString("en-IN", { day: "numeric", month: "long" })}
          </p>
          <p className="text-[13px] text-ink-soft mt-1">
            {daysUntil > 0
              ? `In ${daysUntil} day${daysUntil === 1 ? "" : "s"} — we'll email your cart 2 days before.`
              : daysUntil === 0
              ? "Today."
              : `${Math.abs(daysUntil)} day${Math.abs(daysUntil) === 1 ? "" : "s"} ago — update your last period date below.`}
          </p>
        </div>

        <div className="space-y-5">
          <Field label="Name">
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-5 py-4 bg-white/50 rounded-full text-[15px] text-ink border border-line outline-none focus:border-wine focus:bg-white/80 transition-colors"
            />
          </Field>

          <Field label="Email">
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full px-5 py-4 bg-white/30 rounded-full text-[15px] text-ink-soft border border-line outline-none cursor-not-allowed"
            />
          </Field>

          <Field label="Last period date">
            <input
              type="date"
              value={profile.last_period_date}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => setProfile({ ...profile, last_period_date: e.target.value })}
              className="w-full px-5 py-4 bg-white/50 rounded-2xl text-[15px] text-ink border border-line outline-none focus:border-wine focus:bg-white/80 transition-colors"
            />
          </Field>

          <Field label="Cycle length">
            <div className="flex items-center gap-5 px-5 py-4 bg-white/50 rounded-2xl border border-line">
              <button
                type="button"
                onClick={() => setProfile({ ...profile, cycle_length: Math.max(21, profile.cycle_length - 1) })}
                className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink-soft hover:border-wine hover:text-wine transition-colors text-lg"
              >
                −
              </button>
              <span className="flex-1 text-center font-serif text-[24px] text-ink">
                {profile.cycle_length}
                <span className="text-[14px] text-ink-soft font-sans ml-1">days</span>
              </span>
              <button
                type="button"
                onClick={() => setProfile({ ...profile, cycle_length: Math.min(35, profile.cycle_length + 1) })}
                className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink-soft hover:border-wine hover:text-wine transition-colors text-lg"
              >
                +
              </button>
            </div>
          </Field>

          <Field label="Delivery address">
            <textarea
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              rows={3}
              className="w-full px-5 py-4 bg-white/50 rounded-2xl text-[15px] text-ink border border-line outline-none focus:border-wine focus:bg-white/80 transition-colors resize-none"
            />
          </Field>

          {error && <p className="text-[13px] text-rust">{error}</p>}

          <button
            onClick={save}
            disabled={saving}
            className="w-full py-4 bg-wine text-cream rounded-full text-[15px] font-medium hover:bg-wine-deep active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : saved ? "Saved ✓" : "Save changes"}
          </button>

          <button
            onClick={logOut}
            className="w-full text-center text-[13px] text-ink-soft hover:text-ink transition-colors"
          >
            Log out
          </button>
        </div>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[12px] uppercase tracking-[0.1em] text-ink-soft mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}
