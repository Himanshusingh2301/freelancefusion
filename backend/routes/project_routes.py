from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from auth.clerk_auth import verify_clerk_token
from models.project_model import create_project, serialize_project, find_projects_by_client,find_project_by_id,update_project_details,get_all_projects
import os
import uuid
from bson import ObjectId

project_bp = Blueprint("project", __name__)



@project_bp.route("/post-project", methods=["POST"])
def create_new_project():
    """Create a new project posted by a client with a simple file URL (no upload)."""

    # ------------------ AUTH ------------------
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({"error": "Authorization header missing"}), 401

    token = auth_header.split(" ")[1]

    try:
        user_data = verify_clerk_token(token)
        clerk_id = user_data["clerk_id"]

        # ------------------ FORM DATA ------------------
        title = request.form.get("title")
        description = request.form.get("description")
        budget = request.form.get("budget")
        deadline = request.form.get("deadline")
        skills_required = request.form.get("skills")
        category = request.form.get("category")
        file_url = request.form.get("file_url")   

        # Required Field Check
        required_fields = {
            "title": title,
            "description": description,
            "budget": budget,
            "deadline": deadline,
            "skills": skills_required,
            "category": category
        }

        missing = [f for f, v in required_fields.items() if not v]
        if missing:
            return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400

        # ------------------ CREATE PROJECT ------------------
        new_project = create_project(
            client_clerk_id=clerk_id,
            title=title,
            description=description,
            budget=budget,
            deadline=deadline,
            skills_required=skills_required,
            category=category,
            file_url=file_url 
        )

        return jsonify({
            "message": "Project created successfully ✅",
            "project": serialize_project(new_project)
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@project_bp.route("/get-project", methods=["GET"])
def get_project():
        # ------------------ AUTH ------------------
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({"error": "Authorization header missing"}), 401

    token = auth_header.split(" ")[1]

    try:
        user_data = verify_clerk_token(token)
        clerk_id = user_data["clerk_id"]

    except Exception as e:
        print("Token decode error:", e)
        return jsonify({"success": False, "message": "Invalid Clerk Token"}), 401

    try:
        projects = find_projects_by_client(clerk_id)
        return jsonify({"success": True, "projects": projects}), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({"success": False, "message": "Server error"}), 500
    

@project_bp.route("/get-all-projects", methods=["GET"])
def get_all_projects_route():
    try:
        projects = get_all_projects()  
        return jsonify({"success": True, "projects": projects}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"success": False, "message": "Server error"}), 500


@project_bp.route("/get-project/<project_id>", methods=["GET"])
def get_project_id(project_id):
    try:
        project = find_project_by_id(project_id)

        if not project:
            return jsonify({"error": "Project not found"}), 404

        return jsonify(project), 200

    except Exception as e:
        print("Error fetching project:", e)
        return jsonify({"error": "Server error"}), 500
    

@project_bp.route("/update-project/<project_id>", methods=["PUT"])
def update_project(project_id):
    """Update project details by ID (No file upload, only link)."""

    if not ObjectId.is_valid(project_id):
        return jsonify({"error": "Invalid project ID"}), 400

    try:
        update_fields = {}

        # Check if multipart or JSON
        if "multipart/form-data" in request.content_type:
            form = request.form

            for key in ["title", "description", "budget", "deadline", "skills", "category", "status", "file_url"]:
                if key in form and form[key] != "":
                    update_fields[key] = form[key]

        else:  # JSON request
            data = request.get_json()
            for key in ["title", "description", "budget", "deadline", "skills", "category", "status", "file_url"]:
                if key in data:
                    update_fields[key] = data[key]

        # Update project in DB
        updated_project = update_project_details(project_id, update_fields)

        if not updated_project:
            return jsonify({"error": "Project not found"}), 404

        return jsonify({
            "message": "Project updated successfully",
            "project": updated_project
        }), 200

    except Exception as e:
        print("Update Error:", e)
        return jsonify({"error": "Server error"}), 500


@project_bp.route("/delete-project/<project_id>", methods=["DELETE"])
def delete_project(project_id):
    """Delete a project by its ID"""
    try:
        # ---------------- AUTH CHECK ----------------
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"error": "Authorization header missing"}), 401

        token = auth_header.split(" ")[1]
        user_data = verify_clerk_token(token)
        clerk_id = user_data["clerk_id"]

        project = find_project_by_id(project_id)

        if not project:
            return jsonify({"error": "Project not found"}), 404

        # Ensure only the owner can delete their project
        if project["client_clerk_id"] != clerk_id:
            return jsonify({"error": "Unauthorized"}), 403

        # DELETE PROJECT
        from models.project_model import delete_project_by_id
        deleted = delete_project_by_id(project_id)

        if deleted:
            return jsonify({"message": "Project deleted successfully"}), 200
        else:
            return jsonify({"error": "Failed to delete project"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500
