"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    FolderKanban,
    Plus,
    Settings,
    Sparkles,
    ChevronLeft,
    ChevronRight,
    Layers3,
    BookOpen,
    Zap,
} from "lucide-react";

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Projects", href: "/projects", icon: FolderKanban },
    { label: "New Project", href: "/projects/new", icon: Plus },
    { label: "Templates", href: "/templates", icon: Layers3 },
    { label: "Docs", href: "/docs", icon: BookOpen },
];

const bottomItems = [
    { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
    const pathname = usePathname();

    return (
        <motion.aside
            initial={false}
            animate={{ width: collapsed ? 72 : 260 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={cn(
                "fixed left-0 top-0 z-40 h-screen flex flex-col border-r",
                "bg-[var(--bg-primary)] border-[var(--border-primary)]"
            )}
        >
            {/* Logo */}
            <div className="flex items-center h-16 px-4 border-b border-[var(--border-primary)]">
                <Link href="/" className="flex items-center gap-3 min-w-0">
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                exit={{ opacity: 0, width: 0 }}
                                transition={{ duration: 0.15 }}
                                className="overflow-hidden whitespace-nowrap"
                            >
                                <span className="text-base font-bold text-[var(--text-primary)]">
                                    AI Architect
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto custom-scrollbar">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                                isActive
                                    ? "bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-300 shadow-sm"
                                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                            )}
                        >
                            <Icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-brand-600 dark:text-brand-400")} />
                            <AnimatePresence>
                                {!collapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: "auto" }}
                                        exit={{ opacity: 0, width: 0 }}
                                        transition={{ duration: 0.15 }}
                                        className="overflow-hidden whitespace-nowrap"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>
                    );
                })}
            </nav>

            {/* Upgrade Banner */}
            <AnimatePresence>
                {!collapsed && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mx-3 mb-3 overflow-hidden"
                    >
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-brand-500/10 to-brand-600/5 border border-brand-200/50 dark:border-brand-800/30">
                            <div className="flex items-center gap-2 mb-2">
                                <Zap className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                                <span className="text-xs font-semibold text-brand-700 dark:text-brand-300">
                                    Pro Plan
                                </span>
                            </div>
                            <p className="text-xs text-[var(--text-secondary)] mb-3">
                                Unlimited projects & priority AI generation
                            </p>
                            <button className="w-full py-2 px-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-medium transition-colors">
                                Upgrade Now
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom nav */}
            <div className="border-t border-[var(--border-primary)] py-3 px-3 space-y-1">
                {bottomItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                                isActive
                                    ? "bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-300"
                                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                            )}
                        >
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            <AnimatePresence>
                                {!collapsed && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="overflow-hidden whitespace-nowrap"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>
                    );
                })}
            </div>

            {/* Collapse toggle */}
            <button
                onClick={onToggle}
                className={cn(
                    "absolute top-20 -right-3 w-6 h-6 rounded-full border bg-[var(--bg-primary)] border-[var(--border-primary)]",
                    "flex items-center justify-center shadow-sm hover:shadow-md transition-shadow",
                    "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                )}
            >
                {collapsed ? (
                    <ChevronRight className="w-3.5 h-3.5" />
                ) : (
                    <ChevronLeft className="w-3.5 h-3.5" />
                )}
            </button>
        </motion.aside>
    );
}
