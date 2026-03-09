from datetime import datetime
from typing import List, Optional, Literal
from pydantic import BaseModel, ConfigDict, Field

# Common enums
StatusEnum = Literal["draft", "generating", "completed", "archived"]
PriorityEnum = Literal["critical", "high", "medium", "low"]
DifficultyEnum = Literal["easy", "medium", "hard", "complex"]

# ----------------------------------------------------
# PRD Output Models
# ----------------------------------------------------
class UserStory(BaseModel):
    id: str
    persona: str
    action: str
    benefit: str
    priority: PriorityEnum
    acceptance_criteria: List[str]

class Requirement(BaseModel):
    id: str
    title: str
    description: str
    priority: PriorityEnum
    category: str

class PRDOutput(BaseModel):
    overview: str
    objectives: List[str]
    user_stories: List[UserStory]
    functional_requirements: List[Requirement]
    non_functional_requirements: List[Requirement]
    success_metrics: List[str]
    out_of_scope: List[str]

# ----------------------------------------------------
# Architecture Output Models
# ----------------------------------------------------
class ArchitectureComponent(BaseModel):
    name: str
    technology: str
    description: str
    components: List[str]
    patterns: List[str]

class ServiceRelationship(BaseModel):
    from_: str = Field(alias="from")
    to: str
    protocol: str
    description: str

class ArchitectureOutput(BaseModel):
    overview: str
    system_type: str
    frontend: ArchitectureComponent
    backend: ArchitectureComponent
    database: ArchitectureComponent
    infrastructure: ArchitectureComponent
    services: List[ServiceRelationship]
    deployment_notes: List[str]
    tradeoffs: List[str]
    
    model_config = ConfigDict(populate_by_name=True)

# ----------------------------------------------------
# Database Output Models
# ----------------------------------------------------
class DatabaseColumn(BaseModel):
    name: str
    type: str
    nullable: bool
    primary_key: bool
    foreign_key: Optional[str] = None
    description: str

class DatabaseTable(BaseModel):
    name: str
    description: str
    columns: List[DatabaseColumn]

class DatabaseOutput(BaseModel):
    overview: str
    database_type: str
    tables: List[DatabaseTable]
    relationships: List[str]
    indexes: List[str]
    notes: List[str]

# ----------------------------------------------------
# API Output Models
# ----------------------------------------------------
class APIEndpoint(BaseModel):
    method: Literal["GET", "POST", "PUT", "PATCH", "DELETE"]
    path: str
    description: str
    auth_required: bool
    request_body: Optional[str] = None
    response: str
    category: str

class APIOutput(BaseModel):
    overview: str
    base_url: str
    auth_method: str
    endpoints: List[APIEndpoint]
    error_handling: str
    rate_limiting: str

# ----------------------------------------------------
# UI/UX Output Models
# ----------------------------------------------------
class UserFlow(BaseModel):
    name: str
    steps: List[str]

class ScreenDefinition(BaseModel):
    name: str
    path: str
    description: str
    components: List[str]
    states: List[str]
    notes: str

class UIUXOutput(BaseModel):
    overview: str
    design_direction: str
    user_flows: List[UserFlow]
    screens: List[ScreenDefinition]
    components: List[str]
    design_notes: List[str]

# ----------------------------------------------------
# Tasks Output Models
# ----------------------------------------------------
class Task(BaseModel):
    id: str
    title: str
    description: str
    category: Literal["frontend", "backend", "devops", "design", "testing", "documentation"]
    priority: PriorityEnum
    difficulty: DifficultyEnum
    estimated_hours: int
    status: Literal["todo", "in_progress", "done"]
    dependencies: List[str]

class Milestone(BaseModel):
    id: str
    title: str
    description: str
    phase: str
    tasks: List[Task]
    estimated_duration: str

class TaskBreakdown(BaseModel):
    overview: str
    milestones: List[Milestone]
    total_estimated_hours: int

# ----------------------------------------------------
# Risks Output Models
# ----------------------------------------------------
class Risk(BaseModel):
    id: str
    title: str
    description: str
    severity: PriorityEnum
    mitigation: str
    category: str

class Assumption(BaseModel):
    id: str
    title: str
    description: str
    impact: str
    validated: bool

class RiskOutput(BaseModel):
    risks: List[Risk]
    assumptions: List[Assumption]
    missing_info: List[str]

# ----------------------------------------------------
# Environment/Stack Models
# ----------------------------------------------------
class TechChoice(BaseModel):
    name: str
    reason: str
    alternatives: List[str]

class StackRecommendation(BaseModel):
    frontend: TechChoice
    backend: TechChoice
    database: TechChoice
    infrastructure: TechChoice
    additional_tools: List[TechChoice]
    rationale: str

# ----------------------------------------------------
# Complete Project Outputs
# ----------------------------------------------------
class FileOutput(BaseModel):
    path: str
    content: str
    language: str

class ProjectOutputs(BaseModel):
    summary: str
    prd: PRDOutput
    architecture: ArchitectureOutput
    database_schema: DatabaseOutput
    api_design: APIOutput
    uiux_plan: UIUXOutput
    task_breakdown: TaskBreakdown
    risks: RiskOutput
    recommended_stack: StackRecommendation
    files: Optional[List[FileOutput]] = Field(default_factory=list)

# ----------------------------------------------------
# Project Data Model
# ----------------------------------------------------
class Project(BaseModel):
    id: str
    title: str
    description: str
    raw_prompt: str
    status: StatusEnum
    created_at: str
    updated_at: str
    target_users: str
    preferred_stack: List[str]
    category: str
    main_goal: str
    timeline: str
    outputs: Optional[ProjectOutputs] = None

# ----------------------------------------------------
# API Request Models
# ----------------------------------------------------
class GenerateProjectRequest(BaseModel):
    prompt: str
    name: Optional[str] = None
    category: Optional[str] = None
    target_users: Optional[str] = None
    main_goal: Optional[str] = None
    preferred_stack: Optional[List[str]] = None
    timeline: Optional[str] = None

class GenerateProjectResponse(BaseModel):
    project_id: str
    status: str
    message: str
