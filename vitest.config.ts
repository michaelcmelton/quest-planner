import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig(({ mode }) => ({
    plugins: [sveltekit()],
    test: {
        coverage: {
            reporter: ['text', 'json', 'html'],
            exclude: ['node_modules', 'scripts', '.svelte-kit', 'public', '*.config.{ts,js}', 'src/lib/types', '*.d.ts'],
        },
        include: ['**/**/*.{test,spec}.{js,ts}'],
        environment: 'jsdom',
        globals: true,
        setupFiles: './vitest-setup-client.ts'
    },
    resolve: {
        conditions: mode === 'test' ? ['browser'] : [],
    },
    })
);

