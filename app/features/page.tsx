"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown01Icon as ArrowDown,
  ArrowRight01Icon as ChevronRight,
  BookOpen01Icon as BookOpen,
  BotIcon as Bot,
  BatteryFullIcon as Battery,
  CalculatorIcon as Calculator,
  CheckmarkCircle02Icon as Check,
  SendingOrderIcon as Send,
  Timer01Icon as Timer,
  WifiOff01Icon as WifiOff,
  CloudDownloadIcon as CloudDownload,
} from "hugeicons-react";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturesPage() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(
        ".features-hero-badge",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );

      gsap.fromTo(
        ".features-hero-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: "power2.out" }
      );

      gsap.fromTo(
        ".features-hero-desc",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: "power2.out" }
      );

      // Section animations
      gsap.utils.toArray<HTMLElement>(".feature-section").forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={sectionRef} className="min-h-screen bg-surface">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-10 overflow-hidden">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <span className="features-hero-badge inline-block font-mono text-sm text-primary bg-primary-fixed/20 px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
              The Complete Workspace
            </span>
            <h1 className="features-hero-title text-[clamp(40px,6vw,64px)] font-extrabold leading-[1.1] tracking-tight text-on-surface mb-6">
              Everything you need <br />
              <span className="text-primary italic">to pass.</span>
            </h1>
            <p className="features-hero-desc text-lg text-on-surface-variant max-w-xl mb-10 leading-relaxed">
              Stop juggling PDFs and scattered notes. Passmark centralizes your JAMB, WAEC, and Post-UTME prep with intelligence that adapts to your pace.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-primary-container transition-all shadow-xl">
                Explore All Features
                <ArrowDown size={20} />
              </button>
              <button className="bg-surface-container-high text-on-surface px-8 py-4 rounded-xl font-semibold hover:bg-surface-variant transition-colors">
                Watch Demo
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl p-6 rotate-2 hover:rotate-0 transition-transform duration-500 shadow-2xl border border-outline-variant/20">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDA2nm2rENWSWUpsWLECV8XZpn01X7FVQNsMIdNlZ40cMrU5bi0YJbbyrG9azyh8pD4L3belgqeK72JhRyngmyhZm_ydolhthaSWvJ8qN2sBUEt2UMOQPyQJGtu6aHrfq-GOE2EVSK3qkwup-9gyatYBPmr_xkzNtijfMcDviotyWkr8kS7xpOhfIgo-6vIVRHBakgac01fpdCUm5gFzNVM4BB7pL-7uK9vB1dJdWzfCahFaxEohs8lWBScxw-_KFCVxOh1fVIUgF8"
                alt="Student studying"
                width={600}
                height={400}
                className="w-full h-[400px] object-cover rounded-xl"
              />
              <div className="mt-6 flex justify-between items-center">
                <div>
                  <p className="font-mono text-xs uppercase opacity-60">Session Progress</p>
                  <p className="text-2xl font-bold text-primary">84% Mastery</p>
                </div>
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-secondary flex items-center justify-center text-white font-bold text-xs">
                    12k
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-primary flex items-center justify-center text-white font-bold">
                    +
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-10 -left-10 bg-white p-4 rounded-xl max-w-[200px] shadow-xl border border-outline-variant/20 animate-bounce">
              <div className="flex items-center gap-3">
                <div className="bg-primary-container p-2 rounded-lg text-on-primary-container">
                  <Bot size={20} />
                </div>
                <p className="font-mono text-xs leading-tight">
                  AI Predicted Score: <span className="font-bold">312</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pass AI Section */}
      <section id="ai" className="feature-section py-20 px-4 md:px-10 bg-surface-container-low">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-end mb-12">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Bot className="text-primary" size={24} />
                <h2 className="text-[clamp(28px,4vw,32px)] font-bold">Pass AI Tutor</h2>
              </div>
              <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
                The tutor that never sleeps. Ask anything, from complex Physics derivations to Literature character analysis.
              </p>
            </div>
            <div className="pb-2">
              <Link href="#" className="font-semibold text-primary flex items-center gap-2 hover:underline">
                See how it works
                <ChevronRight size={20} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Chat Interface */}
            <div className="md:col-span-2 bg-white rounded-3xl overflow-hidden shadow-xl border border-outline-variant/20 flex flex-col h-[500px]">
              <div className="bg-surface-container-high p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-error"></div>
                  <div className="w-3 h-3 rounded-full bg-secondary-container"></div>
                  <div className="w-3 h-3 rounded-full bg-primary-container"></div>
                  <span className="font-mono text-xs ml-4">AI_CHAT_INTERFACE.v2</span>
                </div>
                <span className="font-mono text-xs text-on-surface-variant">ONLINE</span>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-surface-variant shrink-0"></div>
                  <div className="bg-surface-container rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                    <p className="text-sm">Can you explain the difference between osmosis and diffusion using a simple example?</p>
                  </div>
                </div>

                <div className="flex gap-4 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-primary shrink-0 flex items-center justify-center text-white">
                    <Bot size={16} />
                  </div>
                  <div className="bg-primary-container text-on-primary-container rounded-2xl rounded-tr-none p-4 max-w-[80%]">
                    <p className="text-sm mb-2">
                      Think of a tea bag in hot water. The tea spreading is <span className="font-bold underline">Diffusion</span>.
                    </p>
                    <p className="text-sm">
                      Osmosis is specifically about water moving through a barrier—like water entering a dry bean to make it swell.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-outline-variant/30">
                <div className="flex gap-4">
                  <input
                    className="flex-1 bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="Ask Pass AI anything..."
                    type="text"
                  />
                  <button className="bg-primary text-white p-3 rounded-xl hover:bg-primary-container transition-colors">
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="space-y-6">
              <div className="bg-secondary-container/10 border border-secondary-container/20 p-8 rounded-3xl hover:-translate-y-1 transition-all shadow-lg">
                <BookOpen className="text-secondary text-4xl mb-4" size={40} />
                <h3 className="text-xl font-bold mb-2">Context Aware</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Pass AI remembers your previous questions to build a personalized knowledge graph of your weak areas.
                </p>
              </div>

              <div className="bg-primary-container/10 border border-primary-container/20 p-8 rounded-3xl hover:-translate-y-1 transition-all shadow-lg">
                <Timer className="text-primary text-4xl mb-4" size={40} />
                <h3 className="text-xl font-bold mb-2">Step-by-Step</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Don't just get the answer. Get the full breakdown of how to solve the problem next time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Question Bank Section */}
      <section id="questions" className="feature-section py-20 px-4 md:px-10 overflow-hidden">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(40px,6vw,64px)] font-extrabold mb-6">48 Years of Wisdom.</h2>
            <p className="text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              Access our massive library of past questions from 1978 to 2026. Every single question has been verified by subject matter experts.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Years Range */}
            <div className="col-span-12 md:col-span-8 bg-white rounded-3xl p-10 shadow-xl border border-outline-variant/20 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <span className="font-mono text-sm text-primary mb-2 block">DATABASE COVERAGE</span>
                    <h3 className="text-[clamp(28px,4vw,32px)] font-bold">1978 — 2026</h3>
                  </div>
                  <div className="bg-surface-container rounded-full px-4 py-2 font-mono text-xs">450,000+ Questions</div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {["JAMB", "WAEC", "NECO", "POST-UTME", "GCE", "NABTEB"].map((exam) => (
                    <span key={exam} className="px-4 py-2 bg-surface-container rounded-lg font-semibold text-sm">
                      {exam}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute -right-20 -bottom-20 opacity-10 group-hover:opacity-20 transition-opacity">
                <BookOpen size={300} />
              </div>
            </div>

            {/* Filter Tool */}
            <div className="col-span-12 md:col-span-4 bg-primary text-white rounded-3xl p-10 shadow-xl">
              <h3 className="text-xl font-bold mb-6">Smart Filtering</h3>
              <div className="space-y-4">
                <div className="p-3 border border-white/20 rounded-xl bg-white/5 flex justify-between items-center">
                  <span className="font-semibold">Subject</span>
                  <ChevronRight size={20} />
                </div>
                <div className="p-3 border border-white/20 rounded-xl bg-white/5 flex justify-between items-center">
                  <span className="font-semibold">Topic: Thermodynamics</span>
                  <span className="text-xl">×</span>
                </div>
                <div className="p-3 border border-white/20 rounded-xl bg-white/5 flex justify-between items-center">
                  <span className="font-semibold">Year Range</span>
                  <ChevronRight size={20} />
                </div>
              </div>
              <button className="w-full mt-10 bg-white text-primary py-4 rounded-xl font-bold hover:bg-primary-fixed transition-colors">
                Apply Filters
              </button>
            </div>

            {/* Subject Cards */}
            {[
              { name: "Mathematics", count: "12,402", color: "blue", icon: Calculator },
              { name: "Chemistry", count: "10,150", color: "green", icon: Bot },
              { name: "History", count: "8,900", color: "red", icon: BookOpen },
              { name: "English", count: "15,000+", color: "purple", icon: BookOpen },
            ].map((subject) => (
              <div
                key={subject.name}
                className="col-span-6 md:col-span-3 bg-white rounded-3xl p-8 hover:bg-surface-container-high transition-all shadow-lg border border-outline-variant/20 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-${subject.color}-100 text-${subject.color}-600 flex items-center justify-center mb-6`}>
                  <subject.icon size={24} />
                </div>
                <h4 className="text-xl font-bold mb-2">{subject.name}</h4>
                <p className="font-mono text-xs opacity-60">{subject.count} QUESTIONS</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CBT Mock Exams Section */}
      <section id="mock" className="feature-section py-20 px-4 md:px-10 bg-on-surface">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-inverse-surface px-6 py-4 flex justify-between items-center text-white">
                <div className="flex items-center gap-4">
                  <span className="font-bold text-lg">CBT Simulation</span>
                  <div className="px-3 py-1 bg-error rounded text-xs font-bold animate-pulse">01:42:05</div>
                </div>
                <div className="flex gap-4">
                  <button className="text-xs uppercase tracking-widest font-bold border-b border-white">Calculator</button>
                  <button className="text-xs uppercase tracking-widest font-bold">End Exam</button>
                </div>
              </div>

              <div className="p-10 min-h-[400px]">
                <p className="font-mono text-primary text-xs mb-4">QUESTION 14 OF 40</p>
                <h3 className="text-xl font-bold mb-10 text-on-surface">
                  A body of mass 2kg is moving with a velocity of 5m/s. Calculate its kinetic energy.
                </h3>

                <div className="space-y-4">
                  <label className="flex items-center gap-4 p-4 border border-outline-variant rounded-xl hover:bg-primary/5 cursor-pointer transition-colors group">
                    <div className="w-6 h-6 rounded-full border-2 border-outline-variant group-hover:border-primary flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <span>A. 10 Joules</span>
                  </label>

                  <label className="flex items-center gap-4 p-4 border-2 border-primary rounded-xl bg-primary/5 cursor-pointer">
                    <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    </div>
                    <span className="font-bold">B. 25 Joules</span>
                  </label>

                  <label className="flex items-center gap-4 p-4 border border-outline-variant rounded-xl hover:bg-primary/5 cursor-pointer">
                    <div className="w-6 h-6 rounded-full border-2 border-outline-variant flex items-center justify-center"></div>
                    <span>C. 50 Joules</span>
                  </label>
                </div>
              </div>

              <div className="bg-surface-container px-6 py-4 flex justify-between">
                <button className="px-6 py-2 border border-outline rounded-lg font-semibold">Previous</button>
                <div className="flex gap-2">
                  <button className="w-10 h-10 border border-outline-variant rounded-lg flex items-center justify-center font-bold">13</button>
                  <button className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center font-bold">14</button>
                  <button className="w-10 h-10 border border-outline-variant rounded-lg flex items-center justify-center font-bold">15</button>
                </div>
                <button className="px-6 py-2 bg-primary text-white rounded-lg font-semibold">Next</button>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="font-mono text-sm text-primary-fixed mb-6 block uppercase tracking-[0.2em]">CBT Simulation</span>
            <h2 className="text-[clamp(28px,4vw,32px)] font-bold text-white mb-8">
              Train like you're <br />
              <span className="text-secondary-container">already in the hall.</span>
            </h2>
            <p className="text-lg text-inverse-on-surface/80 mb-10 leading-relaxed">
              Our mock exam engine perfectly replicates the official JAMB CBT interface. No surprises on exam day. Build muscle memory and master time management.
            </p>

            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
                  <Check className="text-white" size={16} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Full Length Simulations</h4>
                  <p className="text-sm text-inverse-on-surface/60">Practice with 4 subjects simultaneously just like the real deal.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
                  <Check className="text-white" size={16} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Performance Analytics</h4>
                  <p className="text-sm text-inverse-on-surface/60">Get instant results with detailed correction for every single question.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Offline Mode Section */}
      <section id="offline" className="feature-section py-20 px-4 md:px-10 overflow-hidden">
        <div className="max-w-[1280px] mx-auto">
          <div className="bg-primary rounded-[3rem] p-12 lg:p-24 relative overflow-hidden flex flex-col lg:flex-row gap-12 items-center">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-3xl -mr-64 -mt-64"></div>
            </div>

            <div className="flex-1 relative z-10 text-white">
              <h2 className="text-[clamp(40px,6vw,64px)] font-extrabold mb-8 leading-tight">
                Study without light. Study without data.
              </h2>
              <p className="text-lg mb-12 opacity-90 max-w-xl leading-relaxed">
                Nigeria's network can be unreliable. Passmark isn't. Download your question banks and video lessons to study anywhere, even in the heart of Sambisa.
              </p>

              <div className="flex gap-8">
                {[
                  { icon: WifiOff, label: "No Wi-Fi Needed" },
                  { icon: Battery, label: "Low Power Mode" },
                  { icon: CloudDownload, label: "One-Tap Sync" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4 mx-auto border border-white/20">
                      <item.icon className="text-white" size={32} />
                    </div>
                    <p className="font-mono text-xs uppercase">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-4 rounded-3xl shadow-2xl">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaCZa8rINvy52YZb2n3VTfEfSDk3lj6k1lLCPPADCQp4aOqMxmQCmC8UmmwoFw_LoisL1Ofl9sNWmox592bxaP3q-YntmgPrNPvDGmfh6YK_qhSDontLDl9McTEcJhDD13BvhZ9RmwgET21ofFTnHl160DYTHRukCSSFY0LawpIEC18SvA-fc8mktV-iEsPjrcd0BbgQw58crrplvRB2VMeHhvE8cxcUyJdoGFBtx-s3dZ2M5NnOeyAvKzR3I6pzUv6I3CPJhla8U"
                  alt="Student studying offline"
                  width={500}
                  height={625}
                  className="w-full aspect-[4/5] object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-10 rounded-2xl">
                  <p className="text-xl font-bold text-white">"It worked perfectly when my data finished."</p>
                  <p className="font-mono text-white/70 mt-2">— Chidi, Unilag Aspirant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-10 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-primary mb-6 block uppercase">Ready to join the achievers?</span>
          <h2 className="text-[clamp(28px,4vw,32px)] font-bold mb-8">Start your journey to university today.</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:bg-primary-container transition-all">
              Create Free Account
            </button>
            <Link
              href="/pricing"
              className="bg-secondary text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-secondary-container transition-all"
            >
              View Pricing Plans
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
