export default function Nav() {
  return (
    <nav className="py-7 flex justify-between items-center border-b border-line">
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
      <div className="flex gap-7 items-center text-[14px]">
        <a
          href="#how"
          className="text-ink-soft hover:text-wine transition-colors max-md:hidden"
        >
          How it works
        </a>
        <a
          href="#trust"
          className="text-ink-soft hover:text-wine transition-colors max-md:hidden"
        >
          Privacy
        </a>
        <a
          href="#faq"
          className="text-ink-soft hover:text-wine transition-colors max-md:hidden"
        >
          FAQ
        </a>
        <a
          href="#join"
          className="bg-ink text-cream px-[18px] py-2.5 rounded-full font-medium hover:bg-wine transition-colors"
        >
          Join waitlist
        </a>
      </div>
    </nav>
  );
}
