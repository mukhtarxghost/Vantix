"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowUp,
  ArrowDown,
  Play,
  Camera,
  Music2,
  Plus,
  Package,
  Fingerprint,
  Aperture,
  CalendarDays,
} from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/components/system/MotionContext";

/**
 * 02 — ACQUIRE
 *
 * Reference-matched composition (1:1 to the supplied screenshot):
 *   INTRO   — stage label / large headline / supporting copy / mono statement
 *   STRIP   — ONE continuous horizontal system bar: 01 PRODUCT → 05 CUSTOMERS
 *   PANELS  — five large panels in one row, joined by green connector nodes:
 *             PRODUCT / CONTENT CREATION / AD DISTRIBUTION / LIVE PERFORMANCE / NEW CUSTOMERS
 *   BAND    — monochrome image + "A demand engine" copy + outcomes + metadata
 *
 * Geometry is the source of truth — imagery only fills the frames.
 * Placeholder assets live in /public/images/acquire and can be swapped 1:1.
 */

/* ─── Placeholder assets (same frames — drop replacements in later) ─── */
const IMG = {
  product: "/images/acquire/perfume-product.jpg",
  dominant: "/images/acquire/model-creator.jpg",
  c1: "/images/acquire/bts-creator.jpg",
  c2: "/images/acquire/fashion-shoot.jpg",
  c3: "/images/acquire/product-shoot-1.jpg",
  c4: "/images/acquire/social-content.jpg",
  band: "/images/acquire/bts-creator.jpg",
};

const CHANNEL_THUMBS = [
  "/images/acquire/product-shoot-2.jpg",
  "/images/acquire/social-content.jpg",
  "/images/acquire/product-shoot-3.jpg",
  "/images/acquire/creative-studio.jpg",
  "/images/acquire/fashion-shoot.jpg",
];

/* ─── Image slot — geometry only. The photo fills the frame; it never defines it. ─── */
function ImageSlot({
  src,
  alt,
  imgClassName = "",
}: {
  src?: string;
  alt: string;
  imgClassName?: string;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#101010]">
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1280px) 50vw, 25vw"
          className={`object-cover object-center ${imgClassName}`}
        />
      ) : (
        <>
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)
              `,
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-white/20">
              {alt}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Green connector: line + nodes spanning exactly one grid gap (24px) ─── */
function ConnectorNode() {
  return (
    <span className="relative z-10 flex h-[11px] w-[11px] shrink-0 items-center justify-center rounded-full border border-[rgba(52,211,153,0.45)] bg-[#0a0a0a]">
      <span className="h-[4.5px] w-[4.5px] rounded-full bg-[var(--accent)]" />
    </span>
  );
}

function Connector() {
  return (
    <div
      aria-hidden
      className="absolute left-[-12px] top-[40%] z-20 hidden -translate-x-1/2 -translate-y-1/2 items-center lg:flex"
      style={{ width: 24 }}
    >
      <ConnectorNode />
      <span className="h-px flex-1 bg-[rgba(52,211,153,0.6)]" />
      <ConnectorNode />
    </div>
  );
}

/* ─── Panel shell — header / body / footer index ─── */
function Panel({
  index,
  title,
  tag,
  children,
}: {
  index: string;
  title: string;
  tag?: string;
  children: ReactNode;
}) {
  return (
    <div className="acq-panel relative flex flex-col rounded-[3px] border border-white/[0.08] bg-[#0a0a0a] p-3.5 max-lg:min-h-[340px] lg:h-[395px]">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[10.5px] font-bold uppercase tracking-[0.13em] text-white/85">
          {title}
        </h3>
        {tag ? (
          <span className="shrink-0 font-mono text-[7.5px] uppercase tracking-[0.08em] text-white/35">
            {tag}
          </span>
        ) : null}
      </div>
      <div className="mt-3 flex min-h-0 flex-1 flex-col">{children}</div>
      <p className="mt-2.5 font-mono text-[8px] font-medium tracking-[0.14em] text-white/25">
        [ {index} ]
      </p>
    </div>
  );
}

/* ─── Duration pill on video frames ─── */
function Duration({ t }: { t: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-[3px] bg-black/70 px-1.5 py-[3px] text-[7.5px] font-medium text-white/90">
      <Play size={6} className="fill-current" />
      {t}
    </span>
  );
}

/* ─── Channel brand marks ─── */
function GoogleAdsMark() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden>
      <rect x="10" y="3" width="7" height="17" rx="3.5" transform="rotate(28 13.5 11.5)" fill="#FBBC04" />
      <rect x="7" y="3" width="7" height="17" rx="3.5" transform="rotate(-28 10.5 11.5)" fill="#4285F4" />
      <rect x="2" y="15.5" width="12" height="6" rx="3" fill="#34A853" />
    </svg>
  );
}

function ChannelIcon({ kind }: { kind: string }) {
  if (kind === "ig")
    return (
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] bg-[linear-gradient(45deg,#f9ce34,#ee2a7b,#6228d7)]">
        <Camera size={13} strokeWidth={2.2} className="text-white" />
      </span>
    );
  if (kind === "tt")
    return (
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] border border-white/[0.12] bg-[#111111]">
        <Music2 size={12} className="text-white" />
      </span>
    );
  if (kind === "fb")
    return (
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1877F2] text-[13px] font-bold leading-none text-white">
        f
      </span>
    );
  if (kind === "yt")
    return (
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] bg-[#FF0000]">
        <Play size={11} className="fill-white text-white" />
      </span>
    );
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] border border-white/[0.12] bg-[#111111]">
      <GoogleAdsMark />
    </span>
  );
}

/* ─── Mini green charts ─── */
function Bars({ heights }: { heights: number[] }) {
  return (
    <span className="flex h-[24px] w-[70px] items-end gap-[2px]" aria-hidden>
      {heights.map((h, i) => (
        <span
          key={i}
          className="w-[4px] rounded-[1px] bg-[var(--accent)]"
          style={{ height: `${h}%` }}
        />
      ))}
    </span>
  );
}

function LineChart() {
  return (
    <svg viewBox="0 0 78 24" className="h-[24px] w-[78px] overflow-visible" aria-hidden>
      <polyline
        points="0,4 11,7 22,6 33,11 44,13 55,17 66,16 78,20"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Data ─── */
const STAGES = [
  { number: "01", label: "Your product", note: "What you sell" },
  { number: "02", label: "Content", note: "Shoots, models, short-form" },
  { number: "03", label: "Attention", note: "Reach on the right channels" },
  { number: "04", label: "Demand", note: "Searches, visits, enquiries" },
  { number: "05", label: "Customers", note: "People ready to buy" },
];

const FEATURES = [
  { label: "Product understanding", Icon: Package },
  { label: "Brand positioning", Icon: Fingerprint },
  { label: "Visual direction", Icon: Aperture },
  { label: "Shoot planning", Icon: CalendarDays },
];

const CHIPS = ["Product Shoots", "Model Content", "UGC Style", "Short-form Videos"];

const CHANNELS = [
  { name: "Instagram", sub: "Campaign active", icon: "ig", img: CHANNEL_THUMBS[0] },
  { name: "TikTok", sub: "Campaign active", icon: "tt", img: CHANNEL_THUMBS[1] },
  { name: "Facebook", sub: "Campaign active", icon: "fb", img: CHANNEL_THUMBS[2] },
  { name: "YouTube", sub: "Testing creatives", icon: "yt", img: CHANNEL_THUMBS[3] },
  { name: "Google Ads", sub: "High intent audience", icon: "ga", img: CHANNEL_THUMBS[4] },
];

const METRICS: {
  label: string;
  value: string;
  trend: string;
  dir: "up" | "down";
  chart: "bars" | "line";
  bars?: number[];
}[] = [
  { label: "Reach", value: "124.8K", trend: "62%", dir: "up", chart: "bars", bars: [30, 45, 35, 55, 42, 60, 50, 68, 58, 75, 65, 85] },
  { label: "Clicks", value: "8,420", trend: "48%", dir: "up", chart: "bars", bars: [25, 40, 30, 48, 38, 55, 45, 62, 52, 70, 60, 80] },
  { label: "Enquiries", value: "1,342", trend: "71%", dir: "up", chart: "bars", bars: [20, 35, 28, 45, 35, 52, 44, 60, 50, 68, 58, 78] },
  { label: "Cost per Enquiry", value: "₹38", trend: "40%", dir: "down", chart: "line" },
];

const CUSTOMERS = [
  { name: "Riya S.", source: "Instagram", time: "2m ago", status: "Enquiry" },
  { name: "Arjun M.", source: "Facebook", time: "12m ago", status: "Enquiry" },
  { name: "Neha K.", source: "TikTok", time: "28m ago", status: "Interested" },
  { name: "Sameer R.", source: "Website", time: "1h ago", status: "Enquiry" },
  { name: "Priya T.", source: "Instagram", time: "2h ago", status: "Booked" },
];

const OUTCOMES = ["Better content", "Higher quality leads", "Lower acquisition cost", "Compound growth"];

export default function Acquire() {
  const sectionRef = useRef<HTMLElement>(null);
  const { reducedMotion } = useMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(".acq-intro > *", {
        opacity: 0,
        y: 24,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 70%", once: true },
      });
      gsap.from(".acq-strip", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".acq-strip", start: "top 85%", once: true },
      });
      gsap.from(".acq-panel", {
        opacity: 0,
        y: 28,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".acq-panels", start: "top 75%", once: true },
      });
      gsap.from(".acq-band-grid > *", {
        opacity: 0,
        y: 20,
        stagger: 0.09,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".acq-band", start: "top 80%", once: true },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="acquire"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#050505] pb-14 pt-10 lg:pt-12"
    >
      {/* Subtle technical grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative">
        {/* ═══ INTRO — headline / copy / statement ═══ */}
        <div className="container">
          <div className="acq-intro grid items-start gap-y-10 lg:grid-cols-[1.32fr_1fr_0.38fr] lg:gap-x-16">
            <div>
              <p className="font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--accent)]">
                Stage 01 — Acquire
              </p>
              <h2 className="mt-5 text-[clamp(2.1rem,3.15vw,3rem)] font-bold leading-[1.06] tracking-[-0.045em] text-white">
                Content built around
                <br />
                your product, aimed
                <br />
                at the people who buy it.
              </h2>
            </div>

            <p className="max-w-[430px] text-[13px] leading-[1.7] text-white/55 lg:mt-[46px]">
              We create high-quality content around your actual product — with
              real models, creators, and production systems. Then we distribute
              it across the right channels to turn attention into enquiries.
            </p>

            <div className="flex flex-wrap items-center gap-4 lg:mt-7">
              <a
                href="/book"
                className="chamfer-button inline-flex items-center gap-2 bg-white px-6 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-black transition-colors hover:bg-[var(--accent)]"
              >
                Book a call
                <ArrowUpRight size={12} strokeWidth={2.5} />
              </a>
              <a
                href="#convert"
                className="inline-flex items-center border border-white/40 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-white hover:bg-white hover:text-black"
              >
                See examples
              </a>
            </div>

            <div className="font-mono text-[9px] font-medium uppercase leading-[2.1] tracking-[0.18em] text-white/30 lg:mt-[38px]">
              <p>Real</p>
              <p>Creative.</p>
              <p>Real reach.</p>
              <p>Real customers.</p>
            </div>
          </div>

          {/* ═══ SYSTEM STRIP — one continuous horizontal bar ═══ */}
          <div className="acq-strip mt-7 grid grid-cols-1 overflow-hidden rounded-[3px] border border-white/[0.08] bg-[#0a0a0a]/70 sm:grid-cols-2 lg:grid-cols-5">
            {STAGES.map((stage, i) => (
              <div
                key={stage.number}
                className="relative border-white/[0.05] px-5 py-3.5 max-sm:[&:not(:first-child)]:border-t sm:max-lg:[&:nth-child(even)]:border-r sm:max-lg:[&:nth-child(n+3)]:border-t lg:border-l lg:first:border-l-0"
              >
                {i < STAGES.length - 1 && (
                  <ArrowRight
                    size={13}
                    strokeWidth={1.5}
                    className="absolute right-7 top-1/2 hidden -translate-y-1/2 text-white/25 lg:block"
                  />
                )}
                <p className="font-mono text-[9px] font-medium tracking-[0.1em] text-white/35">
                  {stage.number}
                </p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white/90">
                  {stage.label}
                </p>
                <p className="mt-0.5 text-[10px] leading-snug text-white/40">{stage.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ FIVE LARGE PANELS — one row, joined by green connectors ═══ */}
        <div className="acq-panels mt-6 grid grid-cols-1 gap-4 px-4 sm:px-6 md:grid-cols-2 md:gap-5 lg:grid-cols-[1.69fr_3.1fr_1.73fr_1.59fr_1.87fr] lg:gap-6 lg:px-9">
          {/* ── 01 · YOUR PRODUCT ── */}
          <Panel index="01" title="Your product">
            <div className="relative min-h-[180px] flex-1 overflow-hidden rounded-[2px] border border-white/[0.08]">
              <ImageSlot src={IMG.product} alt="Your product" />
            </div>
            <div className="mt-3">
              <p className="text-[12px] leading-[1.45] text-white/80">Your product.</p>
              <p className="text-[12px] leading-[1.45] text-white/40">Our creative system.</p>
            </div>
            <ul className="mt-3.5 space-y-2">
              {FEATURES.map(({ label, Icon }) => (
                <li key={label} className="flex items-center gap-2.5">
                  <span className="flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-[3px] border border-white/[0.14] bg-white/[0.03]">
                    <Icon size={9} strokeWidth={2} className="text-white/50" />
                  </span>
                  <span className="text-[10.5px] text-white/50">{label}</span>
                </li>
              ))}
            </ul>
          </Panel>

          {/* ── 02 · CONTENT CREATION ── */}
          <Panel index="02" title="Content creation" tag="[ shoot → edit → deploy ]">
            <div className="flex min-h-0 flex-1 gap-2.5">
              {/* Dominant frame */}
              <div className="relative w-[47%] overflow-hidden rounded-[2px] border border-white/[0.1]">
                <ImageSlot src={IMG.dominant} alt="Real model filming product content" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent px-3 pb-2.5 pt-12">
                  <p className="text-[11px] font-bold uppercase leading-[1.35] tracking-[0.01em] text-white">
                    Real models
                    <br />
                    Real product
                    <br />
                    Real results
                  </p>
                  <div className="mt-2">
                    <Duration t="0:24" />
                  </div>
                </div>
              </div>
              {/* 2×2 content frames */}
              <div className="grid min-w-0 flex-1 grid-cols-2 grid-rows-2 gap-2.5">
                <div className="relative overflow-hidden rounded-[2px] border border-white/[0.08]">
                  <ImageSlot src={IMG.c1} alt="Creator content frame" />
                  <div className="absolute bottom-1.5 left-1.5">
                    <Duration t="0:18" />
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-[2px] border border-white/[0.08]">
                  <ImageSlot src={IMG.c2} alt="Short-form content frame" />
                  <div className="absolute bottom-1.5 left-1.5">
                    <Duration t="0:18" />
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-[2px] border border-white/[0.08]">
                  <ImageSlot src={IMG.c3} alt="Product shoot frame" />
                </div>
                <div className="relative overflow-hidden rounded-[2px] border border-white/[0.08]">
                  <ImageSlot src={IMG.c4} alt="Social content frame" />
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/[0.12] px-3 py-[5px] text-[9px] text-white/55"
                >
                  {chip}
                </span>
              ))}
            </div>
          </Panel>

          {/* ── 03 · AD DISTRIBUTION ── */}
          <Panel index="03" title="Ad distribution" tag="[ multi-channel ]">
            <Connector />
            <div className="flex min-h-0 flex-1 flex-col">
              {CHANNELS.map((channel) => (
                <div
                  key={channel.name}
                  className="flex min-h-0 flex-1 items-center gap-2.5 border-b border-white/[0.05] last:border-b-0"
                >
                  <ChannelIcon kind={channel.icon} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10.5px] font-medium text-white/85">
                      {channel.name}
                    </p>
                    <p className="mt-px truncate text-[8.5px] text-white/35">{channel.sub}</p>
                  </div>
                  <div className="relative h-[42px] w-[34px] shrink-0 overflow-hidden rounded-[2px] border border-white/[0.1]">
                    <ImageSlot src={channel.img} alt={`${channel.name} creative`} />
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="mt-2 flex shrink-0 items-center gap-2.5 rounded-[2px] border border-white/[0.08] px-3 py-2 text-left transition-colors hover:border-white/[0.2]"
              >
                <Plus size={11} className="text-white/45" />
                <span className="text-[10px] text-white/55">Create new campaign</span>
              </button>
            </div>
          </Panel>

          {/* ── 04 · LIVE PERFORMANCE ── */}
          <Panel index="04" title="Live performance" tag="[ last 30 days ]">
            <Connector />
            <div className="flex min-h-0 flex-1 flex-col">
              {METRICS.map((metric) => (
                <div
                  key={metric.label}
                  className="flex min-h-0 flex-1 flex-col justify-center border-b border-white/[0.05] py-1 last:border-b-0"
                >
                  <p className="text-[9.5px] text-white/45">{metric.label}</p>
                  <div className="mt-1.5 flex items-end justify-between gap-2">
                    <p className="text-[19px] font-bold leading-none tracking-[-0.02em] text-white">
                      {metric.value}
                    </p>
                    <div className="flex items-center gap-2.5">
                      <span className="flex items-center gap-0.5 text-[9px] font-semibold text-[var(--accent)]">
                        {metric.dir === "up" ? (
                          <ArrowUp size={9} strokeWidth={2.5} />
                        ) : (
                          <ArrowDown size={9} strokeWidth={2.5} />
                        )}
                        {metric.trend}
                      </span>
                      {metric.chart === "bars" && metric.bars ? (
                        <Bars heights={metric.bars} />
                      ) : (
                        <LineChart />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* ── 05 · NEW CUSTOMERS ── */}
          <Panel index="05" title="New customers">
            <Connector />
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="flex min-h-0 flex-1 flex-col">
                {CUSTOMERS.map((customer) => {
                  const booked = customer.status === "Booked";
                  return (
                    <div
                      key={customer.name}
                      className="flex min-h-0 flex-1 items-center gap-2.5 border-b border-white/[0.05]"
                    >
                      <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] font-mono text-[8px] tracking-[0.05em] text-white/60">
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[10.5px] font-medium text-white/85">
                          {customer.name}
                        </p>
                        <p className="mt-px truncate text-[8.5px] text-white/35">
                          {customer.source} · {customer.time}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2 py-[3px] text-[8.5px] font-medium ${
                          booked
                            ? "bg-[var(--accent)] text-black"
                            : "border border-[rgba(52,211,153,0.4)] bg-[rgba(52,211,153,0.08)] text-[var(--accent)]"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-2 flex shrink-0 items-center gap-1.5 border-t border-white/[0.05] pt-2.5">
                <span className="text-[10px] text-white/50">View all leads</span>
                <ArrowRight size={11} className="text-white/40" />
              </div>
            </div>
          </Panel>
        </div>

        {/* ═══ BOTTOM BAND — demand engine ═══ */}
        <div className="acq-band relative mt-2 border-t border-white/[0.06]">
          {/* Left monochrome image — bleeds to the viewport edge */}
          <div className="absolute inset-y-0 left-0 hidden w-[27%] lg:block">
            <ImageSlot
              src={IMG.band}
              alt="Vantix brand film"
              imgClassName="opacity-55 grayscale brightness-90"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#050505]/20 to-[#050505]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />
          </div>

          <div className="acq-band-grid relative grid items-start gap-10 px-5 pb-20 pt-10 sm:px-10 lg:grid-cols-[1.32fr_1.5fr_0.72fr] lg:gap-x-14 lg:pb-9 lg:pl-[30.5%] lg:pr-[6%] lg:pt-9">
            <div>
              <p className="font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-[rgba(52,211,153,0.55)]">
                More than just ads.
              </p>
              <h3 className="mt-3 text-[clamp(1.5rem,1.95vw,1.85rem)] font-bold leading-[1.15] tracking-[-0.03em] text-white">
                A demand engine
                <br />
                for your business.
              </h3>
            </div>

            <div>
              <p className="max-w-[310px] text-[12px] leading-[1.75] text-white/50">
                We don&apos;t just post content. We build a repeatable system to
                create attention, generate demand, and keep your pipeline
                filled — so you never depend on luck again.
              </p>
              <a
                href="/book"
                className="mt-6 inline-flex items-center gap-2.5 border border-white/25 px-6 py-3.5 font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:border-white hover:bg-white hover:text-black"
              >
                See content examples
                <ArrowUpRight size={11} strokeWidth={2} />
              </a>
            </div>

            <div className="font-mono text-[8px] font-medium uppercase leading-[2.3] tracking-[0.18em] text-white/30">
              {OUTCOMES.map((outcome) => (
                <p key={outcome}>{outcome}</p>
              ))}
            </div>
          </div>

          {/* Bottom-left metadata over the image */}
          <div className="absolute bottom-6 left-5 z-10 sm:left-8 lg:left-9">
            <p className="flex items-center gap-2 font-mono text-[8px] font-medium uppercase tracking-[0.22em] text-white/45">
              <span className="inline-block h-[6px] w-[6px] border-l border-t border-white/50" />
              Vantix
            </p>
            <p className="mt-1.5 flex items-center gap-2 font-mono text-[8px] font-medium uppercase tracking-[0.22em] text-white/45">
              <span className="inline-block h-[5px] w-[5px] bg-[var(--accent)]" />
              Acquire
            </p>
          </div>

          {/* Bottom-right metadata */}
          <p className="absolute bottom-6 right-[6%] hidden font-mono text-[8px] font-medium uppercase tracking-[0.2em] text-white/30 lg:block">
            Attention to growth <span className="mx-1 text-white/20">—</span>{" "}
            <span className="text-white/50">01 / 05</span>
          </p>
        </div>
      </div>
    </section>
  );
}
