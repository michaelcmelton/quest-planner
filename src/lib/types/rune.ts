export interface Rune {
    id: string;
    name: string;
    level: number;
    experience: number;
    members: boolean;
    crafting_requirements: {
        pure_essence: number;
    };
    uses: string[];
    image: string;
}

export type RuneData = Record<string, Rune>; 