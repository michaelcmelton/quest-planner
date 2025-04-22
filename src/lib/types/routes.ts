// Base interface for all nodes in the route
export interface BaseNode {
  id: string;
  type: 'quest' | 'custom';
  content: string;
}

// Quest node in the route
export interface QuestNode extends BaseNode {
  type: 'quest';
  questId: string;
  completed: boolean;
  completionDate?: Date;
  validationState?: {
    isValid: boolean;
    missingRequirements?: {
      skills?: { [skill: string]: number };
      quests?: string[];
      items?: string[];
    };
  };
}

// Custom node in the route
export interface CustomNode extends BaseNode {
  type: 'custom';
}

// The main route schema
export interface Route {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Single sequence of nodes
  nodes: (QuestNode | CustomNode)[];
  
  // Progress tracking
  progress: {
    completedQuests: number;
    totalQuests: number;
  };
  
  // Metadata for route validation
  validationState: {
    isValid: boolean;
    errors?: string[];
    warnings?: string[];
  };
} 