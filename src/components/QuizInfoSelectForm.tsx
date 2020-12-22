import React, { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core'
import { getCategories } from '../services/categoryService'
import { Category, Language, LanguageChoice } from '../types'
import Quiz from './Quiz'

const QuizInfoSelectForm: React.FC = () => {
  const categories: Category[] = getCategories()
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
        <Quiz
          numberOfWords={numberOfWords}
          sourceLang={selectedLanguage.sourceLang}
          destinationLang={selectedLanguage.destinationLang}
          newGame={() => setQuizInProgress(false)}
          categories={selectedCategories}
        />
      ) : (
        <Box
          style={{
            display: 'flex',
            paddingTop: '16px'
          }}
        >
          <FormControl variant="outlined">
            <InputLabel htmlFor="category">Category</InputLabel>
            <Select
              multiple
              onChange={(e: any) => setSelectedCategories(e.target.value)}
              label="category"
              value={selectedCategories}
              style={{
                width: '150px'
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel htmlFor="language">Language</InputLabel>
            <Select
              native
              onChange={(e: any) => setSelectedLanguage(JSON.parse(e.target.value))}
              label="language"
            >
              {languageChoices.map((languageChoice) => (
                <option key={languageChoice.id} value={JSON.stringify(languageChoice)}>
                  {languageChoice.language}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined">
            <TextField
              label="Number of words"
              type="number"
              value={numberOfWords}
              onChange={(e: any) => setNumberOfWords(e.target.value)}
              variant="outlined"
              style={{ width: '130px' }}
            />
          </FormControl>
          <Button onClick={() => submitForm()} variant="outlined" color="primary">
            Start
          </Button>
        </Box>
      )}
    </div>
  )
}

export default QuizInfoSelectForm
