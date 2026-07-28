"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
  BrandSelectionScreen,
  DonationScreen,
  GiftCardVisual,
  MultiCardConfirmScreen,
  PendingApprovalScreen,
  PhoneFrame,
  PLAYER,
  PlayerProfileScreen,
  ScreenshotPhone,
} from "@/components/PhoneScreens";

type Slide = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  bullets?: string[];
  visual: ReactNode;
};

const SLIDES: Slide[] = [
  {
    id: "title",
    kicker: "Product demo",
    title: "Sports MultiCard inside LinkSports",
    body: "A walkthrough of how supporters send gear funding — not just cash — with LinkSports owning the full UI.",
    visual: (
      <div className="anim-in relative">
        <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(63,28,176,0.35),transparent_65%)]" />
        <PhoneFrame>
          <div className="flex h-full flex-col justify-between bg-gradient-to-br from-[#4a22c4] via-[#3f1cb0] to-[#1f0d6b] px-5 pb-5 pt-12 text-white">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
                Sports MultiCard
              </p>
              <h3 className="mt-4 font-[family-name:var(--font-sora)] text-[26px] font-extrabold leading-tight">
                One card.
                <br />
                Nine sports brands.
              </h3>
            </div>
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
              <p className="text-[11px] leading-relaxed text-white/85">
                Built into the LinkSports support flow — redeem at Adidas, Nike,
                Decathlon, and more.
              </p>
            </div>
          </div>
        </PhoneFrame>
      </div>
    ),
  },
  {
    id: "context",
    kicker: "The app today",
    title: "LinkSports lets fans support rising athletes",
    body: "Supporters open a player profile and tap Support Player to fund training, gear, and progress.",
    bullets: [
      "Young athletes build a profile and ranking",
      "Fans contribute to help them advance",
      "Checkout today is cash-first",
    ],
    visual: (
      <ScreenshotPhone
        src="/screens/profile-anon.png"
        alt="Player Profile — Support Player"
      />
    ),
  },
  {
    id: "donation-today",
    kicker: "Current flow",
    title: "Make a Donation is cash-only",
    body: "Amount, currency, optional message — then pay. No way yet to send store-spendable value.",
    visual: (
      <PhoneFrame>
        <DonationScreen mode="cash" showMethodChoice={false} />
      </PhoneFrame>
    ),
  },
  {
    id: "idea",
    kicker: "The opportunity",
    title: "Send a MultiCard instead of cash",
    body: "Supporters fund what athletes actually need — gear and apparel — while athletes spend at trusted sports retailers.",
    bullets: [
      "Purpose-bound support (sports spend)",
      "One gift card across major brands",
      "Fits the existing Support Player moment",
    ],
    visual: <GiftCardVisual />,
  },
  {
    id: "integration",
    kicker: "Integration",
    title: "LinkSports owns the UI — MultiCard via API",
    body: "All screens stay in LinkSports. After a successful payment, LinkSports calls the GlobeTopper API to issue and deliver the gift card.",
    bullets: [
      "LinkSports builds Cash vs MultiCard choice",
      "Supporter pays inside LinkSports checkout",
      "On success → GlobeTopper API issues the MultiCard",
    ],
    visual: (
      <PhoneFrame>
        <DonationScreen mode="multicard" highlightMulti />
      </PhoneFrame>
    ),
  },
  {
    id: "step-1",
    kicker: "Flow · 1 of 5",
    title: "Supporter taps Support Player",
    body: "Same LinkSports moment as today — no change to discovery or profile.",
    visual: (
      <PhoneFrame>
        <PlayerProfileScreen highlight />
      </PhoneFrame>
    ),
  },
  {
    id: "step-2",
    kicker: "Flow · 2 of 5",
    title: "Choose Sports MultiCard",
    body: "These are ideas only — not locked designs. Rough concepts for how the MultiCard choice could look inside LinkSports.",
    bullets: [
      "Idea 1 — logo grid of included sports brands",
      "Idea 2 — custom Sports MultiCard artwork",
      "Final look is up to LinkSports",
    ],
    visual: (
      <div className="anim-in flex flex-wrap items-end justify-center gap-3 md:gap-4">
        <div className="flex flex-col items-center gap-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
            Idea 1 · Logos
          </p>
          <PhoneFrame>
            <DonationScreen
              mode="multicard"
              highlightMulti
              multiCardVariant="logos"
            />
          </PhoneFrame>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
            Idea 2 · Custom card
          </p>
          <PhoneFrame>
            <DonationScreen
              mode="multicard"
              highlightMulti
              multiCardVariant="giftcard"
              multiCardImage="/multicards/sports-multicard.png"
            />
          </PhoneFrame>
        </div>
      </div>
    ),
  },
  {
    id: "step-3",
    kicker: "Flow · 3 of 5",
    title: "Pay by credit card in LinkSports",
    body: "The supporter enters card details and pays for the MultiCard. Checkout stays fully inside LinkSports.",
    bullets: [
      "Card number, expiry, and CVC",
      "Billing country",
      "On success (defined by LinkSports) → API issues the MultiCard",
    ],
    visual: (
      <PhoneFrame>
        <MultiCardConfirmScreen />
      </PhoneFrame>
    ),
  },
  {
    id: "step-4",
    kicker: "Flow · 4 of 5",
    title: "Pending approval, then delivery",
    body: `After payment, the transaction awaits approval. Once approved, the MultiCard is sent to ${PLAYER.name}.`,
    visual: (
      <PhoneFrame>
        <PendingApprovalScreen />
      </PhoneFrame>
    ),
  },
  {
    id: "brand-select",
    kicker: "Flow · 5 of 5",
    title: "Athlete opens the brand selection site",
    body: "The redeem experience can be branded for LinkSports — fonts, look, and the gift card artwork itself.",
    bullets: [
      "Redeem site styled with LinkSports fonts & branding",
      "Gift card design is fully customizable",
      "Athlete selects which sports brand to redeem at",
    ],
    visual: (
      <PhoneFrame>
        <BrandSelectionScreen highlightCard />
      </PhoneFrame>
    ),
  },
  {
    id: "how-it-works",
    kicker: "How it works",
    title: "Payment first, then API issuance",
    body: "After a successful payment, the API returns the MultiCard redemption site URL to LinkSports. LinkSports then delivers that redemption link to the end user.",
    bullets: [
      "1. Supporter selects MultiCard + amount",
      "2. LinkSports completes payment",
      "3. API response returns the MultiCard redemption site URL",
      "4. LinkSports delivers the redemption to the end user",
    ],
    visual: (
      <div className="anim-in w-full max-w-sm space-y-3">
        {[
          {
            label: "LinkSports UI",
            desc: "Profile · Cash / MultiCard · amount · checkout",
            tone: "bg-[#3f1cb0] text-white border-[#3f1cb0]",
          },
          {
            label: "Successful payment",
            desc: "Charge completed inside LinkSports",
            tone: "bg-white/10 border-white/15 text-white",
          },
          {
            label: "API response",
            desc: "Returns MultiCard redemption site URL to LinkSports",
            tone: "bg-[#ebe6f8] text-[#3f1cb0] border-[#ebe6f8]",
          },
          {
            label: "LinkSports delivery",
            desc: "Delivers the redemption link to the end user",
            tone: "bg-white/10 border-white/15 text-white",
          },
        ].map((row) => (
          <div
            key={row.label}
            className={`rounded-2xl border px-4 py-3 ${row.tone}`}
          >
            <p className="text-[12px] font-bold uppercase tracking-wide">
              {row.label}
            </p>
            <p className="mt-1 text-[13px] opacity-80">{row.desc}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "thanks",
    kicker: "Thank you",
    title: "GlobeTopper × LinkSports",
    body: "Your transaction is pending approval. Once approved, we'll send the Sports MultiCard to Davi.",
    bullets: [
      "Full UI owned by LinkSports",
      "MultiCard issued via API after payment",
      "Purple CTA language preserved end-to-end",
    ],
    visual: (
      <div className="anim-in relative">
        <PhoneFrame>
          <BrandSelectionScreen />
        </PhoneFrame>
      </div>
    ),
  },
];

export function Presentation() {
  const [index, setIndex] = useState(0);
  const total = SLIDES.length;
  const slide = SLIDES[index];

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => Math.min(total - 1, Math.max(0, i + delta)));
    },
    [total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        go(1);
      }
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(-1);
      }
      if (e.key === "Home") setIndex(0);
      if (e.key === "End") setIndex(total - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, total]);

  return (
    <div className="deck">
      <header className="relative z-10 flex shrink-0 items-center justify-between px-6 py-3 md:px-10 md:py-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#3f1cb0] font-[family-name:var(--font-sora)] text-xs font-extrabold text-white">
            SM
          </span>
          <div>
            <p className="font-[family-name:var(--font-sora)] text-sm font-bold tracking-tight">
              Sports MultiCard
            </p>
            <p className="text-[11px] text-[var(--muted)]">
              LinkSports integration · API
            </p>
          </div>
        </div>
        <p className="text-[12px] tabular-nums text-[var(--muted)]">
          {index + 1} / {total}
        </p>
      </header>

      <main className="deck-main relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-8 px-6 py-4 md:grid-cols-2 md:items-center md:gap-10 md:px-10 md:py-6">
        <div key={slide.id} className="anim-in order-2 md:order-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c4b5fd]">
            {slide.kicker}
          </p>
          <h1 className="mt-3 max-w-lg font-[family-name:var(--font-sora)] text-3xl font-extrabold leading-[1.15] tracking-tight text-white md:text-[2.35rem] lg:text-[2.5rem]">
            {slide.title}
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--muted)] md:text-base">
            {slide.body}
          </p>
          {slide.bullets && (
            <ul className="mt-5 space-y-2.5">
              {slide.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2.5 text-[14px] text-white/90"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3f1cb0]" />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          key={`${slide.id}-v`}
          className="anim-fade order-1 flex justify-center md:order-2 md:justify-end"
        >
          {slide.visual}
        </div>
      </main>

      <footer className="deck-footer flex items-center justify-between gap-4 px-6 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 md:px-10 md:pb-5">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={index === 0}
          className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition enabled:hover:bg-white/10 disabled:opacity-30"
        >
          ← Back
        </button>

        <div className="flex flex-1 items-center justify-center gap-1.5">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index
                  ? "w-6 bg-[#3f1cb0]"
                  : "w-1.5 bg-white/25 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          disabled={index === total - 1}
          className="rounded-full bg-[#3f1cb0] px-4 py-2 text-sm font-bold text-white transition enabled:hover:brightness-110 disabled:opacity-30"
        >
          Next →
        </button>
      </footer>
    </div>
  );
}
