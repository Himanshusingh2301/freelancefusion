from flask import Blueprint, request, jsonify
from models.freelancer_model import create_freelancer, serialize_freelancer
from auth.clerk_auth import verify_clerk_token

freelancer_bp = Blueprint("freelancer", __name__)

@freelancer_bp.route("/post-freelancer", methods=["POST"])
def create_new_freelancer():
    # ------------------ AUTH ------------------
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({"error": "Authorization header missing"}), 401

    token = auth_header.split(" ")[1]

    try:
        # Verify Clerk token
        user_data = verify_clerk_token(token)
        clerk_id = user_data["clerk_id"]

        # ------------------ DATA ------------------
        data = request.json

        required_fields = [
            "full_name",
            "title",
            "skills",
            "experience_level",
            "hourly_rate",
            "availability"
        ]

        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"{field} is required"}), 400

        freelancer = create_freelancer(
            freelancer_clerk_id=clerk_id,
            full_name=data["full_name"].strip(),
            title=data["title"].strip(),
            skills=data["skills"].strip(),
            experience_level=data["experience_level"].strip(),
            hourly_rate=data["hourly_rate"],
            availability=data["availability"].strip(),
            portfolio_url=data.get("portfolio_url", "").strip(),
            about=data.get("about", "").strip()
        )


        return jsonify({
            "message": "Freelancer profile created successfully",
            "freelancer": serialize_freelancer(freelancer)
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
