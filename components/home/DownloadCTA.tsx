"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Smartphone,
  Apple,
  ArrowUpRight
} from "lucide-react";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="dl-letter inline-block"
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function DownloadCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Background grain texture
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const img = ctx.createImageData(canvas.width, canvas.height);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 40; // opacity
      }
      ctx.putImageData(img, 0, 0);
    };

    draw();

    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        gsap.fromTo(
          ".dl-letter",
          { opacity: 0, y: -48, rotateX: -90 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.55,
            stagger: 0.02,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );
        
        gsap.fromTo(
          ".dl-fade-up",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            delay: 0.4,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );

        // Snap scroll when entering the section
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 0%",
          snap: {
            snapTo: 1,
            duration: { min: 0.2, max: 0.5 },
            delay: 0.02,
            ease: "power2.out",
          },
        });
      } else {
        gsap.set(".dl-letter", { opacity: 1, y: 0, x: 0, scale: 1 });
        gsap.set(".dl-fade-up", { opacity: 1, y: 0 });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${instrumentSerif.variable} relative min-h-[90vh] overflow-hidden flex items-center justify-center`}
      style={{ background: "#061206" }}
    >
      {/* Layer 1: radial glow matching hero but from bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 80%, rgba(0,200,80,0.15) 0%, transparent 65%)",
        }}
      />

      {/* Layer 2: canvas grain */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ opacity: 0.4 }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 flex flex-col items-center justify-center text-center">
        
        <div className="w-full mb-12">
          <h2 className="dl-title space-y-2 leading-none text-center font-normal">
            <div className="text-[clamp(48px,8vw,120px)] leading-[1.0] tracking-tight text-white">
              <SplitText text="Ready to hit your" />
            </div>
            <div className="text-[clamp(48px,8vw,120px)] leading-[1.0] tracking-tight">
              <SplitText className="italic text-[#F5A623]" text="Passmark?" />
            </div>
          </h2>
        </div>

        <p className="dl-fade-up text-lg md:text-2xl text-white/70 leading-relaxed font-medium max-w-2xl mb-16">
          Join over 100,000 Nigerian students. Download the app today and secure your admission.
        </p>

        {/* Download buttons */}
        <div className="dl-fade-up flex flex-col sm:flex-row gap-6 w-full max-w-xl justify-center">
          <Link
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-between gap-4 bg-[#FAF7F2] text-[#061206] px-6 py-5 rounded-xl border-2 border-[#FAF7F2] shadow-[6px_6px_0px_0px_rgba(254,174,44,1)] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,0)] hover:translate-x-[6px] hover:translate-y-[6px] transition-all duration-200 group active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <Smartphone className="w-8 h-8 text-[#061206]" />
              <div className="text-left">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#061206]/60 leading-none mb-1">
                  Get it on
                </p>
                <p className="text-xl font-bold leading-none">
                  Google Play
                </p>
              </div>
            </div>
            <ArrowUpRight className="w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity" />
          </Link>

          <Link
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-between gap-4 bg-transparent text-[#FAF7F2] px-6 py-5 rounded-xl border-2 border-[#FAF7F2] shadow-[6px_6px_0px_0px_rgba(0,200,80,0.4)] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,0)] hover:translate-x-[6px] hover:translate-y-[6px] transition-all duration-200 group active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <Apple className="w-8 h-8 text-white" />
              <div className="text-left">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#FAF7F2]/60 leading-none mb-1">
                  Download on the
                </p>
                <p className="text-xl font-bold leading-none">
                  App Store
                </p>
              </div>
            </div>
            <ArrowUpRight className="w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>

        <div className="dl-fade-up mt-12">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors group"
          >
            Or: Continue on Web Platform
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>

      <style>{`
        .dl-title,
        .dl-title * {
          font-family: var(--font-instrument-serif), serif;
          font-weight: 400;
        }
      `}</style>
    </section>
  );
}
