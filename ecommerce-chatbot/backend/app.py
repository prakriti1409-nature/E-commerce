from flask import Flask
from flask_cors import CORS
from routes.product_routes import product_bp
from routes.chat_routes import chat_bp
from routes.auth_routes import auth_bp
from database import init_db
from routes.log_routes import log_bp
from database import init_db


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

init_db()

app.register_blueprint(product_bp, url_prefix="/api/products")
app.register_blueprint(chat_bp, url_prefix="/api/chat")
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(log_bp, url_prefix="/api/logs")


    

if __name__ == "__main__":
    init_db()
    app.run(debug=True)

