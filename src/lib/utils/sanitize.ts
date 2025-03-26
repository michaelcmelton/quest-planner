/**
 * Sanitizes HTML-like content by removing tags but keeping text content
 * @param content The content to sanitize
 * @returns Sanitized content
 */
export function sanitizeContent(content: string): string {
  // Remove HTML-like tags but keep the text content
  return content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\[\[([^\]]+)\]\]/g, '$1') // Remove wiki-style links but keep text
    .replace(/\*\*/g, '') // Remove bold markers
    .replace(/\*/g, '') // Remove italic markers
    .trim();
} 