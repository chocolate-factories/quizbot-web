import React, { useState } from 'react'
import QuizSelectForm from './QuizSelectForm'
import QuizSession from './QuizSession'

const Quiz: React.FC = () => {
  const defaultLanguage = 'es_en'
  const defaultNumberOfWords = 15

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState<string>(defaultLanguage)
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
          languageId={selectedLanguage}
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
