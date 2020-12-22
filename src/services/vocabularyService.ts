import vocabularies from '../data/vocabularies.json'
import { VocabEntry } from '../types'

export const getWords = (): VocabEntry[] => {
  const words: VocabEntry[] = JSON.parse(JSON.stringify(vocabularies))
  return words.filter((vocabEntry) => vocabEntry.categoryId !== 'revision')
}

export const getWordsInCategories = (categories: string[]): VocabEntry[] => {
  const words: VocabEntry[] = JSON.parse(JSON.stringify(vocabularies))
  return words.filter((vocabEntry) => categories.includes(vocabEntry.categoryId))
}
