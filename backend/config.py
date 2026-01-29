
import os

MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://himanshusingh230103:Himanshu321%40@uberclone.srfhcpy.mongodb.net/?retryWrites=true&w=majority&appName=UberClone")
DB_NAME = "freelance"
CLERK_ISSUER = os.getenv("CLERK_ISSUER", "https://organic-swan-82.clerk.accounts.dev")
JWKS_URL = f"{CLERK_ISSUER}/.well-known/jwks.json"
