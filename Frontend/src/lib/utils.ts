import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateString);
}

export function getStatusColor(status: string): string {
    const colors: Record<string, string> = {
        draft: "bg-surface-200 text-surface-700 dark:bg-surface-800 dark:text-surface-400",
        generating: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
        completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
        archived: "bg-surface-200 text-surface-500 dark:bg-surface-800 dark:text-surface-500",
    };
    return colors[status] || colors.draft;
}

export function getPriorityColor(priority: string): string {
    const colors: Record<string, string> = {
        critical: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        high: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
        medium: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        low: "bg-surface-200 text-surface-600 dark:bg-surface-800 dark:text-surface-400",
    };
    return colors[priority] || colors.medium;
}

export function getDifficultyColor(difficulty: string): string {
    const colors: Record<string, string> = {
        easy: "text-emerald-600 dark:text-emerald-400",
        medium: "text-blue-600 dark:text-blue-400",
        hard: "text-orange-600 dark:text-orange-400",
        complex: "text-red-600 dark:text-red-400",
    };
    return colors[difficulty] || colors.medium;
}

export function truncate(str: string, length: number): string {
    if (str.length <= length) return str;
    return str.slice(0, length) + "...";
}

export function generateId(): string {
    return Math.random().toString(36).substring(2, 10);
}

export function getCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
        "frontend": "🎨",
        "backend": "⚙️",
        "devops": "🚀",
        "design": "✏️",
        "testing": "🧪",
        "documentation": "📄",
    };
    return icons[category] || "📋";
}
