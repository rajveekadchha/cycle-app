"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

export default function CallbackClient() {
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    const supabase = getSupabaseBrowser();

    // Parse #access_token and #refresh_token from the URL hash directly.
    // This is more reliable than relying on the singleton client's auto-detection,
    // which only runs when the client is first created.
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (!accessToken || !refreshToken) {
      setError("Invalid or expired link. Please request a new one.");
      return;
    }

    supabase.auth
      .setSession({ access_token: accessToken, refresh_token: refreshToken })
      .then(async ({ data: { session }, error: sessionError }) => {
        if (sessionError || !session) {
          setError("This link has expired. Please request a new one.");
          return;
        }

        const { data: profile } = await supabase
          .from("users")
          .select("onboarded")
          .eq("id", session.user.id)
          .single();

        router.replace(profile?.onboarded ? "/dashboard" : "/onboard");
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
