from pymongo import MongoClient
import config

client = MongoClient(config.MONGO_URI)
db = client[config.DB_NAME]
users_collection = db["users"]
projects_collection = db["projects"]
freelancers_collection = db["freelancers"]