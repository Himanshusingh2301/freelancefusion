from flask import Blueprint, request, jsonify
from models.freelancer_model import (
    create_freelancer,
    serialize_freelancer,
    get_all_freelancers,
    get_freelancer_by_id,
    get_freelancer_by_clerk_id,
)
from models.project_model import get_all_projects, find_projects_by_freelancer
from auth.clerk_auth import verify_clerk_token
from ml.recommender import rank_projects_for_freelancer

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
        data = request.json or {}

        required_fields = [
            "full_name",
            "email",                 # ✅ REQUIRED
            "title",
            "skills",
            "experience_level",
            "hourly_rate",
            "availability",
        ]

        for field in required_fields:
            if field not in data or not str(data[field]).strip():
                return jsonify({"error": f"{field} is required"}), 400

        freelancer = create_freelancer(
            freelancer_clerk_id=clerk_id,
            full_name=data["full_name"].strip(),
            email=data["email"].strip(),                 
            title=data["title"].strip(),
            skills=data["skills"].strip(),
            experience_level=data["experience_level"].strip(),
            hourly_rate=data["hourly_rate"],
            availability=data["availability"].strip(),
            portfolio_url=data.get("portfolio_url"),
            about=data.get("about"),
            github=data.get("github"),                   
            linkedin=data.get("linkedin")                
        )

        return jsonify({
            "success": True,
            "message": "Freelancer profile created successfully",
            "freelancer": serialize_freelancer(freelancer)
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@freelancer_bp.route("/get-all-freelancers", methods=["GET"])
def fetch_all_freelancers():
    try:
        freelancers = get_all_freelancers()

        return jsonify({
            "success": True,
            "count": len(freelancers),
            "freelancers": freelancers
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@freelancer_bp.route("/get-freelancer/<freelancer_id>", methods=["GET"])
def fetch_freelancer_by_id(freelancer_id):
    try:
        freelancer = get_freelancer_by_id(freelancer_id)

        if not freelancer:
            return jsonify({"error": "Freelancer not found"}), 404

        return jsonify({
            "success": True,
            "freelancer": freelancer
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@freelancer_bp.route("/recommend-projects", methods=["GET"])
def recommend_projects():
    """Recommend projects for the currently signed-in freelancer."""
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({"error": "Authorization header missing"}), 401

    token = auth_header.split(" ")[1]

    try:
        user_data = verify_clerk_token(token)
        clerk_id = user_data["clerk_id"]
    except Exception as e:
        return jsonify({"error": str(e)}), 401

    try:
        freelancer = get_freelancer_by_clerk_id(clerk_id)
        if not freelancer:
            return jsonify({
                "success": True,
                "recommended_projects": [],
                "message": "No freelancer profile found for this user"
            }), 200

        all_projects = get_all_projects()
        open_projects = [p for p in all_projects if p.get("status", "not taken") == "not taken"]
        ranked_projects = rank_projects_for_freelancer(freelancer, open_projects, top_n=30)

        return jsonify({
            "success": True,
            "recommended_projects": ranked_projects,
            "total_open_projects": len(open_projects)
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@freelancer_bp.route("/active-projects", methods=["GET"])
def get_active_projects():
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({"error": "Authorization header missing"}), 401

    token = auth_header.split(" ")[1]
    try:
        user_data = verify_clerk_token(token)
        clerk_id = user_data["clerk_id"]
        projects = find_projects_by_freelancer(clerk_id, statuses=["ongoing", "in progress"])
        return jsonify({"success": True, "projects": projects}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@freelancer_bp.route("/work-history", methods=["GET"])
def get_work_history():
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({"error": "Authorization header missing"}), 401

    token = auth_header.split(" ")[1]
    try:
        user_data = verify_clerk_token(token)
        clerk_id = user_data["clerk_id"]
        projects = find_projects_by_freelancer(clerk_id, statuses=["completed"])
        return jsonify({"success": True, "projects": projects, "count": len(projects)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
