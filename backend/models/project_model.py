# models/project_model.py
from utils.db import projects_collection
from datetime import datetime
from bson import ObjectId


def serialize_project(project):
    """Convert MongoDB ObjectId to string for JSON responses"""
    if not project:
        return None
    project_copy = project.copy()
    project_copy["_id"] = str(project_copy["_id"])
    if "created_at" in project_copy:
        project_copy["created_at"] = project_copy["created_at"].strftime("%Y-%m-%d %H:%M:%S")
    return project_copy


def create_project(client_clerk_id, title, description, budget, deadline, skills_required, email,category,file_url=None, linkedin=None):
    new_project = {
        "client_clerk_id": client_clerk_id,
        "title": title,
        "description": description,
        "budget": budget,
        "deadline": deadline,
        "skills_required": skills_required,
        "category": category,
        "email": email,
        "linkedin": linkedin,
        "file_url": file_url,   # saved here
        "status": "not taken",
        "created_at": datetime.utcnow()
    }
    projects_collection.insert_one(new_project)
    return new_project


def find_project_by_id(project_id):
    """Find a project by its ObjectId"""
    if not ObjectId.is_valid(project_id):
        return None
    project = projects_collection.find_one({"_id": ObjectId(project_id)})
    return serialize_project(project)


def find_projects_by_client(client_clerk_id):
    """Fetch all projects posted by a specific client"""
    projects = projects_collection.find({"client_clerk_id": client_clerk_id}).sort("created_at", -1)
    return [serialize_project(p) for p in projects]


def get_all_projects():
    """Fetch all projects from database"""
    projects = projects_collection.find().sort("created_at", -1)
    return [serialize_project(p) for p in projects]


def update_project_status(project_id, new_status):
    """Update project status (e.g., Open → In Progress → Completed)"""
    if not ObjectId.is_valid(project_id):
        return None
    projects_collection.update_one(
        {"_id": ObjectId(project_id)},
        {"$set": {"status": new_status}}
    )
    return find_project_by_id(project_id)


def update_project_details(project_id, update_fields):
    """Update specific project details"""
    if not ObjectId.is_valid(project_id):
        return None
    projects_collection.update_one(
        {"_id": ObjectId(project_id)},
        {"$set": update_fields}
    )
    return find_project_by_id(project_id)


def delete_project_by_id(project_id):
    """Delete a project by its ObjectId"""
    if not ObjectId.is_valid(project_id):
        return False  # invalid ID
    
    result = projects_collection.delete_one({"_id": ObjectId(project_id)})
    return result.deleted_count == 1  # True if deleted
