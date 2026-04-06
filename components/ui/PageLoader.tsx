"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2200);
    const removeTimer = setTimeout(() => setVisible(false), 2800);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]"
      style={{
        transition: "opacity 600ms cubic-bezier(0.4,0,0.2,1)",
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? "none" : "all",
      }}
    >
      {/* ── Background grid ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(220,38,38,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          animation: "loader-grid-in 0.8s ease forwards",
        }}
      />

      {/* ── Ambient glow ── */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-900/20 blur-[100px]"
        style={{ animation: "loader-glow-pulse 2s ease infinite" }}
      />

      {/* ── Top progress bar ── */}
      <div className="absolute top-0 left-0 h-0.5 w-full overflow-hidden bg-white/5">
        <div
          className="h-full bg-linear-to-r from-transparent via-red-500 to-transparent"
          style={{ animation: "loader-bar 2.2s ease-in-out forwards" }}
        />
      </div>

      {/* ── Corner decorators ── */}
      {[
        "top-6 left-6 border-t border-l",
        "top-6 right-6 border-t border-r",
        "bottom-6 left-6 border-b border-l",
        "bottom-6 right-6 border-b border-r",
      ].map((cls, i) => (
        <div
          key={i}
          className={`pointer-events-none absolute h-8 w-8 border-red-700/40 ${cls}`}
          style={{ animation: `loader-corner-in 0.5s ease ${i * 0.08}s both` }}
        />
      ))}

      {/* ── Main content ── */}
      <div
        className="relative flex flex-col items-center gap-5"
        style={{ animation: "loader-content-in 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.1s both" }}
      >
        {/* Photo with animated ring */}
        <div className="relative">
          {/* Outer spinning ring */}
          <div
            className="absolute -inset-2 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, #dc2626 30%, transparent 60%, #991b1b 80%, transparent 100%)",
              animation: "loader-ring-spin 2s linear infinite",
            }}
          />
          {/* Inner mask */}
          <div className="absolute -inset-1 rounded-full bg-[#0a0a0a]" />

          {/* Photo */}
          <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-red-800/50">
            <Image
              src="/photo.png"
              alt="Yakub Firman Mustofa"
              fill
              className="object-cover object-top"
              priority
            />
            {/* Scan line */}
            <div
              className="pointer-events-none absolute inset-x-0 h-6 bg-linear-to-b from-transparent via-red-500/10 to-transparent"
              style={{ animation: "loader-scan 1.6s ease-in-out 0.4s infinite" }}
            />
          </div>

          {/* Status dot */}
          <span className="absolute right-0.5 bottom-0.5 flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
        </div>

        {/* Name */}
        <div className="text-center">
          <h1
            className="text-xl font-bold tracking-[0.18em] text-white uppercase"
            style={{ animation: "loader-text-in 0.5s ease 0.4s both" }}
          >
            Yakub Firman
          </h1>
          <p
            className="mt-1 text-[10px] tracking-[0.3em] text-red-500/80 uppercase"
            style={{ animation: "loader-text-in 0.5s ease 0.55s both" }}
          >
            Full Stack Developer
          </p>
        </div>

        {/* Loading bar */}
        <div
          className="h-px w-40 overflow-hidden rounded-full bg-white/10"
          style={{ animation: "loader-text-in 0.5s ease 0.65s both" }}
        >
          <div
            className="h-full rounded-full bg-linear-to-r from-red-700 to-red-500"
            style={{ animation: "loader-fill 1.8s cubic-bezier(0.4,0,0.2,1) 0.3s forwards" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes loader-bar {
          0%   { transform: translateX(-100%); }
          60%  { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        @keyframes loader-grid-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes loader-glow-pulse {
          0%, 100% { opacity: 0.6; transform: translate(-50%,-50%) scale(1); }
          50%       { opacity: 1;   transform: translate(-50%,-50%) scale(1.15); }
        }
        @keyframes loader-ring-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes loader-scan {
          0%   { top: -24px; opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes loader-content-in {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes loader-text-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes loader-fill {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes loader-corner-in {
          from { opacity: 0; transform: scale(0.5); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
