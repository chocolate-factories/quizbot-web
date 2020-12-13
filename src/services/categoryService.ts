import categories from '../data/categories.json'
import { Category } from '../types';

export const getCategories = (): Category[] => categories;