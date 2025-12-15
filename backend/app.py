from flask import Flask
from flask_cors import CORS
from routes.user_routes import user_bp
from routes.auth_routes import auth_bp
from routes.project_routes import project_bp
import os


app = Flask(__name__)


# ----------------------------
# CORS FIXED
# ----------------------------
CORS(
    app,
    resources={r"/freelancefusion/*": {"origins": "http://localhost:5173"}},
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
)

# ----------------------------
# Register Blueprints
# ----------------------------
app.register_blueprint(auth_bp, url_prefix="/freelancefusion")
app.register_blueprint(user_bp, url_prefix="/freelancefusion")
app.register_blueprint(project_bp, url_prefix="/freelancefusion")

# ----------------------------
# Run Server
# ----------------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)
