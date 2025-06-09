from flask import Blueprint, jsonify
import sqlite3

log_bp = Blueprint("logs", __name__)

@log_bp.route("/", methods=["GET"])
def get_logs():
    conn = sqlite3.connect("ecommerce.db")
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute("SELECT * FROM chat_logs ORDER BY timestamp DESC")
    rows = cur.fetchall()
    logs = [dict(row) for row in rows]
    conn.close()
    return jsonify(logs)
