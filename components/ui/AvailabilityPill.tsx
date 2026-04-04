export default function AvailabilityPill({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xs bg-green-950/30 px-3.5 py-1.5">
      <span className="relative flex h-1.5 w-1.5">
        <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
      </span>
      <span className="text-[11px] font-medium text-green-400/90">{text}</span>
    </div>
  );
}
