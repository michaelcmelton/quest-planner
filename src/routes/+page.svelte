<script lang="ts">
    import { questRoute } from '$lib/stores/questRoute.svelte';
</script>

<div class="quest-planner">
    <header>
        <h1>OSRS Quest Planner</h1>
        <div class="controls">
            <button on:click={() => questRoute.clear()}>Clear Route</button>
        </div>
    </header>

    <main>
        <div class="quest-list">
            <h2>Your Quest Route</h2>
            <div class="route-nodes">
                {#each $questRoute.nodes as node (node.id)}
                    <div class="route-node">
                        {#if node.questId === 'custom'}
                            <span class="custom-node">📝 {node.customNote}</span>
                        {:else}
                            <span class="quest-node">⚔️ Quest {node.questId}</span>
                        {/if}
                        <button on:click={() => questRoute.removeQuest(node.id)}>×</button>
                    </div>
                {/each}
            </div>
        </div>
    </main>
</div>

<style>
    .quest-planner {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }

    h1 {
        margin: 0;
        font-size: 2rem;
        color: #333;
    }

    .controls {
        display: flex;
        gap: 1rem;
    }

    button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        background-color: #4a90e2;
        color: white;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    button:hover {
        background-color: #357abd;
    }

    .quest-list {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    h2 {
        margin: 0 0 1rem 0;
        font-size: 1.5rem;
        color: #333;
    }

    .route-nodes {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .route-node {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        background: #f5f5f5;
        border-radius: 4px;
    }

    .custom-node {
        color: #666;
    }

    .quest-node {
        color: #333;
    }
</style>
