const steps = [
  {
    label: "Tell us once",
    title: "Your last period, your usual brands.",
    body: "One short conversation on WhatsApp. Brand of pads, painkiller you trust, comfort foods. Two minutes.",
  },
  {
    label: "We watch the calendar",
    title: "You forget. We don't.",
    body: "Cycle learns your rhythm over a few months and gets sharper each cycle. Never spammy.",
  },
  {
    label: "Two days early",
    title: '"Want me to prep your kit?"',
    body: "One WhatsApp. Same brands as last time, plus anything you mentioned craving. Reply YES, EDIT, or SKIP.",
  },
  {
    label: "You tap pay",
    title: "Cart's ready in your Instamart.",
    body: "We never touch your money. You open the app, see everything sitting there, pay. Delivered in 25 minutes.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 max-md:py-16 border-t border-line">
      <div className="section-label">How it works</div>
      <h2 className="font-serif text-[clamp(32px,4.5vw,52px)] font-normal tracking-[-0.025em] leading-[1.05] max-w-[18ch] mb-16">
        Four small steps. Then <em className="italic text-wine">never</em> again.
      </h2>

      <div className="grid grid-cols-4 gap-8 max-lg:grid-cols-2 max-lg:gap-y-10 max-sm:grid-cols-1">
        {steps.map((step, i) => (
          <div key={i}>
            <div className="font-serif italic text-[18px] text-wine mb-4">
              <span className="text-ink-soft mr-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              {step.label}
            </div>
            <h3 className="font-serif text-[22px] font-medium leading-tight mb-3 tracking-[-0.02em]">
              {step.title}
            </h3>
            <p className="text-[14.5px] text-ink-soft leading-[1.55]">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
