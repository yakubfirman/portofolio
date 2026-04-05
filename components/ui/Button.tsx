import type { AnchorHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md";

// ── Edit these to change ALL buttons across the site ──
export const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "rounded-xs bg-red-700 text-white font-semibold shadow-md shadow-red-950/40 transition-all hover:bg-red-600 hover:shadow-red-900/50",
  outline:
    "rounded-xs border border-red-800/50 bg-red-950/30 text-gray-300 font-semibold transition-all hover:border-red-600/60 hover:bg-red-950/50 hover:text-white",
  ghost:
    "rounded-xs border border-red-900/30 bg-red-950/20 text-gray-400 font-medium transition-all hover:border-red-700/50 hover:bg-red-950/30 hover:text-white",
};

export const BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
};

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={`group inline-flex items-center justify-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70 ${BUTTON_VARIANTS[variant]} ${BUTTON_SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
