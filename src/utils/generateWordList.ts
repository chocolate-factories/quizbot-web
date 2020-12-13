import vocabularies from '../data/vocabularies.json'
import { VocabEntry } from '../types'

const generateWordList = (numberOfWords: number, categories: string[] = [], forbiddenWords: VocabEntry[] = []): VocabEntry[] => {
  const generatedWords = [];
  // Deep copy, otherwise we will delete from vocabularies.
  let candidateWords: VocabEntry[] = JSON.parse(JSON.stringify(vocabularies))
  if (categories.length > 0) {
    candidateWords = vocabularies.filter(vocabEntry => categories.includes(vocabEntry.categoryId))    
  }
  candidateWords = candidateWords.filter(vocabEntry => !forbiddenWords.some(forbiddenWord => forbiddenWord.id === vocabEntry.id))
  if (numberOfWords > candidateWords.length) {
    numberOfWords = candidateWords.length
  }
  for (let i = 0; i < numberOfWords; i++) {
    let randomIndex = Math.floor(Math.random() * candidateWords.length)
    generatedWords.push(candidateWords[randomIndex])
    candidateWords.splice(randomIndex, 1)
  }
  return generatedWords;
}

export default generateWordList;