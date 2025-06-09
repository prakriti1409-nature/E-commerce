from flask import Blueprint, request, jsonify
import sqlite3
import difflib

product_bp = Blueprint('product', __name__)




@product_bp.route("/", methods=["GET"])
def get_products():
    query = request.args.get("q", "").lower()
    conn = sqlite3.connect("ecommerce.db")
    cur = conn.cursor()
    cur.execute("SELECT * FROM products")
    all_products = cur.fetchall()

    # Fuzzy match using difflib
    matched = [
        p for p in all_products
        if query in p[1].lower() or difflib.SequenceMatcher(None, query, p[1].lower()).ratio() > 0.6
    ]

    conn.close()
    return jsonify([
        {"id": p[0], "name": p[1], "category": p[2], "price": p[3], "description": p[4]}
        for p in matched
    ])
