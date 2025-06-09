import bcrypt
from flask import Blueprint, request, jsonify
import sqlite3

auth_bp = Blueprint('auth', __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    hashed = bcrypt.hashpw(data['password'].encode(), bcrypt.gensalt())

    try:
        conn = sqlite3.connect("ecommerce.db")
        cursor = conn.cursor()
        cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)", 
                       (data['username'], hashed))
        conn.commit()
        return jsonify({"message": "Registered"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"message": "User already exists"}), 409
    finally:
        conn.close()

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    conn = sqlite3.connect("ecommerce.db")
    cursor = conn.cursor()
    cursor.execute("SELECT password FROM users WHERE username = ?", (data['username'],))
    result = cursor.fetchone()
    conn.close()

    if result and bcrypt.checkpw(data['password'].encode(), result[0]):
        return jsonify({"message": "Login successful"})
    else:
        return jsonify({"message": "Invalid credentials"}), 401
