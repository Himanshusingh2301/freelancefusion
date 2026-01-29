from flask import Flask
from flask_cors import CORS
from routes.user_routes import user_bp
from routes.auth_routes import auth_bp
from routes.project_routes import project_bp
from routes.freelancer_routes import freelancer_bp
import os

app = Flask(__name__)

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

CORS(
    app,
    resources={r"/freelancefusion/*": {"origins": FRONTEND_URL}},
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
)

app.register_blueprint(auth_bp, url_prefix="/freelancefusion")
app.register_blueprint(user_bp, url_prefix="/freelancefusion")
app.register_blueprint(project_bp, url_prefix="/freelancefusion")
app.register_blueprint(freelancer_bp, url_prefix="/freelancefusion")

if __name__ == "__main__":
    app.run(port=5000)
