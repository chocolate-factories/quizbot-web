import vocabulary from '../data/vocabularies.json'
import { Language } from '../types'

/**
 * Takes a word and returns its translation from the vocabulary.
 * @param word the provided word in sourceLang to be translated.
 * @param sourceLang the language the word was provided in.
 * @param destinationLang the target language for the translation.
 */
const getTranslation = (
  word: string,
  sourceLang: Language,
  destinationLang: Language
): string =>{
  return vocabulary.find(vocabEntry => vocabEntry[sourceLang] === word)?.[destinationLang] || ''
}

export default getTranslation