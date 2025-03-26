import { compile } from 'mdsvex';
import type { ParsedMDX } from '$lib/types';

export async function parseMDX(content: string): Promise<ParsedMDX> {
  try {
    if (!content) {
      console.warn('Empty MDX content provided');
      return { content: '' };
    }

    const result = await compile(content, {
      remarkPlugins: [],
      rehypePlugins: []
    });

    if (!result) {
      console.warn('MDX compilation returned no result');
      return { content: '' };
    }

    return {
      content: result.code,
      metadata: result.data
    };
  } catch (error) {
    console.error('Error parsing MDX:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        content: content.substring(0, 100) + '...' // Log first 100 chars of content
      });
    }
    return { content: '' };
  }
} 