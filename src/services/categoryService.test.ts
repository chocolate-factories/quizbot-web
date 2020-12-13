import { getCategories } from './categoryService';

describe('categoryService', () => {
  describe('getCategories', () => {
    it('returns non empty category list', () => {
      const categories = getCategories();
      expect(categories).not.toBeNull;
      console.log(categories);
    });
  });
});
