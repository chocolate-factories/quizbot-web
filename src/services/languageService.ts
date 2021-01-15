import { LanguageChoice } from '../types'
import { Language } from './../types'

const languageChoices: LanguageChoice[] = [
  {
    id: 'es_en',
    language: 'Spanish to English',
    sourceLang: Language.Spanish,
    destinationLang: Language.English
  },
  {
    id: 'en_es',
    language: 'English to Spanish',
    sourceLang: Language.English,
    destinationLang: Language.Spanish
  }
]

export const getLanguageChoices = (): LanguageChoice[] => languageChoices

export const getLanguageChoice = (id: string): LanguageChoice => {
  const languageChoice = languageChoices.find((languageChoice) => languageChoice.id === id)
  if (!languageChoice) {
    throw new Error('language choice not found!')
  }
  return languageChoice
}
