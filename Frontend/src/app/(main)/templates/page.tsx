"use client";

import React, { useState } from "react";
import {
    LayoutTemplate, Search, Filter,
    Monitor, Tablet, Smartphone,
    Sparkles, ArrowRight, Eye,
    Cpu, Globe, Lock, ShoppingCart,
    MessageSquare, BarChart3, Palette, FileText
} from "lucide-react";

interface Template {
    id: string;
    title: string;
    description: string;
    category: "Landing" | "Dashboard" | "E-commerce" | "Saas" | "Portfolio" | "Mobile";
    complexity: "Simple" | "Medium" | "Advanced";
    icon: any;
    color: string;
}

export default function TemplatesPage() {
    const TEMPLATES: Template[] = [
        { id: "1", title: "Modern SaaS Landing", description: "Clean, high-conversion landing page with glassmorphism.", category: "Landing", complexity: "Simple", icon: Sparkles, color: "text-blue-500" },
        { id: "2", title: "AI Analytics Dashboard", description: "Dark mode data visualization for AI monitoring.", category: "Dashboard", complexity: "Advanced", icon: BarChart3, color: "text-purple-500" },
        { id: "3", title: "Neo-Brutalism E-com", description: "Bold colors and thick shadows for a unique storefront.", category: "E-commerce", complexity: "Medium", icon: ShoppingCart, color: "text-yellow-500" },
        { id: "4", title: "Minimalist Portfolio", description: "Focus on typography and whitespace for creatives.", category: "Portfolio", complexity: "Simple", icon: Palette, color: "text-rose-500" },
        { id: "5", title: "Fintech Mobile App", description: "iOS style wallet and transaction management.", category: "Mobile", complexity: "Medium", icon: Smartphone, color: "text-emerald-500" },
        { id: "6", title: "Dev Documentation", description: "Multi-layered sidebar and interactive code blocks.", category: "Saas", complexity: "Medium", icon: Cpu, color: "text-indigo-500" },
        { id: "7", title: "Global CDN Edge Console", description: "Map-centric UI for edge network management.", category: "Dashboard", complexity: "Advanced", icon: Globe, color: "text-cyan-500" },
        { id: "8", title: "Zero Trust Admin", description: "Security-first interface with complex permission grids.", category: "Dashboard", complexity: "Advanced", icon: Lock, color: "text-orange-500" },
        { id: "9", title: "Customer Chat Widget", description: "Floating UI with rich interactive message components.", category: "Mobile", complexity: "Simple", icon: MessageSquare, color: "text-blue-400" },
        { id: "10", title: "Crypto Exchange Terminal", description: "High-density trading interface with live charts.", category: "Dashboard", complexity: "Advanced", icon: BarChart3, color: "text-green-500" },
        { id: "11", title: "Productivity Kanban", description: "Drag and drop board with task detail overlays.", category: "Dashboard", complexity: "Medium", icon: LayoutTemplate, color: "text-amber-500" },
        { id: "12", title: "Blog Engine Headless", description: "Content management UI for headless CMS users.", category: "Saas", complexity: "Medium", icon: FileText, color: "text-blue-600" },
        { id: "13", title: "Fitness Tracking Mobile", description: "Activity rings and health data visualizations.", category: "Mobile", complexity: "Medium", icon: Smartphone, color: "text-red-500" },
        { id: "14", title: "Luxury Real Estate", description: "Image-heavy listings with map-integrated search.", category: "Landing", complexity: "Medium", icon: Globe, color: "text-stone-500" },
        { id: "15", title: "Education LMS Console", description: "Student progress charts and course management.", category: "Dashboard", complexity: "Medium", icon: Monitor, color: "text-indigo-400" },
        { id: "16", title: "Booking Engine", description: "Calendar-centric UI for hotels and scheduling.", category: "Saas", complexity: "Advanced", icon: LayoutTemplate, color: "text-blue-700" },
        { id: "17", title: "Inventory Management", description: "Barcoding UI and stock level alerts system.", category: "Dashboard", complexity: "Advanced", icon: ShoppingCart, color: "text-brown-500" },
        { id: "18", title: "Messaging Desktop App", description: "Sidebar navigation with threaded conversation UI.", category: "Dashboard", complexity: "Medium", icon: MessageSquare, color: "text-violet-500" },
        { id: "19", title: "Portfolio for Architects", description: "Wide-screen masonry layout for large imagery.", category: "Portfolio", complexity: "Simple", icon: Palette, color: "text-zinc-400" },
        { id: "20", title: "SaaS Billing Dashboard", description: "Subscription management and invoice generation.", category: "Dashboard", complexity: "Medium", icon: LayoutTemplate, color: "text-teal-500" },
        { id: "21", title: "Social Media Feed App", description: "Infinite scroll with complex interaction patterns.", category: "Mobile", complexity: "Advanced", icon: Smartphone, color: "text-sky-500" },
        { id: "22", title: "Health Portal", description: "Patient records and appointment scheduling.", category: "Saas", complexity: "Advanced", icon: LayoutTemplate, color: "text-emerald-600" },
        { id: "23", title: "Code Playground", description: "IDE-like interface with multi-file support.", category: "Saas", complexity: "Advanced", icon: Cpu, color: "text-slate-400" },
        { id: "24", title: "Event Ticketing", description: "Seat selection map and digital ticket wallet.", category: "Landing", complexity: "Advanced", icon: Globe, color: "text-fuchsia-500" },
        { id: "25", title: "Travel Planner App", description: "Itinerary builder with map and budget tools.", category: "Mobile", complexity: "Medium", icon: Smartphone, color: "text-orange-400" },
        { id: "26", title: "Marketing CRM", description: "Email template builder and lead tracking.", category: "Saas", complexity: "Advanced", icon: LayoutTemplate, color: "text-blue-800" },
        { id: "27", title: "Restaurant QR Menu", description: "Lightweight mobile-first ordering interface.", category: "Mobile", complexity: "Simple", icon: Smartphone, color: "text-yellow-600" },
        { id: "28", title: "HR Portal", description: "Employee directory and leave management.", category: "Dashboard", complexity: "Medium", icon: Monitor, color: "text-blue-300" },
        { id: "29", title: "Video Streaming Hub", description: "Grid layout with autoplay hover previews.", category: "Landing", complexity: "Advanced", icon: Palette, color: "text-red-600" },
        { id: "30", title: "Weather Forecast App", description: "Dynamic background and interactive charts.", category: "Mobile", complexity: "Simple", icon: Smartphone, color: "text-sky-300" },
    ];

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const filteredTemplates = TEMPLATES.filter(t => {
        const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || t.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ["All", "Landing", "Dashboard", "E-commerce", "Saas", "Portfolio", "Mobile"];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black mb-3 text-[var(--text-primary)] tracking-tight">
                        Design <span className="text-brand-500">Templates</span>
                    </h1>
                    <p className="text-[var(--text-secondary)] text-lg max-w-xl">
                        Select a battle-tested blueprint to jumpstart your project layout and UI/UX.
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-10">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
                    <input
                        type="text"
                        placeholder="Search 30+ templates..."
                        className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] focus:border-brand-500 outline-none transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === cat
                                ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20"
                                : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-primary)] hover:border-[var(--text-tertiary)]"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                    <div key={template.id} className="group glass-panel rounded-3xl border border-[var(--border-primary)] overflow-hidden hover:border-brand-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-500/5 flex flex-col">
                        <div className="p-8 pb-4">
                            <div className={`w-12 h-12 rounded-2xl bg-[var(--bg-tertiary)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <template.icon className={`w-6 h-6 ${template.color}`} />
                            </div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-[var(--text-primary)]">{template.title}</h3>
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${template.complexity === 'Advanced' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30' :
                                    template.complexity === 'Medium' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30' :
                                        'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30'
                                    }`}>
                                    {template.complexity}
                                </span>
                            </div>
                            <p className="text-[var(--text-secondary)] text-sm line-clamp-2 leading-relaxed h-10">
                                {template.description}
                            </p>
                        </div>

                        <div className="mt-auto p-6 bg-[var(--bg-secondary)]/50 border-t border-[var(--border-primary)] flex justify-between items-center group-hover:bg-brand-500/5 transition-colors">
                            <div className="flex items-center gap-1.5">
                                <span className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">{template.category}</span>
                            </div>
                            <button className="flex items-center gap-1.5 text-sm font-bold text-brand-500 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
                                Use This <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredTemplates.length === 0 && (
                <div className="py-24 text-center">
                    <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-6">
                        <Search className="w-6 h-6 text-[var(--text-tertiary)]" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">No templates found</h2>
                    <p className="text-[var(--text-secondary)]">Try adjusting your search or category filters.</p>
                </div>
            )}
        </div>
    );
}
