import { Project, GenerateProjectRequest, GenerateProjectResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function getProjects(): Promise<Project[]> {
    try {
        const res = await fetch(`${API_URL}/projects`, {
            cache: 'no-store',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) throw new Error("Failed to fetch projects");
        return await res.json();
    } catch (error) {
        console.error("API Error - getProjects:", error);
        return []; // Fallback empty array on error
    }
}

export async function getProject(id: string): Promise<Project | null> {
    try {
        const res = await fetch(`${API_URL}/projects/${id}`, {
            cache: 'no-store',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) {
            if (res.status === 404) return null;
            throw new Error(`Failed to fetch project ${id}`);
        }
        return await res.json();
    } catch (error) {
        console.error(`API Error - getProject(${id}):`, error);
        return null;
    }
}

export async function generateProject(request: GenerateProjectRequest): Promise<GenerateProjectResponse> {
    const res = await fetch(`${API_URL}/projects/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
    });

    if (!res.ok) {
        throw new Error("Failed to start project generation");
    }

    return await res.json();
}

export async function deleteProject(id: string): Promise<boolean> {
    try {
        const res = await fetch(`${API_URL}/projects/${id}`, {
            method: "DELETE",
        });
        return res.ok;
    } catch (error) {
        console.error(`API Error - deleteProject(${id}):`, error);
        return false;
    }
}
