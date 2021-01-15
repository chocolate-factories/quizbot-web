import React, { useState } from 'react'
import { Language, LanguageChoice } from '../types'
import QuizSelectForm from './QuizSelectForm'
import QuizSession from './QuizSession'

const Quiz: React.FC = () => {
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
  const defaultNumberOfWords = 15

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageChoice>(languageChoices[0])
  const [numberOfWords, setNumberOfWords] = useState<number>(defaultNumberOfWords)
  const [quizInProgress, setQuizInProgress] = useState(false)

  const submitForm = () => {
    if (numberOfWords < 1) {
      alert('Need at least 1 word to start the quiz 🤖')
    } else {
      setQuizInProgress(true)
    }
  }

  return (
    <div>
      {quizInProgress ? (
        <QuizSession
          numberOfWords={numberOfWords}
          sourceLang={selectedLanguage.sourceLang}
          destinationLang={selectedLanguage.destinationLang}
          newGame={() => setQuizInProgress(false)}
          categories={selectedCategories}
        />
      ) : (
        <QuizSelectForm
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          numberOfWords={numberOfWords}
          setNumberOfWords={setNumberOfWords}
          submitForm={submitForm}
        />
      )}
    </div>
  )
}

export default Quiz
