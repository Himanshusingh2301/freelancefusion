# app/utils/auth.py
from jose import jwt
from jose.exceptions import JWTError, ExpiredSignatureError
import requests
from jose.backends.rsa_backend import RSAKey  # ✅ correct import
from config import JWKS_URL, CLERK_ISSUER


def fetch_jwks():
    """Fetch Clerk JWKS from remote."""
    return requests.get(JWKS_URL).json()


# Cache JWKS at startup
jwks_client = fetch_jwks()


def get_public_key(token: str):
    """Extract the correct public key from Clerk JWKS."""
    global jwks_client
    headers = jwt.get_unverified_header(token)
    kid = headers.get("kid")

    for key in jwks_client["keys"]:
        if key["kid"] == kid:
            return RSAKey(key, algorithm="RS256").to_pem().decode("utf-8")

    # 🔄 Refresh JWKS if Clerk rotated keys
    jwks_client = fetch_jwks()
    for key in jwks_client["keys"]:
        if key["kid"] == kid:
            return RSAKey(key, algorithm="RS256").to_pem().decode("utf-8")

    raise Exception("Public key not found")


def verify_clerk_token(token: str):
    """
    Verify Clerk JWT token and return decoded claims.
    """
    try:
        public_key = get_public_key(token)

        payload = jwt.decode(
            token,
            public_key,
            algorithms=["RS256"],
            audience=None,
            issuer=CLERK_ISSUER,
        )

        return {
            "clerk_id": payload.get("sub"),
            "email": payload.get("email"),
            "full_name": payload.get("full_name"),
            "claims": payload,  # full payload if needed
        }

    except ExpiredSignatureError:
        raise Exception("Token expired")
    except JWTError:
        raise Exception("Invalid token")
