from fastapi import APIRouter, HTTPException, BackgroundTasks
from typing import List
import uuid
from datetime import datetime
from models.schemas import Project, GenerateProjectRequest, GenerateProjectResponse
from services.db import get_all_projects, get_project_by_id, create_project, update_project, delete_project
from services.ai_generator import AIService
from services.file_manager import save_project_files
from services.metrics import log_api_request, log_generation
import time

router = APIRouter()
ai_service = AIService()

@router.get("/projects", response_model=List[Project])
async def list_projects():
    """Get all projects."""
    log_api_request()
    return [Project(**p) for p in get_all_projects()]

@router.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    """Get a specific project by ID."""
    log_api_request()
    project = get_project_by_id(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return Project(**project)

@router.post("/projects", response_model=Project)
async def api_create_project(project: Project):
    """Create a new project manually."""
    log_api_request()
    # ensure it doesn't exist
    if get_project_by_id(project.id):
        raise HTTPException(status_code=400, detail="Project already exists")
        
    created = create_project(project)
    return Project(**created)

async def generate_project_background(project_id: str, request: GenerateProjectRequest):
    """Background task to generate project plan from Gemini."""
    start_time = time.time()
    try:
        # Mark as generating
        update_project(project_id, {"status": "generating"})
        
        # Ensure tech stack lists handles empty properly
        stack = request.preferred_stack if request.preferred_stack else []
        
        # Call Lightning AI
        outputs = await ai_service.generate_project_plan(
            prompt=request.prompt,
            project_category=request.category or "General Software",
            timeline=request.timeline or "Unknown timeline",
            stack=stack
        )
        
        # Dump output safely using by_alias to handle "from" -> "from_"
        outputs_dict = outputs.model_dump(by_alias=True)
        
        elapsed = time.time() - start_time
        log_generation(True, elapsed)
        
        # Save actual physical files to disk
        if "files" in outputs_dict and outputs_dict["files"]:
            save_project_files(project_id, outputs_dict["files"])
        
        # Update project with completion
        update_project(project_id, {
            "status": "completed",
            "outputs": outputs_dict
        })
        
    except Exception as e:
        print(f"Error in background generation: {e}")
        elapsed = time.time() - start_time
        log_generation(False, elapsed)
        # Mark as completed so polling stops, but show error
        update_project(project_id, {
            "status": "completed",
            "description": f"Generation failed: {str(e)}"
        })

@router.post("/projects/generate", response_model=GenerateProjectResponse)
async def api_generate_project(request: GenerateProjectRequest, background_tasks: BackgroundTasks):
    """Take a prompt, create a draft project, and start AI generation."""
    log_api_request()
    
    # Generate an ID
    project_id = f"proj_{uuid.uuid4().hex[:8]}"
    
    # Create the draft project
    now = datetime.utcnow().isoformat() + "Z"
    
    new_project = Project(
        id=project_id,
        title=request.name or f"Generated Project {project_id[:4]}",
        description="Generating project documentation based on your prompt...",
        raw_prompt=request.prompt,
        status="draft", # we start as draft, background moves to generating
        created_at=now,
        updated_at=now,
        target_users=request.target_users or "Unknown",
        preferred_stack=request.preferred_stack or [],
        category=request.category or "Software",
        main_goal=request.main_goal or "Complete the software project",
        timeline=request.timeline or "TBD"
    )
    
    # Save to db
    create_project(new_project)
    
    # Start generation in background
    background_tasks.add_task(generate_project_background, project_id, request)
    
    return GenerateProjectResponse(
        project_id=project_id,
        status="generating",
        message="Project generation has started in the background."
    )

@router.delete("/projects/{project_id}")
async def api_delete_project(project_id: str):
    """Delete a project."""
    log_api_request()
    success = delete_project(project_id)
    if not success:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted successfully"}
