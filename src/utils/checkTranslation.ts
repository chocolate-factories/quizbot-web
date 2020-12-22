import removeAccents from 'remove-accents'

/**
 * Takes a word and its translation and verifies its corectness.
 * @param word the translation that was input by the user.
 * @param correctTranslation the correct translation.
 * @param ignoreSpecialLetters default false. If true, ignores accents, umlauts, and many other special letters by
 * converting them to their English equivalents, thus simplifying user input. If false, looks for exact match between
 * the provided translation and the vocabulary.
 */
const checkTranslation = (
  translation: string,
  correctTranslation: string,
  ignoreSpecialLetters = false
): boolean => {
  if (ignoreSpecialLetters) {
    translation = removeAccents(translation)
    correctTranslation = removeAccents(correctTranslation)
  }
  return matchTranslation(translation, correctTranslation)
}

const matchTranslation = (translation: string, correctTranslation: string): boolean => {
  if (translation === correctTranslation) {
    return true
  } else if (correctTranslation.includes('/')) {
    const correctTranslations = correctTranslation.split('/')
    return correctTranslations.some((corrTrans) => corrTrans.trim() === translation)
  }
  return false
}

export default checkTranslation
