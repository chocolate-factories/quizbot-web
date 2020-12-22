import { getWords, getWordsInCategories } from './vocabularyService';

describe('vocabularyService', () => {
  describe('getWords should', () => {
    it('return non empty word list', () => {
      const words = getWords();
      expect(words).not.toBeNull;
    });
    it('return not return any revision words', () => {
        const words = getWords();
        expect(words.some(word => word.categoryId === 'revision')).toEqual(false)
      });
  });
  describe('getWordsInCategories should', () => {
    it('return all words from a given category', () => {
      const words = getWordsInCategories(['animals'])
      expect(words.length).toEqual(32)
    });
    it('not contain any words from a different category', () => {
        const words = getWordsInCategories(['animals'])
        expect(words.some(word => word.categoryId !== 'animals')).toEqual(false)
      });
  });
});