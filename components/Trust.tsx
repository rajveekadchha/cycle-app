const items = [
  {
    title: "Stored, never sold.",
    body: "Your cycle data lives in our database, encrypted, used only to predict your next cycle. We don't sell it. We don't share it. We don't run ads against it. Ever.",
  },
  {
    title: "Leave anytime.",
    body: "One WhatsApp message and you're out. We delete your data within 24 hours. No exit interview, no five-step cancellation flow.",
  },
];

export default function Trust() {
  return (
    <section id="trust" className="py-20 border-t border-line">
      <div className="section-label">On trust</div>
      <h2 className="font-serif text-[clamp(32px,4.5vw,52px)] font-normal tracking-[-0.025em] leading-[1.05] max-w-[18ch] mb-16">
        Your cycle is <em className="italic text-wine">your</em> business.
      </h2>

      <div className="grid grid-cols-2 gap-10 max-md:grid-cols-1 max-md:gap-7">
        {items.map((item, i) => (
          <div key={i}>
            <h4 className="font-serif text-[19px] font-medium mb-2.5 tracking-[-0.015em]">
              <span className="text-rust font-normal mr-2">⌗</span>
              {item.title}
            </h4>
            <p className="text-[14.5px] text-ink-soft leading-[1.55]">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
