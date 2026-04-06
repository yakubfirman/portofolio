type TechBadgeProps = {
  label: string;
  /** "sm" (default) = smaller pill used in cards; "md" = larger pill used on detail page */
  size?: "sm" | "md";
};

export default function TechBadge({ label, size = "sm" }: TechBadgeProps) {
  return (
    <span
      className={
        size === "md"
          ? "rounded-xs bg-red-950/50 px-2.5 py-1 font-mono text-xs text-red-400/80"
          : "rounded-xs bg-red-950/50 px-2 py-0.5 font-mono text-[10px] text-red-500/80"
      }
    >
      {label}
    </span>
  );
}
