import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig(({ mode }) => ({
    plugins: [sveltekit()],
    test: {
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

