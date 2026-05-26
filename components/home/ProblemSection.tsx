"use client";

import { useEffect, useRef } from "react";
import { Instrument_Serif } from "next/font/google";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
});

function Mark({ light = false, size = "md" }: { light?: boolean; size?: "sm" | "md" | "lg" }) {
  const s = size === "sm" ? 24 : size === "lg" ? 48 : 32;
  const dot = size === "sm" ? "h-2 w-2" : size === "lg" ? "h-4 w-4" : "h-3 w-3";
  const bar = size === "sm" ? "h-3 w-1" : size === "lg" ? "h-7 w-2.5" : "h-5 w-1.5";
  const off = size === "sm" ? "4px" : size === "lg" ? "9px" : "6px";

  return (
    <div
      aria-hidden="true"
      className={`relative flex-shrink-0 ${light ? "text-[#E8F4E9]" : "text-[#0B2317]"}`}
      style={{ width: s, height: s }}
    >
      <span className={`absolute left-1/2 top-1/2 ${dot} -translate-x-1/2 -translate-y-1/2 rounded-full bg-current`} />
      <span className={`absolute left-0 top-0 ${dot} rounded-full bg-current`} />
      <span className={`absolute right-0 top-0 ${dot} rounded-full bg-current`} />
      <span className={`absolute bottom-0 left-0 ${dot} rounded-full bg-current`} />
      <span className={`absolute bottom-0 right-0 ${dot} rounded-full bg-current`} />
      <span className={`absolute ${bar} rotate-45 rounded-full bg-current`} style={{ left: off, top: off }} />
      <span className={`absolute ${bar} -rotate-45 rounded-full bg-current`} style={{ right: off, top: off }} />
      <span className={`absolute ${bar} -rotate-45 rounded-full bg-current`} style={{ left: off, bottom: off }} />
      <span className={`absolute ${bar} rotate-45 rounded-full bg-current`} style={{ right: off, bottom: off }} />
    </div>
  );
}

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const img = ctx.createImageData(canvas.width, canvas.height);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 28;
      }
      ctx.putImageData(img, 0, 0);
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".problem-tile").forEach((tile, index) => {
        gsap.fromTo(
          tile,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            delay: index * 0.07,
            ease: "power3.out",
            scrollTrigger: {
              trigger: tile,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${instrumentSerif.variable} problem-serif relative overflow-hidden bg-[#F5CEA4] px-4 py-6 md:px-20 md:py-25`}
    >
      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 35%, rgba(255,175,50,0.25) 0%, transparent 70%)",
        }}
      />

      {/* Canvas grain */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        style={{ opacity: 0.5, mixBlendMode: "soft-light" }}
      />

      {/* Bento grid */}
      <div className="relative z-10 mx-auto max-w-[1180px]">
  <h1 className="problem-display text-center text-[#04351c] text-[90px] ">
                The struggle is <span className=" text-[#F5A623]">real</span> .
              </h1>
        {/* Row 1: wide left + small right */}
        
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr]">
          {/* Tile 1 — hero title, tall wide */}
          <article  className="problem-tile relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-[22px] bg-[#70AE8A] p-8 text-[#0B2317]">
            <div className="flex items-start justify-between">
              <Mark />
              <span className="font-sans text-[12px] opacity-50">01</span>
            </div>
            <div className="space-y-2">
              <p className="font-sans text-[12px] uppercase tracking-widest opacity-50">
                The Problem
              </p>
              <h2 className="problem-display max-w-[420px] text-[clamp(40px,5vw,60px)] leading-[0.92] tracking-[-0.03em]">
                The Last Step Of Exam Prep.
              </h2>
            </div>
          </article>

          {/* Tile 2 — dark logo center */}
          <article className="problem-tile flex min-h-[340px] items-center justify-center rounded-[22px] bg-[#082216] p-10">
            <div className="scale-[3.2]">
              <Mark light />
            </div>
          </article>
        </div>

        {/* Row 2: small + wide + small */}
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-[1fr_1.4fr_1fr]">

          {/* Tile 3 — 40% stat */}
          <article className="problem-tile relative flex min-h-[300px] flex-col justify-between rounded-[22px] bg-[#DCEEE4] p-7 text-[#0B2317]">
            <Mark size="sm" />
            <div>
              <p className="problem-display text-[clamp(60px,8vw,80px)] leading-none tracking-[-0.05em]">
                40%
              </p>
              <p className="mt-3 font-sans text-[12px] leading-relaxed text-[#566158]">
                Average failure pressure across major exam cycles, driven by weak
                revision systems.
              </p>
            </div>
          </article>

          {/* Tile 4 — statement, wide center */}
          <article className="problem-tile flex min-h-[300px] flex-col justify-between rounded-[22px] bg-[#F8F2EA] px-8 py-8 text-[#0B2317]">
            <p className="problem-display text-[clamp(24px,2.8vw,30px)] leading-[1.08] tracking-[-0.025em]">
              Nigerian students prepare differently. The challenge is not effort —
              it is access to practice, feedback, and guidance.
            </p>
            <p className="font-sans text-[12px] leading-relaxed text-[#596158]">
              Passmark adds the missing layer: adaptive exam prep before the test
              decides the future.
            </p>
          </article>

          {/* Tile 5 — 1.8x stat */}
          <article className="problem-tile relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-[22px] bg-[#F8F2EA] p-7 text-[#0B2317]">
            <Mark size="sm" />
            <div>
              <p className="problem-display text-[clamp(60px,8vw,80px)] leading-none tracking-[-0.05em]">
                1.8<span className="text-[0.4em]">x</span>
              </p>
              <p className="mt-3 font-sans text-[12px] leading-relaxed text-[#596158]">
                JAMB candidates yearly — nearly two million students in one
                high-stakes cycle.
              </p>
            </div>
            <button className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-[#082216] px-5 py-3 font-sans text-[13px] font-semibold text-white transition-opacity hover:opacity-80">
              Learn More <ArrowRight size={15} />
            </button>
          </article>
        </div>

        {/* Row 3: full-width quote tile */}
        <div className="grid grid-cols-1">
          <article className="problem-tile relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-[22px] bg-[#AA8CE5] px-10 py-8 text-[#0B1020] md:flex-row md:items-center md:gap-16">
            <p className="problem-display max-w-[520px] text-[clamp(26px,3.2vw,34px)] leading-[1.05] tracking-[-0.03em]">
              A student repeats the same past questions, guesses what to study,
              and walks into the exam blind.
            </p>
            <div className="mt-6 flex flex-shrink-0 flex-col gap-3 md:mt-0 md:items-end">
              <p className="font-sans text-[12px] opacity-50">Build smarter not prettier</p>
              <button className="inline-flex items-center gap-3 rounded-full bg-[#E7F3E7] px-6 py-4 font-sans text-sm font-semibold text-[#0B2317] transition-opacity hover:opacity-80">
                Learn More <ArrowRight size={16} />
              </button>
            </div>
            <div className="absolute bottom-6 right-8 opacity-20">
              <Mark size="lg" />
            </div>
          </article>
        </div>
      </div>

      <style>{`
        .problem-serif .problem-display,
        .problem-serif .problem-display * {
          font-family: var(--font-instrument-serif), serif;
          font-weight: 400;
        }
      `}</style>
    </section>
  );
}
