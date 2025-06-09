# E-commerce
# 🛍️ E-commerce Sales Chatbot

An interactive, intelligent chatbot built for a simulated e-commerce platform. It enables users to explore products, search by query, and manage sessions with login/register support. The system integrates a React-based frontend with a Python Flask backend and a SQLite database.

---

## 🔍 Project Objective

The goal of this project is to create a responsive, user-friendly **Sales Chatbot** for an e-commerce platform that:
- Provides intelligent responses to product-related queries.
- Allows users to register, log in, and search products.
- Stores chat logs and session data.
- Helps simulate a complete e-commerce flow from product discovery to interaction.

---

## 🧠 Features

- ✅ Login & Registration with secure password hashing (`bcrypt`)
- ✅ Chatbot interface with real-time responses
- ✅ Product search via chatbot or direct query
- ✅ RESTful API integration with a Flask backend
- ✅ 100+ mock product entries in SQLite database
- ✅ Admin access to view stored chat logs
- ✅ Fully responsive frontend using **React**
- ✅ Modular, scalable and clean codebase

---

Tech Stack
Frontend:
React.js (with React Router)

Tailwind CSS for UI

Axios for API calls

Framer Motion (optional for animations)

Backend:
Python Flask

Flask Blueprints for modular routing

SQLite for database

bcrypt for password hashing

CORS and error-handling middleware

🗃️ Directory Structure
pgsql
Copy
Edit
/client
  ├── components/
  ├── pages/
  ├── App.js
  └── index.js

/server
  ├── auth_routes.py
  ├── product_routes.py
  ├── chat_routes.py
  ├── database.py
  ├── app.py
  └── static/products.json

README.md
🚀 Setup Instructions
Backend:

cd server
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Initialize DB
python -c "from database import init_db; init_db()"

# Run Flask App
python app.py

Frontend:

cd client
npm install
npm run dev


🧠 Challenges Faced
Login Bug Fixing: Resolved credential mismatch issues by integrating bcrypt for secure password hashing and matching during login.

Chat Parsing: Designed a basic NLP-like keyword matching mechanism to process product queries like "show me mobiles".

Cross-Origin Resource Sharing (CORS): Handled CORS issues to ensure seamless frontend-backend communication.

Session Persistence: Used localStorage to track logged-in users and persist session state across page reloads.

💡 Future Enhancements
🔍 Add filtering options (price range, category, etc.) in chatbot and product page

📦 Integrate image support and product pages

📈 Analytics dashboard for admins (chat usage, most searched products)
