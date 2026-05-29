"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import {
  AppleIcon,
  ArrowDown01Icon as ChevronDown,
  ArrowRight01Icon as ArrowRight,
  CheckmarkCircle02Icon,
  GoogleIcon,
  GraduationScrollIcon as GraduationCap,
  LockIcon as Lock,
  Mail01Icon as Mail,
  PhoneCheckIcon as Phone,
  StarIcon,
  UserIcon as User,
  ViewIcon as Eye,
  ViewOffSlashIcon as EyeOff,
} from "hugeicons-react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    exam: "jamb",
    password: "",
  });
  const formRef = useRef<HTMLFormElement>(null);

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
    // Handle signup logic here
    console.log("Signup:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.05] bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuBNhVCaAspLrppxQiPqQC0s3kPpXMDid4nJ2FC8zmWPJ9iHUMsKLkif-w9cbrY7zzY6mWHFOos4VfEAhX-AhI6jxfFygjPHStC-kjRYnK3Rrqm6x5gTarWMnG4gs2yI1k6d966VMwqH_8QG6fUl-33nAY6xhw3ov-NOUE7Q5HrL5LN2rjQUOqgvUYJndcM91YyVwjqAidFeyExDCmtopKLpwrByQmd7rLZRg-Zlxmi3ndLvXUu5Ghu7TJ-47zCFwIpEDQYDDaYEVdE')]" />

      <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side: Social Proof / Impact */}
        <section className="relative hidden lg:flex flex-col justify-center p-10 bg-gradient-to-br from-[#00210f] to-primary text-white overflow-hidden">
          {/* Decorative Shapes */}
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary opacity-20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-secondary opacity-10 blur-[80px] rounded-full" />

          <div className="relative z-10 max-w-xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md font-mono text-sm uppercase mb-8 border border-white/20">
              The Nigerian Standard
            </span>
            <h1 className="text-[clamp(40px,6vw,64px)] font-extrabold mb-6 leading-[1.1] tracking-tight">
              Join the next generation of <span className="text-primary-fixed">achievers.</span>
            </h1>
            <p className="text-lg text-white/80 mb-12 leading-relaxed">
              Over 100,000 Nigerian students are already hitting their passmark with our AI-powered curriculum. From JAMB to WAEC, we've got you covered.
            </p>

            {/* Testimonial Card */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl flex gap-6 items-center border border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <div className="relative w-20 h-20 flex-shrink-0">
                <div className="absolute inset-0 bg-primary-fixed rounded-full blur-sm opacity-50 group-hover:scale-110 transition-transform" />
                <Image
                  src="https://lh3.googleusercontent.com/aida/ADBb0ujPE5g_nBEKCblKIFW8Ctc9JigNDeAYjRPmgLJ16tuzcdjwLu-IDAjIpSCKu-oywXivksqG9YQdjOWPpvvtrTB5KI1gBjzu-rEW0SaBzORS7eimo1HsudT7CFqQeq163LJlgzKOcnWINU-1wnpzfvLluDKIrpfPXkyV2jKURSKH72LXY4q5PBMR8-9tk-n7m73GlzXGqUoP-e_HGJu4x0YS4UnlVkjvYiB0u7NO0r7kk7IV3ntC0E3pgQ"
                  alt="Portrait of Thomas Abas"
                  width={80}
                  height={80}
                  className="w-full h-full rounded-full object-cover border-2 border-white relative z-10"
                />
              </div>
              <div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-secondary-container" />
                  ))}
                </div>
                <p className="text-white italic mb-1 text-sm">
                  "Passmark transformed how I prepared for my exams. It's like having a personal tutor in your pocket 24/7."
                </p>
                <span className="font-mono text-xs text-primary-fixed font-bold">Thomas Abas, Founder @ Passmark</span>
              </div>
            </div>

            {/* Achievement Metrics */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div>
                <h4 className="text-2xl font-bold text-primary-fixed">92%</h4>
                <p className="font-mono text-xs text-white/60">Pass Rate</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-primary-fixed">1M+</h4>
                <p className="font-mono text-xs text-white/60">Questions</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-primary-fixed">24/7</h4>
                <p className="font-mono text-xs text-white/60">AI Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Sign-up Form */}
        <section className="flex flex-col items-center justify-center p-4 md:p-10 bg-surface relative">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden flex justify-center mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <CheckmarkCircle02Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-primary">Passmark</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-[clamp(24px,3vw,32px)] font-bold text-on-surface mb-2">
                Create your account
              </h2>
              <p className="text-on-surface-variant">
                Your journey to academic excellence starts here.
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="font-mono text-sm text-on-surface-variant block uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={18} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-outline-variant rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 text-on-surface placeholder:text-outline-variant outline-none"
                    placeholder="Chinedu Okafor"
                  />
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-mono text-sm text-on-surface-variant block uppercase tracking-wider">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-white border border-outline-variant rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 text-on-surface placeholder:text-outline-variant outline-none"
                      placeholder="edu@passmark.ai"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-sm text-on-surface-variant block uppercase tracking-wider">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-white border border-outline-variant rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 text-on-surface placeholder:text-outline-variant outline-none"
                      placeholder="+234"
                    />
                  </div>
                </div>
              </div>

              {/* Primary Exam */}
              <div className="space-y-2">
                <label className="font-mono text-sm text-on-surface-variant block uppercase tracking-wider">
                  Primary Exam
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={18} />
                  <select
                    name="exam"
                    value={formData.exam}
                    onChange={handleChange}
                    className="w-full pl-12 pr-10 py-3 bg-white border border-outline-variant rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 text-on-surface appearance-none outline-none"
                  >
                    <option value="jamb">JAMB (UTME)</option>
                    <option value="waec">WAEC (SSCE)</option>
                    <option value="neco">NECO</option>
                    <option value="post-utme">Post-UTME</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none" size={18} />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="font-mono text-sm text-on-surface-variant block uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3 bg-white border border-outline-variant rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 text-on-surface placeholder:text-outline-variant outline-none"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-container transition-all duration-300 shadow-lg shadow-primary/10 flex items-center justify-center gap-2 group overflow-hidden relative"
                >
                  <span className="relative z-10">Create Free Account</span>
                  <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-on-surface-variant">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-semibold hover:underline transition-all">
                  Log in
                </Link>
              </p>
            </div>

            {/* Social Sign-up */}
            <div className="mt-12 border-t border-outline-variant pt-8 text-center">
              <div className="flex items-center justify-center gap-4 text-outline mb-4">
                <div className="h-px bg-outline-variant flex-grow" />
                <span className="font-mono text-xs uppercase">Or Sign up with</span>
                <div className="h-px bg-outline-variant flex-grow" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 border border-outline-variant py-3 rounded-lg font-bold hover:bg-surface-container transition-colors"
                >
                  <GoogleIcon className="w-5 h-5" />
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 border border-outline-variant py-3 rounded-lg font-bold hover:bg-surface-container transition-colors"
                >
                  <AppleIcon className="w-5 h-5" />
                  Apple
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
