"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import { gsap } from "gsap";
import BetaDownloadModal from "@/components/BetaDownloadModal";
import {
  Alert02Icon,
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
  Download04Icon,
  SecurityCheckIcon,
  SmartPhone01Icon,
  CancelCircleIcon,
} from "hugeicons-react";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
});

const availability = [
  {
    label: "Android beta",
    detail: "Private testing is active. APK access is limited while we stabilize the build.",
    status: "Beta",
    icon: SmartPhone01Icon,
    available: true,
  },
  {
    label: "Google Play",
    detail: "Not available on Play Store yet. The listing will come with the stable release.",
    status: "Coming soon",
    icon: Download04Icon,
    available: false,
  },
  {
    label: "Desktop app",
    detail: "No desktop app for now. Passmark is focused on mobile-first exam prep.",
    status: "Not available",
    icon: CancelCircleIcon,
    available: false,
  },
];

const betaNotes = [
  "The beta app may crash, lag, or change while we test the experience.",
  "Some exam packs, offline tools, or AI features may be incomplete.",
  "A stable public version is coming soon after the beta feedback cycle.",
];

function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="dl-letter inline-block"
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function DownloadPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showBetaModal, setShowBetaModal] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const image = ctx.createImageData(canvas.width, canvas.height);
      for (let i = 0; i < image.data.length; i += 4) {
        const value = Math.random() * 255;
        image.data[i] = value;
        image.data[i + 1] = value;
        image.data[i + 2] = value;
        image.data[i + 3] = 24;
      }

      ctx.putImageData(image, 0, 0);
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(".dl-letter, .dl-reveal", { opacity: 1, y: 0, rotateX: 0 });
        return;
      }

      gsap.fromTo(
        ".dl-letter",
        { opacity: 0, y: -44, rotateX: -80 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.58,
          stagger: 0.018,
          ease: "power3.out",
          delay: 0.12,
        }
      );

      gsap.fromTo(
        ".dl-reveal",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.09,
          ease: "power3.out",
          delay: 0.45,
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={pageRef}
      className={`${instrumentSerif.variable} relative isolate min-h-screen overflow-hidden bg-[#061F13] px-4 pb-16 pt-24 text-[#F3FFF1] sm:px-6 md:px-10 md:pb-28 md:pt-32`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30"
        style={{
          background:
            "linear-gradient(90deg, rgba(239,251,238,0.06) 1px, transparent 1px), linear-gradient(rgba(239,251,238,0.052) 1px, transparent 1px), linear-gradient(90deg, transparent 0 52px, rgba(239,251,238,0.035) 52px 53px, transparent 53px 104px), radial-gradient(ellipse 72% 46% at 50% 14%, rgba(122,234,132,0.26), transparent 70%)",
          backgroundSize: "104px 44px, 104px 44px, 104px 88px, 100% 100%",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(180deg, rgba(3,19,10,0.1), rgba(3,19,10,0.88)), radial-gradient(circle at 10% 80%, rgba(155,246,186,0.16), transparent 34%), radial-gradient(circle at 90% 76%, rgba(254,174,44,0.08), transparent 30%)",
        }}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-40"
        style={{ mixBlendMode: "soft-light" }}
      />

      <section className="mx-auto grid w-full max-w-[1180px] gap-8 sm:gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
        <div className="min-w-0 text-center lg:text-left">
          <div className="dl-reveal mb-6 inline-flex items-center gap-2 rounded-full border border-[#FEAE2C]/25 bg-[#FEAE2C]/10 px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FEAE2C] shadow-[0_0_10px_#FEAE2C]" />
            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#FEAE2C]">
              Beta phase
            </span>
          </div>

          <h1 className="mx-auto max-w-[760px] text-[clamp(42px,15vw,104px)] font-normal leading-[0.92] tracking-[-0.02em] lg:mx-0">
            <SplitText text="Passmark is" />
            <br />
            <SplitText className="italic text-[#9BF6BA]" text="almost ready." />
          </h1>

          <p className="dl-reveal mx-auto mt-7 max-w-[620px] text-[15px] font-medium leading-7 text-[#BFD7C3] sm:text-[16px] md:text-[18px] md:leading-8 lg:mx-0">
            The app is still in beta and may be unstable. We are testing the
            Android build now, fixing rough edges, and preparing a stable public
            release soon.
          </p>

          <div className="dl-reveal mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
            <button
              type="button"
              onClick={() => setShowBetaModal(true)}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#9BF6BA] px-6 text-sm font-black text-[#061F13] transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
              aria-label="Download beta APK"
            >
              Download beta APK <Download04Icon size={16} />
            </button>
            <Link
              href="/#features"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-[#F3FFF1]/15 px-6 text-sm font-bold text-[#F3FFF1] transition-colors hover:border-[#9BF6BA]/45 sm:w-auto"
            >
              See what is inside <ArrowRight01Icon size={16} />
            </Link>
          </div>
        </div>

        <div className="dl-reveal min-w-0 rounded-[8px] border border-[#9BF6BA]/18 bg-[#082216]/88 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.32)] sm:p-5 md:p-7">
          <div className="rounded-[8px] border border-[#FEAE2C]/25 bg-[#FEAE2C]/10 p-5">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#FEAE2C]/14 text-[#FEAE2C]">
                <Alert02Icon size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-black uppercase tracking-[0.12em] text-[#FEAE2C]">
                  Beta warning
                </p>
                <p className="mt-2 text-sm leading-6 text-[#E4EDD9]/72">
                  This version is for early testing. It may be unstable, and a
                  stable version is coming soon.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            {availability.map(({ label, detail, status, icon: Icon, available }) => (
              <article
                key={label}
                className={`rounded-[8px] border p-4 ${
                  available
                    ? "border-[#9BF6BA]/20 bg-[#0B3320]/90"
                    : "border-[#F3FFF1]/8 bg-[#F3FFF1]/4"
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div
                    className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${
                      available ? "bg-[#9BF6BA] text-[#061F13]" : "bg-[#F3FFF1]/8 text-[#BFD7C3]"
                    }`}
                  >
                    <Icon size={19} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                      <h2 className="text-base font-black">{label}</h2>
                      <span
                        className={`w-fit rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${
                          available ? "bg-[#9BF6BA]/12 text-[#9BF6BA]" : "bg-[#F3FFF1]/8 text-[#BFD7C3]"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[#BFD7C3]">{detail}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 grid w-full max-w-[1180px] gap-5 sm:mt-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="dl-reveal rounded-[8px] border border-[#F3FFF1]/10 bg-[#F3FFF1]/5 p-6 md:p-7">
          <div className="flex items-center gap-3">
            <SecurityCheckIcon className="h-5 w-5 text-[#9BF6BA]" />
            <h2 className="text-xl font-black">What this means</h2>
          </div>
          <div className="mt-6 space-y-4">
            {betaNotes.map((note) => (
              <div key={note} className="flex gap-3">
                <CheckmarkCircle02Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#9BF6BA]" />
                <p className="text-sm leading-6 text-[#CFE3D0]">{note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="dl-reveal rounded-[8px] border border-[#9BF6BA]/20 bg-[#9BF6BA] p-6 text-[#061F13] md:p-7">
          <p className="text-xs font-black uppercase tracking-[0.2em] opacity-65">
            Stable release
          </p>
          <h2 className="mt-3 text-[clamp(28px,4vw,44px)] font-black leading-[1] tracking-[-0.02em]">
            Play Store and broader access are coming with the stable build.
          </h2>
          <p className="mt-5 max-w-2xl text-sm font-semibold leading-6 opacity-75">
            For now, there is no desktop app and no Play Store listing. The next
            public release will focus on a smoother Android experience for JAMB,
            WAEC, NECO and offline study.
          </p>
          <Link
            href="/#download"
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#061F13] px-5 text-sm font-black text-[#F3FFF1] sm:w-auto"
          >
            Back to landing page <ArrowRight01Icon size={15} />
          </Link>
        </div>
      </section>

      <BetaDownloadModal open={showBetaModal} onClose={() => setShowBetaModal(false)} />
    </main>
  );
}
