"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const INQUIRY_TYPES = [
  { id: "workflow", label: "WORKFLOW AUTOMATION", desc: "Connect tools & operational flows" },
  { id: "ai_agent", label: "AI RECEPTION / AGENTS", desc: "Voice, WhatsApp, and conversational AI" },
  { id: "leads", label: "LEAD SYSTEMS", desc: "Capture, qualify, and route automatically" },
  { id: "custom", label: "CUSTOM INFRASTRUCTURE", desc: "Tailored AI systems for specific bottlenecks" },
];

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState("workflow");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    budget: "$2k - $5k",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setError("Please fill out your name and email.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessType: inquiryType,
          ...form,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Submission failed.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-[100svh] bg-[#050505] text-[#f5f5f5]">
      <Navbar />

      <main className="mx-auto max-w-[1600px] px-5 pb-24 pt-32 md:px-8 md:pt-40">
        {/* Header Bar */}
        <div className="mb-12 flex items-center justify-between border-b border-white/10 pb-4">
          <Link
            href="/"
            className="group flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Back to Overview
          </Link>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            06 / Direct Inquiry
          </span>
        </div>

        {/* Title */}
        <div className="mb-16 grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40 font-mono">
              Start a conversation
            </p>
            <h1 className="text-[clamp(3.2rem,7.5vw,7.5rem)] font-medium leading-[0.82] tracking-[-0.065em]">
              LET&apos;S BUILD <br />
              <span className="text-white/30">YOUR SYSTEM.</span>
            </h1>
          </div>
          <div className="max-w-md">
            <p className="text-sm leading-6 text-white/50">
              Tell us what is slowing your business down. We will analyze your workflow, identify what can be automated, and design a system built specifically for your operations.
            </p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid gap-12 lg:grid-cols-[1fr_420px]">
          {/* Form Side */}
          <div className="border border-white/10 bg-white/[0.015] p-6 md:p-10">
            {submitted ? (
              <div className="py-16 text-center">
                <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-400">
                  <Check size={24} />
                </div>
                <h3 className="mb-3 text-2xl font-medium tracking-[-0.03em]">Inquiry Received</h3>
                <p className="mx-auto max-w-md text-sm text-white/50">
                  Thank you for reaching out. We are reviewing your process brief and will respond within 2-4 hours.
                </p>
                <div className="mt-8">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.16em] transition-all hover:bg-white hover:text-black"
                  >
                    Return to home
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* System / Inquiry Type Selector */}
                <div>
                  <label className="mb-3 block text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">
                    01 // What kind of system do you need?
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {INQUIRY_TYPES.map((type) => {
                      const selected = inquiryType === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setInquiryType(type.id)}
                          className={`group relative border p-4 text-left transition-all ${
                            selected
                              ? "border-white bg-white/10 text-white"
                              : "border-white/10 bg-transparent text-white/60 hover:border-white/30 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium tracking-[0.08em]">{type.label}</span>
                            {selected && <Check size={14} className="text-emerald-400" />}
                          </div>
                          <p className="mt-1 text-[11px] text-white/40">{type.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="space-y-6 pt-2">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">
                    02 // Your details
                  </label>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <span className="mb-2 block text-xs text-white/50">Full Name *</span>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full border border-white/15 bg-black/50 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <span className="mb-2 block text-xs text-white/50">Email Address *</span>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full border border-white/15 bg-black/50 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <span className="mb-2 block text-xs text-white/50">Company / Business</span>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Company name"
                        className="w-full border border-white/15 bg-black/50 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <span className="mb-2 block text-xs text-white/50">Phone / WhatsApp (Optional)</span>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full border border-white/15 bg-black/50 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="mb-2 block text-xs text-white/50">Describe your current workflow or bottleneck</span>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="What process currently takes too much manual effort in your business?"
                      className="w-full border border-white/15 bg-black/50 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-white focus:outline-none resize-none"
                    />
                  </div>
                </div>

                {error && (
                  <div className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-400">
                    {error}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="group flex w-full items-center justify-between border border-white/30 bg-white px-6 py-4 text-black transition-all hover:bg-white/90 disabled:opacity-50"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                    {submitting ? "Submitting Inquiry..." : "Submit Project Brief"}
                  </span>
                  <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </form>
            )}
          </div>

          {/* Sidebar Specs & Information */}
          <div className="space-y-8">
            <div className="border border-white/10 bg-white/[0.015] p-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">
                System SLA
              </span>
              <h4 className="mt-2 text-base font-medium text-white">2-Hour Initial Review</h4>
              <p className="mt-2 text-xs leading-5 text-white/45">
                Every project inquiry is evaluated directly by our automation engineers. We will analyze feasibility and outline proposed architectures before our discovery call.
              </p>
            </div>

            <div className="border border-white/10 bg-white/[0.015] p-6 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">
                Direct Contact
              </span>
              <div>
                <span className="block text-[10px] uppercase tracking-[0.14em] text-white/30">Email</span>
                <a href="mailto:hello@vantix.work" className="text-sm text-white hover:underline">
                  hello@vantix.work
                </a>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-[0.14em] text-white/30">Location</span>
                <span className="text-sm text-white/70">Mumbai, India (Global Operations)</span>
              </div>
              <div className="pt-2">
                <span className="flex items-center gap-2 text-xs text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Accepting Q3/Q4 Project Pipelines
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
