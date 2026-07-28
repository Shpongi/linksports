"use client";

import Image from "next/image";
import type { ReactNode } from "react";

export const PLAYER = {
  username: "DAVI",
  name: "Davi",
  position: "Left Midfielder",
  points: "800",
  videos: "48",
  kickups: "74",
  rank: "11",
  photo: "/athletes/player.png",
};

export const BRANDS = [
  { name: "Adidas", src: "/brands/ready/adidas.png" },
  { name: "Nike", src: "/brands/ready/nike.png" },
  { name: "Columbia", src: "/brands/ready/columbia.png" },
  { name: "Decathlon", src: "/brands/ready/decathlon.png" },
  { name: "Fanatics", src: "/brands/ready/fanatics.png" },
  { name: "Lululemon", src: "/brands/ready/lululemon.png" },
  { name: "Sport Chek", src: "/brands/ready/sportchek.png" },
  { name: "Sporting Life", src: "/brands/ready/sportinglife.png" },
  { name: "Cabela's", src: "/brands/ready/cabelas.png" },
] as const;

const PURPLE = "#3f1cb0";

export function PhoneFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone-notch" />
      <div className="phone-screen">{children}</div>
    </div>
  );
}

export function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`relative z-10 flex items-center justify-between px-5 pt-3 text-[11px] font-semibold ${
        dark ? "text-white" : "text-black"
      }`}
    >
      <span>10:28</span>
      <div className="flex items-center gap-1.5 opacity-80">
        <span className="text-[10px]">●●●</span>
        <span className="text-[10px]">Wi‑Fi</span>
        <span>62%</span>
      </div>
    </div>
  );
}

function BrandLogos({
  count = 6,
  size = 22,
}: {
  count?: number;
  size?: number;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5">
      {BRANDS.slice(0, count).map((b) => (
        <div
          key={b.name}
          className="flex items-center justify-center rounded-md bg-white"
          style={{ width: size + 8, height: size + 8 }}
          title={b.name}
        >
          <Image
            src={b.src}
            alt={b.name}
            width={size}
            height={size}
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
}

function MultiCardTilePreview({
  variant = "logos",
  cardSrc = "/multicards/sports-multicard.png",
}: {
  variant?: "logos" | "giftcard";
  cardSrc?: string;
}) {
  if (variant === "giftcard") {
    return (
      <div className="mt-1.5 overflow-hidden rounded-md border border-[#3f1cb0]/20 bg-white shadow-sm">
        <Image
          src={cardSrc}
          alt="Sports MultiCard example"
          width={374}
          height={231}
          className="h-auto w-full object-cover"
        />
      </div>
    );
  }

  return (
    <>
      <p className="mb-1.5 text-[9px] text-neutral-500">Spend at sports brands</p>
      <BrandLogos count={6} size={14} />
    </>
  );
}

export function PlayerProfileScreen({ highlight }: { highlight?: boolean }) {
  return (
    <div className="flex h-full flex-col bg-[#f4f2f8]">
      <StatusBar />
      <div className="flex items-center gap-3 px-4 pb-2 pt-3">
        <span className="text-xl text-black">←</span>
        <h2 className="flex-1 text-center text-[17px] font-bold text-black -ml-5">
          Player Profile
        </h2>
      </div>

      <div className="mx-4 mt-1 flex flex-1 flex-col rounded-[28px] bg-gradient-to-b from-[#ece8f4] to-[#ddd5ef] px-4 pb-4 pt-7 shadow-sm">
        <div className="relative mx-auto">
          <div
            className="h-[132px] w-[132px] overflow-hidden rounded-full border-[5px] shadow-[0_0_20px_rgba(63,28,176,0.3)]"
            style={{ borderColor: PURPLE }}
          >
            <Image
              src={PLAYER.photo}
              alt={PLAYER.username}
              width={132}
              height={132}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -right-1 top-1 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#e8c84a] bg-[#f5d84a] text-center text-[8px] font-extrabold leading-tight text-[#2a2200] shadow-md">
            {PLAYER.points}
            <br />
            Points
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center gap-1.5">
          <p
            className="text-[20px] font-extrabold tracking-wide"
            style={{ color: PURPLE }}
          >
            {PLAYER.username}
          </p>
          <span
            className="flex h-4 w-4 items-center justify-center rounded-full text-[9px] text-white"
            style={{ background: PURPLE }}
          >
            ✓
          </span>
        </div>

        <div className="mt-4 flex rounded-2xl bg-white px-2 py-3 shadow-sm">
          {[
            ["Videos Sent", PLAYER.videos],
            ["Kick-ups Meter", PLAYER.kickups],
            ["Ranking Position", PLAYER.rank],
          ].map(([label, value], i) => (
            <div
              key={label}
              className={`flex flex-1 flex-col items-center ${
                i < 2 ? "border-r border-black/10" : ""
              }`}
            >
              <span className="text-[9px] text-neutral-500">{label}</span>
              <span className="mt-1 text-lg font-extrabold text-neutral-900">
                {value}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-auto pt-5 text-center text-[10px] tracking-wide text-neutral-500">
          👆 TAP TO FLIP
        </p>
      </div>

      <div className="space-y-2.5 p-4 pb-5">
        <button
          type="button"
          className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-[15px] font-bold text-white ${
            highlight ? "anim-pulse ring-2 ring-[#c4b5fd]" : ""
          }`}
          style={{ background: PURPLE }}
        >
          <span aria-hidden>♡</span> Support Player
        </button>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#3f1cb0]/35 bg-white py-3 text-[14px] font-bold"
          style={{ color: PURPLE }}
        >
          View Feed
        </button>
      </div>
    </div>
  );
}

export function DonationScreen({
  mode = "cash",
  highlightMulti = false,
  showMethodChoice = true,
  multiCardVariant = "logos",
  multiCardImage = "/multicards/sports-multicard.png",
}: {
  mode?: "cash" | "multicard";
  highlightMulti?: boolean;
  showMethodChoice?: boolean;
  multiCardVariant?: "logos" | "giftcard";
  multiCardImage?: string;
}) {
  const currency = mode === "multicard" ? "USD" : "BRL";
  const currencies =
    mode === "multicard" ? (["USD", "CAD"] as const) : (["BRL", "USD", "CAD"] as const);

  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <div className="flex items-center gap-3 px-4 pb-2 pt-3">
        <span className="text-xl text-black">←</span>
        <h2 className="flex-1 text-center text-[17px] font-bold text-black -ml-5">
          Make a Donation
        </h2>
      </div>

      <div className="flex-1 overflow-hidden px-4 pb-2">
        <div className="relative flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-br from-[#4a22c4] to-[#2a1180] p-3">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-white/30">
            <Image
              src={PLAYER.photo}
              alt={PLAYER.name}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0 text-white">
            <p className="text-[10px] opacity-80">Donating to</p>
            <p className="truncate text-[14px] font-bold leading-tight">
              {PLAYER.name}
            </p>
            <p className="text-[11px] opacity-90">{PLAYER.position}</p>
          </div>
          <span className="absolute right-3 top-3 text-2xl opacity-20">♡</span>
        </div>

        <div className="mt-2.5 rounded-xl bg-[#ebe6f8] px-3 py-2">
          <p className="text-[11px] font-bold" style={{ color: PURPLE }}>
            Donation privacy
          </p>
          <p className="mt-0.5 text-[9px] leading-snug text-[#5a4a8a]">
            Records, fees, and tax evidence may be retained when required.
          </p>
        </div>

        {showMethodChoice && (
          <>
            <p className="mt-2.5 text-[13px] font-bold text-neutral-800">
              How do you want to support?
            </p>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              <button
                type="button"
                className={`rounded-xl border px-2 py-2 text-left ${
                  mode === "cash"
                    ? "border-[#3f1cb0] bg-[#ebe6f8]"
                    : "border-neutral-200 bg-white"
                }`}
              >
                <p className="text-[11px] font-bold text-neutral-900">Cash</p>
                <p className="text-[9px] text-neutral-500">Direct wallet credit</p>
              </button>
              <button
                type="button"
                className={`rounded-xl border px-2 py-2 text-left ${
                  mode === "multicard"
                    ? "border-[#3f1cb0] bg-[#ebe6f8] ring-2 ring-[#3f1cb0]/40"
                    : "border-neutral-200 bg-white"
                } ${highlightMulti ? "anim-pulse" : ""}`}
              >
                <p className="text-[11px] font-bold" style={{ color: PURPLE }}>
                  Sports MultiCard
                </p>
                <MultiCardTilePreview
                  variant={multiCardVariant}
                  cardSrc={multiCardImage}
                />
              </button>
            </div>
          </>
        )}

        <p className="mt-2.5 text-[13px] font-bold text-neutral-800">
          Choose an amount
        </p>
        <div className="mt-1.5 flex rounded-lg bg-neutral-100 p-0.5 text-[11px] font-semibold">
          {currencies.map((c) => (
            <span
              key={c}
              className={`flex-1 rounded-md py-1.5 text-center ${
                c === currency
                  ? "bg-[#ebe6f8] text-[#3f1cb0]"
                  : "text-neutral-500"
              }`}
            >
              {c}
            </span>
          ))}
        </div>
        <div className="mt-1.5 grid grid-cols-4 gap-1.5">
          {["10", "25", "50", "100"].map((a, i) => (
            <span
              key={a}
              className={`rounded-full border py-1.5 text-center text-[10px] font-semibold ${
                i === 2
                  ? "border-[#3f1cb0] bg-[#ebe6f8] text-[#3f1cb0]"
                  : "border-neutral-200 text-neutral-700"
              }`}
            >
              {currency} {a}
            </span>
          ))}
        </div>
        <p className="mt-2 text-center text-[20px] font-extrabold text-neutral-900">
          {currency} 50.00
        </p>
        <div className="mx-auto mt-1 h-0.5 w-full" style={{ background: PURPLE }} />

        {!showMethodChoice && (
          <>
            <p className="mt-3 text-[12px] text-neutral-500">Message (Optional)</p>
            <div className="mt-1 h-0.5 w-full bg-[#3f1cb0]/40" />
            <p className="mt-1 text-right text-[10px] text-neutral-400">0/500</p>
          </>
        )}
      </div>

      <div className="p-4 pt-1">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-[15px] font-bold text-white"
          style={{ background: PURPLE }}
        >
          {mode === "multicard" ? "♡ Donate MultiCard" : "♡ Donate"}
        </button>
      </div>
    </div>
  );
}

export function PendingApprovalScreen() {
  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div
          className="anim-in flex h-16 w-16 items-center justify-center rounded-full text-2xl text-white"
          style={{ background: PURPLE }}
        >
          …
        </div>
        <h3
          className="anim-in mt-5 font-[family-name:var(--font-sora)] text-xl font-extrabold"
          style={{ color: PURPLE }}
        >
          Payment received
        </h3>
        <p className="anim-in mt-3 text-[13px] leading-relaxed text-neutral-600">
          Your transaction is pending approval. Once approved, we&apos;ll send
          the Sports MultiCard to{" "}
          <span className="font-bold text-neutral-900">{PLAYER.name}</span>
          .
        </p>
        <div className="anim-in mt-6 w-full rounded-2xl border border-[#3f1cb0]/20 bg-[#f4f0fb] p-4 text-left">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#3f1cb0]/70">
            Sports MultiCard
          </p>
          <p className="mt-1 font-[family-name:var(--font-sora)] text-2xl font-extrabold text-neutral-900">
            USD 50.00
          </p>
          <div className="mt-3">
            <BrandLogos count={6} size={18} />
          </div>
        </div>
      </div>
      <div className="p-4">
        <button
          type="button"
          className="w-full rounded-2xl py-3.5 text-[14px] font-bold text-white"
          style={{ background: PURPLE }}
        >
          Done
        </button>
      </div>
    </div>
  );
}

export function MultiCardConfirmScreen() {
  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <div className="flex items-center gap-3 px-4 pb-1 pt-3">
        <span className="text-xl text-black">←</span>
        <h2 className="flex-1 text-center text-[17px] font-bold text-black -ml-5">
          Pay with card
        </h2>
      </div>

      <div className="flex-1 overflow-hidden px-4 pb-2">
        <div className="rounded-2xl bg-gradient-to-br from-[#4a22c4] to-[#2a1180] p-3 text-white">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/70">
                Sports MultiCard
              </p>
              <p className="mt-0.5 truncate text-[12px] text-white/85">
                To {PLAYER.name} · @{PLAYER.username}
              </p>
            </div>
            <p className="shrink-0 font-[family-name:var(--font-sora)] text-xl font-extrabold">
              USD 50
            </p>
          </div>
          <div className="mt-2.5">
            <BrandLogos count={6} size={14} />
          </div>
        </div>

        <p className="mt-3 text-[12px] font-bold text-neutral-800">
          Card information
        </p>
        <div className="mt-1.5 overflow-hidden rounded-xl border border-neutral-200">
          <div className="flex items-center justify-between border-b border-neutral-200 px-3 py-2.5">
            <span className="text-[12px] text-neutral-400">Card number</span>
            <div className="flex items-center gap-1">
              {["Visa", "MC", "Amex"].map((l) => (
                <span
                  key={l}
                  className="rounded bg-neutral-100 px-1.5 py-0.5 text-[8px] font-bold text-neutral-500"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="border-r border-neutral-200 px-3 py-2.5 text-[12px] text-neutral-400">
              MM / YY
            </div>
            <div className="flex items-center justify-between px-3 py-2.5 text-[12px] text-neutral-400">
              <span>CVC</span>
              <span className="text-[10px] text-neutral-300">123</span>
            </div>
          </div>
        </div>

        <p className="mt-3 text-[12px] font-bold text-neutral-800">
          Billing address
        </p>
        <div className="mt-1.5 flex items-center justify-between rounded-xl border border-neutral-200 px-3 py-2.5">
          <div>
            <p className="text-[9px] text-neutral-400">Country or region</p>
            <p className="text-[12px] font-medium text-neutral-800">Canada</p>
          </div>
          <span className="text-neutral-400">▾</span>
        </div>

        <p className="mt-3 text-[11px] leading-snug text-neutral-500">
          Pay by credit card in LinkSports. On success, an API call issues the
          MultiCard to the athlete.
        </p>
      </div>

      <div className="p-4 pt-1">
        <button
          type="button"
          className="anim-pulse flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-[15px] font-bold text-white"
          style={{ background: PURPLE }}
        >
          <span aria-hidden>🔒</span> Pay USD 50.00
        </button>
      </div>
    </div>
  );
}

export function ScreenshotPhone({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <PhoneFrame>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-top"
        sizes="280px"
        priority
      />
    </PhoneFrame>
  );
}

export function GiftCardVisual() {
  return (
    <div className="anim-in w-full max-w-sm">
      <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#4a22c4] via-[#3f1cb0] to-[#1f0d6b] p-5 shadow-[0_25px_60px_rgba(63,28,176,0.45)]">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-[#b8f255]/10" />
        <div className="relative">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
                Sports MultiCard
              </p>
              <p className="mt-2 font-[family-name:var(--font-sora)] text-2xl font-extrabold text-white">
                Gift Card
              </p>
            </div>
            <div className="flex rounded-lg bg-white/15 p-0.5 text-[11px] font-bold text-white backdrop-blur">
              <span className="rounded-md bg-white px-2.5 py-1 text-[#3f1cb0]">
                USD
              </span>
              <span className="px-2.5 py-1 text-white/80">CAD</span>
            </div>
          </div>
          <p className="mt-6 font-[family-name:var(--font-sora)] text-4xl font-extrabold tracking-tight text-white">
            $50.00
          </p>
          <p className="mt-1 text-[12px] text-white/70">
            Available in USD &amp; CAD · nine sports retailers
          </p>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {BRANDS.map((b) => (
              <div
                key={b.name}
                className="flex h-12 items-center justify-center rounded-xl bg-white px-2"
              >
                <Image
                  src={b.src}
                  alt={b.name}
                  width={36}
                  height={36}
                  className="max-h-8 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SportsMultiCardImage() {
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-md">
      <Image
        src="/multicards/sports-multicard.png"
        alt="Sports MultiCard"
        width={374}
        height={231}
        className="h-auto w-full object-cover"
      />
    </div>
  );
}

/** Athlete brand-selection / redeem site */
export function BrandSelectionScreen({
  highlightCard = false,
}: {
  highlightCard?: boolean;
}) {
  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
        <span className="text-[14px] text-[#1e3a5f]">💬</span>
        <div className="flex items-center gap-1.5">
          <span
            className="flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-extrabold text-white"
            style={{ background: PURPLE }}
          >
            LS
          </span>
          <span
            className="font-[family-name:var(--font-sora)] text-[15px] font-extrabold tracking-tight"
            style={{ color: PURPLE }}
          >
            LinkSports
          </span>
        </div>
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#1e3a5f]/40 text-[11px] text-[#1e3a5f]">
          ?
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4 pt-5 text-center">
        <p className="text-[15px] font-bold leading-snug text-[#1e3a5f]">
          You received a gift card from a LinkSports supporter
        </p>

        <div
          className={`relative mx-auto mt-5 w-full max-w-[240px] ${
            highlightCard ? "z-10" : ""
          }`}
        >
          {highlightCard && (
            <>
              <div
                className="pointer-events-none absolute -inset-3 rounded-2xl border-[3px] border-dashed"
                style={{ borderColor: PURPLE }}
                aria-hidden
              />
              <div
                className="anim-pulse pointer-events-none absolute -inset-3 rounded-2xl"
                style={{ boxShadow: `0 0 0 3px ${PURPLE}33` }}
                aria-hidden
              />
              <span
                className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[9px] font-bold text-white shadow"
                style={{ background: PURPLE }}
              >
                Customizable gift card
              </span>
            </>
          )}
          <SportsMultiCardImage />
        </div>

        <h3 className="mt-3 text-[17px] font-extrabold text-[#1e3a5f]">
          $100 Sports Multicard
        </h3>

        <a
          href="#"
          className="mt-1 inline-block text-[12px] font-medium text-[#2563eb] underline"
          onClick={(e) => e.preventDefault()}
        >
          Visit Sports Multicard&apos;s site
        </a>

        <p className="mt-3 text-left text-[11px] leading-relaxed text-neutral-600">
          Let them choose their favorite brand! The Sports Multicard is the
          ultimate gift. The recipient chooses the exact gift card they want —
          Adidas, Nike, Decathlon, and more.
        </p>

        <button
          type="button"
          className="mt-5 w-full rounded-lg border-2 py-3 text-[13px] font-bold"
          style={{ borderColor: PURPLE, color: PURPLE }}
        >
          Select The Brand To Use It In
        </button>
      </div>
    </div>
  );
}
