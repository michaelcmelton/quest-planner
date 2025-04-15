import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig(({ mode }) => ({
    plugins: [sveltekit()],
    test: {
        coverage: {
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules',
                'scripts',
                '.svelte-kit',
                 'build',
                 'coverage',
                 'public',
                 '*.config.{ts,js}',
                 'src/lib/types',
                 'src/*.d.ts',
                 'src/routes/+layout.ts',
                 'src/lib/utils/static-paths.ts',
                ],
        },
        include: ['**/**/*.{test,spec}.{js,ts}'],
        environment: 'jsdom',
        globals: true,
        setupFiles: './vitest-setup-client.ts',
        silent: true
    },
    resolve: {
        conditions: mode === 'test' ? ['browser'] : [],
    },
    })
);

