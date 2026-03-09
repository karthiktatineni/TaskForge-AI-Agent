import Link from "next/link";
import { redirect } from "next/navigation";
import { Sparkles, ArrowRight, Zap, Database, Layers, Layout, ShieldCheck } from "lucide-react";
import TopBar from "@/components/layout/TopBar";

export default function LandingPage() {
  // Single user mode: go straight to dashboard
  redirect("/dashboard");

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] overflow-hidden">
      {/* Simple Top Navigation for Landing */}
      <header className="fixed top-0 inset-x-0 z-50 h-16 flex items-center px-6 border-b bg-[var(--bg-primary)]/80 backdrop-blur-xl border-[var(--border-primary)]">
        <div className="flex items-center gap-3 min-w-0 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold text-[var(--text-primary)]">
              AI Project Architect
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              Sign In
            </Link>
            <Link href="/dashboard" className="px-4 py-2 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-sm font-medium hover:opacity-90 transition-opacity">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-500/10 dark:bg-brand-500/20 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 text-brand-700 dark:text-brand-300 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Powered by Gemini 2.0 AI</span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-[var(--text-primary)] mb-6 leading-[1.1]">
              From raw idea to <br />
              <span className="gradient-text">production architecture</span>
            </h1>

            <p className="text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed">
              Stop staring at blank pages. Describe your app idea and instantly generate comprehensive requirements, database schemas, APIs, and UI/UX plans.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/projects/new" className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-medium transition-all shadow-glow hover:-translate-y-0.5">
                Start Building for Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="#features" className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full border border-[var(--border-secondary)] hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-medium transition-all">
                See How it Works
              </Link>
            </div>
          </div>
        </section>

        {/* Video/App Preview Section */}
        <section className="px-6 pb-32">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-2 shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 to-transparent z-10 pointer-events-none flex items-end justify-center pb-12">
                <Link href="/dashboard" className="px-6 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-primary)] shadow-lg text-sm font-semibold hover:scale-105 transition-transform flex items-center gap-2 pointer-events-auto">
                  <Layout className="w-4 h-4" />
                  Explore the Dashboard
                </Link>
              </div>
              <div className="aspect-[16/9] rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-primary)] overflow-hidden flex flex-col">
                {/* Mock window header */}
                <div className="h-10 border-b border-[var(--border-secondary)] bg-[var(--bg-tertiary)] flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 p-8 overflow-hidden relative">
                  <div className="w-full h-full skeleton opacity-50 absolute inset-0 m-8 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 px-6 bg-[var(--bg-secondary)] border-y border-[var(--border-primary)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Everything you need to start building</h2>
              <p className="text-[var(--text-secondary)] text-lg">AI Project Architect generates every document your engineering and design team needs.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Layers className="w-6 h-6 text-brand-500" />,
                  title: "System Architecture",
                  desc: "Microservices, monolithic, or serverless. Get a complete breakdown of services, boundaries, and tech stack choices."
                },
                {
                  icon: <Database className="w-6 h-6 text-brand-500" />,
                  title: "Database Schemas",
                  desc: "Detailed relational or NoSQL schemas with tables, columns, indexes, and relationships automatically mapped."
                },
                {
                  icon: <Zap className="w-6 h-6 text-brand-500" />,
                  title: "REST & GraphQL APIs",
                  desc: "Comprehensive endpoint design including request/response payloads, authentication, and rate limiting rules."
                },
                {
                  icon: <Layout className="w-6 h-6 text-brand-500" />,
                  title: "UI/UX Plans",
                  desc: "Screen-by-screen breakdown of components, user flows, and state management strategies."
                },
                {
                  icon: <ShieldCheck className="w-6 h-6 text-brand-500" />,
                  title: "Requirements (PRD)",
                  desc: "Proper user stories, acceptance criteria, and non-functional requirements ready for Jira."
                },
                {
                  icon: <Sparkles className="w-6 h-6 text-brand-500" />,
                  title: "AI Risk Assessment",
                  desc: "Identify technical debt, security risks, and hidden complexities before writing a single line of code."
                }
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-primary)] card-hover">
                  <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to architect your next big idea?</h2>
          <p className="text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">Join thousands of developers, founders, and agencies who build better software faster.</p>
          <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] font-medium transition-transform hover:scale-105">
            Open Workspace
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>

      <footer className="border-t border-[var(--border-primary)] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-500" />
            <span className="font-semibold">AI Project Architect</span>
          </div>
          <div className="flex gap-6 text-sm text-[var(--text-secondary)]">
            <Link href="#" className="hover:text-[var(--text-primary)]">Privacy Policy</Link>
            <Link href="#" className="hover:text-[var(--text-primary)]">Terms of Service</Link>
            <Link href="#" className="hover:text-[var(--text-primary)]">Twitter</Link>
            <Link href="#" className="hover:text-[var(--text-primary)]">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
