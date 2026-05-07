# Cycle

Your period kit, prepped before you remember it's coming.

A landing page + waitlist for an agent that lives on WhatsApp, predicts your cycle, and preps an Instamart cart 2 days early. You tap pay inside Swiggy. We never touch your money.

---

## What's in this v1

- **Next.js 14 App Router** + TypeScript + Tailwind
- **Landing page** with hero, how-it-works, WhatsApp mockup, founders block, trust, FAQ, final CTA
- **Waitlist API** at `/api/waitlist` — email validation, Supabase storage, founding-100 position tracking
- **Supabase migration** for the `waitlist` table
- Custom design system: Fraunces serif + Inter Tight, cream/wine/rust palette, animated moon orbit

---

## Setup (10 minutes)

### 1. Install

```bash
npm install
```

### 2. Set up Supabase

1. Make a free project at [supabase.com](https://supabase.com)
2. Open the SQL editor and paste `supabase/migrations/001_waitlist.sql`, run it
3. Go to Settings → API, grab:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - **service_role** key (NOT anon) → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Add env vars

Copy `.env.example` to `.env.local` and fill in your Supabase credentials.

```bash
cp .env.example .env.local
```

> ⚠️ The waitlist API still works without Supabase — it just logs to console. Useful for first-day local dev. But set up Supabase before you deploy or you'll lose every signup.

### 4. Run

```bash
npm run dev
```

Open http://localhost:3000

### 5. Deploy to Vercel

```bash
npx vercel
```

Add the same env vars in the Vercel dashboard. Done.

---

## Project structure

```
app/
  api/waitlist/route.ts    # POST endpoint — store + return founding position
  globals.css              # Tailwind + body atmosphere
  layout.tsx               # Fraunces + Inter Tight via next/font
  page.tsx                 # Composes all sections
components/
  Nav.tsx
  Hero.tsx                 # Title + animated moon orbit + form
  HowItWorks.tsx           # 4 steps
  PhoneProof.tsx           # WhatsApp mockup (the conversion engine)
  Founders.tsx             # 100 founding members block
  Trust.tsx                # Privacy commitments
  FAQ.tsx                  # Native details/summary
  FinalCTA.tsx             # Bottom form + footer
  WaitlistForm.tsx         # The form — used in 2 places
lib/
  supabase.ts              # Server-side client (service role)
supabase/
  migrations/001_waitlist.sql
```

---

## Design tokens

In `tailwind.config.ts`:

| Token | Value | Use |
|---|---|---|
| `cream` | `#f5efe6` | Background |
| `cream-deep` | `#ede4d3` | Subtle elevation |
| `ink` | `#1a1410` | Body text, primary CTA bg |
| `ink-soft` | `#4a3f37` | Secondary text |
| `wine` | `#6e1f3a` | Accent — emphasis, hero CTA |
| `wine-deep` | `#4a1226` | Hover state |
| `rust` | `#c9622e` | Tertiary accent — trust marks |
| `moon` | `#d4b896` | Highlight inside the orbit |

Fonts: **Fraunces** (display, serif, italic) + **Inter Tight** (body).

---

## What to build next

Roughly in priority order, based on the conversation we had:

1. **Wire the form to Supabase** (it works — just add env vars)
2. **Buy a domain & deploy** to Vercel
3. **Test on 5 real women** before sharing publicly. Watch them read the WhatsApp mockup. If they're confused, it's a copy problem.
4. **Apply to Swiggy Builders Club** with a screen recording of the deployed page + your waitlist count
5. **Onboarding flow** — `/onboard` route, collects: phone, last 1–3 period dates, cycle length, brand preferences, addresses, payment auth (only for the ₹99 sub later, not for groceries)
6. **WhatsApp integration** via [AiSensy](https://aisensy.com/) (cheaper than Twilio for India)
7. **Prediction cron** — Vercel Cron daily, computes next predicted period per user, sends WhatsApp 2 days out
8. **Swiggy Instamart MCP integration** — once Builders Club access lands. The agent's only job: take user prefs + comfort additions → return a deeplink to a prepped cart

---

## Notes on what I left intentionally undone

- **No analytics yet.** Add Plausible or PostHog before launch — you'll want signup-source data.
- **No legal pages.** Add `/privacy` and `/terms` before deploying. Use Termly or Iubenda.
- **No email confirmation.** When traffic grows, add a Resend integration to send "you're #N of 100" via email.
- **No real WhatsApp opt-in capture.** Right now we collect email; you'll want phone numbers eventually for the actual product.
