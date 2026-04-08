/**
 * icon-map.ts — Mapping dari string key (disimpan di database)
 * ke objek IconDefinition FontAwesome.
 *
 * Ketika menambah icon baru di database, daftarkan juga di sini.
 */

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// Solid icons
import {
  faLocationDot,
  faBriefcase,
  faGraduationCap,
  faSchool,
  faCode,
  faFileCode,
  faWind,
  faServer,
  faDatabase,
  faMagnifyingGlass,
  faGears,
} from "@fortawesome/free-solid-svg-icons";

// Brand icons
import {
  faGithub,
  faLinkedinIn,
  faInstagram,
  faXTwitter,
  faTiktok,
  faHtml5,
  faCss3Alt,
  faJs,
  faReact,
  faPhp,
  faPython,
  faGitAlt,
  faWordpress,
} from "@fortawesome/free-brands-svg-icons";

export const ICON_MAP: Record<string, IconDefinition> = {
  // About
  faLocationDot,
  faBriefcase,
  faGraduationCap,
  faSchool,

  // Skill categories
  faCode,
  faFileCode,
  faWind,
  faServer,
  faDatabase,
  faMagnifyingGlass,
  faGears,
  faWordpress,

  // Individual skill icons
  faHtml5,
  faCss3Alt,
  faJs,
  faReact,
  faPhp,
  faPython,
  faGitAlt,

  // Socials
  faGithub,
  faLinkedinIn,
  faInstagram,
  faXTwitter,
  faTiktok,
};
