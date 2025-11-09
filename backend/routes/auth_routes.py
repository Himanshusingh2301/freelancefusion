# app/routes/auth_routes.py
from flask import Blueprint, request, jsonify
from auth.clerk_auth import verify_clerk_token

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/auth/test", methods=["GET"])
def auth_test():
    """
    Test Clerk JWT authentication with Flask.
    Returns decoded claims if token is valid.
    """
    auth_header = request.headers.get("Authorization")

    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({"error": "Authorization header missing"}), 401

    token = auth_header.split(" ")[1]

    try:
        user = verify_clerk_token(token)
        return jsonify({
            "message": "Token is valid ✅",
            "user": user
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 401
