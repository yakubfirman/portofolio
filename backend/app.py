"""
app.py — Flask REST API untuk portfolio Yakub Firman Mustofa.
Dijalankan di PythonAnywhere sebagai web app.
"""

import json
import os
import re
import sqlite3
from functools import wraps

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

# ─── CORS: ganti dengan domain Vercel kamu ───────────────────────────────────
_raw_origins = os.environ.get(
    "ALLOWED_ORIGINS",
    "https://yakubfirman.id",
)
ALLOWED_ORIGINS = [o.strip() for o in _raw_origins.split(",")]
CORS(app, origins=ALLOWED_ORIGINS)

DB_PATH = os.path.join(os.path.dirname(__file__), "portfolio.db")

SLUG_RE = re.compile(r"^[a-z0-9-]+$")


# ─── Auth decorator ───────────────────────────────────────────────────────────

def require_api_key(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        key = request.headers.get("X-Api-Key", "")
        expected = os.environ.get("API_SECRET_KEY", "")
        if not expected or key != expected:
            return jsonify({"error": "Unauthorized"}), 401
        return f(*args, **kwargs)
    return decorated


# ─── Helpers ─────────────────────────────────────────────────────────────────

def get_db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def _build_project(conn: sqlite3.Connection, row: sqlite3.Row) -> dict:
    details = conn.execute(
        "SELECT role, overview FROM project_details WHERE project_id = ?",
        (row["id"],),
    ).fetchone()
    contributions = conn.execute(
        "SELECT contribution FROM project_contributions WHERE project_id = ? ORDER BY sort_order",
        (row["id"],),
    ).fetchall()
    return {
        "name": row["name"],
        "slug": row["slug"],
        "description": row["description"],
        "tech": json.loads(row["tech"]),
        "url": row["url"],
        "image": row["image"],
        "details": {
            "role": details["role"] if details else "",
            "overview": details["overview"] if details else "",
            "contributions": [c["contribution"] for c in contributions],
        },
    }


# ─── Routes ──────────────────────────────────────────────────────────────────

@app.route("/api/projects", methods=["GET"])
def get_projects():
    conn = get_db()
    try:
        rows = conn.execute(
            "SELECT * FROM projects ORDER BY sort_order"
        ).fetchall()
        return jsonify([_build_project(conn, r) for r in rows])
    finally:
        conn.close()


@app.route("/api/projects/<slug>", methods=["GET"])
def get_project(slug: str):
    # Validasi slug — hanya huruf kecil, angka, dan tanda hubung
    if not SLUG_RE.match(slug):
        return jsonify({"error": "Invalid slug"}), 400

    conn = get_db()
    try:
        row = conn.execute(
            "SELECT * FROM projects WHERE slug = ?", (slug,)
        ).fetchone()
        if not row:
            return jsonify({"error": "Not found"}), 404
        return jsonify(_build_project(conn, row))
    finally:
        conn.close()


@app.route("/api/speaking", methods=["GET"])
def get_speaking():
    conn = get_db()
    try:
        rows = conn.execute(
            "SELECT * FROM speaking_events ORDER BY sort_order"
        ).fetchall()
        return jsonify([
            {
                "id": r["id"],
                "title": r["title"],
                "event": r["event"],
                "organizer": r["organizer"],
                "date": r["date"],
                "location": r["location"],
                "topics": json.loads(r["topics"]),
                "url": r["url"],
                "audience": r["audience"],
            }
            for r in rows
        ])
    finally:
        conn.close()


@app.route("/api/about", methods=["GET"])
def get_about():
    conn = get_db()
    try:
        meta = conn.execute("SELECT icon_key, text FROM about_meta ORDER BY sort_order").fetchall()
        education = conn.execute(
            "SELECT icon_key, degree, school, year, note FROM about_education ORDER BY sort_order"
        ).fetchall()
        highlights = conn.execute(
            "SELECT value, label FROM about_highlights ORDER BY sort_order"
        ).fetchall()
        focus_tags = conn.execute(
            "SELECT tag FROM about_focus_tags ORDER BY sort_order"
        ).fetchall()
        return jsonify({
            "meta": [{"icon_key": m["icon_key"], "text": m["text"]} for m in meta],
            "education": [
                {
                    "icon_key": e["icon_key"],
                    "degree": e["degree"],
                    "school": e["school"],
                    "year": e["year"],
                    "note": e["note"],
                }
                for e in education
            ],
            "highlights": [{"value": h["value"], "label": h["label"]} for h in highlights],
            "focus_tags": [f["tag"] for f in focus_tags],
        })
    finally:
        conn.close()


@app.route("/api/skills", methods=["GET"])
def get_skills():
    conn = get_db()
    try:
        categories = conn.execute(
            "SELECT * FROM skill_categories ORDER BY sort_order"
        ).fetchall()
        result = []
        for cat in categories:
            items = conn.execute(
                "SELECT name, pct FROM skill_category_items WHERE category_id = ? ORDER BY sort_order",
                (cat["id"],),
            ).fetchall()
            result.append({
                "label": cat["label"],
                "icon_key": cat["icon_key"],
                "icon_bg": cat["icon_bg"],
                "skills": [{"name": i["name"], "pct": i["pct"]} for i in items],
            })
        return jsonify({"categories": result})
    finally:
        conn.close()


@app.route("/api/socials", methods=["GET"])
def get_socials():
    conn = get_db()
    try:
        rows = conn.execute("SELECT label, href, icon_key FROM socials ORDER BY sort_order").fetchall()
        return jsonify([
            {"label": r["label"], "href": r["href"], "icon_key": r["icon_key"]}
            for r in rows
        ])
    finally:
        conn.close()


# ─── Projects write endpoints ─────────────────────────────────────────────────

@app.route("/api/projects", methods=["POST"])
@require_api_key
def create_project():
    data = request.get_json(silent=True) or {}
    name = data.get("name", "").strip()
    slug = data.get("slug", "").strip()
    description = data.get("description", "").strip()
    tech = data.get("tech", [])
    url = data.get("url", "")
    image = data.get("image", "")
    sort_order = int(data.get("sort_order", 0))
    details = data.get("details", {})

    if not name or not slug or not description:
        return jsonify({"error": "name, slug, description are required"}), 400
    if not SLUG_RE.match(slug):
        return jsonify({"error": "Invalid slug format"}), 400

    conn = get_db()
    try:
        cursor = conn.execute(
            "INSERT INTO projects (name, slug, description, tech, url, image, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)",
            (name, slug, json.dumps(tech), url, image, sort_order),
        )
        project_id = cursor.lastrowid
        conn.execute(
            "INSERT INTO project_details (project_id, role, overview) VALUES (?, ?, ?)",
            (project_id, details.get("role", ""), details.get("overview", "")),
        )
        for i, contrib in enumerate(details.get("contributions", [])):
            conn.execute(
                "INSERT INTO project_contributions (project_id, contribution, sort_order) VALUES (?, ?, ?)",
                (project_id, contrib, i),
            )
        conn.commit()
        return jsonify({"success": True, "slug": slug}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Slug sudah digunakan"}), 409
    finally:
        conn.close()


@app.route("/api/projects/<slug>", methods=["PUT"])
@require_api_key
def update_project(slug: str):
    if not SLUG_RE.match(slug):
        return jsonify({"error": "Invalid slug"}), 400
    data = request.get_json(silent=True) or {}
    conn = get_db()
    try:
        row = conn.execute("SELECT id FROM projects WHERE slug = ?", (slug,)).fetchone()
        if not row:
            return jsonify({"error": "Not found"}), 404
        project_id = row["id"]
        new_slug = data.get("slug", slug).strip()
        if not SLUG_RE.match(new_slug):
            return jsonify({"error": "Invalid new slug"}), 400
        conn.execute(
            "UPDATE projects SET name=?, slug=?, description=?, tech=?, url=?, image=?, sort_order=? WHERE id=?",
            (
                data.get("name", "").strip(),
                new_slug,
                data.get("description", "").strip(),
                json.dumps(data.get("tech", [])),
                data.get("url", ""),
                data.get("image", ""),
                int(data.get("sort_order", 0)),
                project_id,
            ),
        )
        details = data.get("details", {})
        conn.execute(
            "UPDATE project_details SET role=?, overview=? WHERE project_id=?",
            (details.get("role", ""), details.get("overview", ""), project_id),
        )
        conn.execute("DELETE FROM project_contributions WHERE project_id=?", (project_id,))
        for i, contrib in enumerate(details.get("contributions", [])):
            conn.execute(
                "INSERT INTO project_contributions (project_id, contribution, sort_order) VALUES (?, ?, ?)",
                (project_id, contrib, i),
            )
        conn.commit()
        return jsonify({"success": True})
    finally:
        conn.close()


@app.route("/api/projects/<slug>", methods=["DELETE"])
@require_api_key
def delete_project(slug: str):
    if not SLUG_RE.match(slug):
        return jsonify({"error": "Invalid slug"}), 400
    conn = get_db()
    try:
        row = conn.execute("SELECT id FROM projects WHERE slug = ?", (slug,)).fetchone()
        if not row:
            return jsonify({"error": "Not found"}), 404
        project_id = row["id"]
        conn.execute("DELETE FROM project_contributions WHERE project_id=?", (project_id,))
        conn.execute("DELETE FROM project_details WHERE project_id=?", (project_id,))
        conn.execute("DELETE FROM projects WHERE id=?", (project_id,))
        conn.commit()
        return jsonify({"success": True})
    finally:
        conn.close()


# ─── Speaking write endpoints ─────────────────────────────────────────────────

@app.route("/api/speaking", methods=["POST"])
@require_api_key
def create_speaking():
    data = request.get_json(silent=True) or {}
    title = data.get("title", "").strip()
    event = data.get("event", "").strip()
    if not title or not event:
        return jsonify({"error": "title dan event wajib diisi"}), 400
    max_order = conn_max_order("speaking_events")
    conn = get_db()
    try:
        conn.execute(
            "INSERT INTO speaking_events (title, event, organizer, date, location, topics, url, audience, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (
                title,
                event,
                data.get("organizer", ""),
                data.get("date", ""),
                data.get("location", ""),
                json.dumps(data.get("topics", [])),
                data.get("url", ""),
                data.get("audience", ""),
                max_order + 1,
            ),
        )
        conn.commit()
        return jsonify({"success": True}), 201
    finally:
        conn.close()


@app.route("/api/speaking/<int:event_id>", methods=["PUT"])
@require_api_key
def update_speaking(event_id: int):
    data = request.get_json(silent=True) or {}
    conn = get_db()
    try:
        row = conn.execute("SELECT id FROM speaking_events WHERE id = ?", (event_id,)).fetchone()
        if not row:
            return jsonify({"error": "Not found"}), 404
        conn.execute(
            "UPDATE speaking_events SET title=?, event=?, organizer=?, date=?, location=?, topics=?, url=?, audience=? WHERE id=?",
            (
                data.get("title", "").strip(),
                data.get("event", "").strip(),
                data.get("organizer", ""),
                data.get("date", ""),
                data.get("location", ""),
                json.dumps(data.get("topics", [])),
                data.get("url", ""),
                data.get("audience", ""),
                event_id,
            ),
        )
        conn.commit()
        return jsonify({"success": True})
    finally:
        conn.close()


@app.route("/api/speaking/<int:event_id>", methods=["DELETE"])
@require_api_key
def delete_speaking(event_id: int):
    conn = get_db()
    try:
        row = conn.execute("SELECT id FROM speaking_events WHERE id = ?", (event_id,)).fetchone()
        if not row:
            return jsonify({"error": "Not found"}), 404
        conn.execute("DELETE FROM speaking_events WHERE id=?", (event_id,))
        conn.commit()
        return jsonify({"success": True})
    finally:
        conn.close()


def conn_max_order(table: str) -> int:
    conn = get_db()
    try:
        row = conn.execute(f"SELECT MAX(sort_order) as m FROM {table}").fetchone()  # noqa: S608
        return row["m"] or 0
    finally:
        conn.close()


# ─── Reorder endpoints ────────────────────────────────────────────────────────

@app.route("/api/projects/reorder", methods=["POST"])
@require_api_key
def reorder_projects():
    """Body: { "order": ["slug1", "slug2", ...] }"""
    data = request.get_json(silent=True) or {}
    order = data.get("order", [])
    if not isinstance(order, list):
        return jsonify({"error": "order must be a list"}), 400
    conn = get_db()
    try:
        for i, slug in enumerate(order):
            if not SLUG_RE.match(str(slug)):
                continue
            conn.execute("UPDATE projects SET sort_order=? WHERE slug=?", (i, slug))
        conn.commit()
        return jsonify({"success": True})
    finally:
        conn.close()


@app.route("/api/speaking/reorder", methods=["POST"])
@require_api_key
def reorder_speaking():
    """Body: { "order": [1, 2, 3, ...] }  (list of IDs)"""
    data = request.get_json(silent=True) or {}
    order = data.get("order", [])
    if not isinstance(order, list):
        return jsonify({"error": "order must be a list"}), 400
    conn = get_db()
    try:
        for i, event_id in enumerate(order):
            conn.execute("UPDATE speaking_events SET sort_order=? WHERE id=?", (i, int(event_id)))
        conn.commit()
        return jsonify({"success": True})
    finally:
        conn.close()


# ─── Entry point (development only) ─────────────────────────────────────────

if __name__ == "__main__":
    app.run(debug=False)
