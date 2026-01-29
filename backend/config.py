import os

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME", "freelance")
CLERK_ISSUER = os.getenv("CLERK_ISSUER")
JWKS_URL = f"{CLERK_ISSUER}/.well-known/jwks.json"
