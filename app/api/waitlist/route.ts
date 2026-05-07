import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FOUNDING_CAP = 10;

export async function POST(req: Request) {
  try {
    const { email, source } = await req.json();

    if (!email || typeof email !== "string" || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // If Supabase isn't configured yet, log and accept gracefully so the
    // form still works during early local dev.
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      console.log("[waitlist:no-db]", cleanEmail, "source:", source);
      return NextResponse.json({
        ok: true,
        message: "You're in. We'll be in touch.",
        founding: true,
        position: null,
      });
    }

    const supabase = getSupabaseAdmin();

    // Insert; ignore duplicate errors (unique constraint on email).
    const { error: insertError } = await supabase
      .from("waitlist")
      .insert({ email: cleanEmail, source: source ?? "landing" });

    if (insertError && !insertError.message.includes("duplicate")) {
      console.error("[waitlist:insert]", insertError);
      return NextResponse.json(
        { error: "Couldn't save your signup. Try again?" },
        { status: 500 }
      );
    }

    // Get the user's signup position to tell them if they made the founding 100.
    const { data: row } = await supabase
      .from("waitlist")
      .select("id, created_at")
      .eq("email", cleanEmail)
      .single();

    const { count } = await supabase
      .from("waitlist")
      .select("id", { count: "exact", head: true })
      .lte("created_at", row?.created_at ?? new Date().toISOString());

    const position = count ?? null;
    const isFounding = position !== null && position <= FOUNDING_CAP;

    return NextResponse.json({
      ok: true,
      position,
      founding: isFounding,
      message: isFounding
        ? `You're #${position} of the first 10 founding members. Free for a year.`
        : "You're on the waitlist. We'll be in touch when access opens.",
    });
  } catch (err) {
    console.error("[waitlist:fatal]", err);
    return NextResponse.json(
      { error: "Something went wrong. Try again?" },
      { status: 500 }
    );
  }
}
