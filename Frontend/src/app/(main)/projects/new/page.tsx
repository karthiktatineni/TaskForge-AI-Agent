"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Settings2, Info, Loader2, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { mockUser } from "@/data/mock-data";

import { generateProject } from "@/lib/api";

export default function NewProjectPage() {
    const router = useRouter();
    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationStep, setGenerationStep] = useState(0);
    const [showAdvanced, setShowAdvanced] = useState(false);

    // Form fields
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Software");
    const [timeline, setTimeline] = useState("3 months");
    const [stack, setStack] = useState("");

    const steps = [
        "Analyzing requirement depth...",
        "Drafting PRD & user stories...",
        "Designing system architecture...",
        "Structuring database schema...",
        "Mapping API endpoints...",
        "Planning UI/UX flows...",
        "Breaking down into tasks...",
        "Finalizing project plan..."
    ];

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setIsGenerating(true);

        // Progress bar simulation (purely visual UX)
        const progressInterval = setInterval(() => {
            setGenerationStep(prev => {
                if (prev < steps.length - 1) return prev + 1;
                return prev;
            });
        }, 1500);

        try {
            // Call the real actual API
            const response = await generateProject({
                prompt: prompt,
                name: title,
                category: category,
                timeline: timeline,
                preferred_stack: stack ? stack.split(",").map(s => s.trim()) : undefined
            });

            clearInterval(progressInterval);
            setGenerationStep(steps.length); // Full progress

            // Wait a beat before redirecting to their new project workspace
            setTimeout(() => {
                router.push(`/projects/${response.project_id}`);
            }, 1000);

        } catch (error) {
            console.error("Failed to generate project", error);
            alert("Failed to connect to the backend AI Architecture engine.");
            clearInterval(progressInterval);
            setIsGenerating(false);
            setGenerationStep(0);
        }
    };

    const handleExampleClick = (text: string) => {
        setPrompt(text);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in relative">
            {/* Header */}
            <div className="text-center pb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-md mb-6">
                    <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight mb-3">
                    Architect a New Project
                </h1>
                <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
                    Describe your software idea in plain English. The more detail you provide, the better the architecture plan will be.
                </p>
            </div>

            {/* Main Input Area */}
            {isGenerating ? (
                <div className="glass-panel p-8 rounded-3xl border border-[var(--border-primary)] shadow-large mt-8 text-center min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent shimmer-bg" />

                    <div className="relative z-10 flex flex-col items-center max-w-md mx-auto w-full">
                        <div className="relative w-20 h-20 mb-8">
                            <div className="absolute inset-0 border-4 border-[var(--border-primary)] rounded-full" />
                            <div className="absolute inset-0 border-4 border-brand-500 rounded-full border-t-transparent animate-spin" />
                            <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-brand-500 animate-pulse-soft" />
                        </div>

                        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                            Generating your project
                        </h2>

                        <div className="w-full bg-[var(--bg-tertiary)] h-2 rounded-full overflow-hidden mb-6 mt-4">
                            <div
                                className="h-full bg-brand-500 transition-all duration-500 ease-out"
                                style={{ width: `${Math.max(5, (generationStep / steps.length) * 100)}%` }}
                            />
                        </div>

                        <div className="space-y-4 w-full text-left">
                            {steps.slice(0, Math.max(1, generationStep + 1)).map((step, idx) => (
                                <div
                                    key={idx}
                                    className={`flex items-center gap-3 text-sm ${idx < generationStep
                                        ? "text-[var(--text-primary)] font-medium"
                                        : idx === generationStep
                                            ? "text-brand-600 dark:text-brand-400 font-medium animate-pulse"
                                            : "text-[var(--text-tertiary)] opacity-50 hidden"
                                        }`}
                                >
                                    {idx < generationStep ? (
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                    ) : (
                                        <Loader2 className="w-5 h-5 animate-spin flex-shrink-0" />
                                    )}
                                    <span>{step}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="glass-panel p-1 rounded-3xl border border-[var(--border-primary)] shadow-large bg-[var(--bg-elevated)] transition-all focus-within:ring-2 focus-within:ring-brand-500/30 focus-within:border-brand-400">
                    <div className="p-4 sm:p-6 pb-2">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="I want to build a fitness tracking app that connects to Apple Health and gives AI personalized workout recommendations..."
                            className="w-full h-40 sm:h-48 resize-none bg-transparent text-[var(--text-primary)] text-lg placeholder:text-[var(--text-tertiary)] outline-none custom-scrollbar"
                            autoFocus
                        />
                    </div>

                    {/* Advanced Options Toggle */}
                    <div className="px-4 sm:px-6">
                        <button
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-2 font-medium transition-colors"
                        >
                            <Settings2 className="w-4 h-4" />
                            {showAdvanced ? "Hide advanced options" : "Show advanced options"}
                            {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                    </div>

                    {/* Advanced Forms */}
                    {showAdvanced && (
                        <div className="px-4 sm:px-6 py-4 border-t border-[var(--border-primary)] grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slide-down">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Project Name (Optional)</label>
                                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Auto-generated if empty" className="w-full px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-sm focus:outline-none focus:border-brand-400" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Category</label>
                                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-sm focus:outline-none focus:border-brand-400">
                                    <option>Software</option>
                                    <option>SaaS</option>
                                    <option>E-commerce</option>
                                    <option>Mobile App</option>
                                    <option>Internal Tool</option>
                                    <option>Marketplace</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Timeline</label>
                                <select value={timeline} onChange={e => setTimeline(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-sm focus:outline-none focus:border-brand-400">
                                    <option>1 month</option>
                                    <option>3 months</option>
                                    <option>6 months</option>
                                    <option>12+ months</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Preferred Stack (CSV)</label>
                                <input type="text" value={stack} onChange={e => setStack(e.target.value)} placeholder="e.g. Next.js, Postgres, Redis" className="w-full px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-sm focus:outline-none focus:border-brand-400" />
                            </div>
                        </div>
                    )}

                    {/* Bottom Action Bar */}
                    <div className="p-3 sm:p-4 bg-[var(--bg-secondary)] rounded-b-[1.4rem] border-t border-[var(--border-primary)] flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)] px-2">
                            <Info className="w-4 h-4" />
                            <span>Consumes 1 AI generation credit</span>
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={!prompt.trim() || isGenerating}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:hover:bg-brand-600 text-white font-medium transition-all shadow-sm"
                        >
                            <Sparkles className="w-4 h-4" />
                            Generate Project
                        </button>
                    </div>
                </div>
            )
            }

            {/* Example Prompts */}
            {
                !isGenerating && (
                    <div className="pt-4">
                        <p className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-4 px-2">Need Inspiration? Try an example:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <button
                                onClick={() => handleExampleClick("Build a fully featured SaaS application for remote team standups. It needs async video updates, Slack integration, a manager dashboard for team sentiment, and Stripe billing for a freemium model.")}
                                className="text-left p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-primary)] hover:border-brand-400/50 hover:bg-[var(--bg-secondary)] transition-all group"
                            >
                                <span className="block text-sm font-medium text-[var(--text-primary)] mb-1 group-hover:text-brand-600 transition-colors">Async Standup SaaS</span>
                                <span className="block text-xs text-[var(--text-secondary)] line-clamp-2">Video updates, Slack integration, manager sentiment dashboard...</span>
                            </button>
                            <button
                                onClick={() => handleExampleClick("Create a marketplace for graphic designers. Needs portfolio pages, messaging, secure file delivery, dispute resolution, and escrow payments. Target users are global freelancers and small businesses.")}
                                className="text-left p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-primary)] hover:border-emerald-400/50 hover:bg-[var(--bg-secondary)] transition-all group"
                            >
                                <span className="block text-sm font-medium text-[var(--text-primary)] mb-1 group-hover:text-emerald-600 transition-colors">Freelancer Marketplace</span>
                                <span className="block text-xs text-[var(--text-secondary)] line-clamp-2">Portfolio pages, secure delivery, escrow payments...</span>
                            </button>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
