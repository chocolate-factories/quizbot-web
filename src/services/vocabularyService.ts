import vocabularies from '../data/vocabularies.json'
import { VocabEntry } from '../types'

export const getWords = (): VocabEntry[] => {
  return vocabularies.filter((vocabEntry) => vocabEntry.categoryId !== 'revision')
}

export const getWordsInCategories = (categories: string[]): VocabEntry[] => {
  return vocabularies.filter((vocabEntry) => categories.includes(vocabEntry.categoryId))
}
