export default function PhoneProof() {
  return (
    <section className="py-24 max-md:py-16 border-t border-line grid grid-cols-2 gap-20 items-center max-lg:grid-cols-1 max-lg:gap-12">
      <div>
        <div className="section-label">What it actually looks like</div>
        <h2 className="font-serif text-[clamp(30px,4vw,44px)] font-normal tracking-[-0.025em] leading-[1.1] mb-6">
          One email. <em className="italic text-wine">That&apos;s the product.</em>
        </h2>
        <p className="text-[17px] text-ink-soft leading-[1.6] mb-4">
          No new app to install. No dashboard to check. No subscription box that
          ships on a schedule that has nothing to do with your body.
        </p>
        <p className="text-[17px] text-ink-soft leading-[1.6]">
          Just a thoughtful email from something paying attention — so you don&apos;t have to.
        </p>
      </div>

      {/* Email mockup */}
      <div className="bg-white rounded-[32px] border border-line max-w-[380px] w-full justify-self-center shadow-[0_30px_60px_-20px_rgba(26,20,16,0.18),0_10px_20px_-10px_rgba(26,20,16,0.1)] overflow-hidden animate-fade-in">

        {/* Email client top bar */}
        <div className="px-5 py-4 border-b border-line bg-cream/60">
          <div className="text-[11px] text-ink-soft uppercase tracking-[0.12em] mb-1">Inbox</div>
          <div className="font-medium text-[15px] text-ink leading-snug">
            Your period is in 2 days, Aanya
          </div>
          <div className="text-[12px] text-ink-soft mt-1 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full inline-flex items-center justify-center shrink-0"
              style={{ background: "radial-gradient(circle at 35% 35%, #d4b896, #6e1f3a 90%)" }}
            />
            Cycle · just now
          </div>
        </div>

        {/* Email body */}
        <div className="px-5 py-5 space-y-4">
          <p className="text-[14px] text-ink leading-[1.6]">
            Hey Aanya, your period is likely arriving <strong>Wed–Fri</strong>. We&apos;ve put together your kit — here&apos;s what&apos;s waiting on Instamart:
          </p>

          {/* Product list */}
          <div className="rounded-xl border border-line divide-y divide-line">
            {[
              "Sanitary Pads",
              "Period Pain Relief",
              "Hot water bag",
              "Dark chocolate",
              "Chamomile tea",
            ].map((item) => (
              <div key={item} className="px-4 py-3 flex items-center justify-between">
                <span className="text-[13.5px] text-ink">{item}</span>
                <span className="text-[12px] text-wine">→</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a className="block w-full text-center py-3 bg-wine text-cream rounded-full text-[14px] font-medium cursor-pointer">
            Review cart &amp; pay on Instamart →
          </a>

          <p className="text-[11px] text-ink-soft text-center">
            ~₹487 · delivery in 25 min · to Home
          </p>
        </div>
      </div>
    </section>
  );
}
