"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // Form entrance animation
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }

  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login:", { email, password });
  };

  return (
    <>
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.05] bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuBNhVCaAspLrppxQiPqQC0s3kPpXMDid4nJ2FC8zmWPJ9iHUMsKLkif-w9cbrY7zzY6mWHFOos4VfEAhX-AhI6jxfFygjPHStC-kjRYnK3Rrqm6x5gTarWMnG4gs2yI1k6d966VMwqH_8QG6fUl-33nAY6xhw3ov-NOUE7Q5HrL5LN2rjQUOqgvUYJndcM91YyVwjqAidFeyExDCmtopKLpwrByQmd7rLZRg-Zlxmi3ndLvXUu5Ghu7TJ-47zCFwIpEDQYDDaYEVdE')]" />

      <main className="min-h-screen flex items-center justify-center relative px-4 md:px-10 py-12 bg-gradient-to-br from-primary/5 via-surface to-secondary/5">
        <div className="max-w-[1280px] w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left Side: Visual Narrative */}
          <div className="hidden md:flex flex-col justify-center space-y-6 relative h-full">
            <div className="relative z-10">
              <div className="mb-6">
                <span className="font-mono text-sm text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
                  Scholar Workspace
                </span>
              </div>
              <h1 className="text-[clamp(40px,6vw,64px)] font-extrabold text-on-surface mb-6 leading-[1.1] tracking-tight">
                Precision <span className="text-primary">Preparation.</span>
              </h1>
              <p className="text-lg text-on-surface-variant max-w-md leading-relaxed">
                The ultimate dashboard for Nigerian students. Experience real-time analytics for JAMB, WAEC, and NECO exams in a focused academic environment.
              </p>
            </div>

            {/* App Mockup Floating Section */}
            <div className="relative w-full max-w-lg">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />
              <Image
                src="https://lh3.googleusercontent.com/aida/ADBb0ujbX6JAdWb9glxdtGvRUkUyLvRX1SiYynZHuqlk5uFcK7E4IUI8eKqtP6FQ8TO5AO9Uq4jATSIQosGRK6iPBgW16pfz9D5qcQ56K0caD-Lzf_kKkdsImRBerDVWgUsvTsnPMJaCOXHF3_xAS-TJWtfh4m7hyPFgggIl43F-mKWlWkNoQ-iYL2IYkH9RgUzyAhZDA7dHLjkWB52xJ3Zln1GQIc1uA93FPUuvMBRY4FbHaSujntd3XrQZhhY"
                alt="Passmark Mobile App Dashboard Showing Exam Statistics"
                width={400}
                height={800}
                className="relative z-20 rounded-[2.5rem] shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500 w-full object-contain"
              />
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="flex justify-center md:justify-end">
            <div
              ref={formRef}
              className="bg-white w-full max-w-[480px] p-8 md:p-12 rounded-xl shadow-lg border border-outline-variant/20 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              {/* Bottom border animation */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

              <div className="mb-6 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-2xl font-bold text-primary">Passmark</span>
                </div>
                <h2 className="text-[clamp(24px,3vw,32px)] font-bold text-on-surface mb-2">
                  Welcome back, Scholar.
                </h2>
                <p className="text-on-surface-variant">
                  Log in to continue your journey to university.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="flex flex-col space-y-2">
                  <label className="font-mono text-sm text-on-surface-variant uppercase tracking-wider">
                    Email or Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 pr-12 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                      placeholder="scholar@jamb.ng"
                    />
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-outline" size={20} />
                  </div>
                </div>

                {/* Password Field */}
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="font-mono text-sm text-on-surface-variant uppercase tracking-wider">
                      Password
                    </label>
                    <Link href="#" className="font-mono text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-12 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Main Action */}
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group mt-4"
                >
                  Log In
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>

                {/* Divider */}
                <div className="relative py-4 flex items-center">
                  <div className="flex-grow border-t border-outline-variant" />
                  <span className="flex-shrink mx-4 font-mono text-on-surface-variant text-xs">OR</span>
                  <div className="flex-grow border-t border-outline-variant" />
                </div>

                {/* Social Login */}
                <button
                  type="button"
                  className="w-full bg-surface-container-low border border-outline-variant text-on-surface py-3 rounded-lg font-bold hover:bg-surface-container transition-colors flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-on-surface-variant">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-primary font-bold hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Area (Minimalist) */}
      <footer className="w-full py-8 text-center bg-surface-container-low/50 border-t border-outline-variant/30">
        <p className="font-mono text-xs text-on-surface-variant">
          © 2024 Passmark AI. Empowering Nigerian Excellence.
        </p>
      </footer>

      {/* Interactive Background Elements */}
      <div className="fixed top-20 right-10 opacity-20 pointer-events-none">
        <svg className="w-36 h-36 text-secondary animate-pulse" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </div>
    </>
  );
}
