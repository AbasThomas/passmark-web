"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instrument_Serif } from "next/font/google";
import {
  Zap,
  Trophy,
  Award,
  Target,
  Gamepad2,
  Lock,
  CheckCircle2
} from "lucide-react";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
});

gsap.registerPlugin(ScrollTrigger);

export default function GamificationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Interactive XP and Level state
  const [xp, setXp] = useState(2400);
  const [questClaimed, setQuestClaimed] = useState(false);
  const [showXPToast, setShowXPToast] = useState(false);

  const maxXP = 4500;
  const currentLevel = xp >= maxXP ? "Pass Solid" : "Pass Sharp";
  const xpPercent = Math.min((xp / maxXP) * 100, 100);

  // Background grain texture
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
    return () => window.removeEventListener("resize", draw);
  }, []);

  // GSAP scroll animations
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gamif-title-block",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          scrollTrigger: {
            trigger: ".gamif-title-block",
            start: "top 85%",
          }
        }
      );
      gsap.fromTo(
        ".gamif-bento-panel",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: ".gamif-bento-panel",
            start: "top 80%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Function to claim XP
  const claimXP = (amount: number) => {
    if (questClaimed) return;
    setShowXPToast(true);
    setXp((prev) => Math.min(prev + amount, maxXP + 500));
    setQuestClaimed(true);
    
    gsap.fromTo(
      ".xp-progress-bar",
      { scaleY: 1.25 },
      { scaleY: 1, duration: 0.35, ease: "back.out(1.5)" }
    );
  };

  const resetQuest = () => {
    setXp(2400);
    setQuestClaimed(false);
    setShowXPToast(false);
  };

  return (
    <section
      ref={sectionRef}
      className={`${instrumentSerif.variable} gamif-serif relative overflow-hidden bg-[#F5EFEB] py-20 md:py-28 text-[#0B2317]`}
    >
      {/* Canvas grain texture overlay */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        style={{ opacity: 0.45, mixBlendMode: "soft-light" }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-10">
        
        {/* Header Block */}
        <div className="gamif-title-block text-center space-y-4 mb-16">
          <span className="inline-flex items-center gap-2 border border-[#0B2317]/15 rounded-full px-3 py-1 bg-[#006036]/5 text-xs font-semibold uppercase tracking-[0.2em] text-[#006036]">
            <Gamepad2 size={12} />
            Gamification
          </span>
          <h2 className="text-[clamp(32px,4.5vw,52px)] font-bold leading-[1.05] tracking-tight text-[#0B2317]">
            The more you study, <span className="gamif-display italic text-[#006036]">the more you win</span>.
          </h2>
          <p className="text-sm md:text-base text-[#0B2317]/80 max-w-xl mx-auto leading-relaxed text-balance">
            Earn coins, complete daily quests, compete on regional leaderboards, and watch your skills level up in real-time.
          </p>
        </div>

        {/* Bento Console Layout */}
        <div className="gamif-bento-panel max-w-[1080px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ── LEFT PANEL: Progression Console (Col span 5) ── */}
          <div className="lg:col-span-5 bg-white/70 border border-[#0B2317]/15 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden select-none">
            
            {/* Level status */}
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-[#0B2317]/10 pb-3">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#0B2317]/50">Progression Console</span>
                <span className="text-[9px] font-bold text-[#006036] bg-[#006036]/10 px-2 py-0.5 rounded uppercase tracking-wider">
                  Active User
                </span>
              </div>

              {/* Minimalist Profile Display */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#006036]/10 flex items-center justify-center text-[#006036] text-xl font-bold">
                  🎖️
                </div>
                <div>
                  <span className="text-[8px] uppercase font-bold text-[#0B2317]/50 block">Ranking Title</span>
                  <h4 className="gamif-display font-serif text-2xl font-normal text-[#0B2317] tracking-tight">{currentLevel}</h4>
                </div>
              </div>

              {/* Interactive XP bar */}
              <div className="space-y-2 pt-1 relative">
                {showXPToast && (
                  <div className="absolute -top-5 right-1 text-[10px] font-bold text-[#006036] bg-[#E8F4E9] px-2 py-0.5 rounded border border-[#006036]/10 animate-bounce">
                    +500 XP! 🚀
                  </div>
                )}
                
                <div className="flex justify-between items-baseline text-[10px] font-bold text-[#0B2317]/70">
                  <span>{xp.toLocaleString()} / {maxXP.toLocaleString()} XP</span>
                  <span className="text-[#0B2317]/50 font-normal">
                    {xp >= maxXP ? "Level Max" : `${maxXP - xp} XP to Next Title`}
                  </span>
                </div>

                <div className="h-2.5 bg-[#F5EFEB] rounded-full overflow-hidden p-0.5 border border-[#0B2317]/10">
                  <div
                    className="xp-progress-bar h-full rounded-full transition-all duration-500 bg-[#006036]"
                    style={{ width: `${xpPercent}%` }}
                  />
                </div>
              </div>

              {/* Action Button: Claim Quest XP */}
              <div className="pt-1">
                {!questClaimed ? (
                  <button
                    onClick={() => claimXP(500)}
                    className="w-full py-2.5 bg-[#006036] hover:bg-[#1A7A4A] text-white rounded-lg font-bold text-xs tracking-wider uppercase transition-all hover:-translate-y-0.5 active:scale-98 cursor-pointer"
                  >
                    Claim Daily Quest (+500 XP)
                  </button>
                ) : (
                  <div className="space-y-2">
                    <div className="w-full py-2.5 bg-[#006036]/10 border border-[#006036]/20 text-[#006036] rounded-lg font-bold text-xs text-center uppercase tracking-wide">
                      Quest Claimed Successfully ✓
                    </div>
                    {xp >= maxXP && (
                      <button
                        onClick={resetQuest}
                        className="w-full text-center text-[9px] text-[#0B2317]/50 hover:text-[#0B2317] underline cursor-pointer"
                      >
                        Reset progression demo
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Level Pathway Road-Map */}
            <div className="mt-6 border-t border-[#0B2317]/10 pt-5 space-y-4">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#0B2317]/50 block">Roadmap Path</span>
              
              <div className="relative flex justify-between items-center px-2">
                {/* Connector Path Lines */}
                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[1px] bg-[#0B2317]/10 z-0" />
                <div
                  className="absolute left-6 top-1/2 -translate-y-1/2 h-[1.5px] bg-[#006036] transition-all duration-500 z-0"
                  style={{ width: xp >= maxXP ? "100%" : "50%" }}
                />

                {/* Level 1: Pass Ready */}
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <div className="w-7 h-7 rounded-full border border-[#0B2317]/15 bg-[#E8F4E9] text-[#006036] flex items-center justify-center text-[10px] font-bold">
                    <CheckCircle2 size={12} />
                  </div>
                  <span className="text-[8px] font-semibold text-[#0B2317]/60">Ready</span>
                </div>

                {/* Level 2: Pass Sharp */}
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all ${
                    xp >= maxXP
                      ? "bg-[#E8F4E9] border-[#006036] text-[#006036]"
                      : "bg-[#FEAE2C]/10 border-[#FEAE2C] text-[#835500] animate-pulse"
                  }`}>
                    {xp >= maxXP ? <CheckCircle2 size={12} /> : "★"}
                  </div>
                  <span className={`text-[8px] font-bold ${xp >= maxXP ? "text-[#0B2317]/60" : "text-[#835500]"}`}>
                    Sharp
                  </span>
                </div>

                {/* Level 3: Pass Solid */}
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all ${
                    xp >= maxXP
                      ? "bg-[#FEAE2C]/10 border-[#FEAE2C] text-[#835500] animate-pulse"
                      : "bg-[#FAF7F2] text-[#0B2317]/20 border-[#0B2317]/10"
                  }`}>
                    {xp >= maxXP ? "★" : <Lock size={10} />}
                  </div>
                  <span className={`text-[8px] font-bold ${xp >= maxXP ? "text-[#835500]" : "text-[#0B2317]/25"}`}>
                    Solid
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* ── RIGHT PANEL: Quests Grid (Col span 7) ── */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Quest 1: Pass XP */}
            <div
              onClick={() => claimXP(500)}
              className="gamif-card bg-white/70 text-[#0B2317] border border-[#0B2317]/10 rounded-2xl p-5 flex flex-col justify-between gap-5 transition-all hover:translate-y-[-1px] hover:border-[#006036]/25 hover:shadow-sm cursor-pointer select-none"
            >
              <div className="space-y-2">
                <div className="w-8.5 h-8.5 rounded-lg bg-[#006036]/10 flex items-center justify-center text-[#006036]">
                  <Zap size={16} />
                </div>
                <h3 className="gamif-display font-serif text-2xl font-normal tracking-tight leading-tight text-[#0B2317]">
                  Adaptive Pass XP
                </h3>
                <p className="text-[12px] text-[#0B2317]/70 leading-relaxed font-medium">
                  Earn XP with every solved WAEC/JAMB question. Level up from Pass Hungry to Pass God.
                </p>
              </div>
              <div className="text-[8.5px] font-bold uppercase tracking-wider text-[#006036] bg-[#006036]/10 px-2 py-0.5 rounded w-fit border border-[#006036]/15">
                Reward: +500 XP
              </div>
            </div>

            {/* Quest 2: Pass League */}
            <div
              onClick={() => claimXP(500)}
              className="gamif-card bg-[#E3ECE6]/50 text-[#0B2317] border border-[#0B2317]/10 rounded-2xl p-5 flex flex-col justify-between gap-5 transition-all hover:translate-y-[-1px] hover:border-[#006036]/25 hover:shadow-sm cursor-pointer select-none"
            >
              <div className="space-y-2">
                <div className="w-8.5 h-8.5 rounded-lg bg-[#006036]/10 flex items-center justify-center text-[#006036]">
                  <Trophy size={16} />
                </div>
                <h3 className="gamif-display font-serif text-2xl font-normal tracking-tight leading-tight text-[#0B2317]">
                  National Leagues
                </h3>
                <p className="text-[12px] text-[#0B2317]/70 leading-relaxed font-medium">
                  Compete by state, school, or local government. Defend your rank in weekly resets.
                </p>
              </div>
              <div className="text-[8.5px] font-bold uppercase tracking-wider text-[#006036] bg-[#006036]/10 px-2 py-0.5 rounded w-fit border border-[#006036]/15">
                Reward: +500 XP
              </div>
            </div>

            {/* Quest 3: Pass Badges */}
            <div
              onClick={() => claimXP(500)}
              className="gamif-card bg-[#F8F2EA]/60 text-[#0B2317] border border-[#0B2317]/10 rounded-2xl p-5 flex flex-col justify-between gap-5 transition-all hover:translate-y-[-1px] hover:border-[#006036]/25 hover:shadow-sm cursor-pointer select-none"
            >
              <div className="space-y-2">
                <div className="w-8.5 h-8.5 rounded-lg bg-[#006036]/10 flex items-center justify-center text-[#006036]">
                  <Award size={16} />
                </div>
                <h3 className="gamif-display font-serif text-2xl font-normal tracking-tight leading-tight text-[#0B2317]">
                  Achievement Badges
                </h3>
                <p className="text-[12px] text-[#0B2317]/70 leading-relaxed font-medium">
                  Unlock trophies for mock scores, perfect study weeks, and achievements. Share on WhatsApp.
                </p>
              </div>
              <div className="text-[8.5px] font-bold uppercase tracking-wider text-[#006036] bg-[#006036]/10 px-2 py-0.5 rounded w-fit border border-[#006036]/15">
                Reward: +500 XP
              </div>
            </div>

            {/* Quest 4: Pass Challenges */}
            <div
              onClick={() => claimXP(500)}
              className="gamif-card bg-[#AA8CE5]/15 text-[#0B2317] border border-[#0B2317]/10 rounded-2xl p-5 flex flex-col justify-between gap-5 transition-all hover:translate-y-[-1px] hover:border-[#006036]/25 hover:shadow-sm cursor-pointer select-none"
            >
              <div className="space-y-2">
                <div className="w-8.5 h-8.5 rounded-lg bg-[#0B1020]/10 flex items-center justify-center text-[#0B1020]">
                  <Target size={16} />
                </div>
                <h3 className="gamif-display font-serif text-2xl font-normal tracking-tight leading-tight text-[#0B2317]">
                  Syllabus Challenges
                </h3>
                <p className="text-[12px] text-[#0B2317]/70 leading-relaxed font-medium">
                  Join weekly themed subject marathons. Win bonus coins, XP multipliers, and rank badges.
                </p>
              </div>
              <div className="text-[8.5px] font-bold uppercase tracking-wider text-[#0B1020]/80 bg-[#0B1020]/10 px-2 py-0.5 rounded w-fit border border-[#0B1020]/15">
                Reward: +500 XP
              </div>
            </div>

          </div>

        </div>
      </div>

      <style>{`
        .gamif-serif .gamif-display,
        .gamif-serif .gamif-display * {
          font-family: var(--font-instrument-serif), serif;
          font-weight: 400;
        }
        .gamif-serif .features-display,
        .gamif-serif .features-display * {
          font-family: var(--font-instrument-serif), serif;
          font-weight: 400;
        }
      `}</style>
    </section>
  );
}
