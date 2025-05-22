import { describe, expect, it, beforeEach, vi } from 'vitest';
import { RouteValidator } from './routeValidator';

describe('RouteValidator', () => {
  let routeValidator: RouteValidator;

  beforeEach(() => {
    routeValidator = new RouteValidator();
  });

  describe('constructor', () => {
    it('should initialize with quest data', () => {
      expect(routeValidator).toBeDefined();
    });

    it('should throw error if quest dependencies contain cycles', async () => {
      vi.doMock('../data/quests.json', () => ({
        default: {
          quest1: {
            id: 'quest1',
            name: 'Quest 1',
            requirements: { quests: ['quest2'] }
          },
          quest2: {
            id: 'quest2',
            name: 'Quest 2',
            requirements: { quests: ['quest1'] }
          }
        }
      }));

      await vi.resetModules();
      const { RouteValidator } = await import('./routeValidator');
      
      expect(() => new RouteValidator()).toThrow('Cycle detected in quest dependencies');
    });
  });

  describe('validateUserRoute', () => {
    it('should validate a correct quest route', () => {
      const validRoute = ['cooks_assistant', 'sheep_shearer'];
      const result = routeValidator.validateUserRoute(validRoute);
      expect(result.valid).toBe(true);
      expect(result.errors).toBeUndefined();
    });

    it('should reject an invalid quest route with missing prerequisites', () => {
      const invalidRoute = ['monkey_madness', 'cooks_assistant'];
      const result = routeValidator.validateUserRoute(invalidRoute);
      expect(result.valid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors!.length).toBeGreaterThan(0);
    });

    it('should handle empty route', () => {
      const result = routeValidator.validateUserRoute([]);
      expect(result.valid).toBe(true);
      expect(result.errors).toBeUndefined();
    });

    it('should handle non-existent quest IDs', () => {
      const result = routeValidator.validateUserRoute(['non_existent_quest']);
      expect(result.valid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors!.length).toBeGreaterThan(0);
    });
  });

  describe('generateAlternativeRoutes', () => {
    it('should generate alternative routes', () => {
      const validRoute = ['monkey_madness', 'desert_treasure_i'];
      const result = routeValidator.generateAlternativeRoutes();
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].length).toBeGreaterThan(0);
      expect(result[0]).not.toEqual(validRoute);
    });
  });
}); 