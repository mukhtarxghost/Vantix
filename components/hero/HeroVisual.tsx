"use client";

import React from "react";
import {
  Calendar,
  Mail,
  MessageCircle,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import { ThreeDMarquee, type WallCard } from "@/components/ui/3d-marquee";
import { DitherShader } from "@/components/ui/dither-shader";

/* ─────────────────────────────────────────────
   VANTIX CARD SHELL — one surface language for
   every panel in the 3D ecosystem: same header,
   same hairlines, same metadata footer.
   ───────────────────────────────────────────── */

function CardShell({
  label,
  status = "LIVE",
  tone = "neutral",
  footer,
  children,
  className = "",
}: {
  label: string;
  status?: string | null;
  tone?: "neutral" | "green";
  /** [left, right] — right is accent-tinted */
  footer?: [string, string];
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full w-full flex-col overflow-hidden rounded-[4px] bg-[#1e1e1e] ${
        tone === "green" ? "ring-1 ring-[var(--accent)]/25" : ""
      } ${className}`}
    >
      <div className="flex items-center justify-between border-b border-white/[0.09] px-3.5 py-2.5">
        <span className="mono-label text-[9px] text-white/85">{label}</span>
        {status && (
          <span
            className={`flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.16em] ${
              tone === "green" ? "text-[var(--accent)]" : "text-white/40"
            }`}
          >
            <span
              className={`h-1 w-1 rounded-full ${
                tone === "green" ? "bg-[var(--accent)]" : "bg-white/35"
              }`}
            />
            {status}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-3.5 py-3">{children}</div>
      {footer && (
        <div className="flex items-center justify-between border-t border-white/[0.09] px-3.5 py-2.5">
          <span className="mono-label text-[8px] text-white/40">{footer[0]}</span>
          <span className="mono-label text-[8px] text-[var(--accent)]/90">{footer[1]}</span>
        </div>
      )}
    </div>
  );
}

function Hairline() {
  return <div className="h-px w-full shrink-0 bg-white/[0.08]" />;
}

/* ── shared micro-primitives ── */

function Dot({ className = "" }: { className?: string }) {
  return <span className={`h-1 w-1 shrink-0 rounded-full ${className}`} />;
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-[3px] border border-white/[0.14] px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-[0.14em] text-white/45">
      {children}
    </span>
  );
}

function SourceIcon({ children, tone = false }: { children: React.ReactNode; tone?: boolean }) {
  return (
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px] border ${
        tone
          ? "border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)]"
          : "border-white/[0.16] bg-white/[0.04] text-white/60"
      }`}
    >
      {children}
    </span>
  );
}

function Avatar({ initials, live = false }: { initials: string; live?: boolean }) {
  return (
    <span
      className={`relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[8px] font-bold text-white/90 ${
        live ? "border-[var(--accent)]/35 bg-[var(--accent)]/10" : "border-white/[0.16] bg-white/[0.05]"
      }`}
    >
      {initials}
    </span>
  );
}

function Bar({ pct, accent = false }: { pct: number; accent?: boolean }) {
  return (
    <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/[0.08]">
      <div
        className={`h-full rounded-full ${accent ? "bg-[var(--accent)]/80" : "bg-white/25"}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function Spark({
  points,
  fill = false,
  className = "",
}: {
  points: number[];
  fill?: boolean;
  className?: string;
}) {
  const w = 100;
  const h = 32;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const norm = points.map(
    (p, i) =>
      `${((i / (points.length - 1)) * w).toFixed(1)},${(
        h - 3 -
        ((p - min) / (max - min || 1)) * (h - 6)
      ).toFixed(1)}`,
  );
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={className} aria-hidden>
      {fill && <polygon points={`0,${h} ${norm.join(" ")} ${w},${h}`} fill="var(--accent)" opacity="0.10" />}
      <polyline
        points={norm.join(" ")}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   ACQUIRE — attention flowing in as identifiable
   demand: one queue, every channel.
   ───────────────────────────────────────────── */

const inboundLeads = [
  { name: "Sarah M.", src: "IG", status: "NEW", time: "2m" },
  { name: "James W.", src: "WA", status: "HOT", time: "9m" },
  { name: "Noah P.", src: "WEB", status: "NEW", time: "23m" },
  { name: "Mia K.", src: "CALL", status: "NEW", time: "41m" },
];

function InboundCard() {
  return (
    <CardShell label="INBOUND / ACQUIRE" footer={["LAST 24H", "+128 IN"]}>
      <div className="flex flex-col">
        {inboundLeads.map((l, i) => (
          <React.Fragment key={l.name}>
            {i > 0 && <Hairline />}
            <div className="flex items-center justify-between py-[7px]">
              <div className="flex items-center gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-[3px] border border-white/[0.16] bg-white/[0.04] text-[7px] font-bold text-white/75">
                  {l.src}
                </span>
                <span className="text-[10px] font-medium text-white/95">{l.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="mono-label text-[7px] text-white/35">{l.time}</span>
                <span
                  className={`text-[8px] font-bold uppercase tracking-[0.14em] ${
                    l.status === "HOT" ? "text-[var(--accent)]" : "text-white/45"
                  }`}
                >
                  {l.status}
                </span>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </CardShell>
  );
}

const enquiries = [
  { icon: <MessageCircle size={10} strokeWidth={2} />, text: "Do you service Austin?", time: "1m", unread: true },
  { icon: <Mail size={10} strokeWidth={2} />, text: "Quote request — 14 seats", time: "12m", unread: true },
  { icon: <Phone size={10} strokeWidth={2} />, text: "Missed call · +1 (415) ••• 82", time: "26m", unread: false },
];

function EnquiriesCard() {
  return (
    <CardShell label="ENQUIRIES / ACQUIRE" status={null} footer={["AVG FIRST RESPONSE", "38S · AI"]}>
      <div className="flex flex-col">
        {enquiries.map((e, i) => (
          <React.Fragment key={i}>
            {i > 0 && <Hairline />}
            <div className="flex items-center gap-2.5 py-[7px]">
              <SourceIcon tone={e.unread}>{e.icon}</SourceIcon>
              <span className="flex-1 truncate text-[10px] text-white/80">{e.text}</span>
              <span className="mono-label shrink-0 text-[7px] text-white/35">{e.time}</span>
              <Dot className={e.unread ? "bg-[var(--accent)]" : "bg-transparent"} />
            </div>
          </React.Fragment>
        ))}
      </div>
    </CardShell>
  );
}

const channels = [
  { name: "Google", spend: "$1,240", roas: "3.4x", pct: 86 },
  { name: "Meta", spend: "$860", roas: "3.1x", pct: 60 },
  { name: "LinkedIn", spend: "$300", roas: "2.6x", pct: 21 },
];

function CampaignCard() {
  return (
    <CardShell label="CAMPAIGNS / ACQUIRE" status="ACTIVE" footer={["MONTHLY SPEND $2,400", "ROAS 3.2X"]}>
      {/* The funnel: content → attention → demand */}
      <div className="grid grid-cols-3 gap-px overflow-hidden rounded-[3px] border border-white/[0.10] bg-white/[0.07]">
        {[
          { v: "12.4K", l: "REACH" },
          { v: "1.8K", l: "CLICKS" },
          { v: "142", l: "ENQUIRIES" },
        ].map((s) => (
          <div key={s.l} className="bg-[#161616] px-1.5 py-2 text-center">
            <p className="text-[11px] font-semibold leading-none tracking-[-0.02em] text-white">{s.v}</p>
            <p className="mono-label mt-1 text-[6px] text-white/45">{s.l}</p>
          </div>
        ))}
      </div>
      <div className="mt-2.5 flex flex-col gap-2">
        {channels.map((c, i) => (
          <div key={c.name}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[9px] font-medium text-white/80">{c.name}</span>
              <span className="mono-label text-[7px] text-white/40">
                {c.spend} · <span className="text-[var(--accent)]/90">{c.roas}</span>
              </span>
            </div>
            <Bar pct={c.pct} accent={i === 0} />
          </div>
        ))}
      </div>
    </CardShell>
  );
}

/* ─────────────────────────────────────────────
   CONVERT — demand handled the moment it lands:
   pages, chat, voice, and a booked calendar.
   ───────────────────────────────────────────── */

function LandingCard() {
  return (
    <CardShell label="LANDING / CONVERT" footer={["LAST 7 DAYS", "+18.4% W/W"]}>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[24px] font-semibold leading-none tracking-[-0.04em] text-white">
            4.2<span className="text-[var(--accent)]">%</span>
          </p>
          <p className="mono-label mt-1.5 text-[8px] text-white/50">CONVERSION RATE</p>
        </div>
        <div className="text-right">
          <p className="text-[13px] font-semibold leading-none tracking-[-0.02em] text-white/95">12,480</p>
          <p className="mono-label mt-1 text-[7px] text-white/40">VISITORS</p>
        </div>
      </div>
      <div className="mt-3.5 flex flex-col gap-2">
        <div className="flex items-center gap-2.5">
          <span className="mono-label w-14 text-[7px] text-white/40">VISITORS</span>
          <Bar pct={100} />
        </div>
        <div className="flex items-center gap-2.5">
          <span className="mono-label w-14 text-[7px] text-white/40">LEADS</span>
          <Bar pct={42} accent />
        </div>
        <div className="flex items-center justify-end">
          <span className="mono-label text-[7px] text-white/40">524 CAPTURED</span>
        </div>
      </div>
    </CardShell>
  );
}

function ConversationCard() {
  return (
    <CardShell label="AI AGENT / CONVERT" status="REPLYING" tone="green" footer={["CHANNEL · WEB CHAT", "0 WAIT"]}>
      <div className="flex flex-col gap-2">
        <div className="max-w-[88%] self-start rounded-[6px] border border-white/[0.16] bg-white/[0.04] px-2.5 py-1.5">
          <p className="text-[9px] leading-relaxed text-white/85">
            &ldquo;Do you have availability for a consultation next week?&rdquo;
          </p>
        </div>
        <div className="max-w-[88%] self-end rounded-[6px] border border-[var(--accent)]/25 bg-[var(--accent)]/[0.07] px-2.5 py-1.5">
          <p className="text-[9px] leading-relaxed text-white/95">
            &ldquo;Yes — Tuesday 10:00 works. Want me to hold it?&rdquo;
          </p>
        </div>
        <div className="flex items-center gap-1 self-end px-1 pt-0.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-[var(--accent)]/60" />
          ))}
        </div>
      </div>
    </CardShell>
  );
}

function VoiceCard() {
  return (
    <CardShell label="VOICE AI / CONVERT" status="ON CALL" tone="green" footer={["SARAH CHEN · 00:47", "QUALIFIED → BOOKED"]}>
      <div className="flex h-10 items-center gap-[3px]">
        {Array.from({ length: 26 }).map((_, i) => {
          const h = Math.round((4 + Math.abs(Math.sin(i * 0.8)) * 28) * 10) / 10;
          return (
            <div
              key={i}
              className={`w-[3px] flex-1 rounded-full ${i > 17 ? "bg-[var(--accent)]/75" : "bg-white/[0.22]"}`}
              style={{ height: `${h}px` }}
            />
          );
        })}
      </div>
      <div className="mt-2.5 flex items-center gap-2 border-t border-white/[0.08] pt-2">
        <Dot className="bg-[var(--accent)]" />
        <p className="truncate text-[9px] text-white/55">&ldquo;…perfect, Tuesday at 10 works for me…&rdquo;</p>
      </div>
    </CardShell>
  );
}

function BookingCard() {
  return (
    <CardShell label="BOOKING / CONVERT" status={null} footer={["AUTO-CONFIRMED", "CRM SYNCED"]}>
      <div className="flex items-center justify-between rounded-[6px] border border-[var(--accent)]/20 bg-[var(--accent)]/[0.05] px-3 py-2.5">
        <div className="flex items-center gap-3">
          <span className="mono-label text-[8px] text-white/50">TUE</span>
          <span className="text-[13px] font-semibold tracking-[-0.02em] text-white">10:00</span>
        </div>
        <span className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[var(--accent)] text-[7px] font-bold text-black">
            ✓
          </span>
          CONFIRMED
        </span>
      </div>
      <div className="mt-2.5 flex items-center justify-between rounded-[6px] border border-white/[0.12] px-3 py-2">
        <span className="mono-label text-[8px] text-white/45">NEXT OPEN</span>
        <span className="text-[11px] font-medium text-white/90">WED · 14:30</span>
      </div>
    </CardShell>
  );
}

const schedule = [
  { time: "09:00", name: "Consult — Sarah C.", state: "CONFIRMED", done: true },
  { time: "10:30", name: "Intro — Leo P.", state: "CONFIRMED", done: true },
  { time: "13:00", name: "Follow-up — Maya R.", state: "PENDING", done: false },
];

function ScheduleCard() {
  return (
    <CardShell label="APPOINTMENTS / TODAY" status="TUE 14 MAY" footer={["3 OF 5 SLOTS BOOKED", "CALENDAR LIVE"]}>
      <div className="flex flex-col">
        {schedule.map((s, i) => (
          <React.Fragment key={s.time}>
            {i > 0 && <Hairline />}
            <div className="flex items-center justify-between py-[7px]">
              <div className="flex items-center gap-2.5">
                <span className="mono-label w-8 text-[8px] text-white/55">{s.time}</span>
                <span className="text-[10px] font-medium text-white/90">{s.name}</span>
              </div>
              <span
                className={`text-[7px] font-bold uppercase tracking-[0.14em] ${
                  s.done ? "text-[var(--accent)]/90" : "text-white/35"
                }`}
              >
                {s.state}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </CardShell>
  );
}

/* ─────────────────────────────────────────────
   MANAGE — every relationship in one living
   record: pipeline, profiles, automation, queue.
   ───────────────────────────────────────────── */

const crmRows = [
  { name: "Alex Morgan", status: "ACTIVE", value: "$2,400", on: true },
  { name: "Sarah Chen", status: "LEAD", value: "$1,800", on: false },
  { name: "James Wilson", status: "RETURN", value: "$3,200", on: true },
  { name: "David Kim", status: "WIN-BACK", value: "$1,500", on: false },
];

function CrmCard() {
  return (
    <CardShell label="CRM / MANAGE" footer={["3,412 RECORDS", "SYNCED"]}>
      <div className="flex flex-col">
        {crmRows.map((r, i) => (
          <React.Fragment key={r.name}>
            {i > 0 && <Hairline />}
            <div className="flex items-center justify-between py-[7px]">
              <div className="flex items-center gap-2">
                <Dot className={r.on ? "bg-[var(--accent)]" : "bg-white/25"} />
                <span className="text-[10px] font-medium text-white/95">{r.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="mono-label text-[7px] text-white/40">{r.status}</span>
                <span className="text-[10px] font-medium tabular-nums text-white/95">{r.value}</span>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </CardShell>
  );
}

function ProfileCard() {
  return (
    <CardShell label="PROFILE / MANAGE" status={null} footer={["NEXT ACTION", "FOLLOW-UP → TUE"]}>
      <div className="flex items-center gap-3">
        <Avatar initials="AM" live />
        <div>
          <p className="text-[12px] font-semibold tracking-[-0.01em] text-white">Alex Morgan</p>
          <p className="mono-label mt-0.5 text-[7px] text-white/45">CUSTOMER · SINCE JAN 2025</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-[12px] font-semibold leading-none tracking-[-0.02em] text-white">$4,820</p>
          <p className="mono-label mt-1 text-[7px] text-white/45">LIFETIME VALUE</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {["PREMIUM", "2 APPT", "REFERRER"].map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>
      <div className="mt-3 border-t border-white/[0.08] pt-2.5">
        <div className="flex items-center justify-between">
          <span className="mono-label text-[7px] text-white/40">ORDERS · 12M</span>
          <span className="mono-label text-[7px] text-[var(--accent)]/90">↑ 34%</span>
        </div>
        <Spark points={[3, 4, 4, 6, 5, 7, 8, 7, 9, 11]} fill className="mt-1.5 h-6 w-full" />
      </div>
    </CardShell>
  );
}

const workflowSteps = [
  { label: "ENQUIRY RECEIVED", time: "NOW", done: true },
  { label: "FOLLOW-UP TRIGGERED", time: "+1H", done: true },
  { label: "RE-ENGAGE · 14 DAYS", time: "SCHEDULED", done: false },
];

function WorkflowCard() {
  return (
    <CardShell label="WORKFLOWS / MANAGE" status="RUNNING">
      <div className="flex flex-col">
        {workflowSteps.map((s, i) => (
          <div key={s.label} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-full border text-[8px] ${
                  s.done
                    ? "border-[var(--accent)] bg-[var(--accent)] font-bold text-black"
                    : "border-white/[0.20] text-white/[0.5]"
                }`}
              >
                {s.done ? "✓" : "·"}
              </span>
              {i < workflowSteps.length - 1 && <span className="my-0.5 h-4 w-px bg-white/[0.12]" />}
            </div>
            <div className="flex flex-1 items-center justify-between pb-1.5 pt-0.5">
              <span className={`text-[9px] font-medium ${s.done ? "text-white/95" : "text-white/50"}`}>
                {s.label}
              </span>
              <span className={`mono-label text-[7px] ${s.done ? "text-[var(--accent)]/80" : "text-white/40"}`}>
                {s.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

const queue = [
  { icon: <Phone size={10} strokeWidth={2} />, who: "David K.", what: "Win-back call", due: "14:00", hot: true },
  { icon: <Mail size={10} strokeWidth={2} />, who: "Maya R.", what: "Proposal email", due: "16:30", hot: false },
  { icon: <Calendar size={10} strokeWidth={2} />, who: "Noah P.", what: "Demo reminder", due: "TOMORROW", hot: false },
];

function QueueCard() {
  return (
    <CardShell label="FOLLOW-UP / MANAGE" status="QUEUED" footer={["3 READY FOR RE-ENGAGEMENT", "PERSONALISED"]}>
      <div className="flex flex-col">
        {queue.map((q, i) => (
          <React.Fragment key={q.who}>
            {i > 0 && <Hairline />}
            <div className="flex items-center gap-2.5 py-[7px]">
              <SourceIcon tone={q.hot}>{q.icon}</SourceIcon>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[10px] font-medium text-white/95">{q.who}</p>
                <p className="truncate text-[8px] text-white/45">{q.what}</p>
              </div>
              <span className={`mono-label shrink-0 text-[7px] ${q.hot ? "text-[var(--accent)]/90" : "text-white/40"}`}>
                {q.due}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </CardShell>
  );
}

/* ─────────────────────────────────────────────
   GROW — the output side of the system:
   retention, repeat revenue, compounding growth.
   ───────────────────────────────────────────── */

function GrowthCard() {
  const bars = [22, 30, 27, 44, 38, 58, 52, 74, 66, 88, 100];
  return (
    <CardShell label="CUSTOMERS / GROWTH" status="GROW" tone="green" footer={["RETENTION 78%", "↑ REVENUE"]}>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="text-[20px] font-semibold leading-none tracking-[-0.04em] text-white">
            +32<span className="text-[var(--accent)]">%</span>
          </p>
          <p className="mono-label mt-1 text-[7px] text-white/50">NEW CUSTOMERS</p>
        </div>
        <div>
          <p className="text-[20px] font-semibold leading-none tracking-[-0.04em] text-white">
            +18<span className="text-[var(--accent)]">%</span>
          </p>
          <p className="mono-label mt-1 text-[7px] text-white/50">RETURNING</p>
        </div>
      </div>
      <div className="relative mt-3.5">
        <div className="flex items-end gap-1">
          {bars.map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-[2px] ${
                i >= 7 ? "bg-[var(--accent)]" : i >= 4 ? "bg-[var(--accent)]/45" : "bg-white/[0.14]"
              }`}
              style={{ height: `${h * 0.5}px` }}
            />
          ))}
        </div>
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 42"
          preserveAspectRatio="none"
          aria-hidden
        >
          <polyline
            points="2,34 12,30 22,32 32,24 42,26 52,19 62,21 72,14 82,10 94,5"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.8"
            vectorEffect="non-scaling-stroke"
            style={{ filter: "drop-shadow(0 0 6px rgba(52,211,153,0.55))" }}
          />
          <line x1="90" y1="9" x2="97" y2="4.5" stroke="var(--accent)" strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
          <line x1="90" y1="9" x2="93.5" y2="9.5" stroke="var(--accent)" strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </CardShell>
  );
}

function RevenueCard() {
  return (
    <CardShell label="REVENUE / GROW" tone="green" footer={["ARR $578K", "NET RETENTION 118%"]}>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[24px] font-semibold leading-none tracking-[-0.04em] text-white">
            $48.2<span className="text-white/50">K</span>
          </p>
          <p className="mono-label mt-1.5 text-[8px] text-white/50">MRR · MAY</p>
        </div>
        <span className="text-[11px] font-semibold text-[var(--accent)]">+9.2% MoM</span>
      </div>
      <Spark
        points={[28, 30, 29, 33, 32, 36, 35, 39, 42, 41, 45, 48]}
        fill
        className="mt-3 h-10 w-full"
      />
    </CardShell>
  );
}

const cohort = [
  [100, 84, 72, 65, 59],
  [100, 86, 75, 67],
  [100, 88, 79],
  [100, 91],
];

function RetentionCard() {
  return (
    <CardShell label="RETENTION / GROW" status="COHORTS" footer={["RECAPTURED 214", "+11 PT"]}>
      <div className="flex flex-col gap-1">
        <div className="flex gap-1 pl-7">
          {["M0", "M1", "M2", "M3", "M4"].map((m) => (
            <span key={m} className="mono-label flex-1 text-center text-[6px] text-white/35">
              {m}
            </span>
          ))}
        </div>
        {cohort.map((row, r) => (
          <div key={r} className="flex items-center gap-1">
            <span className="mono-label w-7 text-[6px] text-white/35">W{r + 1}</span>
            {Array.from({ length: 5 }).map((_, c) => {
              const v = row[c];
              return (
                <span
                  key={c}
                  className={`h-3.5 flex-1 rounded-[2px] ${
                    v === undefined ? "bg-white/[0.05]" : "bg-[var(--accent)]"
                  }`}
                  style={v === undefined ? undefined : { opacity: 0.14 + (v / 100) * 0.72 }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </CardShell>
  );
}

const pipelineStatus = [
  { stage: "NEW LEAD", count: 248, done: true },
  { stage: "QUALIFIED", count: 173, done: true },
  { stage: "BOOKED", count: 91, done: true },
  { stage: "CUSTOMER", count: 47, done: false },
];

function PipelineStatusCard() {
  return (
    <CardShell label="PIPELINE / CONVERT" status="THIS MONTH" footer={["47 WON · 19% CLOSE", "+15.3% MoM"]}>
      <div className="flex items-center gap-1.5">
        {pipelineStatus.map((s, i) => (
          <React.Fragment key={s.stage}>
            <div className="flex flex-1 flex-col items-center gap-1.5">
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border text-[7px] font-bold ${
                  s.done
                    ? "border-[var(--accent)]/60 bg-[var(--accent)]/15 text-[var(--accent)]"
                    : "border-white/[0.20] text-white/55"
                }`}
              >
                {s.count}
              </span>
              <span className={`mono-label text-[6px] ${s.done ? "text-white/55" : "text-white/35"}`}>{s.stage}</span>
            </div>
            {i < pipelineStatus.length - 1 && <span className="mb-4 h-px w-3 shrink-0 bg-white/[0.14]" />}
          </React.Fragment>
        ))}
      </div>
    </CardShell>
  );
}

function AnalyticsCard() {
  const stats = [
    { v: "6.1x", l: "ROI" },
    { v: "41%", l: "REFERRALS" },
    { v: "92", l: "NPS" },
  ];
  return (
    <CardShell label="ANALYTICS / GROW" status={null} footer={["Q3 · ALL SYSTEMS", "ON TRACK"]}>
      <div className="grid grid-cols-3 gap-px overflow-hidden rounded-[3px] border border-white/[0.10] bg-white/[0.07]">
        {stats.map((s) => (
          <div key={s.l} className="bg-[#161616] px-2 py-2.5 text-center">
            <p className="text-[13px] font-semibold leading-none tracking-[-0.02em] text-white">{s.v}</p>
            <p className="mono-label mt-1 text-[6px] text-white/45">{s.l}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="mono-label text-[7px] text-white/40">CAC PAYBACK</span>
        <span className="mono-label text-[7px] text-white/60">2.1 MONTHS</span>
      </div>
      <div className="mt-1.5">
        <Bar pct={64} accent />
      </div>
    </CardShell>
  );
}

const lifecycleStages = [
  { label: "NEW", count: "1,204", pct: 100 },
  { label: "ACTIVE", count: "862", pct: 72 },
  { label: "REPEAT", count: "391", pct: 33 },
  { label: "ADVOCATE", count: "118", pct: 10 },
];

function LifecycleCard() {
  return (
    <CardShell label="LIFECYCLE / GROW" status="90D" footer={["AVG LIFESPAN 26 MO", "EXPANDING"]}>
      <div className="flex flex-col gap-2.5">
        {lifecycleStages.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2.5">
            <span className="mono-label w-14 text-[7px] text-white/50">{s.label}</span>
            <div className="flex-1">
              <Bar pct={s.pct} accent={i === 3} />
            </div>
            <span className="w-10 text-right text-[10px] font-medium tabular-nums text-white/90">{s.count}</span>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

/* ─────────────────────────────────────────────
   CORE — the dithered Vantix system block.
   The signature panel everything routes through.
   ───────────────────────────────────────────── */

function CoreCard() {
  return (
    <div className="flex h-[300px] w-full flex-col overflow-hidden rounded-[4px] bg-[#1e1e1e] ring-1 ring-[var(--accent)]/35">
      <div className="flex items-center justify-between border-b border-white/[0.09] px-3.5 py-2.5">
        <span className="mono-label text-[9px] text-white/60">VANTIX / CORE</span>
        <span className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
          <span className="relative flex h-1 w-1">
            <span className="absolute h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-40" />
            <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
          </span>
          SYSTEM
        </span>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <DitherShader
          src="/images/Dither2.jpeg"
          gridSize={1}
          ditherMode="bayer"
          colorMode="duotone"
          primaryColor="#0a0a0a"
          secondaryColor="#ffffff"
          tertiaryColor="#34d399"
          preserveGreen
          animated
          animationSpeed={0.016}
          shimmer
          shimmerIntensity={0.05}
          threshold={0.5}
          brightness={-0.05}
          contrast={1.15}
          objectFit="cover"
          className="h-full w-full"
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="display-serif text-[56px] leading-none tracking-[0.02em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.9)]">
            VANTIX
          </span>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-3.5 py-2">
          <span className="mono-label text-[8px] text-white/50">ATTENTION</span>
          <span className="mono-label text-[8px] text-[var(--accent)]">↓</span>
          <span className="mono-label text-[8px] text-white/50">GROWTH</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ASSEMBLY — the pipeline reads along the wall:
   acquire (left) → convert → manage → grow (right),
   with the core at the deepest point of the field.
   Depth (z) lifts flagship surfaces toward the viewer.
   Columns end ragged so the field crops past the
   viewport edges — a wall that keeps going.
   ───────────────────────────────────────────── */

const columns: WallCard[][] = [
  // Column 0 — acquire: attention becomes identifiable demand
  [
    { node: <InboundCard key="inbound" /> },
    { node: <EnquiriesCard key="enquiries" /> },
    { node: <CampaignCard key="campaign" />, z: -28, dim: true },
  ],

  // Column 1 — convert: demand handled the moment it lands
  [
    { node: <LandingCard key="landing" /> },
    { node: <ConversationCard key="conversation" />, z: 36 },
    { node: <VoiceCard key="voice" />, z: 20 },
  ],

  // Column 2 — core + scheduling
  [
    { node: <CoreCard key="core" />, z: 64 },
    { node: <BookingCard key="booking" /> },
    { node: <ScheduleCard key="schedule" /> },
    { node: <PipelineStatusCard key="pipeline" />, z: -24, dim: true },
  ],

  // Column 3 — manage: relationships in one record
  [
    { node: <CrmCard key="crm" /> },
    { node: <ProfileCard key="profile" /> },
    { node: <WorkflowCard key="workflow" /> },
    { node: <QueueCard key="queue" />, z: -28, dim: true },
  ],

  // Column 4 — grow: compounding output
  [
    { node: <GrowthCard key="growth" />, z: 52 },
    { node: <RevenueCard key="revenue" />, z: 28 },
    { node: <RetentionCard key="retention" /> },
    { node: <AnalyticsCard key="analytics" /> },
    { node: <LifecycleCard key="lifecycle" /> },
  ],
];

export default function HeroVisual({ className }: { className?: string }) {
  return (
    <ThreeDMarquee
      columns={columns}
      className={className}
      gridTop="top-[1520px] lg:top-[1390px]"
      gridRight="right-[160px]"
    />
  );
}
