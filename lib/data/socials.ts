import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub,
  faLinkedinIn,
  faInstagram,
  faXTwitter,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

export const SOCIALS: { label: string; href: string; icon: IconDefinition }[] = [
  { label: "GitHub", href: "https://github.com/yakubfirman", icon: faGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/Yakub-Firman-Mustofa", icon: faLinkedinIn },
  { label: "Instagram", href: "https://instagram.com/f.firman5", icon: faInstagram },
];
