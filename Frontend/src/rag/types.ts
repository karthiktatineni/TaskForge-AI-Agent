/**
 * Types for the RAG (Retrieval-Augmented Generation) knowledge base system.
 */

export interface KnowledgeDocument {
    /** Unique identifier for the document (e.g., "uiux-001") */
    id: string;
    /** Primary category (e.g., "design-systems", "layout-patterns", "components") */
    category: string;
    /** Subcategory for finer classification (e.g., "foundations", "dashboard", "forms") */
    subcategory: string;
    /** Human-readable title of the knowledge document */
    title: string;
    /** The main content/body of the knowledge document */
    content: string;
    /** Tags for search and retrieval */
    tags: string[];
    /** Relevance score from 0 to 1 indicating how broadly applicable this document is */
    relevance_score: number;
    /** Attribution or source reference */
    source: string;
}
