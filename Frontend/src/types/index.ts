// Project types
export interface Project {
    id: string;
    title: string;
    description: string;
    raw_prompt: string;
    status: "draft" | "generating" | "completed" | "archived";
    created_at: string;
    updated_at: string;
    target_users: string;
    preferred_stack: string[];
    category: string;
    main_goal: string;
    timeline: string;
    outputs: ProjectOutputs;
}

export interface ProjectOutputs {
    summary: string;
    prd: PRDOutput;
    architecture: ArchitectureOutput;
    database_schema: DatabaseOutput;
    api_design: APIOutput;
    uiux_plan: UIUXOutput;
    task_breakdown: TaskBreakdown;
    risks: RiskOutput;
    recommended_stack: StackRecommendation;
}

export interface PRDOutput {
    overview: string;
    objectives: string[];
    user_stories: UserStory[];
    functional_requirements: Requirement[];
    non_functional_requirements: Requirement[];
    success_metrics: string[];
    out_of_scope: string[];
}

export interface UserStory {
    id: string;
    persona: string;
    action: string;
    benefit: string;
    priority: "critical" | "high" | "medium" | "low";
    acceptance_criteria: string[];
}

export interface Requirement {
    id: string;
    title: string;
    description: string;
    priority: "critical" | "high" | "medium" | "low";
    category: string;
}

export interface ArchitectureOutput {
    overview: string;
    system_type: string;
    frontend: ArchitectureComponent;
    backend: ArchitectureComponent;
    database: ArchitectureComponent;
    infrastructure: ArchitectureComponent;
    services: ServiceRelationship[];
    deployment_notes: string[];
    tradeoffs: string[];
}

export interface GenerateProjectRequest {
    prompt: string;
    name?: string;
    category?: string;
    target_users?: string;
    main_goal?: string;
    preferred_stack?: string[];
    timeline?: string;
}

export interface GenerateProjectResponse {
    project_id: string;
    status: string;
    message: string;
}

export interface ArchitectureComponent {
    name: string;
    technology: string;
    description: string;
    components: string[];
    patterns: string[];
}

export interface ServiceRelationship {
    from: string;
    to: string;
    protocol: string;
    description: string;
}

export interface DatabaseOutput {
    overview: string;
    database_type: string;
    tables: DatabaseTable[];
    relationships: string[];
    indexes: string[];
    notes: string[];
}

export interface DatabaseTable {
    name: string;
    description: string;
    columns: DatabaseColumn[];
}

export interface DatabaseColumn {
    name: string;
    type: string;
    nullable: boolean;
    primary_key: boolean;
    foreign_key?: string;
    description: string;
}

export interface APIOutput {
    overview: string;
    base_url: string;
    auth_method: string;
    endpoints: APIEndpoint[];
    error_handling: string;
    rate_limiting: string;
}

export interface APIEndpoint {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    path: string;
    description: string;
    auth_required: boolean;
    request_body?: string;
    response: string;
    category: string;
}

export interface UIUXOutput {
    overview: string;
    design_direction: string;
    user_flows: UserFlow[];
    screens: ScreenDefinition[];
    components: string[];
    design_notes: string[];
}

export interface UserFlow {
    name: string;
    steps: string[];
}

export interface ScreenDefinition {
    name: string;
    path: string;
    description: string;
    components: string[];
    states: string[];
    notes: string;
}

export interface TaskBreakdown {
    overview: string;
    milestones: Milestone[];
    total_estimated_hours: number;
}

export interface Milestone {
    id: string;
    title: string;
    description: string;
    phase: string;
    tasks: Task[];
    estimated_duration: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    category: "frontend" | "backend" | "devops" | "design" | "testing" | "documentation";
    priority: "critical" | "high" | "medium" | "low";
    difficulty: "easy" | "medium" | "hard" | "complex";
    estimated_hours: number;
    status: "todo" | "in_progress" | "done";
    dependencies: string[];
}

export interface RiskOutput {
    risks: Risk[];
    assumptions: Assumption[];
    missing_info: string[];
}

export interface Risk {
    id: string;
    title: string;
    description: string;
    severity: "critical" | "high" | "medium" | "low";
    mitigation: string;
    category: string;
}

export interface Assumption {
    id: string;
    title: string;
    description: string;
    impact: string;
    validated: boolean;
}

export interface StackRecommendation {
    frontend: TechChoice;
    backend: TechChoice;
    database: TechChoice;
    infrastructure: TechChoice;
    additional_tools: TechChoice[];
    rationale: string;
}

export interface TechChoice {
    name: string;
    reason: string;
    alternatives: string[];
}

// Navigation
export interface NavItem {
    label: string;
    href: string;
    icon: string;
    badge?: string;
}

// User
export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    plan: "free" | "pro" | "team";
}
