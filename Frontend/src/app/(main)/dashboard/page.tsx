"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, FolderKanban, Clock, Sparkles, ArrowRight, Activity, Loader2 } from "lucide-react";
import { mockUser } from "@/data/mock-data";
import { getStatusColor, formatRelativeTime } from "@/lib/utils";
import { getProjects } from "@/lib/api";
import { Project } from "@/types";

export default function DashboardPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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
        loadData();
    }, []);

    const recentProjects = projects.slice(0, 3);

    // Calculate simple stats
    const totalProjects = projects.length;
    const completedProjects = projects.filter(p => p.status === "completed").length;
    const generatingProjects = projects.filter(p => p.status === "generating").length;

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                        Welcome back, {mockUser.name.split(" ")[0]}
                    </h1>
                    <p className="text-[var(--text-secondary)] mt-1">
                        Here's an overview of your projects and recent activity.
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

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between h-32 card-hover">
                    <div className="flex items-center gap-2 text-[var(--text-secondary)] mb-2">
                        <FolderKanban className="w-5 h-5 text-brand-500" />
                        <span className="text-sm font-medium">Total Projects</span>
                    </div>
                    <div className="text-3xl font-bold text-[var(--text-primary)]">{totalProjects}</div>
                </div>

                <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between h-32 card-hover">
                    <div className="flex items-center gap-2 text-[var(--text-secondary)] mb-2">
                        <Activity className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm font-medium">Completed Plans</span>
                    </div>
                    <div className="text-3xl font-bold text-[var(--text-primary)]">{completedProjects}</div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow flex flex-col justify-between h-32 relative overflow-hidden card-hover">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mt-10 -mr-10" />
                    <div className="flex items-center gap-2 text-brand-100 mb-2 relative z-10">
                        <Sparkles className="w-5 h-5" />
                        <span className="text-sm font-medium">Currently Generating</span>
                    </div>
                    <div className="text-3xl font-bold relative z-10">{generatingProjects}</div>
                </div>
            </div>

            {/* Recent Projects */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)]">Recent Projects</h2>
                    <Link href="/projects" className="text-sm text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
                        View All <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {projects.length === 0 ? (
                    <div className="glass-panel rounded-2xl p-8 border border-dashed border-[var(--border-primary)] text-center">
                        <FolderKanban className="w-10 h-10 text-[var(--text-tertiary)] mx-auto mb-3" />
                        <p className="text-[var(--text-secondary)]">No projects yet. Create your first software plan!</p>
                        <Link href="/projects/new" className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-xl text-sm font-medium transition-colors">
                            <Plus className="w-4 h-4" /> Create Project
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recentProjects.map((project) => (
                            <Link
                                key={project.id}
                                href={`/projects/${project.id}`}
                                className="group glass-panel rounded-2xl p-6 border border-[var(--border-primary)] card-hover flex flex-col h-full"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`px-2.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${getStatusColor(project.status)}`}>
                                        {project.status === "generating" ? (
                                            <div className="flex items-center gap-1.5">
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                                </span>
                                                {project.status}
                                            </div>
                                        ) : (
                                            project.status
                                        )}
                                    </div>
                                    <span className="text-xs text-[var(--text-tertiary)] flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5" />
                                        {formatRelativeTime(project.updated_at)}
                                    </span>
                                </div>

                                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-brand-600 transition-colors line-clamp-1">
                                    {project.title}
                                </h3>

                                <p className="text-sm text-[var(--text-secondary)] line-clamp-3 mb-6 flex-1">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-[var(--border-primary)]">
                                    <span className="px-2 py-1 rounded-md bg-[var(--bg-tertiary)] text-[var(--text-secondary)] text-xs font-medium">
                                        {project.category}
                                    </span>
                                    {(project.preferred_stack || []).slice(0, 2).map((tech) => (
                                        <span key={tech} className="px-2 py-1 rounded-md bg-[var(--bg-tertiary)] text-[var(--text-secondary)] text-xs font-medium border border-[var(--border-secondary)]">
                                            {tech}
                                        </span>
                                    ))}
                                    {(project.preferred_stack || []).length > 2 && (
                                        <span className="px-2 py-1 rounded-md bg-[var(--bg-tertiary)] text-[var(--text-secondary)] text-xs font-medium border border-[var(--border-secondary)]">
                                            +{(project.preferred_stack || []).length - 2}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Quick Actions / Tips */}
            <div className="mt-12 glass-panel rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-brand-200 dark:border-brand-900 overflow-hidden relative">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex-1 relative z-10">
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-brand-500" />
                        Tip: Writing Better Prompts
                    </h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                        For the best architecture and PRD outputs, include specific details about your target audience, crucial integrations (e.g., Stripe, OpenAI), and any compliance requirements (like HIPAA or SOC2) in your raw idea.
                    </p>
                </div>
                <Link
                    href="/projects/new"
                    className="flex-shrink-0 px-6 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-secondary)] hover:border-brand-400 text-sm font-medium transition-colors shadow-sm flex items-center gap-2 relative z-10"
                >
                    Try it now
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
