"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { LM_EASE } from "@/lib/motion";

const businessTypes = [
  {
    id: "service",
    title: "Service Business",
    description: "Operations-heavy",
    icon: "↗",
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    description: "Shopify / marketplace",
    icon: "⬡",
  },
  {
    id: "saas",
    title: "SaaS Company",
    description: "Software product",
    icon: "◈",
  },
  {
    id: "other",
    title: "Other",
    description: "Agency, VC, other",
    icon: "○",
  },
];

const nextSteps = [
  {
    number: "01",
    title: "Share your brief",
    detail: "Takes less than 2 minutes",
  },
  {
    number: "02",
    title: "2-hour response",
    detail: "We review your workflow and come prepared",
  },
  {
    number: "03",
    title: "System scoping call",
    detail: "First automation map within the first week",
  },
];

const volumeRanges = [
  "Select range",
  "Under $500K",
  "$500K – $2M",
  "$2M – $10M",
  "$10M+",
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  volume: string;
  message: string;
};

const emptyForm: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  volume: "",
  message: "",
};

export default function BookFlow() {
  const [step, setStep] = useState<1 | 2>(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const stepTwoRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { y: 28 },
      { y: 0, duration: 0.7, ease: LM_EASE.out }
    );
  }, []);

  useEffect(() => {
    if (step === 2 && stepTwoRef.current) {
      gsap.fromTo(
        stepTwoRef.current,
        { y: 20 },
        { y: 0, duration: 0.55, ease: LM_EASE.out }
      );
    }
  }, [step]);

  const handleContinue = () => {
    if (!selected) return;
    setStep(2);
    setError("");
  };

  const handleBack = () => {
    setStep(1);
    setError("");
  };

  const updateForm = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selected) return;

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessType: selected,
          ...form,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="book-page mx-auto max-w-[760px] px-5 py-32 md:py-40">
        <div ref={cardRef} className="book-card p-10 text-center">
          <span className="mb-4 inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.7)]" />
          <h1 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-white">
            Request received.
          </h1>
          <p className="mb-8 text-sm leading-6 text-white/70">
            We&apos;ll review your brief and get back to you within 2 hours.
          </p>
          <Link href="/" className="book-btn-primary inline-flex px-8">
            Back to site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="book-page mx-auto max-w-[760px] px-5 py-28 md:py-36">
      <div ref={cardRef} className="book-card p-6 md:p-10">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <p className="book-kicker">Step {step} of 2</p>
            <p className="book-kicker-accent mt-1">
              {step === 1 ? "Your business" : "Your details"}
            </p>
          </div>
          <Link href="/" className="book-close" aria-label="Close">
            ×
          </Link>
        </div>

        {step === 1 && (
          <div>
            <h1 className="text-2xl font-medium tracking-[-0.04em] text-white mb-2">
              What best describes your business?
            </h1>
            <p className="text-xs text-white/40 mb-8 font-mono">
              01 // Select your operational domain
            </p>

            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {businessTypes.map((type) => {
                const isSelected = selected === type.id;

                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelected(type.id)}
                    className={`group relative flex flex-col justify-between border p-5 text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "border-white bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] scale-[1.01]"
                        : "border-white/10 bg-black/40 text-white/60 hover:border-white/30 hover:bg-white/[0.03] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-3">
                      <span className="text-lg">{type.icon}</span>
                      {isSelected ? (
                        <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                      ) : (
                        <span className="text-[10px] font-mono text-white/20 group-hover:text-white/40">SELECT</span>
                      )}
                    </div>
                    <div>
                      <span className="block text-sm font-medium tracking-[-0.02em] text-white">{type.title}</span>
                      <span className="block mt-1 text-xs text-white/40">{type.description}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleContinue}
              disabled={!selected}
              className="group flex w-full items-center justify-between border-2 border-white bg-white px-6 py-4 text-black font-mono uppercase tracking-[0.18em] font-bold text-xs shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all duration-200 hover:bg-[#eaeaea] hover:scale-[1.01] active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <span>Continue to details</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>
        )}

        {step === 2 && (
          <div ref={stepTwoRef}>
            <div className="mb-6 flex items-center justify-between gap-4">
              <h1 className="book-title text-[clamp(1.5rem,3vw,1.9rem)]">
                Tell us about your project
              </h1>
              <button type="button" onClick={handleBack} className="book-back">
                ← Back
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="book-field">
                  <span>Full name *</span>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => updateForm("name", e.target.value)}
                    placeholder="Your name"
                  />
                </label>
                <label className="book-field">
                  <span>Work email *</span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                    placeholder="you@company.com"
                  />
                </label>
              </div>

              <label className="book-field">
                <span>Phone number</span>
                <input
                  value={form.phone}
                  onChange={(e) => updateForm("phone", e.target.value)}
                  placeholder="+1 (555) 000-0000"
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="book-field">
                  <span>Company</span>
                  <input
                    value={form.company}
                    onChange={(e) => updateForm("company", e.target.value)}
                    placeholder="Acme Inc."
                  />
                </label>
                <label className="book-field">
                  <span>Website</span>
                  <input
                    value={form.website}
                    onChange={(e) => updateForm("website", e.target.value)}
                    placeholder="yourcompany.com"
                  />
                </label>
              </div>

              <label className="book-field">
                <span>Annual revenue</span>
                <select
                  value={form.volume}
                  onChange={(e) => updateForm("volume", e.target.value)}
                >
                  {volumeRanges.map((range) => (
                    <option
                      key={range}
                      value={range === "Select range" ? "" : range}
                    >
                      {range}
                    </option>
                  ))}
                </select>
              </label>

              <label className="book-field">
                <span>Message</span>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => updateForm("message", e.target.value)}
                  placeholder="Anything you'd like us to know..."
                />
              </label>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <p className="text-xs text-white/70">
                Your data is never shared. No commitment required.
              </p>

              <button
                type="submit"
                disabled={submitting}
                className="book-btn-primary w-full"
              >
                {submitting ? "Submitting..." : "Submit"}
                <span>→</span>
              </button>
            </form>
          </div>
        )}

        <div className="book-next-steps mt-10 border-t border-white/20 pt-8">
          <p className="book-kicker mb-6">What happens next</p>
          <div className="space-y-5">
            {nextSteps.map((item, index) => (
              <div key={item.number} className="book-step-row flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="book-step-num">{item.number}</span>
                  {index < nextSteps.length - 1 && (
                    <span className="book-step-line mt-2 w-px flex-1 bg-white/25" />
                  )}
                </div>
                <div className="pb-2 pt-0.5">
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="mt-1 text-xs text-white/75">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
