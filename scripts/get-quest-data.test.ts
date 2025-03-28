import { describe, it, expect, vi } from 'vitest';
import { fetchQuestNames } from './get-quest-data';
import fetch from 'node-fetch';

vi.mock('node-fetch');

describe('fetchQuestNames', () => {
    it('should fetch and return quest names', async () => {
        const mockResponse = {
            ok: true,
            json: () => Promise.resolve({
                query: {
                    categorymembers: [
                        { title: 'Cook\'s Assistant' },
                        { title: 'Dragon Slayer' }
                    ]
                }
            })
        };

        (fetch as any).mockResolvedValue(mockResponse);

        const quests = await fetchQuestNames();
        
        expect(quests).toEqual(['Cook\'s Assistant', 'Dragon Slayer']);
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('oldschool.runescape.wiki/api.php'));
    });

    it('should handle API errors', async () => {
        (fetch as any).mockRejectedValue(new Error('API Error'));

        await expect(fetchQuestNames()).rejects.toThrow('API Error');
    });
});

describe('parseQuestsData', () => {

});