// src/lib/types/mdsvex.d.ts
declare module 'mdsvex' {
  interface CompileOptions {
    remarkPlugins?: any[];
    rehypePlugins?: any[];
  }

  interface CompileResult {
    code: string;
    data?: Record<string, any>;
  }

  export function compile(
    content: string,
    options?: CompileOptions
  ): Promise<CompileResult | null>;
} 