from utils.db import freelancers_collection
from datetime import datetime
from bson import ObjectId


def serialize_freelancer(freelancer):
    """Convert MongoDB ObjectId to string for JSON responses"""
    if not freelancer:
        return None

    freelancer_copy = freelancer.copy()
    freelancer_copy["_id"] = str(freelancer_copy["_id"])

    if "created_at" in freelancer_copy:
        freelancer_copy["created_at"] = freelancer_copy["created_at"].strftime(
            "%Y-%m-%d %H:%M:%S"
        )

    return freelancer_copy

def create_freelancer(freelancer_clerk_id, full_name, title, skills, experience_level, hourly_rate, availability, portfolio_url=None, about=None):
    new_freelancer = {
        "freelancer_clerk_id": freelancer_clerk_id,
        "full_name": full_name,
        "title": title,
        "skills": skills,  # list or comma-separated string
        "experience_level": experience_level,  # beginner/intermediate/expert
        "hourly_rate": hourly_rate,
        "availability": availability,  # full-time / part-time / contract
        "portfolio_url": portfolio_url,
        "about" : about,
        "created_at": datetime.utcnow(),
    }

    freelancers_collection.insert_one(new_freelancer)
    return new_freelancer

