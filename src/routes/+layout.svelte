<script lang="ts">
    import '$lib/styles/global.scss';
    import { base } from '$app/paths';
    import { page } from '$app/state';
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
                        on:click={() => {
                            document.documentElement.setAttribute(
                                'data-theme',
                                document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
                            );
                        }}
                    >
                        Toggle Theme
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

            &:hover {
                background-color: var(--color-border);
            }

            &:focus {
                @extend .focus-ring !optional;
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