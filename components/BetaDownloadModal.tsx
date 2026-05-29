"use client";

import { Instrument_Serif } from "next/font/google";
import { Alert02Icon, Cancel01Icon, Download04Icon } from "hugeicons-react";

const APK_PATH = "/passmark.apk";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
});

type BetaDownloadModalProps = {
  open: boolean;
  onClose: () => void;
  platform?: "android" | "ios";
};

export default function BetaDownloadModal({
  open,
  onClose,
  platform = "android",
}: BetaDownloadModalProps) {
  if (!open) return null;

  const isIos = platform === "ios";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#061206]/80 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="beta-download-title"
    >
      <div className={`${instrumentSerif.variable} relative w-full max-w-[480px] rounded-[8px] border border-[#FEAE2C]/35 bg-[#082216] p-6 text-left text-[#F3FFF1] shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-7`}>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#F3FFF1]/10 text-[#F3FFF1]/70 transition-colors hover:border-[#F3FFF1]/30 hover:text-[#F3FFF1]"
          aria-label="Close beta download notice"
        >
          <Cancel01Icon size={18} />
        </button>

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FEAE2C]/14 text-[#FEAE2C]">
          <Alert02Icon size={24} />
        </div>

        <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[#FEAE2C]">
          {isIos ? "iOS version" : "Beta phase (prod stage)"}
        </p>
        <h2
          id="beta-download-title"
          className="mt-3 text-3xl font-normal leading-tight"
          style={{ fontFamily: "var(--font-instrument-serif), serif" }}
        >
          {isIos ? "Passmark is Android-only for now." : "Passmark may be unstable."}
        </h2>
        <p className="mt-4 text-sm font-medium leading-6 text-[#CFE3D0]">
          {isIos
            ? "Passmark is only available for Android right now. A stable iOS version will be coming in the next few weeks."
            : "This app is still in its beta phase and is being tested in production. You may notice crashes, design flaws, rough edges, or changing features. A stable version is coming soon."}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {!isIos && (
            <a
              href={APK_PATH}
              download
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#9BF6BA] px-5 text-sm font-black text-[#061F13] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Download APK <Download04Icon size={17} />
            </a>
          )}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-12 flex-1 items-center justify-center rounded-full border border-[#F3FFF1]/15 px-5 text-sm font-bold text-[#F3FFF1] transition-colors hover:border-[#F3FFF1]/35"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
