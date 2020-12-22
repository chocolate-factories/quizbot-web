export enum Language {
  English = 'EN',
  Spanish = 'ES'
}
export type VocabEntry = {
  id: number
  EN: string
  ES: string
  categoryId: string
}

export type Category = {
  id: string
  name: string
  createdDate: string
}

export type LanguageChoice = {
  id: string
  language: string
  sourceLang: Language
  destinationLang: Language
}
