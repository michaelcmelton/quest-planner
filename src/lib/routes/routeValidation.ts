import { QuestGraph } from '../quests/questGraph';
import type { Quest } from '../types/quest';
import type { Route, QuestNode } from '../types/routes';

export class RouteValidator {
    private questGraph: QuestGraph;

    constructor(quests: Quest[]) {
        this.questGraph = new QuestGraph();
        // Initialize the graph with all quests
        quests.forEach(quest => this.questGraph.addQuest(quest));
    }

    validateRoute(route: Route): { isValid: boolean; missingPrerequisites: string[] } {
        // Extract quest IDs from the route's quest nodes
        const questSequence = route.nodes
            .filter(node => node.type === 'quest')
            .map(node => (node as QuestNode).questId);

        // Check if the sequence is valid
        const isValid = this.questGraph.isValidSequence(questSequence);
        
        // Get any missing prerequisites
        const missingPrerequisites = isValid ? [] : this.questGraph.getMissingPrerequisites(questSequence);

        return {
            isValid,
            missingPrerequisites
        };
    }

    updateRouteValidation(route: Route): Route {
        const validationResult = this.validateRoute(route);
        
        return {
            ...route,
            validationState: {
                isValid: validationResult.isValid,
                errors: validationResult.isValid ? undefined : [
                    `Missing prerequisites: ${validationResult.missingPrerequisites.join(', ')}`
                ]
            }
        };
    }
} 