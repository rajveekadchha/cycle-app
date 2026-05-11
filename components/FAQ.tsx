const faqs = [
  {
    q: "Do I need a separate app?",
    a: "No. Cycle works entirely over email. The cart it preps lives in your existing Swiggy Instamart app. No install, no dashboard, nothing new to open.",
  },
  {
    q: "Will it auto-charge me for groceries?",
    a: "Never. Cycle prepares your cart, but the payment happens inside your own Instamart app, on your own UPI or card, with your own tap. We never touch your money.",
  },
  {
    q: "What if my cycle is irregular?",
    a: 'Cycle predicts a window — say, "likely Wed to Fri" — not an exact date. After 2–3 cycles it adapts to your specific rhythm and gets more accurate over time.',
  },
  {
    q: "Can I change what's in my cart?",
    a: "Yes — you can update your preferences anytime from your account. Whatever you set is what gets prepped next time.",
  },
  {
    q: "Why ₹99/month — what am I paying for?",
    a: "The prediction and the cart-prep happen on our end. You still pay Instamart for groceries separately. The ₹99 covers the service. Founding members keep this free for 2 months.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20 border-t border-line">
      <div className="grid grid-cols-[1fr_2fr] gap-20 max-lg:grid-cols-1 max-lg:gap-8">
        <div>
          <div className="section-label">Questions</div>
          <h2 className="font-serif text-[clamp(32px,4.5vw,52px)] font-normal tracking-[-0.025em] leading-[1.05] max-w-[18ch]">
            A few things <em className="italic text-wine">worth</em> asking.
          </h2>
        </div>
        <div>
          {faqs.map((item, i) => (
            <details key={i} className="border-b border-line py-[22px] group">
              <summary className="font-serif text-[19px] font-medium cursor-pointer list-none flex justify-between items-center tracking-[-0.015em] [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="font-serif text-2xl font-light text-wine transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3.5 text-ink-soft text-[15px] leading-[1.6] max-w-[60ch]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
