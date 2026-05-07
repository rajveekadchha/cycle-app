import WaitlistForm from "./WaitlistForm";

export default function FinalCTA() {
  return (
    <>
      <section className="py-32 max-md:py-20 border-t border-line text-center">
        <h2 className="font-serif text-[clamp(40px,6vw,72px)] font-normal tracking-[-0.03em] leading-none mb-9 max-w-[16ch] mx-auto">
          Stop being{" "}
          <em className="italic text-wine">caught off guard</em> by something
          that happens every month.
        </h2>
        <WaitlistForm variant="final" />
      </section>

      <footer className="py-10 border-t border-line flex justify-between items-center text-[13px] text-ink-soft flex-wrap gap-4">
        <div className="font-serif text-[22px] font-medium tracking-[-0.02em] flex items-center gap-2.5">
          <span
            className="w-3.5 h-3.5 rounded-full shadow-[0_0_0_1px_rgba(26,20,16,0.15)]"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, #d4b896, #6e1f3a 80%)",
            }}
            aria-hidden="true"
          />
          Cycle
        </div>
        <div>Built with care · Bengaluru · 2026</div>
      </footer>
    </>
  );
}
