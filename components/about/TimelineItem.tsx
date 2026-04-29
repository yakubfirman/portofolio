interface TimelineItemProps {
  title: string;
  subtitle: string;
  period: string;
  description?: string | null;
  badge?: string;
  isLast?: boolean;
}

export default function TimelineItem({
  title,
  subtitle,
  period,
  description,
  badge,
  isLast = false,
}: TimelineItemProps) {
  return (
    <div className="relative flex gap-4 sm:gap-5">
      {/* ── Vertical line ── */}
      <div className="flex flex-col items-center">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-red-700/40 bg-red-950/30">
          <span className="h-2.5 w-2.5 rounded-full bg-red-600" />
        </div>
        {!isLast && (
          <div className="mt-1 w-px flex-1 bg-gradient-to-b from-red-900/40 to-transparent" />
        )}
      </div>

      {/* ── Content ── */}
      <div className={`min-w-0 flex-1 ${isLast ? "pb-0" : "pb-7"}`}>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">{title}</p>
            <p className="mt-0.5 text-xs text-gray-400">{subtitle}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <span className="rounded-xs bg-red-950/40 px-2.5 py-0.5 text-[11px] font-medium text-red-400 border border-red-900/30">
              {period}
            </span>
            {badge && (
              <span className="rounded-xs bg-white/5 px-2.5 py-0.5 text-[10px] text-gray-500 border border-white/8">
                {badge}
              </span>
            )}
          </div>
        </div>
        {description && (
          <p className="mt-2 text-xs leading-relaxed text-gray-500">{description}</p>
        )}
      </div>
    </div>
  );
}
