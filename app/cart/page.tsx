import { PERIOD_KIT_ITEMS } from "@/lib/cart-items";

export default function CartPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm animate-fade-up">
        <h1 className="font-serif text-[32px] leading-tight text-ink mb-2">
          Your period kit.
        </h1>
        <p className="text-[15px] text-ink-soft mb-8">
          Tap each item to open it on Instamart, add it to your cart, then check out
          there — your saved address and payment method are handled by Swiggy.
        </p>

        <div className="space-y-3">
          {PERIOD_KIT_ITEMS.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-5 py-4 bg-white/60 border border-line rounded-2xl text-[15px] text-ink hover:border-wine hover:bg-white/80 transition-colors"
            >
              {item.name}
              <span className="text-wine">→</span>
            </a>
          ))}
        </div>

        <p className="mt-8 text-[13px] text-ink-soft text-center">
          We never see your address or payment details — that stays with Swiggy.
        </p>
      </div>
    </main>
  );
}
