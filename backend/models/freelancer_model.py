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


def create_freelancer(
    freelancer_clerk_id,
    full_name,
    email,                    
    title,
    skills,
    experience_level,
    hourly_rate,
    availability,
    portfolio_url=None,
    about=None,
    github=None,               
    linkedin=None          
):
    profile_data = {
        "freelancer_clerk_id": freelancer_clerk_id,
        "full_name": full_name,
        "email": email,                     
        "title": title,
        "skills": skills,
        "experience_level": experience_level,
        "hourly_rate": hourly_rate,
        "availability": availability,
        "portfolio_url": portfolio_url,
        "about": about,
        "github": github,
        "linkedin": linkedin,
        "created_at": datetime.utcnow(),
    }

    # Keep one active profile per Clerk user; update if it exists.
    freelancers_collection.update_one(
        {"freelancer_clerk_id": freelancer_clerk_id},
        {"$set": profile_data},
        upsert=True,
    )
    return freelancers_collection.find_one({"freelancer_clerk_id": freelancer_clerk_id})


def get_all_freelancers():
    freelancers = freelancers_collection.find()
    return [serialize_freelancer(f) for f in freelancers]


def get_freelancer_by_id(freelancer_id):
    try:
        freelancer = freelancers_collection.find_one(
            {"_id": ObjectId(freelancer_id)}
        )
        return serialize_freelancer(freelancer)
    except Exception:
        return None


def get_freelancer_by_clerk_id(clerk_id):
    """Fetch freelancer profile by Clerk user id."""
    # If older duplicate docs exist, use most recently updated profile.
    freelancer = freelancers_collection.find_one(
        {"freelancer_clerk_id": clerk_id},
        sort=[("created_at", -1)],
    )
    return serialize_freelancer(freelancer)
