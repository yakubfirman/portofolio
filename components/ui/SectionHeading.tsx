export default function SectionHeading({
  tag,
  title,
  centered = false,
}: {
  tag: string;
  title: string;
  centered?: boolean;
}) {
  return (
    <div className={`mb-10 sm:mb-14${centered ? "text-center" : ""}`}>
      <p
        className={`mb-2 flex items-center gap-2.5 text-[11px] font-semibold tracking-widest uppercase text-red-500${
          centered ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-6 bg-red-600/70" />
        {tag}
        {centered && <span className="h-px w-6 bg-red-600/70" />}
      </p>
      <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
    </div>
  );
}
