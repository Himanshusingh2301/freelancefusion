# routes/user_routes.py
from flask import Blueprint, request, jsonify
from auth.clerk_auth import verify_clerk_token
from models.user_model import (
    find_user_by_clerk_id,
    create_user,
    serialize_user,
    update_user_role,
    
)

user_bp = Blueprint("user", __name__)

@user_bp.route("/add-user", methods=["POST"])
def create_or_login_user():
    """Adds a new user or logs in an existing one after Clerk verification."""
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({"error": "Authorization header missing"}), 401

    token = auth_header.split(" ")[1]
    try:
        user_data = verify_clerk_token(token)
        clerk_id = user_data["clerk_id"]
        email = user_data["email"]
        full_name = user_data["full_name"]
       

        user = find_user_by_clerk_id(clerk_id)

        if not user:
            new_user = create_user(clerk_id, email, full_name)
            return jsonify({"message": "User created ✅", "user": serialize_user(new_user)}), 201

        return jsonify({"message": "User exists ✅", "user": serialize_user(user)}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 401

@user_bp.route("/update-role", methods=["POST"])
def set_user_role():
    """Update user role between 'client' or 'freelancer'"""
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({"error": "Authorization header missing"}), 401

    token = auth_header.split(" ")[1]
    try:
        user_data = verify_clerk_token(token)
        clerk_id = user_data["clerk_id"]

        data = request.get_json()
        new_role = data.get("role")

        if new_role not in ["client", "freelancer"]:
            return jsonify({"error": "Invalid role"}), 400

        updated_user = update_user_role(clerk_id, new_role)

        return jsonify({"message": f"Role updated to '{new_role}' ✅", "user": serialize_user(updated_user)}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 401
    
    
@user_bp.route("/get-user", methods=["GET"])
def get_user():
    """Fetch user details by Clerk ID"""
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({"error": "Authorization header missing"}), 401

    token = auth_header.split(" ")[1]
    try:
        user_data = verify_clerk_token(token)
        clerk_id = user_data["clerk_id"]

        user = find_user_by_clerk_id(clerk_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        return jsonify({"user": serialize_user(user)}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 401

@user_bp.route("/update-profile", methods=["POST"])
def update_user_profile():
    """Update user profile details (full_name, github, linkedin, intro)"""
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({"error": "Authorization header missing"}), 401

    token = auth_header.split(" ")[1]

    try:
        # ✅ Verify Clerk token and get clerk_id
        user_data = verify_clerk_token(token)
        clerk_id = user_data["clerk_id"]

        # ✅ Get new data from frontend
        data = request.get_json()
        full_name = data.get("full_name")
        github = data.get("github")
        linkedin = data.get("linkedin")
        intro = data.get("intro")

        # ✅ Build the update dictionary
        update_fields = {}
        if full_name: update_fields["full_name"] = full_name
        if github: update_fields["github"] = github
        if linkedin: update_fields["linkedin"] = linkedin
        if intro: update_fields["intro"] = intro

        # ✅ Check if there are fields to update
        if not update_fields:
            return jsonify({"error": "No fields provided for update"}), 400

        # ✅ Update user profile
        from models.user_model import update_user_profile as db_update_user_profile
        updated_user = db_update_user_profile(clerk_id, update_fields)

        return jsonify({
            "message": "Profile updated successfully ✅",
            "user": serialize_user(updated_user)
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 401
