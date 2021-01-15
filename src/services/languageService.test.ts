import { Language } from '../types'
import { getLanguageChoice, getLanguageChoices } from './languageService'

describe('languageService', () => {
  describe('getLanguageChoices', () => {
    it('returns all language choices', () => {
      const languageChoices = getLanguageChoices()
      expect(languageChoices).not.toBeNull
      expect(languageChoices.length).toBe(2)
    })
  })
  describe('getLanguageChoice', () => {
    it('returns language choice with matching id', () => {
      const validId = 'en_es'
      const languageChoice = getLanguageChoice(validId)
      expect(languageChoice).not.toBeNull
      expect(languageChoice.sourceLang).toBe(Language.English)
      expect(languageChoice.destinationLang).toBe(Language.Spanish)
    })
    it('throws not found error if no language choice is found', () => {
      const invalidId = 'random'
      expect(() => getLanguageChoice(invalidId)).toThrow('language choice not found!')
    })
  })
})
