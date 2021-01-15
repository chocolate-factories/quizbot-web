import React, { Dispatch, SetStateAction } from 'react'
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
import { Category, LanguageChoice } from '../types'
import { getLanguageChoices } from '../services/languageService'

interface QuizSelectParams {
  selectedCategories: string[]
  setSelectedCategories: Dispatch<SetStateAction<string[]>>
  selectedLanguage: string
  setSelectedLanguage: Dispatch<SetStateAction<string>>
  numberOfWords: number
  setNumberOfWords: Dispatch<SetStateAction<number>>
  submitForm: () => void
}

const QuizSelectForm: React.FC<QuizSelectParams> = ({
  selectedCategories,
  setSelectedCategories,
  selectedLanguage,
  setSelectedLanguage,
  numberOfWords,
  setNumberOfWords,
  submitForm
}) => {
  const categories: Category[] = getCategories()
  const languageChoices: LanguageChoice[] = getLanguageChoices()

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'space-between',
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
          onChange={(e: any) => setSelectedLanguage(e.target.value)}
          label="language"
          value={selectedLanguage}
        >
          {languageChoices.map((languageChoice) => (
            <option key={languageChoice.id} value={languageChoice.id}>
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
  )
}

export default QuizSelectForm
