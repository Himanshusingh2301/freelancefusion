from flask import Flask
from flask_cors import CORS
from routes.user_routes import user_bp
from routes.auth_routes import auth_bp

app = Flask(__name__)

# Allow your frontend origin and Authorization header
CORS(
    app,
    origins=["http://localhost:5173"],  # your Vite frontend
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization"]
)

# Register blueprints
app.register_blueprint(auth_bp, url_prefix="/api")
app.register_blueprint(user_bp, url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True, port=5000)
