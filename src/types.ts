
export type Language = "EN" | "ES"
export type VocabEntry = {
  id: number,
  EN: string,
  ES: string,
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
}