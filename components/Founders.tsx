export default function Founders() {
  return (
    <section
      id="join"
      className="py-20 border-t border-line relative"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(110, 31, 58, 0.06) 0%, transparent 60%), #f5efe6",
      }}
    >
      <div className="text-center max-w-[640px] mx-auto">
        <div className="font-serif text-[80px] font-light leading-none text-wine tracking-[-0.04em] mb-3">
          10
        </div>
        <div className="font-serif italic text-[18px] text-ink-soft mb-8">
          founding members. free for 2 months.
        </div>
        <h2 className="font-serif text-[clamp(28px,3.5vw,40px)] font-normal tracking-[-0.02em] leading-tight mb-5">
          Be one of the first ten women to never run out again.
        </h2>
        <p className="text-[16px] text-ink-soft leading-[1.6]">
          Founding members shape what Cycle becomes — your feedback steers the
          product, and you keep it free for a full year as a thank-you for being
          early.
        </p>
      </div>
    </section>
  );
}
