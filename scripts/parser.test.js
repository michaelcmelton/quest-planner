/** 
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest';
import { getInfobox } from './parser.js';

describe('getInfobox', () => {
  it('should parse complete infobox data correctly', () => {
    const mockQuestData = {
      text: `{{Infobox Quest
|name = Cook's Assistant
|number = 1
|image = Cook's Assistant.png
|release = 4 January 2001
|update = Update 2
|aka = Cooking Quest
|members = false
|series = Cooking
|developer = Andrew Gower
}}`
    };

    const result = getInfobox(mockQuestData);

    expect(result).toEqual({
      name: 'Cook\'s Assistant',
      number: '1',
      image: 'Cook\'s Assistant.png',
      release: '4 January 2001',
      update: 'Update 2',
      aka: 'Cooking Quest',
      members: 'false',
      series: 'Cooking',
      developer: 'Andrew Gower'
    });
  });

  it('should handle missing infobox data', () => {
    const mockQuestData = {
      text: 'Some other content without infobox'
    };

    const result = getInfobox(mockQuestData);

    expect(result).toEqual({});
  });

  it('should handle partial infobox data', () => {
    const mockQuestData = {
      text: `{{Infobox Quest
|name = Dragon Slayer
|members = true
}}`
    };

    const result = getInfobox(mockQuestData);

    expect(result).toEqual({
      name: 'Dragon Slayer',
      members: 'true'
    });
  });

  it('should handle invalid number format', () => {
    const mockQuestData = {
      text: `{{Infobox Quest
|number = invalid
}}`
    };

    const result = getInfobox(mockQuestData);

    expect(result.number).toBe(0);
  });

  it('should handle quoted values', () => {
    const mockQuestData = {
      text: `{{Infobox Quest
|name = "Cook's Assistant"
|series = "Cooking Series"
}}`
    };

    const result = getInfobox(mockQuestData);

    expect(result).toEqual({
      name: 'Cook\'s Assistant',
      series: 'Cooking Series'
    });
  });
}); 