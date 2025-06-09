from flask import Blueprint, request, jsonify
import sqlite3
import random
import re
from difflib import get_close_matches
from database import get_db_connection

chat_bp = Blueprint("chat", __name__)

# Log chat message
def log_chat(username, sender, message):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO chat_logs (username, sender, message) VALUES (?, ?, ?)",
        (username, sender, message),
    )
    conn.commit()
    conn.close()

@chat_bp.route("/", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "")
    username = data.get("username", "guest")

    log_chat(username, "user", message)

    msg_lower = message.lower()
    conn = get_db_connection()
    cursor = conn.cursor()

    # ----- Price-related intent -----
    price_match = re.search(r"(price of|cost of|how much is)\s+(.+)", msg_lower)
    if price_match:
        query = price_match.group(2).strip()
        cursor.execute("SELECT name FROM products")
        names = [row[0] for row in cursor.fetchall()]
        match = get_close_matches(query, names, n=1, cutoff=0.5)
        if match:
            cursor.execute("SELECT name, price FROM products WHERE name = ?", (match[0],))
            row = cursor.fetchone()
            if row:
                bot_reply = f"The price of {row['name']} is ₹{row['price']:,.2f}."
            else:
                bot_reply = "Sorry, I couldn't find that product."
        else:
            bot_reply = "Sorry, I couldn't find that product."

    # ----- Recommend random products -----
    elif any(phrase in msg_lower for phrase in ["what should i buy", "suggest me", "recommend", "buy chatbot"]):
        cursor.execute("SELECT name, price FROM products")
        all_products = cursor.fetchall()
        suggestions = random.sample(all_products, k=3)
        suggestion_text = "\n".join([f"• {p['name']} – ₹{p['price']:,.0f}" for p in suggestions])
        bot_reply = f"Here are some products I recommend:\n{suggestion_text}"

    # ----- Greeting -----
    elif any(word in msg_lower for word in ["hi", "hello", "hey"]):
        bot_reply = "Hi there! I'm here to help you find products. Try saying something like 'show me laptops'."

    # ----- Show me <product> intent -----
    elif "show me" in msg_lower:
        query = msg_lower.split("show me")[-1].strip()

        # fuzzy matching to handle typos and plural forms
        cursor.execute("SELECT DISTINCT name FROM products")
        all_names = [row["name"] for row in cursor.fetchall()]
        match = get_close_matches(query, all_names, n=3, cutoff=0.4)

        if match:
            product_names = "', '".join(match)
            cursor.execute(f"SELECT name, price FROM products WHERE name IN ({','.join(['?']*len(match))})", match)
            results = cursor.fetchall()
            if results:
                bot_reply = "Here are some matching products:\n" + "\n".join(
                    [f"• {p['name']} – ₹{p['price']:,.0f}" for p in results]
                )
            else:
                bot_reply = "Sorry, I couldn't find matching products."
        else:
            bot_reply = "Sorry, I couldn’t find anything that matches."

    else:
        bot_reply = "Sorry, I didn’t understand that. Try asking about a product."

    log_chat(username, "bot", bot_reply)
    conn.close()
    return jsonify({"response": bot_reply})
