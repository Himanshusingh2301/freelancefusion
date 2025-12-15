# models/user_model.py
from utils.db import users_collection

def serialize_user(user):
    """Convert MongoDB ObjectId to string for JSON responses"""
    if not user:
        return None
    user_copy = user.copy()
    user_copy["_id"] = str(user_copy["_id"])
    return user_copy


def find_user_by_clerk_id(clerk_id):
    """Find a user by Clerk ID"""
    return users_collection.find_one({"clerk_id": clerk_id})


def create_user(clerk_id, email, full_name):
    """Insert a new user into MongoDB"""
    new_user = {
        "clerk_id": clerk_id,
        "email": email,
        "full_name": full_name,
        "projects":"",
        "role": "none", 
        "linkedin":"",
        "github":"",
        "intro":""

    }
    users_collection.insert_one(new_user)
    return serialize_user(new_user)


def update_user_role(clerk_id, new_role):
    """Update user role (client or freelancer)"""
    users_collection.update_one(
        {"clerk_id": clerk_id},
        {"$set": {"role": new_role}},
        upsert=False
    )
    return find_user_by_clerk_id(clerk_id)


def update_user_profile(clerk_id, update_fields):
    """Update user's profile fields"""
    users_collection.update_one(
        {"clerk_id": clerk_id},
        {"$set": update_fields},
        upsert=False
    )
    return find_user_by_clerk_id(clerk_id)
