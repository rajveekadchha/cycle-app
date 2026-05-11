import WaitlistForm from "./WaitlistForm";

export default function Hero() {
  return (
    <section className="py-24 max-md:py-14 relative">
      {/* Orbit — the memorable detail */}
      <div
        aria-hidden="true"
        className="absolute top-20 -right-10 w-[360px] h-[360px] pointer-events-none animate-fade-in [animation-delay:0.6s] opacity-0 max-lg:hidden"
      >
        <div
          className="absolute inset-0 rounded-full animate-rotate"
          style={{ border: "1px dashed rgba(110, 31, 58, 0.25)" }}
        >
          <div
            className="absolute top-1/2 -left-2 w-7 h-7 rounded-full -translate-y-1/2"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, #d4b896, #6e1f3a 90%)",
              boxShadow: "0 0 30px rgba(110, 31, 58, 0.3)",
            }}
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-serif italic text-[13px] text-ink-soft leading-snug">
          in sync with
          <span className="block text-2xl text-wine not-italic font-medium mt-1">
            your cycle
          </span>
        </div>
      </div>

      <div className="font-serif italic font-normal text-[15px] text-wine mb-7 flex items-center gap-3 animate-fade-up [animation-delay:0.1s] opacity-0">
        <span className="w-7 h-px bg-wine" />
        A quiet agent · for the days you&apos;d rather not think
      </div>

      <h1 className="font-serif text-[clamp(44px,7vw,88px)] font-normal leading-[0.98] tracking-[-0.035em] max-w-[14ch] mb-9 animate-fade-up [animation-delay:0.2s] opacity-0">
        Your period kit, <em className="italic text-wine font-light">prepped</em> before you
        remember it&apos;s coming.
      </h1>

      <p className="text-[19px] leading-[1.5] text-ink-soft max-w-[48ch] mb-12 animate-fade-up [animation-delay:0.35s] opacity-0">
        Cycle learns your rhythm. Two days before your period, it sends you an
        email — your Instamart cart already prepped with everything you need.
        You tap, pay. That&apos;s the whole product.
      </p>

      <div className="animate-fade-up [animation-delay:0.5s] opacity-0">
        <WaitlistForm variant="hero" />
      </div>
    </section>
  );
}
