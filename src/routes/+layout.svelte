<script lang="ts">
    import '$lib/styles/global.scss';
    import { base } from '$app/paths';
    import { page } from '$app/state';
    import { onMount } from 'svelte';

    let isDark = false;

    onMount(() => {
        isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    });

    function toggleTheme() {
        const newTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        isDark = !isDark;
    }
</script>

<div class="layout">
    <header class="layout__header">
        <nav class="container">
            <div class="layout__nav-content">
                <a href="{base}" class="layout__brand">Quest Planner</a>
                <div class="layout__nav-links">
                    <a
                        href="{base}/about"
                        class="layout__nav-link {page.url.pathname === '/about' ? 'layout__nav-link--active' : ''}"
                    >
                        About
                    </a>
                    <a
                        href="{base}/quest-list"
                        class="layout__nav-link {page.url.pathname === '/quest-list' ? 'layout__nav-link--active' : ''}"
                    >
                        Quest List
                    </a>
                    <a
                        href="{base}/routes"
                        class="layout__nav-link {page.url.pathname === '/routes' ? 'layout__nav-link--active' : ''}"
                    >
                        Routes
                    </a>
                    <button
                        class="layout__theme-toggle"
                        aria-label="Toggle theme"
                        title="Toggle Theme"
                        on:click={toggleTheme}
                        data-testid="theme-toggle"
                    >
                        {#if !isDark}
                            <svg class="icon icon--moon" viewBox="0 0 24 24" width="24" height="24" fill="#60a5fa">
                                <path d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"/>
                            </svg>
                        {:else}
                            <svg class="icon icon--sun" viewBox="0 0 24 24" width="24" height="24" fill="#fbbf24">
                                <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM12 0a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1zM12 19a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zM24 12a1 1 0 0 1-1 1h-2a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1zM4 12a1 1 0 0 1-1 1H1a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1zM20.485 3.515a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 0 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0zM6.343 17.657a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 0 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0zM20.485 20.485a1 1 0 0 1-1.414 0l-1.414-1.414a1 1 0 0 1 1.414-1.414l1.414 1.414a1 1 0 0 1 0 1.414zM6.343 6.343a1 1 0 0 1-1.414 0L3.515 4.929A1 1 0 0 1 4.93 3.515l1.414 1.414a1 1 0 0 1 0 1.414z"/>
                            </svg>
                        {/if}
                    </button>
                </div>
            </div>
        </nav>
    </header>

    <main class="layout__main">
        <slot />
    </main>

    <footer class="layout__footer">
        <div class="container">
            © {new Date().getFullYear()} Quest Planner. Data sourced from OSRS Wiki.
        </div>
    </footer>
</div>

<style lang="scss">
    .layout {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: var(--color-background);

        &__header {
            background-color: var(--color-surface);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            border-bottom: 1px solid var(--color-border);
        }

        &__nav-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--spacing-md) 0;
        }

        &__brand {
            font-size: 1.25rem;
            font-weight: bold;
            color: var(--color-text);
            text-decoration: none;
        }

        &__nav-links {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
        }

        &__nav-link {
            color: var(--color-text-secondary);
            text-decoration: none;
            transition: color 0.2s ease;

            &:hover {
                color: var(--color-text);
            }

            &--active {
                color: var(--color-text);
                font-weight: 600;
            }
        }

        &__theme-toggle {
            padding: var(--spacing-sm);
            border-radius: 0.5rem;
            background: none;
            border: none;
            cursor: pointer;
            color: var(--color-text-secondary);
            transition: background-color 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;

            &:hover {
                background-color: var(--color-border);
            }

            &:focus {
                @extend .focus-ring !optional;
            }

            .icon {
                transition: transform 0.2s ease;
            }
        }

        &__main {
            flex-grow: 1;
            background-color: var(--color-background);
            border-left: 1px solid var(--color-border);
            border-right: 1px solid var(--color-border);
        }

        &__footer {
            background-color: var(--color-surface);
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
            margin-top: auto;
            border-top: 1px solid var(--color-border);
            padding: var(--spacing-md) 0;
            text-align: center;
            color: var(--color-text-secondary);
        }
    }
</style> 