"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Filter, Clock, MoreHorizontal, Loader2, Trash } from "lucide-react";
import { getStatusColor, formatRelativeTime } from "@/lib/utils";
import { getProjects, deleteProject } from "@/lib/api";
import { Project } from "@/types";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    async function loadData() {
        try {
            const data = await getProjects();
            setProjects(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (confirm("Are you sure you want to delete this project?")) {
            await deleteProject(id);
            setProjects(projects.filter(p => p.id !== id));
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--border-primary)] pb-6">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                        Projects
                    </h1>
                    <p className="text-[var(--text-secondary)] mt-1">
                        Manage your AI-generated project workspaces.
                    </p>
                </div>
                <Link
                    href="/projects/new"
                    className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    New Project
                </Link>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="w-full pl-9 pr-4 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-sm focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400 transition-all"
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--border-primary)] text-[var(--text-secondary)] text-sm font-medium transition-colors whitespace-nowrap">
                        <Filter className="w-3.5 h-3.5" />
                        All Statuses
                    </button>
                    <button className="px-3 py-1.5 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--border-primary)] text-[var(--text-secondary)] text-sm font-medium transition-colors whitespace-nowrap">
                        Category
                    </button>
                </div>
            </div>

            {/* Project List */}
            {projects.length === 0 ? (
                <div className="glass-panel rounded-2xl py-12 px-6 border border-dashed border-[var(--border-primary)] text-center">
                    <p className="text-[var(--text-secondary)] mb-4">No projects found.</p>
                    <Link href="/projects/new" className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-xl text-sm font-medium transition-colors">
                        <Plus className="w-4 h-4" /> Create One Now
                    </Link>
                </div>
            ) : (
                <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-2xl overflow-hidden glass-panel shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]/50">
                                    <th className="px-6 py-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Project Name</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider hidden md:table-cell">Category</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider hidden lg:table-cell">Stack</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider text-right">Last Updated</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider text-right"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border-primary)]">
                                {projects.map((project) => (
                                    <tr key={project.id} className="hover:bg-[var(--bg-tertiary)]/50 transition-colors group cursor-pointer" onClick={() => window.location.href = `/projects/${project.id}`}>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <Link href={`/projects/${project.id}`} className="font-semibold text-[var(--text-primary)] group-hover:text-brand-600 transition-colors">
                                                    {project.title}
                                                </Link>
                                                <span className="text-sm text-[var(--text-tertiary)] truncate max-w-[200px] sm:max-w-xs block mt-0.5">
                                                    {project.description}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${getStatusColor(project.status)}`}>
                                                {project.status === "generating" ? (
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="relative flex h-2 w-2">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                                        </span>
                                                        Generating
                                                    </div>
                                                ) : (
                                                    project.status
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <span className="text-sm text-[var(--text-secondary)]">
                                                {project.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 hidden lg:table-cell w-[250px]">
                                            <div className="flex flex-wrap gap-1.5">
                                                {(project.preferred_stack || []).slice(0, 3).map((tech) => (
                                                    <span key={tech} className="px-2 py-0.5 rounded-md bg-[var(--bg-secondary)] border border-[var(--border-secondary)] text-[var(--text-tertiary)] text-xs">
                                                        {tech}
                                                    </span>
                                                ))}
                                                {(project.preferred_stack || []).length > 3 && (
                                                    <span className="px-2 py-0.5 rounded-md bg-[var(--bg-secondary)] text-[var(--text-tertiary)] text-xs">
                                                        +{(project.preferred_stack || []).length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right whitespace-nowrap">
                                            <span className="text-sm text-[var(--text-secondary)] flex items-center justify-end gap-1.5">
                                                <Clock className="w-3.5 h-3.5" />
                                                {formatRelativeTime(project.updated_at)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-medium">
                                            <button
                                                onClick={(e) => handleDelete(project.id, e)}
                                                className="p-2 rounded-lg text-[var(--text-tertiary)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                            >
                                                <Trash className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
