const faqs = [
  {
    q: "Do I need a separate app?",
    a: "No. Cycle lives entirely on WhatsApp. The cart it preps lives in your existing Swiggy Instamart app. That's it — no install, no dashboard.",
  },
  {
    q: "Will it auto-charge me for groceries?",
    a: "Never. Cycle prepares your cart, but the payment happens inside your own Instamart app, on your own UPI or card, with your own tap. We never touch your money.",
  },
  {
    q: "What if my cycle is irregular?",
    a: 'Cycle predicts a window — say, "likely Wed to Fri" — not an exact date. After 2–3 logged cycles it adapts to your specific rhythm. You can also adjust it manually anytime by replying to any message.',
  },
  {
    q: "Can I change brands or items?",
    a: "Reply EDIT to any prep message and tell us what to change. Cycle remembers and updates your defaults — so next time, the right brand is already in.",
  },
  {
    q: "Why ₹99/month — what am I paying for?",
    a: "The prediction, the WhatsApp service, and the cart-prep happen on our end. You still pay Instamart for groceries separately. The fee covers the agent. Founding members keep this free for a year.",
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
