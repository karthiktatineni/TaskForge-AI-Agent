import time
import json
import os
from typing import Dict
from datetime import datetime

DATA_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + "/data"
STATS_FILE = os.path.join(DATA_DIR, "metrics.json")

# Default usage stats tracker
DEFAULT_STATS = {
    "start_time": datetime.utcnow().isoformat() + "Z",
    "total_requests": 0,
    "successful_generations": 0,
    "failed_generations": 0,
    "total_tokens_estimated": 0, # Roughly calculating based on typical I/O
    "average_generation_time_sec": 0.0,
    "total_generation_time_sec": 0.0
}

def load_stats() -> Dict:
    """Load stats from file or return defaults."""
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)
        
    if os.path.exists(STATS_FILE):
        try:
            with open(STATS_FILE, "r") as f:
                return json.load(f)
        except (json.JSONDecodeError, IOError):
            pass
    return DEFAULT_STATS.copy()

def save_stats(stats: Dict):
    """Save stats to file."""
    try:
        with open(STATS_FILE, "w") as f:
            json.dump(stats, f, indent=4)
    except IOError as e:
        print(f"Error saving stats: {e}")

# Initial load
USAGE_STATS = load_stats()

def log_api_request():
    USAGE_STATS["total_requests"] += 1
    save_stats(USAGE_STATS)

def log_generation(success: bool, elapsed_time: float, estimated_tokens: int = 15000):
    if success:
        USAGE_STATS["successful_generations"] += 1
        USAGE_STATS["total_tokens_estimated"] += estimated_tokens
        
        # Update rolling average
        USAGE_STATS["total_generation_time_sec"] += elapsed_time
        USAGE_STATS["average_generation_time_sec"] = (
            USAGE_STATS["total_generation_time_sec"] / USAGE_STATS["successful_generations"]
        )
    else:
        USAGE_STATS["failed_generations"] += 1
    
    save_stats(USAGE_STATS)

def get_stats() -> Dict:
    return USAGE_STATS

