"""
init_db.py — Buat dan seed database SQLite portfolio.
Jalankan SEKALI di PythonAnywhere:
  python init_db.py
"""

import json
import os
import sqlite3

DB_PATH = os.path.join(os.path.dirname(__file__), "portfolio.db")

SCHEMA = """
CREATE TABLE IF NOT EXISTS projects (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    slug        TEXT    NOT NULL UNIQUE,
    description TEXT    NOT NULL,
    tech        TEXT    NOT NULL,  -- JSON array
    url         TEXT,
    image       TEXT,
    sort_order  INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS project_details (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL REFERENCES projects(id),
    role       TEXT    NOT NULL,
    overview   TEXT    NOT NULL
);

CREATE TABLE IF NOT EXISTS project_contributions (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL REFERENCES projects(id),
    contribution TEXT  NOT NULL,
    sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS speaking_events (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    title      TEXT NOT NULL,
    event      TEXT NOT NULL,
    organizer  TEXT NOT NULL,
    date       TEXT NOT NULL,
    location   TEXT NOT NULL,
    topics     TEXT NOT NULL,  -- JSON array
    url        TEXT,
    audience   TEXT,
    sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS about_meta (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    icon_key   TEXT NOT NULL,
    text       TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS about_education (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    icon_key   TEXT NOT NULL,
    degree     TEXT NOT NULL,
    school     TEXT NOT NULL,
    year       TEXT NOT NULL,
    note       TEXT,
    sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS about_highlights (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    value      TEXT NOT NULL,
    label      TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS about_focus_tags (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    tag        TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS skill_categories (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    label      TEXT NOT NULL,
    icon_key   TEXT NOT NULL,
    icon_bg    TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS skill_category_items (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL REFERENCES skill_categories(id),
    name        TEXT    NOT NULL,
    pct         INTEGER NOT NULL,
    sort_order  INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS socials (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    label      TEXT NOT NULL,
    href       TEXT NOT NULL,
    icon_key   TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
);
"""

# ─── Seed data (cerminan dari lib/data/ Next.js) ───────────────────────────

PROJECTS = [
    {
        "name": "Maroon Vote",
        "slug": "maroon-vote",
        "description": "Mengembangkan aplikasi e-voting berbasis web menggunakan Laravel dan React dengan konsep modern monolith untuk menciptakan sistem pemungutan suara yang aman dan efisien.",
        "tech": ["Laravel", "React", "Tailwind CSS", "SQL", "Google Search Console", "SEO"],
        "url": "https://maroonvote.immsolo.or.id",
        "image": "/projects/maroonvote.png",
        "role": "Full Stack Developer",
        "overview": "Maroon Vote adalah aplikasi e-voting berbasis web yang dikembangkan untuk mendukung proses pemungutan suara organisasi secara digital. Dibangun dengan konsep modern monolith menggunakan Laravel sebagai backend dan React sebagai frontend, aplikasi ini dirancang untuk menjamin keamanan, transparansi, dan kemudahan penggunaan dalam proses demokrasi organisasi.",
        "contributions": [
            "Merancang dan mengimplementasikan arsitektur modern monolith menggunakan Laravel sebagai backend REST API dan React sebagai frontend SPA.",
            "Membangun sistem autentikasi berbasis token untuk memastikan hanya pemilih yang berhak dapat mengakses dan memberikan suara.",
            "Mengintegrasikan database MySQL untuk penyimpanan data kandidat, daftar pemilih, dan rekap hasil suara secara real-time.",
            "Membangun antarmuka pengguna yang responsif dan intuitif menggunakan Tailwind CSS agar mudah digunakan di berbagai perangkat.",
            "Melakukan optimasi SEO teknis pada halaman publik dan mendaftarkan ke Google Search Console untuk monitoring performa.",
        ],
    },
    {
        "name": "Website PC IMM Kota Surakarta",
        "slug": "imm-solo",
        "description": "Membangun website resmi untuk PC IMM Kota Surakarta menggunakan WordPress dan Elementor, menampilkan informasi organisasi, kegiatan, dan berita terkini dengan desain responsif dan modern.",
        "tech": ["WordPress", "Elementor", "Google Search Console", "Yoast SEO"],
        "url": "https://immsolo.or.id",
        "image": "/projects/immsolo.png",
        "role": "WordPress Developer & SEO Specialist",
        "overview": "Website resmi PC IMM (Pimpinan Cabang Ikatan Mahasiswa Muhammadiyah) Kota Surakarta dibangun untuk menjadi pusat informasi organisasi secara digital. Platform ini menampilkan profil organisasi, agenda kegiatan, berita terkini, dan informasi penting lainnya dengan tampilan yang profesional dan mudah dikelola oleh pengurus.",
        "contributions": [
            "Membangun dan mengkonfigurasi website organisasi menggunakan CMS WordPress dengan tema yang sesuai identitas organisasi.",
            "Menyesuaikan tampilan halaman menggunakan Elementor Page Builder untuk menciptakan layout yang profesional dan informatif.",
            "Menerapkan strategi SEO on-page komprehensif menggunakan plugin Yoast SEO termasuk optimasi meta tag, struktur heading, dan sitemap XML.",
            "Mendaftarkan dan mengelola properti website di Google Search Console untuk monitoring performa pencarian organik dan indeksasi konten.",
            "Memastikan website responsif, cepat diakses, dan ramah pengguna di berbagai perangkat termasuk mobile.",
        ],
    },
    {
        "name": "Website Perkaderan PC IMM Kota Surakarta",
        "slug": "perkaderan-imm",
        "description": "Mengelola dan mengoptimalkan website perkaderan PC IMM Kota Surakarta dengan fokus pada peningkatan visibilitas di mesin pencari melalui strategi SEO teknis dan on-page.",
        "tech": ["Google Search Console", "Yoast SEO", "SEO"],
        "url": "https://perkaderan.immsolo.or.id",
        "image": "/projects/perkaderan.png",
        "role": "SEO Specialist",
        "overview": "Website Perkaderan PC IMM Kota Surakarta adalah platform digital yang menampilkan informasi dan program kaderisasi organisasi. Fokus utama pekerjaan di proyek ini adalah meningkatkan visibilitas website di hasil pencarian Google sehingga informasi perkaderan dapat lebih mudah ditemukan oleh mahasiswa yang membutuhkan.",
        "contributions": [
            "Melakukan audit SEO menyeluruh untuk mengidentifikasi kelemahan teknis dan peluang optimasi pada website.",
            "Menerapkan optimasi on-page menggunakan Yoast SEO mencakup meta title, meta description, canonical tag, dan struktur konten yang teroptimasi.",
            "Mendaftarkan dan mengelola website di Google Search Console untuk memantau performa pencarian, crawl errors, dan coverage indeksasi.",
            "Membangun strategi internal linking yang kuat antar halaman untuk meningkatkan distribusi otoritas halaman.",
            "Memonitor dan melaporkan perkembangan peringkat kata kunci target secara berkala menggunakan data dari Google Search Console.",
        ],
    },
    {
        "name": "SiData DISKOMINFO SP Kota Surakarta",
        "slug": "sidata",
        "description": "Menjalankan program magang sebagai Web Developer di Dinas Komunikasi, Informatika, Statistik dan Persandian (DISKOMINFO SP) Kota Surakarta, berkontribusi pada pengembangan aplikasi SiData menggunakan Laravel dan Tailwind CSS.",
        "tech": ["Laravel", "Tailwind CSS", "Github"],
        "url": "/",
        "image": "/projects/sidata.png",
        "role": "Web Developer Intern",
        "overview": "Program magang di Dinas Komunikasi, Informatika, Statistik dan Persandian (DISKOMINFO SP) Kota Surakarta memberikan pengalaman nyata dalam pengembangan perangkat lunak instansi pemerintah. Selama magang, berkontribusi pada pengembangan aplikasi SiData — sistem informasi data yang digunakan untuk pengelolaan data statistik kota Surakarta.",
        "contributions": [
            "Mengembangkan fitur-fitur baru pada aplikasi SiData menggunakan framework Laravel dengan pendekatan arsitektur MVC.",
            "Membangun komponen antarmuka yang responsif dan modern menggunakan Tailwind CSS sesuai standar desain instansi.",
            "Mengelola versi kode menggunakan Git dan berkolaborasi dengan tim pengembang melalui platform GitHub.",
            "Melakukan debugging dan perbaikan bug pada modul-modul yang telah ada untuk meningkatkan stabilitas aplikasi.",
            "Berkoordinasi dengan tim teknis dan stakeholder untuk memahami kebutuhan pengguna dan menerjemahkannya ke dalam fitur aplikasi.",
        ],
    },
]

SPEAKING = [
    {
        "title": "Pemateri",
        "event": "Literasi Media — Darul Arqom Dasar PK IMM Arrazi FK",
        "organizer": "PK IMM Arrazi FK UMS",
        "date": "2026",
        "location": "Universitas Muhammadiyah Surakarta",
        "topics": ["Literasi Media", "Media Digital", "Literasi Informasi"],
        "url": "#",
        "audience": "Kader IMM FK UMS",
    },
    {
        "title": "Pemateri",
        "event": 'HIMATIF Portable Club 1 — "Launch Your Web Journey"',
        "organizer": "Himpunan Mahasiswa Teknik Informatika UMS (HIMATIF UMS)",
        "date": "31 Mei 2025",
        "location": "Ruang J Seminar 2, FKI UMS, Surakarta",
        "topics": ["HTML & CSS Fundamentals", "Tailwind CSS", "Git & GitHub", "Web Development Workflow"],
        "url": "https://www.instagram.com/p/DJ89MGNSymE/",
        "audience": "Mahasiswa Teknik Informatika UMS",
    },
    {
        "title": "Pemateri",
        "event": "Literasi Media — Darul Arqom Dasar PK IMM Moh. Hatta FEB",
        "organizer": "PK IMM Moh. Hatta FEB UMS",
        "date": "2025",
        "location": "Universitas Muhammadiyah Surakarta",
        "topics": ["Literasi Media", "Media Digital", "Literasi Informasi"],
        "url": "#",
        "audience": "Kader IMM FEB UMS",
    },
    {
        "title": "Pemateri",
        "event": "Literasi Media — Darul Arqom Dasar PK IMM Moh. Hatta FEB",
        "organizer": "PK IMM Moh. Hatta FEB UMS",
        "date": "2024",
        "location": "Universitas Muhammadiyah Surakarta",
        "topics": ["Literasi Media", "Media Digital", "Literasi Informasi"],
        "url": "#",
        "audience": "Kader IMM FEB UMS",
    },
]

ABOUT_META = [
    {"icon_key": "faLocationDot", "text": "Surakarta, Jawa Tengah"},
    {"icon_key": "faBriefcase", "text": "2+ Tahun Freelance"},
]

ABOUT_EDUCATION = [
    {
        "icon_key": "faGraduationCap",
        "degree": "S1 Teknik Informatika",
        "school": "Universitas Muhammadiyah Surakarta",
        "year": "2026",
        "note": "IPK 3.63",
    },
    {
        "icon_key": "faSchool",
        "degree": "Teknik Komputer dan Jaringan",
        "school": "SMK Negeri 1 Tuban",
        "year": "2021",
        "note": None,
    },
]

ABOUT_HIGHLIGHTS = [
    {"value": "2+", "label": "Tahun\nPengalaman"},
    {"value": "14+", "label": "Proyek\nSelesai"},
    {"value": "100%", "label": "Klien\nPuas"},
]

ABOUT_FOCUS_TAGS = [
    "React / Next.js",
    "Laravel",
    "Tailwind CSS",
    "SEO & GSC",
    "WordPress",
]

SKILL_CATEGORIES = [
    {
        "label": "Frontend",
        "icon_key": "faCode",
        "icon_bg": "bg-red-700",
        "skills": [
            {"name": "HTML5", "pct": 92},
            {"name": "CSS3", "pct": 88},
            {"name": "JavaScript", "pct": 85},
            {"name": "TypeScript", "pct": 78},
            {"name": "React", "pct": 85},
            {"name": "Next.js", "pct": 82},
            {"name": "Tailwind CSS", "pct": 90},
        ],
    },
    {
        "label": "Backend",
        "icon_key": "faServer",
        "icon_bg": "bg-red-800",
        "skills": [
            {"name": "PHP", "pct": 82},
            {"name": "Laravel", "pct": 85},
            {"name": "Python", "pct": 70},
            {"name": "REST API", "pct": 80},
        ],
    },
    {
        "label": "Database",
        "icon_key": "faDatabase",
        "icon_bg": "bg-red-900",
        "skills": [
            {"name": "MySQL", "pct": 82},
            {"name": "SQL Query", "pct": 85},
            {"name": "phpMyAdmin", "pct": 80},
        ],
    },
    {
        "label": "SEO",
        "icon_key": "faMagnifyingGlass",
        "icon_bg": "bg-red-700",
        "skills": [
            {"name": "On-Page SEO", "pct": 90},
            {"name": "Technical SEO", "pct": 82},
            {"name": "Google Search Console", "pct": 88},
            {"name": "Yoast SEO", "pct": 85},
        ],
    },
    {
        "label": "Tools",
        "icon_key": "faGears",
        "icon_bg": "bg-red-800",
        "skills": [
            {"name": "Git / GitHub", "pct": 88},
            {"name": "VS Code", "pct": 92},
            {"name": "Figma", "pct": 72},
            {"name": "Vercel", "pct": 80},
        ],
    },
    {
        "label": "CMS",
        "icon_key": "faWordpress",
        "icon_bg": "bg-red-900",
        "skills": [
            {"name": "WordPress", "pct": 85},
            {"name": "Elementor", "pct": 82},
            {"name": "Page Builder", "pct": 80},
        ],
    },
]

SOCIALS = [
    {"label": "GitHub", "href": "https://github.com/yakubfirman", "icon_key": "faGithub"},
    {"label": "LinkedIn", "href": "https://linkedin.com/in/Yakub-Firman-Mustofa", "icon_key": "faLinkedinIn"},
    {"label": "Instagram", "href": "https://instagram.com/f.firman5", "icon_key": "faInstagram"},
]


def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    # Buat semua tabel
    c.executescript(SCHEMA)

    # Hapus data lama (idempotent)
    for table in [
        "project_contributions", "project_details", "projects",
        "speaking_events",
        "about_meta", "about_education", "about_highlights", "about_focus_tags",
        "skill_category_items", "skill_categories",
        "socials",
    ]:
        c.execute(f"DELETE FROM {table}")  # noqa: S608 — table names are hardcoded

    # Seed projects
    for i, p in enumerate(PROJECTS):
        c.execute(
            "INSERT INTO projects (name, slug, description, tech, url, image, sort_order) VALUES (?,?,?,?,?,?,?)",
            (p["name"], p["slug"], p["description"], json.dumps(p["tech"]), p["url"], p["image"], i),
        )
        project_id = c.lastrowid
        c.execute(
            "INSERT INTO project_details (project_id, role, overview) VALUES (?,?,?)",
            (project_id, p["role"], p["overview"]),
        )
        for j, contrib in enumerate(p["contributions"]):
            c.execute(
                "INSERT INTO project_contributions (project_id, contribution, sort_order) VALUES (?,?,?)",
                (project_id, contrib, j),
            )

    # Seed speaking events
    for i, s in enumerate(SPEAKING):
        c.execute(
            "INSERT INTO speaking_events (title, event, organizer, date, location, topics, url, audience, sort_order) VALUES (?,?,?,?,?,?,?,?,?)",
            (s["title"], s["event"], s["organizer"], s["date"], s["location"],
             json.dumps(s["topics"]), s["url"], s.get("audience"), i),
        )

    # Seed about
    for i, m in enumerate(ABOUT_META):
        c.execute(
            "INSERT INTO about_meta (icon_key, text, sort_order) VALUES (?,?,?)",
            (m["icon_key"], m["text"], i),
        )
    for i, e in enumerate(ABOUT_EDUCATION):
        c.execute(
            "INSERT INTO about_education (icon_key, degree, school, year, note, sort_order) VALUES (?,?,?,?,?,?)",
            (e["icon_key"], e["degree"], e["school"], e["year"], e.get("note"), i),
        )
    for i, h in enumerate(ABOUT_HIGHLIGHTS):
        c.execute(
            "INSERT INTO about_highlights (value, label, sort_order) VALUES (?,?,?)",
            (h["value"], h["label"], i),
        )
    for i, tag in enumerate(ABOUT_FOCUS_TAGS):
        c.execute(
            "INSERT INTO about_focus_tags (tag, sort_order) VALUES (?,?)",
            (tag, i),
        )

    # Seed skills
    for i, cat in enumerate(SKILL_CATEGORIES):
        c.execute(
            "INSERT INTO skill_categories (label, icon_key, icon_bg, sort_order) VALUES (?,?,?,?)",
            (cat["label"], cat["icon_key"], cat["icon_bg"], i),
        )
        cat_id = c.lastrowid
        for j, skill in enumerate(cat["skills"]):
            c.execute(
                "INSERT INTO skill_category_items (category_id, name, pct, sort_order) VALUES (?,?,?,?)",
                (cat_id, skill["name"], skill["pct"], j),
            )

    # Seed socials
    for i, s in enumerate(SOCIALS):
        c.execute(
            "INSERT INTO socials (label, href, icon_key, sort_order) VALUES (?,?,?,?)",
            (s["label"], s["href"], s["icon_key"], i),
        )

    conn.commit()
    conn.close()
    print(f"✅ Database berhasil dibuat dan di-seed: {DB_PATH}")


if __name__ == "__main__":
    init_db()
