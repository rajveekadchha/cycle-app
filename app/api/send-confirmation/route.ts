import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildConfirmationEmail } from "@/lib/emails/confirmation";

export async function POST(req: Request) {
  const { email, name, nextPeriodLabel } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { html, text } = buildConfirmationEmail(name ?? "there", nextPeriodLabel ?? "your next period");

  try {
    await resend.emails.send({
      from: "Cycle <onboarding@resend.dev>",
      to: email,
      subject: "You're all set — we'll remind you before your next period",
      html,
      text,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[send-confirmation] error", err);
    return NextResponse.json({ error: "Couldn't send confirmation email" }, { status: 500 });
  }
}
