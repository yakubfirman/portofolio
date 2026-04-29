import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

interface CertificateCardProps {
  name: string;
  issuer: string;
  issued_date: string;
  credential_url: string | null;
}

export default function CertificateCard({
  name,
  issuer,
  issued_date,
  credential_url,
}: CertificateCardProps) {
  const card = (
    <div
      className={`group flex h-full flex-col gap-3 rounded-xs border border-red-900/20 bg-[#0f0505] p-4 transition-all duration-200 ${
        credential_url
          ? "cursor-pointer hover:border-red-700/40 hover:bg-red-950/10"
          : ""
      }`}
    >
      {/* Icon */}
      <div className="flex h-9 w-9 items-center justify-center rounded-xs bg-red-900/20">
        <FontAwesomeIcon icon={faAward} className="h-4 w-4 text-red-500" aria-hidden="true" />
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold leading-snug text-white">{name}</p>
        <p className="mt-1 text-xs text-gray-500">{issuer}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-gray-600">{issued_date}</span>
        {credential_url && (
          <span className="flex items-center gap-1 text-[11px] text-red-500/70 transition-colors group-hover:text-red-400">
            Lihat
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-2.5 w-2.5" />
          </span>
        )}
      </div>
    </div>
  );

  if (credential_url) {
    return (
      <a href={credential_url} target="_blank" rel="noopener noreferrer" className="block h-full">
        {card}
      </a>
    );
  }
  return card;
}
