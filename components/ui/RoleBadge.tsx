import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

type RoleBadgeProps = {
  role: string;
  /** "sm" (default) = used in cards; "md" = used on detail page */
  size?: "sm" | "md";
};

export default function RoleBadge({ role, size = "sm" }: RoleBadgeProps) {
  return (
    <div className="flex items-center gap-1.5">
      <FontAwesomeIcon
        icon={faBriefcase}
        aria-hidden="true"
        className={size === "md" ? "h-3.5 w-3.5 text-red-500" : "h-2.5 w-2.5 text-red-700"}
      />
      <span
        className={
          size === "md"
            ? "text-xs font-semibold tracking-widest text-red-500 uppercase"
            : "text-[10px] font-semibold tracking-wider text-red-700/80 uppercase"
        }
      >
        {role}
      </span>
    </div>
  );
}
