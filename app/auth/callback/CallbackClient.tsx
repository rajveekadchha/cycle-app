"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

export default function CallbackClient() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");

  useEffect(() => {
    const tokenHash = params.get("token_hash");
    const type = params.get("type") as "magiclink" | "email" | null;

    if (!tokenHash || !type) {
      setError("Invalid or expired link. Please request a new one.");
      return;
    }

    getSupabaseBrowser()
      .auth.verifyOtp({ token_hash: tokenHash, type })
      .then(({ error }) => {
        if (error) {
          setError("This link has expired. Please request a new one.");
        } else {
          router.replace("/onboard");
        }
      });
  }, [params, router]);

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-sm text-center animate-fade-up">
          <p className="text-[15px] text-ink-soft mb-6">{error}</p>
          <a
            href="/login"
            className="px-7 py-4 bg-wine text-cream rounded-full text-[15px] font-medium hover:bg-wine-deep transition-colors"
          >
            Back to login
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-wine border-t-transparent animate-spin" />
    </main>
  );
}
