import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase";
import { buildReminderEmail } from "@/lib/emails/reminder";

// GET /api/send-reminders?email=you@example.com&name=Test
// Sends a test reminder to a specific address. Protected by same cron secret.
export async function GET(req: Request) {
  const secret = req.headers.get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const name = searchParams.get("name") ?? "there";

  if (!email) {
    return NextResponse.json({ error: "Pass ?email=you@example.com" }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const cartUrl = `${new URL(req.url).origin}/cart`;
  const { html, text } = buildReminderEmail(name, cartUrl);

  await resend.emails.send({
    from: "Cycle <onboarding@resend.dev>",
    to: email,
    subject: `[TEST] Your period is in 2 days, ${name.split(" ")[0]}`,
    html,
    text,
  });

  return NextResponse.json({ ok: true, sentTo: email });
}

export async function POST(req: Request) {
  // Verify cron secret so only authorised callers can trigger this.
  const secret = req.headers.get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const supabase = getSupabaseAdmin();
  const today = new Date().toISOString().split("T")[0];
  const cartUrl = `${new URL(req.url).origin}/cart`;

  // Fetch all onboarded users.
  const { data: users, error } = await supabase
    .from("users")
    .select("id, email, name, last_period_date, cycle_length")
    .eq("onboarded", true)
    .not("last_period_date", "is", null)
    .not("email", "is", null);

  if (error) {
    console.error("[reminders] fetch error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const due = (users ?? []).filter((u) => {
    const last = new Date(u.last_period_date);
    const next = new Date(last);
    next.setDate(last.getDate() + u.cycle_length);

    const reminder = new Date(next);
    reminder.setDate(next.getDate() - 2);

    return reminder.toISOString().split("T")[0] === today;
  });

  const results = await Promise.allSettled(
    due.map(async (u) => {
      const { html, text } = buildReminderEmail(u.name ?? "there", cartUrl);
      await resend.emails.send({
        from: "Cycle <onboarding@resend.dev>",
        to: u.email,
        subject: `Your period is in 2 days, ${(u.name ?? "").split(" ")[0] || "friend"}`,
        html,
        text,
      });
    })
  );

  const sent = results.filter((r) => r.status === "fulfilled").length;
  const failed = results.filter((r) => r.status === "rejected").length;

  console.log(`[reminders] sent=${sent} failed=${failed} date=${today}`);
  return NextResponse.json({ sent, failed, date: today });
}
