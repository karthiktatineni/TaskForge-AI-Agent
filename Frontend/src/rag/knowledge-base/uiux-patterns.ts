/**
 * Comprehensive UI/UX Design Knowledge Base
 * Contains curated design patterns, principles, component specifications,
 * and best practices for feeding into RAG-based AI generation.
 */

import { KnowledgeDocument } from "../types";

export const uiuxPatterns: KnowledgeDocument[] = [
    // ─────────────────────────────────────────────
    // DESIGN SYSTEMS & FOUNDATIONS
    // ─────────────────────────────────────────────
    {
        id: "uiux-001",
        category: "design-systems",
        subcategory: "foundations",
        title: "Design System Architecture",
        content: `A production-grade design system must include these layers:

1. DESIGN TOKENS (Atomic Level):
   - Color palette: Primary (brand), Secondary, Neutral, Semantic (success/warning/error/info)
   - Typography scale: Display (48-72px), Heading (24-36px), Body (14-16px), Caption (11-12px)
   - Spacing scale: 4px base unit → 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128
   - Border radius: none (0), sm (4px), md (8px), lg (12px), xl (16px), full (9999px)
   - Shadows: elevation-0 (none), elevation-1 (subtle), elevation-2 (card), elevation-3 (dropdown), elevation-4 (modal)
   - Z-index scale: base (0), dropdown (1000), sticky (1100), overlay (1200), modal (1300), popover (1400), toast (1500)
   
2. COMPONENT LIBRARY:
   - Primitives: Button, Input, Select, Checkbox, Radio, Switch, Slider, Badge, Tag
   - Composite: Card, Modal, Drawer, Dropdown, Popover, Tooltip, Toast, Alert
   - Layout: Container, Grid, Stack, Divider, Spacer
   - Navigation: Tabs, Breadcrumb, Pagination, Sidebar, Navbar, CommandPalette
   - Data Display: Table, List, Avatar, Stat, Timeline, Code Block
   - Feedback: Spinner, Skeleton, Progress, EmptyState, ErrorBoundary
   - Forms: Form, FormField, FormLabel, FormMessage, FormDescription
   
3. PATTERNS:
   - Authentication flows (sign in, sign up, forgot password, MFA)
   - Dashboard layouts (sidebar + topbar + content)
   - Data tables with sorting, filtering, pagination
   - Form wizards with step indicators
   - Settings pages with sections and toggles
   - Search with filters, facets, and results
   - Notification systems (in-app, toast, email preferences)`,
        tags: ["design-system", "tokens", "components", "architecture"],
        relevance_score: 1.0,
        source: "Industry best practices - Radix UI, shadcn/ui, Chakra UI, Material Design",
    },

    {
        id: "uiux-002",
        category: "design-systems",
        subcategory: "color-theory",
        title: "Color System Design for SaaS Applications",
        content: `Professional SaaS color system guidelines:

LIGHT THEME PALETTE:
- Background Primary: #FFFFFF (pure white for main content)
- Background Secondary: #F8F9FC (subtle cool gray for sections)
- Background Tertiary: #F1F3F9 (input backgrounds, hover states)
- Surface Elevated: #FFFFFF with shadow (cards, modals)
- Text Primary: #1A1F2E (near-black, 95% readable)
- Text Secondary: #555F78 (descriptions, labels)
- Text Tertiary: #8B95AF (placeholders, disabled)
- Border Primary: #E8EBF2 (subtle separation)
- Border Secondary: #D5DAE6 (stronger separation)

DARK THEME PALETTE:
- Background Primary: #0F1117 (deep dark, not pure black)
- Background Secondary: #161A26 (slightly elevated)
- Background Tertiary: #1C2033 (interactive backgrounds)
- Surface Elevated: #1C2033 with subtle border
- Text Primary: #E8EBF2 (off-white, reduces eye strain)
- Text Secondary: #B0B8CC (muted descriptions)
- Text Tertiary: #6B7694 (very subdued)
- Border Primary: #282E3E (subtle in dark)
- Border Secondary: #3D4559 (visible borders)

SEMANTIC COLORS:
- Success: #40C057 (green - confirmations, positive states)
- Warning: #FAB005 (amber - caution states)
- Error/Danger: #FA5252 (red - errors, destructive actions)
- Info: #339AF0 (blue - informational states)

BRAND/ACCENT COLORS:
- For productivity apps: Blue (#4263EB → #748FFC range) conveys trust and reliability
- For creative apps: Purple (#7950F2 → #9775FA) conveys creativity
- For health apps: Teal/Green (#12B886 → #38D9A9) conveys wellness
- For finance apps: Deep Blue/Navy (#364FC7 → #5C7CFA) conveys security

COLOR ACCESSIBILITY:
- Minimum contrast ratio 4.5:1 for normal text (WCAG AA)
- Minimum contrast ratio 3:1 for large text and UI components
- Never rely solely on color to convey information
- Provide text labels alongside color-coded statuses`,
        tags: ["color", "palette", "dark-mode", "accessibility", "theming"],
        relevance_score: 0.95,
        source: "WCAG 2.1 Guidelines, Material Design 3, Apple HIG",
    },

    {
        id: "uiux-003",
        category: "design-systems",
        subcategory: "typography",
        title: "Typography System for Web Applications",
        content: `Professional typography system:

FONT SELECTIONS BY APP TYPE:
- SaaS/Productivity: Inter, SF Pro, Helvetica Neue (clean, highly readable)
- Developer Tools: JetBrains Mono (code), Inter (UI)
- Creative/Design: Outfit, Plus Jakarta Sans (modern, distinctive)
- Enterprise: IBM Plex Sans, Noto Sans (universal, professional)
- Marketing/Landing: Cal Sans, Clash Display (headlines), Inter (body)

TYPOGRAPHY SCALE (using 1.25 modular scale):
- Display XL: 72px / 80px line-height / -1.5% letter-spacing / 800 weight
- Display: 48px / 56px / -1.5% / 800
- H1: 36px / 44px / -1% / 700
- H2: 30px / 38px / -0.5% / 700
- H3: 24px / 32px / -0.25% / 600
- H4: 20px / 28px / 0% / 600
- H5: 16px / 24px / 0% / 600
- Body Large: 18px / 28px / 0% / 400
- Body: 16px / 24px / 0% / 400 (base)
- Body Small: 14px / 20px / 0% / 400
- Caption: 12px / 16px / 0.5% / 500
- Overline: 11px / 16px / 5% / 600 (uppercase)

TYPOGRAPHY BEST PRACTICES:
- Max line width: 65-75 characters for body text
- Paragraph spacing: 1.5x line height
- Use font weight contrast (not size) for subtle hierarchy
- Heading + description pairs: different weight + color, not just size
- Monospace for: code, data values, timestamps, IDs
- Tabular numbers for: tables, statistics, counters

RESPONSIVE TYPOGRAPHY:
- Mobile: Reduce Display/H1 by 30-40%, keep body size
- Tablet: Reduce Display/H1 by 15-20%
- Use clamp() for fluid scaling: clamp(1.5rem, 4vw, 3rem)`,
        tags: ["typography", "fonts", "scale", "responsive", "hierarchy"],
        relevance_score: 0.95,
        source: "Google Fonts, Type-Scale, Material Design Typography",
    },

    // ─────────────────────────────────────────────
    // PAGE LAYOUT PATTERNS
    // ─────────────────────────────────────────────
    {
        id: "uiux-010",
        category: "layout-patterns",
        subcategory: "dashboard",
        title: "Dashboard Layout Patterns",
        content: `SaaS Dashboard Layout Best Practices:

STANDARD DASHBOARD LAYOUT:
- Fixed left sidebar (240-280px, collapsible to 64-72px)
- Fixed top bar (56-64px height)
- Scrollable main content area
- Optional right panel for details/actions (320-400px)

SIDEBAR PATTERNS:
1. Full Sidebar (Default):
   - Logo at top
   - Primary navigation (icon + label)
   - Grouped sections with dividers
   - User/settings at bottom
   - Collapse button (toggle icon + tooltip)
   
2. Icon-Only Sidebar:
   - 64px width
   - Icons with tooltips on hover
   - Expandable on hover or click
   
3. Multi-Level Sidebar:
   - Top-level with expand/collapse
   - Nested items with indentation
   - Active state: background highlight + left border indicator

TOP BAR COMPONENTS:
- Breadcrumbs / Page title (left)
- Global search with ⌘K shortcut (center-left)
- Theme toggle (right)
- Notifications bell with badge (right)
- User avatar + dropdown (right)

CONTENT AREA LAYOUTS:
1. Card Grid: 2-4 column grid of stat/summary cards
2. Split Panel: List on left, detail on right
3. Full-Width: Single column for focused content
4. Tabbed Content: Tabs above content area
5. Nested Navigation: Sub-sidebar within content area

RESPONSIVE BEHAVIOR:
- Desktop (1280px+): Full sidebar + content
- Tablet (768-1279px): Collapsed sidebar, overlay menu
- Mobile (<768px): Bottom navigation bar, hamburger menu for sidebar`,
        tags: ["dashboard", "layout", "sidebar", "topbar", "responsive"],
        relevance_score: 1.0,
        source: "Linear, Notion, Vercel Dashboard, Stripe Dashboard",
    },

    {
        id: "uiux-011",
        category: "layout-patterns",
        subcategory: "landing-page",
        title: "SaaS Landing Page Structure",
        content: `High-converting SaaS landing page structure:

SECTION ORDER (top to bottom):
1. NAVIGATION BAR:
   - Logo (left)
   - Navigation links (center): Product, Features, Pricing, Docs
   - CTA buttons (right): Sign In (ghost), Get Started (primary)
   - Sticky on scroll with backdrop blur

2. HERO SECTION:
   - Small badge/pill above headline ("New: Feature X" or "Trusted by 10K+ teams")
   - Main headline: Clear, specific value prop (max 10 words)
   - Sub-headline: How it works in one sentence (max 25 words)
   - Primary CTA button: "Start Free Trial" / "Get Started Free"
   - Secondary action: "Watch Demo" / "See How It Works"
   - Trust indicators: "No credit card required • Set up in 2 minutes"
   - Hero visual: Product screenshot, animated demo, or abstract illustration
   
3. SOCIAL PROOF BAR:
   - "Trusted by teams at" + 4-6 company logos
   - Or: "Join 10,000+ teams already using..."
   
4. FEATURE OVERVIEW:
   - 3-4 feature cards in a grid
   - Each: Icon + Title + Short description
   - Alternating: text-left/visual-right, then text-right/visual-left
   
5. HOW IT WORKS:
   - 3-step numbered process
   - Step 1: Input → Step 2: AI Processing → Step 3: Output
   - Visual for each step
   
6. DETAILED FEATURES:
   - Tabbed or accordion sections
   - Each feature: Screenshot + bullet points + micro-demo
   
7. TESTIMONIALS:
   - 2-3 customer quotes with photos, names, titles, companies
   - Star ratings if applicable
   - Case study links
   
8. PRICING (if applicable):
   - 2-3 tier cards (Free, Pro, Team/Enterprise)
   - Highlight recommended plan
   - Feature comparison table below
   - FAQ accordion
   
9. FINAL CTA:
   - Reiterate value proposition
   - Large CTA button
   - Trust indicators
   
10. FOOTER:
    - 4-column layout: Product, Company, Resources, Legal
    - Social media links
    - Copyright + legal links
    - Newsletter signup

VISUAL DESIGN:
- Use gradient mesh backgrounds or subtle grid patterns in hero
- Floating elements with parallax for depth
- Glassmorphism for feature cards
- Animated counters for statistics
- Smooth scroll animations (reveal on scroll)
- Micro-interactions on hover states`,
        tags: ["landing-page", "conversion", "hero", "cta", "marketing"],
        relevance_score: 0.95,
        source: "Vercel, Linear, Notion, Stripe landing pages",
    },

    {
        id: "uiux-012",
        category: "layout-patterns",
        subcategory: "workspace",
        title: "Workspace/Editor Layout Patterns",
        content: `Professional workspace and document editor layouts:

THREE-PANEL WORKSPACE:
Left Panel (220-280px):
  - Document/section navigation
  - Tree view with expand/collapse
  - Search within sections
  - Active section highlight
  - Drag-to-reorder support
  
Main Content Panel (flexible):
  - Content header with title + actions
  - Rich content area with proper typography
  - Inline editing capabilities
  - Section anchors for smooth scrolling
  - Auto-save indicator
  
Right Panel (300-360px, collapsible):
  - Contextual actions (edit, regenerate, export)
  - Properties/metadata
  - Comments/notes
  - AI suggestions
  - Version history

WORKSPACE FEATURES:
- Command palette (⌘K) for quick navigation
- Keyboard shortcuts for common actions
- Breadcrumb trail for deep navigation
- Full-screen focus mode
- Split view for comparing sections
- Print/export-friendly layouts

CONTENT DISPLAY PATTERNS:
For Generated AI Content:
  - Clear section headers with icons
  - Collapsible/expandable sections
  - Code blocks with syntax highlighting
  - Tables with horizontal scroll
  - Card grids for structured data
  - Progress/status chips inline
  - "Copy" and "Regenerate" actions per section
  - Edit mode toggle (view → edit)
  - Diff view for comparing changes
  
For Long-Form Content:
  - Table of contents sidebar
  - Estimated reading time
  - Progress indicator
  - "Back to top" button
  - Section permalink/sharing
  - Print-optimized styles`,
        tags: ["workspace", "editor", "panels", "content-display", "productivity"],
        relevance_score: 1.0,
        source: "Notion, Linear, GitBook, Confluence",
    },

    // ─────────────────────────────────────────────
    // COMPONENT PATTERNS
    // ─────────────────────────────────────────────
    {
        id: "uiux-020",
        category: "components",
        subcategory: "forms",
        title: "Form Design Patterns",
        content: `Form design best practices for SaaS applications:

INPUT FIELD ANATOMY:
- Label (above input, 14px, 500 weight, text-secondary)
- Input field (40-44px height, 14-16px text, 8-12px rounded)
- Helper text (below, 12px, text-tertiary)
- Error message (below, 12px, red, replaces helper text)
- Character count (right-aligned below, for textareas)
- Required indicator (* asterisk or "Required" badge)

INPUT STATES:
- Default: 1px border-gray, white bg
- Hover: darker border
- Focused: brand color border (2px) + subtle glow shadow
- Filled: default border, text visible
- Error: red border + red error message below
- Disabled: lighter bg, reduced opacity, not-allowed cursor
- Read-only: no border, text selectable

FORM LAYOUTS:
1. Single Column (recommended for most forms):
   - Full-width inputs
   - Logical grouping with section titles
   - Primary action button at bottom-left
   
2. Two Column (for shorter fields):
   - Related fields side by side (First/Last name)
   - Falls to single column on mobile
   
3. Inline Forms:
   - Label + input on same row
   - Used in settings pages
   
4. Multi-Step Wizard:
   - Step indicator at top (numbered circles connected by lines)
   - Current step highlighted
   - Previous/Next buttons
   - Optional step summary sidebar

SMART INPUT PATTERNS:
- Prompt/Textarea: Auto-growing, 120px min height, character limit display
- Select: Searchable dropdown with grouping
- Multi-select: Tags/pills with remove buttons
- Date picker: Calendar popup with presets
- File upload: Drag-and-drop zone with progress
- Code input: Syntax-highlighted textarea
- Toggle group: Segmented control buttons
- Slider: Range with value tooltip
- Color picker: Swatches + custom hex input

VALIDATION:
- Validate on blur (not on each keystroke)
- Show error summary at form top for submit failures
- Inline field errors below each invalid field
- Disable submit button when form is invalid
- Success state: Green checkmark + brief confirmation
- Loading state: Button shows spinner, form fields disabled`,
        tags: ["forms", "inputs", "validation", "wizard", "fields"],
        relevance_score: 0.95,
        source: "React Hook Form patterns, Formik, shadcn/ui forms",
    },

    {
        id: "uiux-021",
        category: "components",
        subcategory: "data-display",
        title: "Data Display Component Patterns",
        content: `Professional data display component specifications:

STAT CARDS:
- Title (12-14px, text-secondary, uppercase tracking)
- Value (24-36px, font-semibold, text-primary)
- Change indicator (↑↓ arrow + percentage, green/red)
- Sparkline or mini chart (optional)
- Icon (left or top, brand color background circle)
- Card: White bg, subtle shadow, 16-20px padding, rounded-xl

DATA TABLES:
Header Row:
  - 12-14px uppercase, text-secondary, font-medium
  - Sort indicator (chevron up/down)
  - Sticky header on scroll
  
Body Rows:
  - 14px text-primary
  - Alternating row colors or hover highlight
  - 40-48px row height
  - Checkbox column for bulk actions (left)
  - Actions column (right): icon buttons or "..." menu
  
Features:
  - Column resizing (drag handle)
  - Column reordering (drag)
  - Sticky first column on horizontal scroll
  - Expandable rows for detail view
  - Inline editing (click cell to edit)
  - Empty state with illustration
  - Loading state with skeleton rows
  - Pagination: "Showing 1-10 of 247 results" + prev/next

KANBAN BOARD:
- Columns: Status-based (To Do, In Progress, Done)
- Cards: Title, description preview, assignee avatar, priority badge, due date
- Drag-and-drop between columns
- Column header: Title + count + "+" add button
- Column scroll: Vertical scroll within column
- Card hover: Subtle elevation increase

TIMELINE/ROADMAP:
- Vertical timeline with left line + dots
- Each milestone: Date + Title + Description + Status badge
- Color-coded dots by status (todo=gray, active=blue, done=green)
- Expandable detail for each milestone
- Progress bar across top showing overall completion

LIST VIEW:
- Each item: Icon + Title + Description + Metadata + Actions
- Hover: Background highlight + action buttons appear
- Selected: Brand color left border
- Grouped lists with sticky group headers
- Virtual scrolling for long lists (>100 items)

CHARTS AND GRAPHS:
- Line chart: For trends over time
- Bar chart: For comparisons
- Donut chart: For composition/percentages
- Area chart: For volume over time
- Heatmap: For activity patterns
- Use brand color palette for chart colors
- Tooltip on hover with value details
- Legend below or right side
- Responsive: Stack vertically on mobile`,
        tags: ["tables", "cards", "kanban", "charts", "data-visualization"],
        relevance_score: 0.95,
        source: "Linear, Jira, Notion databases, Stripe Dashboard",
    },

    {
        id: "uiux-022",
        category: "components",
        subcategory: "navigation",
        title: "Navigation Component Patterns",
        content: `Navigation patterns for complex web applications:

TABS:
Types:
1. Underline Tabs (default):
   - Active: Brand color text + bottom border (2px)
   - Inactive: Text-secondary with hover darken
   - 14px font, 600 weight active, 400 inactive
   
2. Pill Tabs:
   - Active: Brand bg + white text, rounded-full
   - Inactive: Transparent bg, text-secondary
   - Used for filter toggles
   
3. Boxed Tabs:
   - Container with background
   - Active tab: White bg within container
   - segmented control style

Tab Behavior:
- Keyboard: Arrow keys to navigate, Enter to select
- URL-synced: Tab selection reflected in URL params
- Lazy loading: Tab content loaded on first activation
- Scroll: Horizontal scroll with fade edges when tabs overflow

BREADCRUMBS:
- Home > Section > Subsection > Current Page
- Separator: "/" or ">" or chevron icon
- Current page: text-primary, font-medium (not linked)
- Parent pages: text-secondary, linked, hover underline
- On mobile: Show only parent + current with "..." for middle

COMMAND PALETTE (⌘K):
- Triggered by: Keyboard shortcut or search icon
- Modal overlay with search input at top
- Results grouped by category: Pages, Projects, Actions, Settings
- Each result: Icon + Label + Description + Shortcut key
- Keyboard navigation: Arrow keys + Enter
- Recent searches section
- Quick actions: "Create project", "Toggle theme", "Open settings"
- Fuzzy search matching

PAGINATION:
1. Numbered: « 1 2 3 ... 10 »
2. Load More: "Load more" button at bottom
3. Infinite Scroll: Auto-load on scroll near bottom
4. Cursor-based: Next/Previous for API-driven pagination

For tables: Use numbered pagination with "Rows per page" selector
For feeds: Use infinite scroll or load more
For search results: Use numbered pagination

MOBILE NAVIGATION:
- Bottom tab bar: 4-5 main items with icons
- Hamburger menu: Side drawer with full navigation
- Swipe gestures: Back/forward navigation
- Sheet menus: Bottom sheet for contextual actions`,
        tags: ["tabs", "breadcrumbs", "command-palette", "pagination", "mobile-nav"],
        relevance_score: 0.9,
        source: "shadcn/ui, Radix UI, Linear, Notion",
    },

    {
        id: "uiux-023",
        category: "components",
        subcategory: "feedback",
        title: "Feedback & Loading State Patterns",
        content: `User feedback and loading state specifications:

TOAST NOTIFICATIONS:
Position: Top-right or bottom-right, 16px from edges
Anatomy:
  - Icon (success=check, error=x, warning=triangle, info=info)
  - Title (14px, font-medium)
  - Description (12-14px, text-secondary)
  - Close button (x icon, top-right)
  - Action button (optional, text link style)
Duration: 5 seconds auto-dismiss, pause on hover
Animation: Slide in from right, fade out
Stacking: Max 3 visible, new ones push others down

LOADING STATES:
1. Skeleton Screens (preferred):
   - Mimics content layout with gray pulsing blocks
   - Rounded rectangles for text (varying widths)
   - Circles for avatars
   - Rectangles for images
   - Use CSS animation (pulse or shimmer gradient)
   
2. Spinner:
   - Use for actions (button loading, form submitting)
   - Replace button text: "Saving..." with spinner
   - Size: 16px (inline), 24px (component), 40px (full page)
   
3. Progress Bar:
   - For multi-step operations
   - Determinate: Known percentage (file upload)
   - Indeterminate: Unknown duration (AI generation)
   - Show percentage text above bar
   
4. AI Generation Loading:
   - Multi-step progress indicator
   - "Analyzing your project idea... (Step 1/5)"
   - "Generating architecture... (Step 2/5)"
   - Animated dots or pulse effect
   - Estimated time remaining
   - Cancel button available

EMPTY STATES:
Anatomy:
  - Illustration (simple, friendly, brand-colored, 120-200px)
  - Headline (18-20px, "No projects yet")
  - Description (14px, text-secondary, 2 lines max)
  - CTA button ("Create your first project")
  
Types:
  - First-time user: Encouraging, instructional
  - No search results: "No matches found. Try adjusting your filters."
  - No data: "Nothing here yet. Start by..."
  - Error state: "Something went wrong. Try refreshing."

ERROR STATES:
- Inline field errors: Red text below input
- Form-level errors: Alert banner at top of form
- Page-level errors: Full-page error with retry button
- API errors: Toast notification with error message
- 404 page: Friendly illustration + "Go back home" link
- Network error: "You appear to be offline" banner

CONFIRMATION DIALOGS:
- Centered modal with overlay
- Title: "Delete project?" (clear action statement)
- Description: Consequences of the action
- Buttons: Cancel (left, ghost) + Confirm (right, danger/primary)
- For destructive actions: Type project name to confirm
- Animation: Fade in overlay, scale up dialog`,
        tags: ["toast", "loading", "skeleton", "empty-state", "error", "modal"],
        relevance_score: 0.95,
        source: "Vercel, Linear, Notion UX patterns",
    },

    // ─────────────────────────────────────────────
    // USER FLOW PATTERNS
    // ─────────────────────────────────────────────
    {
        id: "uiux-030",
        category: "user-flows",
        subcategory: "authentication",
        title: "Authentication Flow Patterns",
        content: `Authentication UX patterns for SaaS:

SIGN UP FLOW:
Page Layout:
  - Split layout: Form (left/center) + Value prop/illustration (right)
  - Or: Centered card on gradient/pattern background
  - Logo at top, minimal navigation
  
Form Fields:
  - Full name (single field, not first/last separate)
  - Email address
  - Password with strength indicator (weak/fair/strong/very strong)
  - Show password toggle (eye icon)
  - Terms & Privacy checkbox or inline link
  
Social Auth:
  - "Continue with Google" (most common)
  - "Continue with GitHub" (developer tools)
  - Divider: "or continue with email"
  - Social buttons above email form

After Signup:
  - Email verification screen
  - Onboarding wizard (3-5 steps)
  - First-action prompt (create first project)

SIGN IN FLOW:
  - Email + Password
  - "Remember me" checkbox
  - "Forgot password?" link (right-aligned below password)
  - Submit button full-width
  - "Don't have an account? Sign up" at bottom
  - Social login options
  
FORGOT PASSWORD:
  - Step 1: Enter email → "Check your email" screen
  - Step 2: Email with reset link
  - Step 3: New password + confirm password
  - Step 4: "Password reset successful" → redirect to login

ONBOARDING WIZARD:
  - Step 1: Welcome + basic info (name, role)
  - Step 2: Workspace setup (name, team size)
  - Step 3: Preferences (notifications, theme)
  - Step 4: First action (create project, import data)
  - Skip option available
  - Progress indicator at top`,
        tags: ["auth", "login", "signup", "onboarding", "password"],
        relevance_score: 0.9,
        source: "Auth0, Clerk, NextAuth patterns",
    },

    {
        id: "uiux-031",
        category: "user-flows",
        subcategory: "project-creation",
        title: "AI Project Creation Flow",
        content: `AI-powered project creation UX patterns:

STEP 1 - IDEA INPUT:
Layout:
  - Centered, focused layout (max-width 720px)
  - Large textarea as primary input (200-300px height)
  - Placeholder: "Describe your project idea in detail..."
  - Character count or "ideal length" indicator
  - Example prompts below textarea (clickable to fill)
  
Optional Fields (collapsible "Advanced Options"):
  - Project name (auto-generated from AI analysis if blank)
  - Category dropdown (SaaS, E-commerce, Healthcare, Education, etc.)
  - Target users (text input)
  - Main goal (text input)
  - Preferred tech stack (multi-select tags)
  - Timeline (select: 1 month, 3 months, 6 months, 12 months)
  
Examples Section:
  - 3-4 example prompts as clickable cards
  - "Healthcare patient monitoring app with AI diagnostics"
  - "E-commerce platform with AR product previews"
  - "Team collaboration tool with real-time editing"
  
UI Polish:
  - Auto-growing textarea
  - Word count indicator
  - "AI will use your description to generate..." helper text
  - Tips tooltip: "The more detail you provide, the better the output"

STEP 2 - GENERATION:
Loading Experience:
  - Full-page or card-based progress view
  - Sequential step indicators:
    1. "Understanding your idea..." (2-3s)
    2. "Defining requirements..." (3-4s)
    3. "Designing architecture..." (3-4s)
    4. "Planning database schema..." (2-3s)
    5. "Mapping API endpoints..." (2-3s)
    6. "Structuring UI/UX plan..." (3-4s)
    7. "Breaking down tasks..." (2-3s)
    8. "Identifying risks..." (1-2s)
    9. "Finalizing project plan..." (1-2s)
  - Each step: Animated icon + text + checkmark on complete
  - Pulsing/breathing animation on current step
  - Progress percentage or time estimate
  - Cancel button available
  - Background gradient animation or subtle particle effect

STEP 3 - OUTPUT REVIEW:
  - Redirect to project workspace
  - Success toast: "Your project plan is ready!"
  - Highlight first section (Overview) as starting point
  - "Start reviewing" CTA or auto-scroll to content
  - Quick tour tooltip: "Click any section to dive deeper"`,
        tags: ["ai-generation", "prompt-input", "loading", "creation-flow"],
        relevance_score: 1.0,
        source: "ChatGPT, v0, Cursor, AI product patterns",
    },

    // ─────────────────────────────────────────────
    // RESPONSIVE & ACCESSIBILITY
    // ─────────────────────────────────────────────
    {
        id: "uiux-040",
        category: "responsive",
        subcategory: "breakpoints",
        title: "Responsive Design System",
        content: `Responsive design breakpoints and patterns:

BREAKPOINTS:
- Mobile: 0-639px (sm)
- Tablet: 640-1023px (md)
- Desktop: 1024-1279px (lg)
- Wide: 1280-1535px (xl)
- Ultra-wide: 1536px+ (2xl)

CONTAINER MAX-WIDTHS:
- sm: 100% with 16px padding
- md: 100% with 24px padding
- lg: 1024px centered
- xl: 1280px centered
- 2xl: 1400px centered

RESPONSIVE PATTERNS:
1. Sidebar Navigation:
   - Desktop: Visible sidebar (240-280px)
   - Tablet: Collapsed icon sidebar (64px) or overlay drawer
   - Mobile: Bottom tab bar + hamburger drawer

2. Data Tables:
   - Desktop: Full table with all columns
   - Tablet: Hide less important columns, show "..." expand
   - Mobile: Card-based list view (stack columns vertically)

3. Grid Cards:
   - Desktop: 3-4 columns
   - Tablet: 2 columns
   - Mobile: 1 column (full width)

4. Forms:
   - Desktop: Multi-column where appropriate
   - Tablet: 2-column max
   - Mobile: Single column always

5. Modals:
   - Desktop: Centered overlay (max-width 560px)
   - Mobile: Full-screen sheet from bottom

6. Split Panels:
   - Desktop: Side by side
   - Mobile: Stacked or tabbed

TOUCH TARGETS:
- Minimum touch target: 44x44px (iOS HIG)
- Spacing between targets: Minimum 8px
- Avoid hover-only interactions on mobile
- Use swipe gestures for common actions

PERFORMANCE:
- Lazy load below-fold images
- Use responsive images (srcset)
- Code-split by route
- Minimize layout shift (set image dimensions)
- Preload critical fonts`,
        tags: ["responsive", "breakpoints", "mobile", "touch", "performance"],
        relevance_score: 0.9,
        source: "Tailwind CSS, Material Design responsive guidelines",
    },

    {
        id: "uiux-041",
        category: "accessibility",
        subcategory: "wcag",
        title: "Accessibility (a11y) Best Practices",
        content: `Web accessibility requirements for professional applications:

KEYBOARD NAVIGATION:
- All interactive elements must be keyboard accessible
- Focus order follows visual reading flow (top-left to bottom-right)
- Skip links at page top: "Skip to main content"
- Focus trap within modals/dialogs
- Escape key closes modals, dropdowns, popovers
- Tab through form fields, Enter to submit
- Arrow keys for list/menu navigation

FOCUS INDICATORS:
- Visible focus ring on all interactive elements (2px solid brand color, 2px offset)
- Never remove default focus outline without replacement
- Focus-visible (not focus) to avoid showing on click
- High contrast focus ring: works on both light and dark backgrounds

ARIA ATTRIBUTES:
- role: Define element roles when semantic HTML isn't sufficient
- aria-label: Label for icon-only buttons ("Close", "Open menu")
- aria-expanded: For accordion/dropdown toggle state
- aria-current="page": For active navigation item
- aria-live="polite": For dynamic content updates (toasts, counters)
- aria-describedby: Link inputs to their error messages

SCREEN READER SUPPORT:
- Meaningful alt text for all images
- Decorative images: alt="" or aria-hidden="true"
- Headings: Proper h1-h6 hierarchy, no skipping levels
- Landmarks: header, nav, main, footer, aside
- Announce route changes in SPAs
- Form labels: Every input has an associated label

COLOR & CONTRAST:
- Normal text: 4.5:1 minimum contrast ratio
- Large text: 3:1 minimum contrast ratio
- UI components: 3:1 minimum
- Don't use color alone: Icons, text, or patterns alongside color
- Test with color blindness simulators

MOTION & ANIMATION:
- Respect prefers-reduced-motion setting
- Provide pause/stop controls for auto-playing content
- Avoid flashing content (more than 3 flashes/second)
- Keep animations under 500ms for UI transitions
- Use transform/opacity for smooth 60fps animations`,
        tags: ["accessibility", "a11y", "wcag", "keyboard", "screen-reader", "aria"],
        relevance_score: 0.85,
        source: "WCAG 2.1, WAI-ARIA 1.2, MDN Accessibility",
    },

    // ─────────────────────────────────────────────
    // ANIMATION & INTERACTION
    // ─────────────────────────────────────────────
    {
        id: "uiux-050",
        category: "animation",
        subcategory: "micro-interactions",
        title: "Micro-interaction & Animation Patterns",
        content: `Premium micro-interaction specifications:

TIMING FUNCTIONS:
- Ease out (decelerate): For elements entering (slide in, fade in)
- Ease in (accelerate): For elements leaving (slide out, fade out)
- Ease in-out: For elements transforming in place
- Spring: For playful interactions (bounce, wiggle)

DURATION GUIDELINES:
- Instant feedback (color, opacity): 100-150ms
- Small transitions (hover, focus): 150-200ms
- Medium transitions (slide, expand): 200-300ms
- Large transitions (page, modal): 300-500ms
- Complex animations (multi-step): 500-800ms

HOVER EFFECTS:
- Buttons: Darken background 5-10%, subtle scale (1.02)
- Cards: Lift with shadow (translateY(-2px), shadow-large)
- Links: Color change + underline
- Icons: Subtle rotate or scale
- Table rows: Highlight background

ENTRANCE ANIMATIONS:
- Cards/Sections: Fade up (translateY(10px) → 0, opacity 0 → 1)
- Stagger children: 50-100ms delay between items
- Page content: Slide up from bottom
- Modals: Scale up (0.95 → 1) + fade in
- Drawers: Slide from edge
- Toasts: Slide from edge + bounce settle
- Dropdowns: Scale from origin + fade in

EXIT ANIMATIONS:
- Reverse of entrance but faster (50-75% of entrance duration)
- Elements should never "pop" in without transition
- Use AnimatePresence for exit animations in React

LOADING ANIMATIONS:
- Skeleton shimmer: Left-to-right gradient sweep
- Pulsing dots: 3 dots with staggered opacity
- Spinner: Circular rotation (not too fast, 1-1.5s per rotation)
- Progress bar: Smooth width transition
- AI generation: Typing effect for generated text

STATE TRANSITIONS:
- Tab switching: Cross-fade content (150ms)
- Accordion: Height auto animation with overflow hidden
- Toggle: Background color slide + thumb position
- Checkbox: Scale bounce on check (0.85 → 1.05 → 1)
- Like/Favorite: Pop + scale animation with color fill

SCROLL ANIMATIONS:
- Parallax: Background moves slower than foreground
- Reveal on scroll: Elements fade up as they enter viewport
- Sticky header: Shadow appears on scroll
- Progress indicator: Reading progress bar at top
- Lazy load: Skeleton → fade in image

Use Framer Motion for React:
- motion.div with initial, animate, exit props
- AnimatePresence for exit animations
- useInView for scroll-triggered animations
- layout prop for layout animations
- Variants for orchestrating child animations`,
        tags: ["animation", "micro-interaction", "hover", "transition", "framer-motion"],
        relevance_score: 0.9,
        source: "Framer Motion, GSAP, Apple HIG Animation Guidelines",
    },

    // ─────────────────────────────────────────────
    // SPECIFIC PAGE PATTERNS
    // ─────────────────────────────────────────────
    {
        id: "uiux-060",
        category: "page-patterns",
        subcategory: "settings",
        title: "Settings Page Design Patterns",
        content: `Professional settings page design:

LAYOUT:
- Left sidebar navigation with settings categories
- Right content area with current settings section
- OR: Single column with clear section dividers

SETTINGS CATEGORIES:
1. Profile: Avatar, name, email, bio
2. Account: Password, 2FA, sessions, delete account
3. Workspace: Name, URL, team members, roles
4. Appearance: Theme (light/dark/system), language, timezone
5. Notifications: Email, push, in-app preferences
6. Integrations: Connected services, API keys
7. Billing: Plan, payment, invoices
8. Data & Privacy: Export, deletion, cookies

FORM PATTERNS:
- Each section: Title + Description + Form fields
- Save behavior: Auto-save with confirmation toast OR explicit "Save" button
- Destructive settings: Red zone section at bottom with confirmation dialog
- Toggle settings: Switch + Label + Description
- Grouped settings: Card with related options

SPECIFIC PATTERNS:
Profile Section:
  - Avatar upload with crop
  - Name (editable)
  - Email (editable with verification)
  - Bio/description textarea
  
Notification Preferences:
  - Table format: Channel (Email/Push/In-App) × Event type
  - Checkboxes or toggles in cells
  - "Notify me about:" grouped list
  
Theme Settings:
  - Three options: Light / Dark / System (radio group or segmented control)
  - Live preview of selection
  - Accent color picker (optional)
  
API Keys:
  - List of keys with created date, last used, actions
  - "Create new key" with permissions selector
  - Reveal/copy key functionality
  - Revoke with confirmation`,
        tags: ["settings", "preferences", "profile", "notifications", "account"],
        relevance_score: 0.85,
        source: "GitHub Settings, Vercel Settings, Linear Settings",
    },

    {
        id: "uiux-061",
        category: "page-patterns",
        subcategory: "project-list",
        title: "Project List & Card Design",
        content: `Project listing page patterns:

VIEW OPTIONS:
1. Card Grid View (default):
   - 3-column grid (desktop), 2 (tablet), 1 (mobile)
   - Card height: Consistent within row (CSS Grid)
   
2. Table/List View:
   - Full-width rows with columns
   - More information density
   - Better for power users

PROJECT CARD ANATOMY:
- Status indicator: Colored dot or badge (top-right)
- Title: 16-18px, font-semibold, truncate to 2 lines
- Description: 14px, text-secondary, truncate to 2-3 lines
- Category tag: Small pill badge
- Stack tags: Small tech badges (React, Node.js, etc.)
- Updated timestamp: "Updated 2h ago"
- Footer: Avatar(s) + action menu ("...")
- Hover: Subtle lift + border color change

CARD HOVER STATE:
- translateY(-2px)
- Shadow elevation increase
- Border color: brand-200
- Optional: Show quick action buttons

PAGE HEADER:
- Title: "Projects" (H1)
- Description: "Manage and organize your AI-generated project plans"
- Actions: "New Project" button (primary) + View toggle (grid/list)

FILTER BAR:
- Search input with icon
- Status filter: All / Draft / Generating / Completed / Archived
- Category filter: Dropdown multi-select
- Sort: Recently Updated / Created Date / Name / Status
- Active filters: Show as removable pills below

EMPTY STATE:
- Illustration of project creation
- "No projects yet"
- "Create your first AI-generated project plan"
- "New Project" CTA button
- Example project cards as inspiration`,
        tags: ["project-list", "cards", "grid", "filters", "status"],
        relevance_score: 0.9,
        source: "Linear, Vercel, Railway project listings",
    },

    // ─────────────────────────────────────────────
    // CONTENT STRUCTURE PATTERNS
    // ─────────────────────────────────────────────
    {
        id: "uiux-070",
        category: "content",
        subcategory: "ai-output",
        title: "AI-Generated Content Display Patterns",
        content: `Best practices for displaying AI-generated structured content:

OUTPUT SECTION LAYOUT:
Each generated section should have:
1. Section header bar:
   - Icon + Section title (H2)
   - "Last generated: 2h ago" timestamp
   - Action buttons: Edit | Regenerate ↻ | Copy ⧉ | Export ↗
   
2. Content area:
   - Well-structured typography
   - Proper heading hierarchy (H3 → H4 → Body)
   - Bulleted/numbered lists where appropriate
   - Code blocks with syntax highlighting where relevant
   - Tables for structured comparisons
   - Callout boxes for important notes
   
3. Section footer:
   - "Regenerate this section" link
   - Confidence indicator (if applicable)
   - "Was this helpful?" feedback

CONTENT TYPE SPECIFIC:

PRD Content Display:
  - Expandable accordion sections (Objectives, User Stories, Requirements)
  - Priority badges on each requirement (Critical/High/Medium/Low)
  - User story format: "As a [persona], I want to [action] so that [benefit]"
  - Acceptance criteria as checkbox list

Architecture Display:
  - System overview card with type badge
  - Grid of architecture component cards (Frontend, Backend, DB, Infra)
  - Each component: Technology + Description + Sub-components list + Patterns
  - Service relationship diagram placeholder
  - Deployment notes as info callout
  - Tradeoffs section with pro/con formatting

Database Schema Display:
  - Table definition cards with column details
  - Column table: Name | Type | Nullable | Key | Description
  - Foreign key references shown as links
  - Index definitions in code block
  - ER diagram placeholder

API Design Display:
  - Endpoint list grouped by category
  - Each endpoint: Method badge (GET=green, POST=blue, PUT=amber, DELETE=red)
  - Path, description, auth badge, request/response preview
  - Expandable detail with full request/response schema

Task Breakdown Display:
  - Milestone cards with progress bars
  - Kanban grouping or list view
  - Task cards: Title + Category badge + Priority + Difficulty + Hours
  - Filter by category/priority/difficulty
  - Total hours summary

EDITING MODE:
- Toggle between view and edit mode
- Edit mode: Content becomes editable textarea/rich text
- Show "Save" and "Cancel" buttons
- Unsaved changes indicator (dot on tab)
- Auto-save with debounce (2 seconds)
- Version history or undo capability`,
        tags: ["ai-output", "content-display", "prd", "architecture", "schema", "editing"],
        relevance_score: 1.0,
        source: "Notion, GitBook, Coda content patterns",
    },

    {
        id: "uiux-071",
        category: "content",
        subcategory: "information-density",
        title: "Information Density & Content Hierarchy",
        content: `Managing information density in data-heavy applications:

HIERARCHY PRINCIPLES:
1. Visual weight: Size > Color > Position > Shape
2. Three-level hierarchy maximum per section:
   - Primary: What the user looks for first (title, key metric)
   - Secondary: Supporting context (description, metadata)
   - Tertiary: Details on demand (timestamps, IDs, actions)

DENSITY LEVELS:
1. Compact (for power users):
   - Tight spacing (8-12px between elements)
   - Smaller text (13-14px body)
   - Dense tables
   - Use for: project lists, task boards, settings
   
2. Comfortable (default):
   - Medium spacing (16-20px between elements)
   - Standard text (14-16px body)
   - Cards with breathing room
   - Use for: dashboards, project views
   
3. Spacious (for reading):
   - Generous spacing (24-32px between elements)
   - Larger text (16-18px body, max 65ch line length)
   - Use for: generated content, PRD, documentation

CONTENT CHUNKING:
- Group related information into cards/sections
- Max 5-7 items per group before adding subgroups
- Use progressive disclosure (show summary → expand for detail)
- Accordion sections for long content
- Tab switching for different content categories
- "Read more" / "Show all" for truncated lists

VISUAL SEPARATORS:
- Space: 24-40px between sections (preferred)
- Lines: 1px border in subtle color (secondary choice)
- Background color: Alternating section backgrounds
- Cards: Contained within bordered/shadowed cards

SCANNING OPTIMIZATION:
- Left-align text and labels for scanning efficiency
- Use consistent patterns across similar content types
- Bold key terms in body text
- Use bullets for 3+ related items
- Highlight numbers and statistics with larger/bolder font
- Status indicators: Color-coded dots, badges, or chips
- Timestamp formatting: Relative ("2h ago") for recent, absolute for old`,
        tags: ["information-density", "hierarchy", "chunking", "readability", "scanning"],
        relevance_score: 0.85,
        source: "Refactoring UI, Every Layout, Content Design London",
    },
];
