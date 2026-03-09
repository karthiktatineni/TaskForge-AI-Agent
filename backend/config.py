"""
Configuration management for AI Project Architect backend.
"""
import os
from dotenv import load_dotenv

load_dotenv()

# Generative AI Configuration
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_MODEL = os.getenv("GROQ_MODEL", "openai/gpt-oss-120b")

LIGHTNING_API_KEY = os.getenv("LIGHTNING_API_KEY", "")
LIGHTNING_MODEL = os.getenv("LIGHTNING_MODEL", "lightning-ai/gpt-oss-120b")
LIGHTNING_URL = os.getenv("LIGHTNING_URL", "https://lightning.ai/api/v1/chat/completions")

# Server Configuration
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(",")

# Data storage
DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
PROJECTS_FILE = os.path.join(DATA_DIR, "projects.json")
