"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

export default function CallbackClient() {
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    // Supabase JS automatically parses #access_token from the URL hash on init.
    // getSession() returns that session if the hash was valid.
    getSupabaseBrowser()
      .auth.getSession()
      .then(({ data: { session } }) => {
        if (session) {
          router.replace("/onboard");
        } else {
          setError("Invalid or expired link. Please request a new one.");
        }
      });
  }, [router]);

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
