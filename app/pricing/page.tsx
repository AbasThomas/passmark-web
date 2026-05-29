import type { Metadata } from "next";
import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import {
  ArrowRight01Icon,
  Building03Icon,
  ChartUpIcon,
  CheckmarkCircle02Icon,
  Download04Icon,
  SparklesIcon,
  StudentIcon,
} from "hugeicons-react";
import { createMetadata } from "../seo";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  ...createMetadata({
    title: "Passmark Pricing - Free, Student Pro, Exam Prep Plus & School Plan",
    description:
      "Choose a Passmark plan for JAMB, WAEC, NECO and Post-UTME prep. Start free, upgrade for full question banks, mock exams, AI tutoring, analytics and school dashboards.",
    path: "/pricing",
    keywords: [
      "Passmark pricing",
      "JAMB app free Nigeria",
      "exam prep app Nigeria",
      "JAMB CBT app pricing",
      "WAEC past questions app",
      "AI tutor Nigeria",
    ],
  }),
};

const plans = [
  {
    name: "Free",
    price: "\u20A60",
    period: "forever",
    description:
      "Start practicing with daily drills, limited questions, XP, streaks, and leaderboard access.",
    icon: StudentIcon,
    action: "Download APK",
    href: "/passmark.apk",
    download: true,
    features: [
      "Daily practice drills",
      "Limited question access",
      "XP and streak tracking",
      "Leaderboard access",
    ],
  },
  {
    name: "Student Pro",
    price: "\u20A61,500",
    period: "per month",
    description:
      "Unlock full question bank access, mock exams, flashcards, explanations, offline downloads, and progress tracking.",
    icon: SparklesIcon,
    action: "Start Pro",
    href: "/passmark.apk",
    download: true,
    featured: true,
    features: [
      "Full question bank access",
      "Mock exams",
      "Flashcards and explanations",
      "Offline downloads",
      "Progress tracking",
    ],
  },
  {
    name: "Exam Prep Plus",
    price: "\u20A63,000",
    period: "per month",
    description:
      "Get unlimited AI tutoring, advanced analytics, weak-topic recommendations, and full CBT preparation.",
    icon: ChartUpIcon,
    action: "Get Plus",
    href: "/passmark.apk",
    download: true,
    features: [
      "Unlimited AI tutoring",
      "Advanced analytics",
      "Weak-topic recommendations",
      "Full CBT preparation",
    ],
  },
  {
    name: "School Plan",
    price: "Custom",
    period: "pricing",
    description:
      "For schools, tutorial centers, and institutions that need student tracking, admin dashboards, and bulk access.",
    icon: Building03Icon,
    action: "Contact Sales",
    href: "mailto:hello@passmark.live?subject=Passmark%20School%20Plan",
    features: [
      "Student tracking",
      "Admin dashboards",
      "Bulk access",
      "Institution support",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className={`${instrumentSerif.variable} min-h-screen bg-[#FAF7F2] px-4 pb-20 pt-28 text-[#191C1E] md:px-10 md:pt-36`}>
      <section className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 border-b border-[#BEC9BE]/45 pb-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-full border border-[#FEAE2C]/35 bg-[#FEAE2C]/12 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#835500]">
              Pricing
            </p>
            <h1
              className="mt-5 max-w-4xl text-[clamp(48px,8vw,104px)] font-normal leading-[0.92]"
              style={{ fontFamily: "var(--font-instrument-serif), serif" }}
            >
              Choose how you want to{" "}
              <span className="italic text-[#835500]">prepare.</span>
            </h1>
          </div>
          <p className="max-w-2xl text-base font-medium leading-7 text-[#3F4941] md:text-lg md:leading-8 lg:justify-self-end">
            Start free, then upgrade when you need deeper practice, offline
            study, AI tutoring, analytics, and school-level tracking.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isFeatured = Boolean(plan.featured);

            return (
              <article
                key={plan.name}
                className={`relative flex min-h-[540px] flex-col rounded-[8px] border bg-white p-6 shadow-[0_18px_60px_rgba(6,31,19,0.06)] transition-transform hover:-translate-y-1 ${
                  isFeatured
                    ? "border-[#FEAE2C] ring-2 ring-[#FEAE2C]/20"
                    : "border-[#BEC9BE]/45"
                }`}
              >
                {isFeatured && (
                  <div className="absolute right-4 top-5 rounded-full bg-[#FEAE2C] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#061F13]">
                    Popular
                  </div>
                )}

                <div className={`mt-3 flex h-12 w-12 items-center justify-center rounded-[8px] ${
                  isFeatured ? "bg-[#FEAE2C]/18 text-[#835500]" : "bg-[#006036]/10 text-[#006036]"
                }`}>
                  <Icon size={24} />
                </div>

                <h2
                  className="mt-6 text-3xl font-normal leading-none text-[#061F13]"
                  style={{ fontFamily: "var(--font-instrument-serif), serif" }}
                >
                  {plan.name}
                </h2>
                <div className="mt-4 flex items-end gap-2">
                  <span
                    className="text-5xl font-normal leading-none text-[#061F13]"
                    style={{ fontFamily: "var(--font-instrument-serif), serif" }}
                  >
                    {plan.price}
                  </span>
                  <span className="pb-1 text-sm font-bold text-[#3F4941]">
                    {plan.period}
                  </span>
                </div>
                <p className="mt-5 text-sm font-medium leading-6 text-[#3F4941]">
                  {plan.description}
                </p>

                <div className="mt-7 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex gap-3">
                      <CheckmarkCircle02Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${isFeatured ? "text-[#835500]" : "text-[#006036]"}`} />
                      <p className="text-sm font-semibold leading-6 text-[#191C1E]">{feature}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-8">
                  <Link
                    href={plan.href}
                    download={plan.download}
                    className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-black transition-transform hover:scale-[1.02] active:scale-[0.98] ${
                      isFeatured
                        ? "bg-[#FEAE2C] text-[#061F13]"
                        : "bg-[#061F13] text-[#F3FFF1]"
                    }`}
                  >
                    {plan.action}
                    {plan.download ? <Download04Icon size={16} /> : <ArrowRight01Icon size={16} />}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-4 rounded-[8px] border border-[#FEAE2C]/30 bg-[#FEAE2C]/10 p-5 text-sm font-semibold leading-6 text-[#6B4500] md:grid-cols-[auto_1fr] md:items-center">
          <Download04Icon className="h-6 w-6" />
          <p>
            Passmark is currently available as an Android APK. A stable iOS
            version is coming in the next few weeks.
          </p>
        </div>
      </section>
    </main>
  );
}
