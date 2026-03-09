"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    FileText, Database, Server, Component, CheckSquare,
    AlertTriangle, LayoutTemplate, Layers, Download, Share2,
    RefreshCw, Loader2, ArrowLeft, Terminal, Monitor, Code, Sparkles
} from "lucide-react";
import { mockProjects } from "@/data/mock-data";
import { Project } from "@/types";
import { getStatusColor, formatDate } from "@/lib/utils";

// Subcomponents for the different views
const OverviewTab = ({ project }: { project: Project }) => {
    const outputs = project.outputs;
    if (!outputs) return <div className="p-8 text-center text-[var(--text-tertiary)]">Waiting for generation results...</div>;

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[var(--border-primary)] shadow-sm">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-brand-500" />
                    Executive Summary
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
                    {outputs.summary || "No summary available."}
                </p>

                <div className="mt-8 pt-6 border-t border-[var(--border-primary)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                        <span className="block text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-2">Category</span>
                        <span className="font-medium">{project.category}</span>
                    </div>
                    <div>
                        <span className="block text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-2">Timeline</span>
                        <span className="font-medium">{project.timeline}</span>
                    </div>
                    <div>
                        <span className="block text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-2">Target Audience</span>
                        <span className="font-medium">{project.target_users}</span>
                    </div>
                    <div>
                        <span className="block text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-2">Primary Goal</span>
                        <span className="font-medium">{project.main_goal}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-panel p-6 rounded-2xl border border-[var(--border-primary)]">
                    <h3 className="text-sm font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Layers className="w-4 h-4" /> Recommended Stack
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-[var(--border-primary)] last:border-0">
                            <span className="text-[var(--text-secondary)]">Frontend</span>
                            <span className="font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 px-3 py-1 rounded-full text-sm">{outputs.recommended_stack?.frontend?.name || "Pending"}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-[var(--border-primary)] last:border-0">
                            <span className="text-[var(--text-secondary)]">Backend</span>
                            <span className="font-semibold text-[var(--text-primary)] bg-[var(--bg-secondary)] px-3 py-1 rounded-full border border-[var(--border-secondary)] text-sm">{outputs.recommended_stack?.backend?.name || "Pending"}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-[var(--border-primary)] last:border-0">
                            <span className="text-[var(--text-secondary)]">Database</span>
                            <span className="font-semibold text-[var(--text-primary)] bg-[var(--bg-secondary)] px-3 py-1 rounded-full border border-[var(--border-secondary)] text-sm">{outputs.recommended_stack?.database?.name || "Pending"}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-[var(--border-primary)] last:border-0">
                            <span className="text-[var(--text-secondary)]">Infrastructure</span>
                            <span className="font-semibold text-[var(--text-primary)] bg-[var(--bg-secondary)] px-3 py-1 rounded-full border border-[var(--border-secondary)] text-sm">{outputs.recommended_stack?.infrastructure?.name || "Pending"}</span>
                        </div>
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-[var(--border-primary)]">
                    <h3 className="text-sm font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> Top Risks
                    </h3>
                    <div className="space-y-4">
                        {outputs.risks?.risks?.slice(0, 3).map((risk, idx) => (
                            <div key={idx} className="flex gap-3 items-start">
                                <div className={`mt-0.5 flex-shrink-0 w-2 h-2 rounded-full ${risk.severity === 'critical' ? 'bg-red-500' : risk.severity === 'high' ? 'bg-orange-500' : 'bg-amber-500'}`} />
                                <div>
                                    <h4 className="font-medium text-[var(--text-primary)] text-sm">{risk.title}</h4>
                                    <p className="text-xs text-[var(--text-secondary)] mt-1">{risk.mitigation}</p>
                                </div>
                            </div>
                        )) || <p className="text-sm text-[var(--text-tertiary)]">No risks identified yet.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ArchitectureTab = ({ project }: { project: Project }) => {
    const arch = project.outputs?.architecture;
    if (!arch) return <div className="p-8 text-center text-[var(--text-tertiary)]">Architecture not yet drafted...</div>;

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="glass-panel p-6 rounded-2xl border border-[var(--border-primary)]">
                <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <LayoutTemplate className="w-5 h-5 text-brand-500" />
                    System Architecture
                </h2>
                <div className="inline-block px-3 py-1 rounded-md bg-[var(--bg-tertiary)] text-xs font-mono text-[var(--text-secondary)] mb-6">
                    Type: {arch.system_type || "N/A"}
                </div>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                    {arch.overview}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Visual Architecture Concept (Mock) */}
                    <div className="col-span-1 md:col-span-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-secondary)] p-8 flex flex-col items-center justify-center min-h-[300px] mb-4 relative overflow-hidden">
                        <div className="absolute inset-0 pattern-plus text-[var(--border-primary)] opacity-50" />

                        <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-3xl mx-auto">
                            <div className="flex w-full justify-between items-center">
                                <div className="flex flex-col items-center w-32">
                                    <Monitor className="w-10 h-10 text-[var(--text-secondary)] mb-2" />
                                    <span className="text-xs font-semibold text-[var(--text-primary)] bg-white dark:bg-black px-2 py-1 rounded border shadow-sm">Client App</span>
                                </div>
                                <div className="h-px bg-brand-400 flex-1 mx-4 relative overflow-visible">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--bg-primary)] px-2 text-[10px] text-brand-600 font-mono tracking-widest rounded-full border border-brand-200">HTTPS / WSS</div>
                                </div>
                                <div className="flex flex-col items-center w-32">
                                    <Server className="w-10 h-10 text-brand-600 dark:text-brand-400 mb-2" />
                                    <span className="text-xs font-semibold text-[var(--text-primary)] bg-white dark:bg-black px-2 py-1 rounded border shadow-sm">API Gateway</span>
                                </div>
                                <div className="h-px bg-[var(--text-tertiary)] flex-1 mx-4 border-t border-dashed" />
                                <div className="flex flex-col items-center w-32">
                                    <Database className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mb-2" />
                                    <span className="text-xs font-semibold text-[var(--text-primary)] bg-white dark:bg-black px-2 py-1 rounded border shadow-sm">Data Store</span>
                                </div>
                            </div>

                            <div className="w-full flex justify-center mt-4">
                                <div className="w-48 px-4 py-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 flex flex-col items-center text-center">
                                    <Sparkles className="w-6 h-6 text-indigo-500 mb-2" />
                                    <span className="text-xs font-semibold text-[var(--text-primary)]">AI Integration / ML Pipeline</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Component Breakdowns */}
                    <div className="space-y-4">
                        {arch.frontend && (
                            <div className="p-5 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)]">
                                <div className="flex items-center gap-2 mb-3">
                                    <Monitor className="w-5 h-5 text-brand-500" />
                                    <h3 className="font-bold">Frontend ({arch.frontend.technology})</h3>
                                </div>
                                <p className="text-sm text-[var(--text-secondary)] mb-4">{arch.frontend.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {arch.frontend.components?.map(c => (
                                        <span key={c} className="px-2 py-1 rounded border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-xs text-[var(--text-secondary)]">{c}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {arch.database && (
                            <div className="p-5 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)]">
                                <div className="flex items-center gap-2 mb-3">
                                    <Database className="w-5 h-5 text-brand-500" />
                                    <h3 className="font-bold">Database ({arch.database.technology})</h3>
                                </div>
                                <p className="text-sm text-[var(--text-secondary)] mb-4">{arch.database.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {arch.database.components?.map(c => (
                                        <span key={c} className="px-2 py-1 rounded bg-[var(--bg-secondary)] text-xs text-[var(--text-secondary)]">{c}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        {arch.backend && (
                            <div className="p-5 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)]">
                                <div className="flex items-center gap-2 mb-3">
                                    <Server className="w-5 h-5 text-brand-500" />
                                    <h3 className="font-bold">Backend ({arch.backend.technology})</h3>
                                </div>
                                <p className="text-sm text-[var(--text-secondary)] mb-4">{arch.backend.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {arch.backend.components?.map(c => (
                                        <span key={c} className="px-2 py-1 rounded bg-[var(--bg-secondary)] text-xs text-[var(--text-secondary)]">{c}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {arch.infrastructure && (
                            <div className="p-5 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)]">
                                <div className="flex items-center gap-2 mb-3">
                                    <Layers className="w-5 h-5 text-brand-500" />
                                    <h3 className="font-bold">Infrastructure ({arch.infrastructure.technology})</h3>
                                </div>
                                <p className="text-sm text-[var(--text-secondary)] mb-4">{arch.infrastructure.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {arch.infrastructure.components?.map(c => (
                                        <span key={c} className="px-2 py-1 rounded border border-[var(--border-primary)] text-xs text-[var(--text-secondary)]">{c}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-[var(--border-primary)]">
                    <h3 className="font-bold mb-4">Deployment Notes</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--text-secondary)]">
                        {arch.deployment_notes?.map((note, idx) => (
                            <li key={idx}>{note}</li>
                        )) || <li>Deployment notes not generated.</li>}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const DatabaseTab = ({ project }: { project: Project }) => {
    const db = project.outputs?.database_schema;
    if (!db) return <div className="p-8 text-center text-[var(--text-tertiary)]">Database schema not yet generated...</div>;

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="glass-panel p-6 rounded-2xl border border-[var(--border-primary)]">
                <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <Database className="w-5 h-5 text-emerald-500" />
                    Database Schema: {db.database_type || "N/A"}
                </h2>
                <p className="text-[var(--text-secondary)] mb-8">{db.overview}</p>

                <div className="space-y-6">
                    {db.tables?.map(table => (
                        <div key={table.name} className="border border-[var(--border-primary)] rounded-xl overflow-hidden bg-[var(--bg-primary)]">
                            <div className="bg-[var(--bg-secondary)] px-4 py-3 border-b border-[var(--border-primary)] flex justify-between items-center">
                                <div>
                                    <h3 className="font-mono font-bold text-[var(--text-primary)]">{table.name}</h3>
                                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">{table.description}</p>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-[var(--border-secondary)] bg-[var(--bg-tertiary)]/30">
                                            <th className="px-4 py-2 font-medium text-[var(--text-secondary)]">Column</th>
                                            <th className="px-4 py-2 font-medium text-[var(--text-secondary)]">Type</th>
                                            <th className="px-4 py-2 font-medium text-[var(--text-secondary)]">Constraints</th>
                                            <th className="px-4 py-2 font-medium text-[var(--text-secondary)]">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[var(--border-primary)] font-mono text-xs">
                                        {table.columns?.map(col => (
                                            <tr key={col.name}>
                                                <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">
                                                    {col.name}
                                                    {col.primary_key && <span className="ml-2 text-amber-500" title="Primary Key">PK</span>}
                                                    {col.foreign_key && <span className="ml-2 text-blue-500" title="Foreign Key">FK</span>}
                                                </td>
                                                <td className="px-4 py-3 text-brand-600 dark:text-brand-400">{col.type}</td>
                                                <td className="px-4 py-3 text-[var(--text-tertiary)]">
                                                    {!col.nullable && <span className="mr-2">NOT NULL</span>}
                                                    {col.foreign_key && <span>→ {col.foreign_key}</span>}
                                                </td>
                                                <td className="px-4 py-3 text-[var(--text-secondary)] font-sans">{col.description}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Schema Notes & Indexes</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700 dark:text-blue-400/80">
                        {db.indexes?.map((idx, i) => (
                            <li key={i} className="font-mono text-xs my-1">{idx}</li>
                        ))}
                        {db.notes?.map((note, i) => (
                            <li key={`note-${i}`}>{note}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const APITab = ({ project }: { project: Project }) => {
    const api = project.outputs?.api_design;
    if (!api) return <div className="p-8 text-center text-[var(--text-tertiary)]">API design not yet generated...</div>;

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="glass-panel p-6 rounded-2xl border border-[var(--border-primary)]">
                <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <Server className="w-5 h-5 text-indigo-500" />
                    API Endpoints
                </h2>
                <div className="flex gap-4 mb-6">
                    <span className="inline-block px-3 py-1 rounded-md bg-[var(--bg-tertiary)] text-xs font-mono text-[var(--text-secondary)]">
                        Base URL: {api.base_url || "/api"}
                    </span>
                    <span className="inline-block px-3 py-1 rounded-md bg-[var(--bg-tertiary)] text-xs font-mono text-[var(--text-secondary)]">
                        Auth: {api.auth_method || "None"}
                    </span>
                </div>

                <p className="text-[var(--text-secondary)] mb-8">{api.overview}</p>

                <div className="space-y-4">
                    {api.endpoints?.map((ep, idx) => {
                        const methodColor =
                            ep.method === 'GET' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30' :
                                ep.method === 'POST' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30' :
                                    ep.method === 'PUT' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30' :
                                        ep.method === 'DELETE' ? 'bg-red-100 text-red-700 dark:bg-red-900/30' :
                                            'bg-gray-100 text-gray-700 dark:bg-gray-800';

                        return (
                            <div key={idx} className="border border-[var(--border-primary)] rounded-xl overflow-hidden bg-[var(--bg-primary)] p-4 flex flex-col sm:flex-row gap-4">
                                <div className="flex-shrink-0 pt-0.5 flex gap-3">
                                    <span className={`w-16 text-center text-xs font-bold py-1 px-2 rounded-md ${methodColor}`}>
                                        {ep.method}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                        <span className="font-mono text-sm font-semibold tracking-wide bg-[var(--bg-secondary)] px-2 py-0.5 rounded border border-[var(--border-secondary)]">{ep.path}</span>
                                        {ep.auth_required && (
                                            <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full border border-amber-200/50">Requires Auth</span>
                                        )}
                                    </div>
                                    <p className="text-sm text-[var(--text-secondary)] mb-3">{ep.description}</p>

                                    {ep.request_body && (
                                        <div className="mb-2">
                                            <span className="text-xs font-semibold text-[var(--text-tertiary)]">Request Body:</span>
                                            <div className="mt-1 font-mono text-xs text-[var(--text-secondary)] bg-[var(--bg-secondary)] px-3 py-2 rounded-lg">{ep.request_body}</div>
                                        </div>
                                    )}
                                    <div>
                                        <span className="text-xs font-semibold text-[var(--text-tertiary)]">Response:</span>
                                        <div className="mt-1 font-mono text-xs text-[var(--text-secondary)] bg-[var(--bg-secondary)] px-3 py-2 rounded-lg">{ep.response}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

import { getProject } from "@/lib/api";

// Map of tab IDs to components
const TAB_COMPONENTS: Record<string, React.FC<{ project: Project }>> = {
    overview: OverviewTab,
    architecture: ArchitectureTab,
    database: DatabaseTab,
    api: APITab,
};

export default function ProjectWorkspacePage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        let pollInterval: NodeJS.Timeout;

        async function fetchProject() {
            try {
                const data = await getProject(id);
                setProject(data);
                // Poll if it's still being prepared (draft/generating) and doesn't have outputs yet
                const isStillWorking = data && (data.status === "generating" || data.status === "draft");
                const hasNoOutputs = !data?.outputs;

                if (isStillWorking && hasNoOutputs) {
                    pollInterval = setTimeout(fetchProject, 3000);
                }
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProject();

        return () => {
            if (pollInterval) clearTimeout(pollInterval);
        };
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-[500px] flex flex-col items-center justify-center p-8 text-center animate-fade-in">
                <Loader2 className="w-12 h-12 text-brand-500 mb-4 animate-spin" />
                <h2 className="text-xl font-bold mb-2">Loading Workspace...</h2>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-[500px] flex flex-col items-center justify-center p-8 text-center animate-fade-in">
                <FileText className="w-12 h-12 text-[var(--text-tertiary)] mb-4" />
                <h2 className="text-2xl font-bold mb-2">Project not found</h2>
                <p className="text-[var(--text-secondary)] mb-6">This project may have been deleted or never completed generation.</p>
                <button
                    onClick={() => router.push("/projects")}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-medium transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Go back to projects
                </button>
            </div>
        );
    }

    // Use real data from API with safety
    const outputs = project.outputs as any; // Cast for flexibility with extra generated fields
    const overview = outputs?.summary || "Summary not yet generated.";
    const prd = outputs?.prd || { objective: "Generating...", user_stories: [] };
    const techStack = (outputs as any)?.recommended_stack || { frontend: {}, backend: {}, database: {}, infrastructure: {} };
    const architecture = outputs?.architecture || { overview: "Drafting architecture...", system_components: [] };
    const databaseSchema = outputs?.database_schema || { tables: [] };
    const apiDesign = outputs?.api_design || { endpoints: [] };
    const uiux = (outputs as any)?.ui_ux || { pages: [] };
    const tasks = (outputs as any)?.tasks || { phases: [] };
    const technicalPlan = (outputs as any)?.technical_plan || { steps: [] };

    // Handle case where generation failed
    if (project.status === "completed" && !project.outputs) {
        return (
            <div className="min-h-[500px] flex flex-col items-center justify-center p-8 text-center animate-fade-in">
                <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2 text-red-600">Generation Failed</h2>
                <p className="text-[var(--text-secondary)] mb-6 max-w-md">
                    {project.description || "The AI Architect encountered an unexpected error during the generation process."}
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={() => router.push("/projects/new")}
                        className="flex items-center gap-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-medium transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" /> Try Again
                    </button>
                    <button
                        onClick={() => router.push("/projects")}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--border-primary)] text-[var(--text-primary)] rounded-xl text-sm font-medium transition-colors"
                    >
                        Back to Projects
                    </button>
                </div>
                <p className="mt-8 text-xs font-mono text-[var(--text-tertiary)]">Job ID: {project.id}</p>
            </div>
        );
    }

    // If it's still generating, show a dedicated loading view
    if (project.status === "generating" || (project.status === "draft" && !project.outputs)) {
        return (
            <div className="min-h-[500px] flex flex-col items-center justify-center p-8 text-center animate-fade-in">
                <Loader2 className="w-12 h-12 text-brand-500 mb-4 animate-spin" />
                <h2 className="text-2xl font-bold mb-2">Generating Project...</h2>
                <p className="text-[var(--text-secondary)] mb-6">The AI Architect is crafting your PRD, Database schemas, API endpoints, and system architecture.</p>
                <div className="w-full max-w-md bg-[var(--bg-tertiary)] h-2 rounded-full overflow-hidden mb-6">
                    <div className="h-full bg-brand-500 w-1/2 animate-pulse" />
                </div>
                <p className="text-sm font-mono text-[var(--text-tertiary)]">Job ID: {project.id}</p>
            </div>
        );
    }

    const ActiveComponent = TAB_COMPONENTS[activeTab] || OverviewTab;

    const tabs = [
        { id: "overview", label: "Overview", icon: FileText },
        { id: "prd", label: "PRD & Stories", icon: CheckSquare },
        { id: "architecture", label: "Architecture", icon: LayoutTemplate },
        { id: "database", label: "Database", icon: Database },
        { id: "api", label: "API Design", icon: Server },
        { id: "uiux", label: "UI / UX", icon: Component },
        { id: "tasks", label: "Task Roadmap", icon: Layers },
    ];

    return (
        <div className="h-[calc(100vh-80px)] flex flex-col lg:flex-row gap-6 mx-auto animate-fade-in relative -mt-2">

            {/* Project Sidebar / Context Menu */}
            <div className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-4 border-b lg:border-b-0 lg:border-r border-[var(--border-primary)] pb-4 lg:pb-0 lg:pr-6 h-auto lg:h-[calc(100vh-100px)] lg:sticky lg:top-20">
                <div className="mb-2">
                    <button
                        onClick={() => router.push("/projects")}
                        className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors mb-4"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back to projects
                    </button>
                    <h1 className="text-xl font-bold text-[var(--text-primary)] leading-tight mb-2 truncate" title={project.title}>
                        {project.title}
                    </h1>
                    <div className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${getStatusColor(project.status)}`}>
                        {project.status}
                    </div>
                </div>

                <div className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0 custom-scrollbar mt-2 lg:mt-6">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${activeTab === tab.id
                                ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-sm translate-x-0 lg:translate-x-1"
                                : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
                                }`}
                        >
                            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "" : "opacity-70"}`} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="mt-auto hidden lg:flex flex-col gap-2 pt-6 border-t border-[var(--border-primary)]">
                    <button className="flex items-center gap-2 justify-center w-full px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--border-primary)] text-[var(--text-secondary)] text-sm font-medium transition-colors">
                        <Download className="w-4 h-4" /> Export MD
                    </button>
                    <button className="flex items-center gap-2 justify-center w-full px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--border-primary)] text-[var(--text-secondary)] text-sm font-medium transition-colors">
                        <Share2 className="w-4 h-4" /> Share Project
                    </button>
                </div>
            </div>

            {/* Main Content Workspace */}
            <div className="flex-1 w-full flex flex-col overflow-y-auto custom-scrollbar lg:h-[calc(100vh-100px)] pl-0 lg:pl-2">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-sm font-medium text-[var(--text-tertiary)]">
                        Workspace / <span className="text-[var(--text-primary)]">
                            {tabs.find(t => t.id === activeTab)?.label}
                        </span>
                    </h2>
                    <div className="flex gap-2">
                        <button className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--border-primary)] text-[var(--text-secondary)] transition-colors hover:text-brand-500" title="Regenerate this section">
                            <RefreshCw className="w-4 h-4" />
                        </button>
                        <button className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--border-primary)] text-[var(--text-secondary)] transition-colors" title="View Raw Details">
                            <Code className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="pb-24">
                    {/* Render the dynamically selected active tab */}
                    {activeTab === 'overview' && <OverviewTab project={project} />}
                    {activeTab === 'architecture' && <ArchitectureTab project={project} />}
                    {activeTab === 'database' && <DatabaseTab project={project} />}
                    {activeTab === 'api' && <APITab project={project} />}

                    {/* Catchall for tabs not yet fully built out */}
                    {['prd', 'uiux', 'tasks'].includes(activeTab) && (
                        <div className="glass-panel p-12 text-center rounded-2xl border border-[var(--border-primary)]">
                            <Code className="w-12 h-12 text-[var(--text-tertiary)]/50 mx-auto mb-4" />
                            <h3 className="text-lg font-bold">Content Viewer Under Construction</h3>
                            <p className="text-[var(--text-secondary)] mt-2">The raw data exists for this section, but the specialized UI component is still being built.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
