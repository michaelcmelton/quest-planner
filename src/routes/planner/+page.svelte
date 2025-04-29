<script lang="ts">
    import { questRoute } from '$lib/stores/questRoute.svelte';
    import { questStore } from '$lib/stores/questStore.svelte';
    import type { QuestRouteNode, Quest } from '$lib/types/quests';

    let searchQuery = '';
    let showRecommendations = false;

    // Initialize quest store
    $: if ($questStore.quests) {
        questRoute.initialize($questStore.quests);
    }

    // Filter quests based on search query
    $: filteredQuests = $questStore.questList
        .filter(quest => quest.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => a.number - b.number);

    // Get quest name from ID
    const getQuestName = (node: QuestRouteNode) => {
        if (node.type === 'custom') return node.name;
        const quest = questStore.getQuestById(node.id);
        return quest?.name || 'Unknown Quest';
    };

    // Add quest to route
    const addQuest = (questId: string) => {
        questRoute.addQuest(questId);
        searchQuery = ''; // Clear search after adding
    };

    // Add custom note
    const addCustomNote = () => {
        const note = prompt('Enter your custom note:');
        if (note) {
            questRoute.addCustomNode(note);
        }
    };

    // Remove quest from route
    const removeQuest = (nodeId: string) => {
        questRoute.removeQuest(nodeId);
    };

    // Get available quests for recommendations
    $: availableQuests = $questStore.questList
        .filter(quest => !$questRoute.nodes.some(node => node.id === quest.id))
        .sort((a, b) => a.number - b.number);
</script>

<div class="container">
    <h1>Quest Route Planner</h1>

    <!-- Search and Add Quest -->
    <div class="search-section">
        <input
            type="text"
            bind:value={searchQuery}
            placeholder="Search quests..."
            class="search-input"
        />
        <button on:click={addCustomNote} class="add-button">
            Add Custom Note
        </button>
    </div>

    <!-- Validation Errors -->
    {#if !$questRoute.isValid}
        <div class="error-section">
            <h3>Validation Errors:</h3>
            <ul>
                {#each $questRoute.validationErrors as error}
                    <li class="error-item">{error}</li>
                {/each}
            </ul>
        </div>
    {/if}

    <!-- Quest List -->
    {#if searchQuery}
        <div class="quest-list">
            {#each filteredQuests as quest}
                <div class="quest-item" on:click={() => addQuest(quest.id)}>
                    <span class="quest-number">#{quest.number}</span>
                    <span class="quest-name">{quest.name}</span>
                </div>
            {/each}
        </div>
    {/if}

    <!-- Current Route -->
    <div class="route-section">
        <h2>Current Route</h2>
        <button on:click={() => questRoute.clear()} class="clear-button">
            Clear Route
        </button>
        <div class="route-list">
            {#each $questRoute.nodes as node, index}
                <div class="route-item">
                    <span class="step-number">{index + 1}.</span>
                    <span class="quest-name">{getQuestName(node)}</span>
                    <button on:click={() => removeQuest(node.id)} class="remove-button">
                        Remove
                    </button>
                </div>
            {/each}
        </div>
    </div>

    <!-- Recommendations -->
    <div class="recommendations-section">
        <button 
            on:click={() => showRecommendations = !showRecommendations}
            class="toggle-button"
        >
            {showRecommendations ? 'Hide' : 'Show'} Available Quests
        </button>
        {#if showRecommendations}
            <div class="quest-list">
                {#each availableQuests as quest}
                    <div class="quest-item" on:click={() => addQuest(quest.id)}>
                        <span class="quest-number">#{quest.number}</span>
                        <span class="quest-name">{quest.name}</span>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>

<style>
    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
    }

    .search-section {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .search-input {
        flex: 1;
        padding: 0.5rem;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .add-button, .clear-button, .toggle-button {
        padding: 0.5rem 1rem;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .clear-button {
        background-color: #f44336;
    }

    .toggle-button {
        background-color: #2196F3;
    }

    .error-section {
        background-color: #ffebee;
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 2rem;
    }

    .error-item {
        color: #c62828;
        margin: 0.5rem 0;
    }

    .quest-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 2rem;
    }

    .quest-item {
        display: flex;
        align-items: center;
        padding: 0.5rem;
        background-color: #f5f5f5;
        border-radius: 4px;
        cursor: pointer;
    }

    .quest-item:hover {
        background-color: #e0e0e0;
    }

    .quest-number {
        font-weight: bold;
        margin-right: 1rem;
        color: #666;
    }

    .quest-name {
        flex: 1;
    }

    .route-section {
        margin-bottom: 2rem;
    }

    .route-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .route-item {
        display: flex;
        align-items: center;
        padding: 0.5rem;
        background-color: #e3f2fd;
        border-radius: 4px;
    }

    .step-number {
        font-weight: bold;
        margin-right: 1rem;
        color: #1976D2;
    }

    .remove-button {
        padding: 0.25rem 0.5rem;
        background-color: #f44336;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .recommendations-section {
        margin-top: 2rem;
    }
</style> 