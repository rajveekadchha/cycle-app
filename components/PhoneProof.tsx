export default function PhoneProof() {
  return (
    <section className="py-24 max-md:py-16 border-t border-line grid grid-cols-2 gap-20 items-center max-lg:grid-cols-1 max-lg:gap-12">
      <div>
        <div className="section-label">What it actually looks like</div>
        <h2 className="font-serif text-[clamp(30px,4vw,44px)] font-normal tracking-[-0.025em] leading-[1.1] mb-6">
          One message. <em className="italic text-wine">That&apos;s the product.</em>
        </h2>
        <p className="text-[17px] text-ink-soft leading-[1.6] mb-4">
          No new app to install. No dashboard to check. No subscription box that
          ships on a schedule that has nothing to do with your body.
        </p>
        <p className="text-[17px] text-ink-soft leading-[1.6]">
          Just a thoughtful WhatsApp from someone who&apos;s paying attention so you
          don&apos;t have to.
        </p>
      </div>

      <div className="bg-white rounded-[32px] p-6 border border-line max-w-[360px] w-full justify-self-center shadow-[0_30px_60px_-20px_rgba(26,20,16,0.18),0_10px_20px_-10px_rgba(26,20,16,0.1)]">
        <div className="flex items-center gap-2.5 pb-4 border-b border-line mb-4">
          <div
            className="w-9 h-9 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, #d4b896, #6e1f3a 90%)",
            }}
            aria-hidden="true"
          />
          <div>
            <div className="font-semibold text-[15px]">Cycle</div>
            <div className="text-[12px] text-ink-soft flex items-center gap-1">
              <span className="text-[#2d8f3f] text-[9px]">●</span> online
            </div>
          </div>
        </div>

        <div className="bg-[#f0e8db] px-3.5 py-3 rounded-[14px_14px_14px_4px] mb-2.5 text-[14px] leading-[1.4] max-w-[88%] animate-bubble-in [animation-delay:0.2s] opacity-0">
          Hey Aanya 🌙 Your cycle&apos;s likely coming Wed–Fri.
          <br />
          <br />
          Want me to prep your kit? Same as last time:{" "}
          <strong className="text-wine">Whisper Ultra XL</strong>, Meftal Spas,
          Cadbury Silk, ginger tea.
          <br />
          <br />
          Reply <strong className="text-wine">YES</strong> ·{" "}
          <strong className="text-wine">EDIT</strong> ·{" "}
          <strong className="text-wine">SKIP</strong>
          <div className="text-[10px] text-ink-soft text-right mt-0.5">
            10:42 AM
          </div>
        </div>

        <div className="bg-wine text-cream px-3.5 py-3 rounded-[14px_14px_4px_14px] mb-2.5 text-[14px] leading-[1.4] max-w-[88%] ml-auto animate-bubble-in [animation-delay:0.6s] opacity-0">
          yes please 🙏
          <div className="text-[10px] text-cream/60 text-right mt-0.5">
            10:43 AM
          </div>
        </div>

        <div className="bg-[#f0e8db] px-3.5 py-3 rounded-[14px_14px_14px_4px] mb-2.5 text-[14px] leading-[1.4] max-w-[88%] animate-bubble-in [animation-delay:1s] opacity-0">
          Prepping your cart on Instamart...
          <div className="text-[10px] text-ink-soft text-right mt-0.5">
            10:43 AM
          </div>
        </div>

        <div className="bg-[#f0e8db] px-3.5 py-3 rounded-[14px_14px_14px_4px] mb-2.5 text-[14px] leading-[1.4] max-w-[88%] animate-bubble-in [animation-delay:1.4s] opacity-0">
          Cart&apos;s ready 🛒 4 items, ~₹487, delivery in 25 min to{" "}
          <strong className="text-wine">Home</strong>.
          <br />
          <br />
          <a className="text-wine underline underline-offset-2 cursor-pointer">
            Tap to review and pay →
          </a>
          <br />
          <br />
          <em>P.S. — added Dove dark chocolate. you mentioned craving it last time 🍫</em>
          <div className="text-[10px] text-ink-soft text-right mt-0.5">
            10:44 AM
          </div>
        </div>
      </div>
    </section>
  );
}
