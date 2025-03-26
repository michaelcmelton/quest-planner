export interface Quest {
  name: string;
  desc: string;
  difficulty: string;
  length: string;
  requirements: string;
  kills: string;
  start: string;
  items: string;
  ironman?: string;
  mdx?: string;
}

export interface QuestData {
  [key: string]: Quest;
}

export interface ParsedMDX {
  content: string;
  metadata?: Record<string, any>;
}

// Helper function to sanitize HTML-like content
export function sanitizeContent(content: string): string {
  // Remove HTML-like tags but keep the text content
  return content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\[\[([^\]]+)\]\]/g, '$1') // Remove wiki-style links but keep text
    .replace(/\*\*/g, '') // Remove bold markers
    .replace(/\*/g, '') // Remove italic markers
    .trim();
} 