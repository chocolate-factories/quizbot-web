import vocabularies from '../data/vocabularies.json'
import { VocabEntry } from '../types'

export const getWords = (): VocabEntry[] => JSON.parse(JSON.stringify(vocabularies))

export const getWordsInCategories = (categories: string[]): VocabEntry[] => {
    let words: VocabEntry[] = JSON.parse(JSON.stringify(vocabularies))
    return words.filter((vocabEntry) => categories.includes(vocabEntry.categoryId))
}