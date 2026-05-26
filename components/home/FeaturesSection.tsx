"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instrument_Serif } from "next/font/google";
import {
  Bot,
  BookOpen,
  Timer,
  Flame,
  Trophy,
  WifiOff,
  Users,
  CreditCard,
} from "lucide-react";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
});

gsap.registerPlugin(ScrollTrigger);

// 1. Pass AI Tutor Mockup Component
function AITutorMock() {
  const [lang, setLang] = useState<"english" | "pidgin">("english");
  return (
    <div className="bg-[#082216] border border-[#1A7A4A]/25 rounded-xl p-3.5 text-white h-full flex flex-col justify-between select-none">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">Pass AI</span>
          <div className="flex bg-[#006036] rounded p-0.5 border border-[#1A7A4A]/20">
            <button
              onClick={() => setLang("english")}
              className={`px-1.5 py-0.5 text-[8px] font-bold rounded transition-colors ${
                lang === "english" ? "bg-emerald-500 text-white" : "text-[#9BF6BA]/70 hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("pidgin")}
              className={`px-1.5 py-0.5 text-[8px] font-bold rounded transition-colors ${
                lang === "pidgin" ? "bg-emerald-500 text-white" : "text-[#9BF6BA]/70 hover:text-white"
              }`}
            >
              PID
            </button>
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="bg-[#1A7A4A]/30 border border-[#1A7A4A]/10 rounded-lg px-2 py-1 text-[9px] text-[#BEC9BE] ml-auto w-fit max-w-[85%] text-right">
            Explain gravity.
          </div>
          <div className="bg-[#006036] border border-[#1A7A4A]/25 rounded-lg px-2.5 py-1.5 text-[9px] leading-relaxed text-[#E8F4E9] max-w-[90%] font-medium">
            {lang === "english" ? (
              "The invisible force that pulls everything down to Earth."
            ) : (
              "That invisible force wey dey pull everything go down to ground."
            )}
          </div>
        </div>
      </div>
      <div className="pt-2 border-t border-[#1A7A4A]/15 text-[8px] text-[#BEC9BE]/60 text-center font-medium">
        Step-by-step interactive tutor
      </div>
    </div>
  );
}

// 2. Question Bank Mockup Component
function QuestionBankMock() {
  const [activeSubject, setActiveSubject] = useState<"math" | "physics">("math");

  const subjects = {
    math: {
      year: "JAMB 2024",
      q: "Solve 3x + 12 = 27.",
      ans: "x = 5"
    },
    physics: {
      year: "WAEC 2023",
      q: "Unit of electrical power?",
      ans: "Watt"
    }
  };

  return (
    <div className="bg-white/40 border border-[#0B2317]/10 rounded-xl p-3.5 text-[#0B2317] h-full flex flex-col justify-between select-none">
      <div>
        <div className="flex gap-1 mb-2">
          {(["math", "physics"] as const).map((sub) => (
            <button
              key={sub}
              onClick={() => setActiveSubject(sub)}
              className={`text-[8.5px] font-bold px-2 py-0.5 rounded transition-colors uppercase ${
                activeSubject === sub
                  ? "bg-[#0B2317] text-white"
                  : "bg-white/40 text-[#0B2317] hover:bg-white/60"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        <div className="bg-white/80 border border-[#0B2317]/5 rounded-lg p-2 text-[9.5px] space-y-1">
          <div className="flex justify-between text-[7.5px] font-semibold text-[#0B2317]/50">
            <span>{subjects[activeSubject].year}</span>
            <span>No. 14</span>
          </div>
          <p className="font-bold text-[#0B2317] leading-tight">
            {subjects[activeSubject].q}
          </p>
          <div className="text-[8.5px] text-[#006036] font-bold">
            ✓ Answer: {subjects[activeSubject].ans}
          </div>
        </div>
      </div>

      <div className="text-[8.5px] text-[#0B2317]/60 text-center font-medium">
        Search 48 years of past exams
      </div>
    </div>
  );
}

// 3. CBT Simulator Mockup Component
function CBTMock() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="bg-white/40 border border-[#0B2317]/10 rounded-xl p-3.5 text-[#0B2317] h-full flex flex-col justify-between select-none">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#835500]">CBT Mode</span>
          <span className="font-mono text-[9px] font-bold text-red-700 bg-red-100/50 px-1.5 py-0.5 rounded">
            ⏱️ 54:12
          </span>
        </div>

        <div className="bg-white/80 border border-[#0B2317]/5 rounded-lg p-2 space-y-1.5 text-[9px]">
          <p className="font-bold text-[#0B2317] leading-tight">
            Which element is liquid at room temp?
          </p>
          <div className="grid grid-cols-2 gap-1">
            {[
              { label: "Mercury", val: 0 },
              { label: "Sodium", val: 1 }
            ].map((opt) => (
              <button
                key={opt.val}
                onClick={() => setSelected(opt.val)}
                className={`text-left px-1.5 py-1 rounded border text-[8.5px] transition-colors ${
                  selected === opt.val
                    ? "bg-[#E8F4E9] border-[#006036] text-[#006036] font-bold"
                    : "bg-white/50 border-[#0B2317]/5 text-[#0B2317]/70 hover:bg-white"
                }`}
              >
                {opt.label} {selected === opt.val && opt.val === 0 && "✓"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="text-[8.5px] text-[#0B2317]/60 text-center font-medium">
        Official JAMB exam simulator
      </div>
    </div>
  );
}

// 4. Pass Streak Mockup Component
function StreakMock() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="bg-white/40 border border-[#835500]/10 rounded-xl p-3.5 text-[#835500] h-full flex flex-col justify-between select-none">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-bold text-[#835500] uppercase bg-[#FEAE2C]/10 px-1.5 py-0.5 rounded">
            Streaks
          </span>
          <span className="text-[9.5px] font-bold text-[#835500]">
            🔥 {completed ? "15" : "14"} Days
          </span>
        </div>

        <div className="bg-white/80 border border-[#835500]/5 rounded-lg p-2 flex items-center justify-between gap-1 mb-2">
          {["M", "T", "W", "T", "F"].map((day, idx) => {
            const isDone = idx < 4 || (idx === 4 && completed);
            return (
              <div key={idx} className="text-center flex-1">
                <span className="text-[7.5px] font-bold block mb-0.5">{day}</span>
                <div
                  className={`w-4 h-4 mx-auto rounded-full flex items-center justify-center text-[8px] ${
                    isDone ? "bg-[#FEAE2C] text-white" : "bg-black/5 text-[#835500]/40"
                  }`}
                >
                  {isDone ? "✓" : "•"}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setCompleted(true)}
          disabled={completed}
          className={`w-full text-center py-1 rounded text-[9px] font-bold transition-all ${
            completed
              ? "bg-[#E8F4E9] text-[#006036] border border-[#006036]/10 cursor-default"
              : "bg-[#006036] text-white hover:bg-[#1A7A4A]"
          }`}
        >
          {completed ? "Completed! 🎉" : "Complete Today's Drill"}
        </button>
      </div>

      <div className="text-[8.5px] text-[#835500]/60 text-center font-medium">
        Stay sharp. Keep the flame alive.
      </div>
    </div>
  );
}

// 5. Pass League Leaderboard Mockup Component
function LeagueMock() {
  const [tab, setTab] = useState<"national" | "state">("national");

  const list = tab === "national"
    ? [
        { rank: 1, name: "Chinedu O.", xp: "4,850 XP" },
        { rank: 2, name: "Amina B.", xp: "4,210 XP" },
        { rank: 3, name: "You", xp: "3,900 XP", highlight: true },
      ]
    : [
        { rank: 1, name: "You", xp: "3,900 XP", highlight: true },
        { rank: 2, name: "Seyi K.", xp: "3,820 XP" },
        { rank: 3, name: "Blessing I.", xp: "3,690 XP" },
      ];

  return (
    <div className="bg-white/40 border border-[#0B1020]/10 rounded-xl p-3.5 text-[#0B1020] h-full flex flex-col justify-between select-none">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-bold uppercase text-[#0B1020]/80">Pass League</span>
          <div className="flex bg-black/10 rounded p-0.5 text-[8px] font-bold">
            <button
              onClick={() => setTab("national")}
              className={`px-1 rounded transition-all ${
                tab === "national" ? "bg-white text-[#0B1020]" : "text-[#0B1020]/60"
              }`}
            >
              National
            </button>
            <button
              onClick={() => setTab("state")}
              className={`px-1 rounded transition-all ${
                tab === "state" ? "bg-white text-[#0B1020]" : "text-[#0B1020]/60"
              }`}
            >
              State
            </button>
          </div>
        </div>

        <div className="bg-white border border-[#0B1020]/5 rounded-lg overflow-hidden text-[9px]">
          {list.map((row, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between px-2 py-1 border-b border-[#0B1020]/5 last:border-b-0 ${
                row.highlight ? "bg-[#E8F4E9]/60 font-bold" : ""
              }`}
            >
              <div className="flex items-center gap-1">
                <span className="text-[#0B1020]/50 font-semibold">#{row.rank}</span>
                <span className={row.highlight ? "text-[#006036]" : "text-[#0B1020]"}>{row.name}</span>
              </div>
              <span className="font-mono text-[7.5px] opacity-75">{row.xp}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-[8.5px] text-[#0B1020]/60 text-center font-medium">
        Weekly resets keep competition active.
      </div>
    </div>
  );
}

// 6. Offline Mode Mockup Component
function OfflineMock() {
  const [offline, setOffline] = useState(true);

  return (
    <div className="bg-white/40 border border-[#0B2317]/10 rounded-xl p-3.5 text-[#0B2317] h-full flex flex-col justify-between select-none">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-bold text-[#006036] uppercase">Offline Sync</span>
          <button
            onClick={() => setOffline(!offline)}
            className={`w-7 h-4 rounded-full p-0.5 transition-colors flex items-center ${
              offline ? "bg-[#006036] justify-end" : "bg-[#BEC9BE] justify-start"
            }`}
          >
            <span className="w-3 h-3 rounded-full bg-white shadow-sm" />
          </button>
        </div>

        <div className="bg-white/80 border border-[#0B2317]/5 rounded-lg p-2.5 text-[9px] space-y-1">
          <div className="flex justify-between font-semibold">
            <span>Mock Database</span>
            <span className="text-[#006036]">Downloaded ✓</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Data Usage</span>
            <span className="text-[#006036]">{offline ? "Free (No Data)" : "Standard"}</span>
          </div>
        </div>
      </div>

      <div className="text-[8.5px] text-[#0B2317]/60 text-center font-medium">
        Complete offline access to everything.
      </div>
    </div>
  );
}

// 7. Parent View Mockup Component
function ParentViewMock() {
  const [success, setSuccess] = useState(false);

  return (
    <div className="bg-white/40 border border-[#0B2317]/10 rounded-xl p-3.5 text-[#0B2317] h-full flex flex-col justify-between select-none">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-bold text-[#835500] uppercase">Family View</span>
          <span className="text-[8.5px] font-bold text-[#0B2317]/60">PIN: 489 201</span>
        </div>

        <div className="bg-white/80 border border-[#0B2317]/5 rounded-lg p-2 space-y-1 text-[9px]">
          <div className="flex justify-between text-[#0B2317]/70">
            <span>Student:</span>
            <span className="font-bold text-[#0B2317]">Amina B.</span>
          </div>
          <div className="flex justify-between text-[#0B2317]/70">
            <span>Mock Avg:</span>
            <span className="font-bold text-emerald-700">78% (Top 5%)</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => setSuccess(true)}
        className="w-full text-center py-1 bg-[#006036] hover:bg-[#1A7A4A] text-white rounded text-[9px] font-bold transition-all active:scale-[0.98]"
      >
        {success ? "Report Link Shared! 🔗" : "Send Report to Parent"}
      </button>
    </div>
  );
}

// 8. Flashcards Mockup Component
function FlashcardMock() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="bg-white/40 border border-[#0B2317]/10 rounded-xl p-3.5 text-[#0B2317] h-full flex flex-col justify-between select-none font-gordita">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-bold text-[#006036] uppercase">Flashcards</span>
          <span className="text-[8.5px] text-[#0B2317]/50 font-semibold">Active recall</span>
        </div>

        <div className="relative h-[65px] perspective cursor-pointer" onClick={() => setFlipped(!flipped)}>
          <div className={`relative w-full h-full duration-500 transform-style-3d ${flipped ? "rotate-y-180" : ""}`}>
            {/* Front Side */}
            <div className="absolute inset-0 bg-white border border-[#0B2317]/5 rounded-lg p-2 flex flex-col justify-between backface-hidden">
              <div>
                <span className="text-[6.5px] font-bold text-[#835500] uppercase block">Biology</span>
                <p className="font-bold text-[8.5px] text-[#0B2317] leading-tight mt-0.5">
                  Main function of the ribosome?
                </p>
              </div>
              <div className="text-right text-[7.5px] text-[#006036] font-bold pt-0.5 border-t border-[#0B2317]/5">
                Tap to Reveal ⤾
              </div>
            </div>

            {/* Back Side */}
            <div className="absolute inset-0 bg-[#E8F4E9] border border-[#006036]/10 rounded-lg p-2 flex flex-col justify-between backface-hidden rotate-y-180">
              <div>
                <span className="text-[6.5px] font-bold text-[#006036] uppercase block">Answer</span>
                <p className="font-bold text-[8.5px] text-[#006036] leading-none mt-0.5">
                  Protein synthesis.
                </p>
              </div>
              <div className="text-right text-[7.5px] text-[#006036] font-bold pt-0.5 border-t border-[#006036]/10">
                Got it ✓
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-[8.5px] text-[#0B2317]/60 text-center font-medium">
        Targeted repetition for core concepts
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
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
        img.data[i + 3] = 30; // grain opacity
      }
      ctx.putImageData(img, 0, 0);
    };

    draw();
    window.addEventListener("resize", draw);

    // Stagger entry animation for cards
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return () => window.removeEventListener("resize", draw);

    const ctxGsap = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth;
      };

      const mm = gsap.matchMedia();

      // Desktop & Tablet Pinning Scroll Effect
      mm.add("(min-width: 768px)", () => {
        gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 0.8,
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            invalidateOnRefresh: true,
          },
        });
      });

      // Entry animation on load
      gsap.fromTo(
        ".bento-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => {
      window.removeEventListener("resize", draw);
      ctxGsap.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${instrumentSerif.variable} features-serif relative overflow-hidden bg-[#E3ECE6] min-h-screen flex flex-col justify-center pt-20`}
    >
      {/* Canvas grain texture overlay */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        style={{ opacity: 0.45, mixBlendMode: "soft-light" }}
      />

      <div className="relative z-10 w-full py-8">
        {/* Track holding the cards */}
        <div
          ref={trackRef}
          className="flex flex-row flex-nowrap items-stretch gap-6 px-6 md:px-20 min-w-max overflow-x-auto md:overflow-hidden select-none pb-4 no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          
          {/* Card 0: Title Card */}
          <div className="bento-card w-[380px] shrink-0 group relative overflow-hidden bg-white/70 border border-[#0B2317]/15 rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-lg h-[400px]">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#006036] bg-[#006036]/10 px-3.5 py-1.5 rounded-full inline-block">
                Features
              </span>
              <h2 className="text-[clamp(32px,3.5vw,46px)] font-bold text-[#0B2317] leading-[1.05] tracking-tight">
                One app. <span className="features-display italic text-[#006036]">Every tool</span> you need.
              </h2>
              <p className="text-xs md:text-sm text-[#0B2317]/80 leading-relaxed">
                Ditch the multiple subscriptions and WhatsApp study groups. Passmark brings all your exam preparation tools under one single offline-first roof.
              </p>
            </div>
            
            <div className="text-[10px] text-[#0B2317]/60 font-semibold flex items-center gap-1.5">
              <span>Scroll down to explore</span>
              <span className="animate-bounce">→</span>
            </div>
          </div>

          {/* Card 1: Pass AI Tutor */}
          <div className="bento-card w-[580px] shrink-0 group relative overflow-hidden bg-[#082216] border border-[#1A7A4A]/25 hover:border-[#006036]/40 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 justify-between transition-all duration-300 hover:shadow-lg h-[400px]">
            <div className="flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#006036]/50 flex items-center justify-center text-white">
                    <Bot size={18} />
                  </div>
                  <span className="text-[11px] font-bold tracking-widest text-[#9BF6BA] uppercase bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                    Pass AI
                  </span>
                </div>
                <h3 className="features-display font-serif text-3xl font-normal text-white tracking-tight leading-tight">
                  AI Tutor in English & Pidgin
                </h3>
                <p className="text-xs md:text-sm text-[#BEC9BE] leading-relaxed">
                  Stuck on a difficult WAEC or JAMB question? Ask Pass AI. Get clear, step-by-step explanations in plain English or standard Nigerian Pidgin.
                </p>
              </div>
              <div className="text-[10px] text-[#BEC9BE]/60 font-semibold">
                → Toggle English or Pidgin in the live preview
              </div>
            </div>
            <div className="w-full md:w-[260px] h-[190px] shrink-0 md:self-end">
              <AITutorMock />
            </div>
          </div>

          {/* Card 2: Question Bank */}
          <div className="bento-card w-[340px] shrink-0 group relative overflow-hidden bg-[#70AE8A] border border-[#0B2317]/15 hover:border-[#006036]/25 rounded-2xl p-6 flex flex-col justify-between gap-6 transition-all duration-300 hover:shadow-lg h-[400px]">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0B2317]/10 flex items-center justify-center text-[#0B2317]">
                  <BookOpen size={18} />
                </div>
                <span className="text-[11px] font-bold tracking-widest text-[#0B2317] uppercase bg-[#0B2317]/15 px-2 py-0.5 rounded">
                  Database
                </span>
              </div>
              <h3 className="features-display font-serif text-2xl font-normal text-[#0B2317] tracking-tight leading-tight">
                48 Years of Questions
              </h3>
              <p className="text-xs text-[#0B2317]/90 leading-relaxed">
                Complete, official past question bank from 1978 to 2026. WAEC, JAMB, NECO, and Post-UTME.
              </p>
            </div>
            <div className="h-[150px] w-full">
              <QuestionBankMock />
            </div>
          </div>

          {/* Card 3: Mock Exams */}
          <div className="bento-card w-[340px] shrink-0 group relative overflow-hidden bg-[#DCEEE4] border border-[#0B2317]/15 hover:border-[#006036]/25 rounded-2xl p-6 flex flex-col justify-between gap-6 transition-all duration-300 hover:shadow-lg h-[400px]">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#006036]/10 flex items-center justify-center text-[#006036]">
                  <Timer size={18} />
                </div>
                <span className="text-[11px] font-bold tracking-widest text-[#835500] uppercase bg-[#FEAE2C]/15 px-2 py-0.5 rounded">
                  CBT
                </span>
              </div>
              <h3 className="features-display font-serif text-2xl font-normal text-[#0B2317] tracking-tight leading-tight">
                Full CBT Simulation
              </h3>
              <p className="text-xs text-[#0B2317]/90 leading-relaxed">
                Practice with the exact official layout, timing, and calculators used in real computer-based exams.
              </p>
            </div>
            <div className="h-[150px] w-full">
              <CBTMock />
            </div>
          </div>

          {/* Card 4: Pass Streak */}
          <div className="bento-card w-[340px] shrink-0 group relative overflow-hidden bg-[#F8F2EA] border border-[#835500]/15 hover:border-[#835500]/30 rounded-2xl p-6 flex flex-col justify-between gap-6 transition-all duration-300 hover:shadow-lg h-[400px]">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#FEAE2C]/10 flex items-center justify-center text-[#835500]">
                  <Flame size={18} />
                </div>
                <span className="text-[11px] font-bold tracking-widest text-[#835500] uppercase bg-[#FEAE2C]/15 px-2 py-0.5 rounded">
                  Streak
                </span>
              </div>
              <h3 className="features-display font-serif text-2xl font-normal text-[#835500] tracking-tight leading-tight">
                Daily Pass Streak
              </h3>
              <p className="text-xs text-[#835500]/90 leading-relaxed">
                Daily bite-sized revision drills to build a strong learning habit. Miss a day, lose your streak.
              </p>
            </div>
            <div className="h-[150px] w-full">
              <StreakMock />
            </div>
          </div>

          {/* Card 5: Pass League */}
          <div className="bento-card w-[340px] shrink-0 group relative overflow-hidden bg-[#AA8CE5] border border-[#0B1020]/15 hover:border-[#0B1020]/30 rounded-2xl p-6 flex flex-col justify-between gap-6 transition-all duration-300 hover:shadow-lg h-[400px]">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0B1020]/10 flex items-center justify-center text-[#0B1020]">
                  <Trophy size={18} />
                </div>
                <span className="text-[11px] font-bold tracking-widest text-[#006036] uppercase bg-[#9BF6BA]/25 px-2 py-0.5 rounded">
                  Compete
                </span>
              </div>
              <h3 className="features-display font-serif text-2xl font-normal text-[#0B1020] tracking-tight leading-tight font-gordita">
                National Leaderboards
              </h3>
              <p className="text-xs text-[#0B1020]/90 leading-relaxed">
                Rank up against students in your state, local government, or school. Weekly resets keep competition hot.
              </p>
            </div>
            <div className="h-[150px] w-full">
              <LeagueMock />
            </div>
          </div>

          {/* Card 6: Offline Mode */}
          <div className="bento-card w-[340px] shrink-0 group relative overflow-hidden bg-[#F8F2EA] border border-[#0B2317]/15 hover:border-[#006036]/25 rounded-2xl p-6 flex flex-col justify-between gap-6 transition-all duration-300 hover:shadow-lg h-[400px]">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#006036]/10 flex items-center justify-center text-[#006036]">
                  <WifiOff size={18} />
                </div>
                <span className="text-[11px] font-bold tracking-widest text-[#006036] uppercase bg-[#9BF6BA]/20 px-2 py-0.5 rounded">
                  Data-Free
                </span>
              </div>
              <h3 className="features-display font-serif text-2xl font-normal text-[#0B2317] tracking-tight leading-tight">
                100% Offline Mode
              </h3>
              <p className="text-xs text-[#0B2317]/90 leading-relaxed">
                Zero data, zero internet needed. Download once, revise anywhere—whether inside the bus or during power outages.
              </p>
            </div>
            <div className="h-[150px] w-full">
              <OfflineMock />
            </div>
          </div>

          {/* Card 7: Parent View */}
          <div className="bento-card w-[340px] shrink-0 group relative overflow-hidden bg-[#DCEEE4] border border-[#0B2317]/15 hover:border-[#006036]/25 rounded-2xl p-6 flex flex-col justify-between gap-6 transition-all duration-300 hover:shadow-lg h-[400px]">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#835500]/10 flex items-center justify-center text-[#835500]">
                  <Users size={18} />
                </div>
                <span className="text-[11px] font-bold tracking-widest text-[#835500] uppercase bg-[#FEAE2C]/20 px-2 py-0.5 rounded">
                  Family
                </span>
              </div>
              <h3 className="features-display font-serif text-2xl font-normal text-[#0B2317] tracking-tight leading-tight">
                Direct Parent View
              </h3>
              <p className="text-xs text-[#0B2317]/90 leading-relaxed">
                Share a secure 6-digit pin with your parents. They can track your scores and study hours on any phone.
              </p>
            </div>
            <div className="h-[150px] w-full">
              <ParentViewMock />
            </div>
          </div>

          {/* Card 8: Flashcards */}
          <div className="bento-card w-[340px] shrink-0 group relative overflow-hidden bg-[#70AE8A] border border-[#0B2317]/15 hover:border-[#006036]/25 rounded-2xl p-6 flex flex-col justify-between gap-6 transition-all duration-300 hover:shadow-lg h-[400px] font-gordita">
            <div className="space-y-3 font-gordita">
              <div className="flex items-center gap-2 font-gordita">
                <div className="w-8 h-8 rounded-lg bg-[#0B2317]/10 flex items-center justify-center text-[#0B2317] font-gordita">
                  <CreditCard size={18} />
                </div>
                <span className="text-[11px] font-bold tracking-widest text-[#0B2317] uppercase bg-[#0B2317]/15 px-2 py-0.5 rounded font-gordita">
                  Revision
                </span>
              </div>
              <h3 className="features-display font-serif text-2xl font-normal text-[#0B2317] tracking-tight leading-tight font-gordita">
                AI Spaced Repetition
              </h3>
              <p className="text-xs text-[#0B2317]/90 leading-relaxed font-gordita">
                Smart flashcards automatically generated around your weak areas and questions you got wrong in mocks.
              </p>
            </div>
            <div className="h-[150px] w-full font-gordita">
              <FlashcardMock />
            </div>
          </div>

        </div>
      </div>
      
      <style>{`
        .features-serif .features-display,
        .features-serif .features-display * {
          font-family: var(--font-instrument-serif), serif;
          font-weight: 400;
        }
        .perspective {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
