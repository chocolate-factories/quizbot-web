import removeAccents from 'remove-accents'

/**
 * Takes a word and its translation and verifies its corectness.
 * @param word the translation that was input by the user.
 * @param translation the correct translation.
 * @param ignoreSpecialLetters default false. If true, ignores accents, umlauts, and many other special letters by
 * converting them to their English equivalents, thus simplifying user input. If false, looks for exact match between
 * the provided translation and the vocabulary.
 */
const checkTranslation = (
  word: string,
  correctTranslation: string,
  ignoreSpecialLetters: boolean = false
): boolean => {

  if (ignoreSpecialLetters) {
    word = removeAccents(word)
    correctTranslation = removeAccents(correctTranslation)
  }
  return matchTranslation(word, correctTranslation)  
}

const matchTranslation = (translation: string, correctTranslation: string): boolean => {
  if (translation === correctTranslation) {
    return true
  } else if (correctTranslation.includes("/")) {
    const correctTranslations = correctTranslation.split("/")
    return correctTranslations.some(corrTrans => corrTrans.trim() === translation)
  }
  return false
}

export default checkTranslation