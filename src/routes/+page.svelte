<script lang="ts">
	import cytoscape from 'cytoscape';
    import data from '$lib/data/cleaned.json';
	import type { QuestData, QuestPayload } from '$lib/types';
	import { onMount } from 'svelte';

    let container: HTMLElement;

    function stripIds(line:string): string {
        line = line.replaceAll(/\[/g, "")
        line = line.replaceAll(/\]/g, "")
        line = line.replaceAll(/\*/g, "")
        line = line.replaceAll(' ', '')
        line = line.replaceAll(/\'/g, '')
        line = line.replaceAll(/\./g, '')
        line = line.replaceAll(/&/g, '')
        line = line.replaceAll('_', '')
        line = line.split('|')[0]
        if (line === 'anothercooksquest') {
            return 'recipefordisaster/anothercooksquest';
        }
        return line.toLowerCase();
    }

    function parseQuests(data: string): Array<string> {
        const quests: Array<string> = [];
        const lines = data.split("\n");
        let insideSubList = false;
        lines.forEach(line => {
            if (line.includes("Completion of the following quests:")) {
                insideSubList = true;
            } else if (insideSubList && line.startsWith("*")) {
                if (line.startsWith("**") && !line.startsWith("***") && line.includes("[[")) {
                    quests.push(stripIds(line));
                } else if (line.startsWith("*") && !line.startsWith("**")) {
                    insideSubList = false;
                }
            }
        })

        return quests;
    }

    const payload: QuestPayload = (data as QuestPayload)

    const nodes: Map<string, QuestData> = new Map();
    const adjacencyList: Map<string, Array<string>> = new Map();

    Object.keys(payload).forEach(questName => {
        payload[questName].quests = parseQuests(payload[questName].requirements)
        payload[questName].id = stripIds(payload[questName].name);
        
        nodes.set(payload[questName].id, payload[questName])
        adjacencyList.set(payload[questName].id, payload[questName].quests);
    })

    const elements = [
        ...Array.from(nodes).map(node => {return {data: node[1]} }), 
        ...Array.from(adjacencyList).map((val) => {
            const key = val[0];
            const mappedReqs: any[] = [];
            
            val[1].forEach(req => {
                let corrected = req;
                if (req === 'anothercooksquest') {
                    corrected = 'recipefordisaster/anothercooksquest';
                }
            
                mappedReqs.push({
                    data: {
                        source: key,
                        target: corrected,
                    }
                })    
            })

            return mappedReqs;
        }).flat(),
    ];

    console.log(elements);

    onMount(() => {
        const cy = cytoscape({
            container: container, // Container element
            elements: elements,
            style: [
                {
                    selector: "node",
                    style: {
                        "background-color": "#66cc66",
                        "label": "data(id)"
                    }
                },
                {
                    selector: "edge",
                    style: {
                        "width": 2,
                        "line-color": "#ccc"
                    }
                }
            ],
            layout: {
                name: "random", // Layout type
                padding: 10
            }
        });
    });
</script>

<style>
    /* Set the size of the Cytoscape container */
    .cy-container {
        width: 100%;
        height: 600px;
        border: 1px solid #ccc;
    }
</style>

<!-- Create a container element for Cytoscape -->
<div bind:this={container} class="cy-container"></div>