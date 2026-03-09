import os
import json
import uuid
from datetime import datetime
from typing import List, Optional
from models.schemas import Project

DATA_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + "/data"
PROJECTS_FILE = os.path.join(DATA_DIR, "projects.json")

def ensure_data_dir():
    """Ensure the data directory and projects file exist."""
    print(f"Checking DATA_DIR: {DATA_DIR}")
    if not os.path.exists(DATA_DIR):
        print(f"Creating DATA_DIR: {DATA_DIR}")
        os.makedirs(DATA_DIR)
    
    if not os.path.exists(PROJECTS_FILE):
        print(f"Creating PROJECTS_FILE: {PROJECTS_FILE}")
        with open(PROJECTS_FILE, "w") as f:
            json.dump([], f)

def get_all_projects() -> List[dict]:
    """Get all projects from the JSON store."""
    ensure_data_dir()
    try:
        with open(PROJECTS_FILE, "r") as f:
            return json.load(f)
    except (json.JSONDecodeError, FileNotFoundError):
        return []

def get_project_by_id(project_id: str) -> Optional[dict]:
    """Get a specific project by ID."""
    projects = get_all_projects()
    for proj in projects:
        if proj.get("id") == project_id:
            return proj
    return None

def create_project(project_data: Project) -> dict:
    """Create a new project."""
    projects = get_all_projects()
    proj_dict = project_data.model_dump(by_alias=True)
    projects.append(proj_dict)
    
    with open(PROJECTS_FILE, "w") as f:
        json.dump(projects, f, indent=4)
        
    return proj_dict

def update_project(project_id: str, updates: dict) -> Optional[dict]:
    """Update an existing project."""
    projects = get_all_projects()
    
    for idx, proj in enumerate(projects):
        if proj.get("id") == project_id:
            projects[idx].update(updates)
            projects[idx]["updated_at"] = datetime.utcnow().isoformat() + "Z"
            
            with open(PROJECTS_FILE, "w") as f:
                json.dump(projects, f, indent=4)
                
            return projects[idx]
            
    return None

def delete_project(project_id: str) -> bool:
    """Delete a project."""
    projects = get_all_projects()
    initial_len = len(projects)
    
    projects = [p for p in projects if p.get("id") != project_id]
    
    if len(projects) < initial_len:
        with open(PROJECTS_FILE, "w") as f:
            json.dump(projects, f, indent=4)
        return True
        
    return False
