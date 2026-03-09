"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import {
    Search,
    Sun,
    Moon,
    Bell,
    Command,
    ChevronDown,
    LogOut,
    User,
    Settings,
} from "lucide-react";
import { mockUser } from "@/data/mock-data";

interface TopBarProps {
    sidebarCollapsed: boolean;
}

export default function TopBar({ sidebarCollapsed }: TopBarProps) {
    const { theme, toggleTheme } = useTheme();
    const [profileOpen, setProfileOpen] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);

    return (
        <header
            className={cn(
                "fixed top-0 right-0 z-30 h-16 flex items-center justify-between px-6 border-b",
                "bg-[var(--bg-primary)]/80 backdrop-blur-xl border-[var(--border-primary)]",
                "transition-all duration-200",
                sidebarCollapsed ? "left-[72px]" : "left-[260px]"
            )}
        >
            {/* Search */}
            <div className="flex items-center gap-4 flex-1 max-w-xl">
                <div
                    className={cn(
                        "flex items-center gap-2 px-3.5 py-2 rounded-xl border w-full max-w-md transition-all duration-200",
                        searchFocused
                            ? "border-brand-400 bg-[var(--bg-primary)] shadow-glow"
                            : "border-[var(--border-primary)] bg-[var(--bg-secondary)]"
                    )}
                >
                    <Search className="w-4 h-4 text-[var(--text-tertiary)]" />
                    <input
                        type="text"
                        placeholder="Search projects, outputs, tasks..."
                        className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none"
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                    />
                    <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] text-2xs font-mono">
                        <Command className="w-2.5 h-2.5" />K
                    </kbd>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                {/* Theme toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-all"
                    aria-label="Toggle theme"
                >
                    {theme === "dark" ? (
                        <Sun className="w-5 h-5" />
                    ) : (
                        <Moon className="w-5 h-5" />
                    )}
                </button>

                {/* Notifications */}
                <button className="relative p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-all">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 ring-2 ring-[var(--bg-primary)]" />
                </button>

                {/* Divider */}
                <div className="w-px h-6 bg-[var(--border-primary)] mx-1" />

                {/* Profile */}
                <div className="relative">
                    <button
                        onClick={() => setProfileOpen(!profileOpen)}
                        className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-[var(--bg-tertiary)] transition-all"
                    >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">
                                {mockUser.name.charAt(0)}
                            </span>
                        </div>
                        <div className="hidden sm:block text-left">
                            <p className="text-sm font-medium text-[var(--text-primary)] leading-tight">
                                {mockUser.name}
                            </p>
                            <p className="text-2xs text-[var(--text-tertiary)] capitalize">
                                {mockUser.plan} Plan
                            </p>
                        </div>
                        <ChevronDown className="w-3.5 h-3.5 text-[var(--text-tertiary)] hidden sm:block" />
                    </button>

                    {profileOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border bg-[var(--bg-primary)] border-[var(--border-primary)] shadow-large z-50 py-1.5 overflow-hidden">
                                <div className="px-4 py-3 border-b border-[var(--border-primary)]">
                                    <p className="text-sm font-medium text-[var(--text-primary)]">
                                        {mockUser.name}
                                    </p>
                                    <p className="text-xs text-[var(--text-tertiary)]">
                                        {mockUser.email}
                                    </p>
                                </div>
                                <div className="py-1">
                                    <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors">
                                        <User className="w-4 h-4" />
                                        Admin Profile
                                    </button>
                                    <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors">
                                        <Settings className="w-4 h-4" />
                                        Preferences
                                    </button>
                                </div>
                                <div className="border-t border-[var(--border-primary)] py-1.5 px-4">
                                    <p className="text-[10px] text-[var(--text-tertiary)] text-center">
                                        AI Project Architect v1.0
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
