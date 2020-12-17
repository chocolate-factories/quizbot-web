import React, { FormEvent, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { getCategories } from '../services/categoryService';
import { Category, LanguageChoice } from '../types';
import Quiz from './Quiz'

const QuizInfoSelectForm: React.FC = () => {
  const categories: Category[] = getCategories();
  const languageChoices: LanguageChoice[] = [
    { id: 'es_en', language: 'Spanish to English', sourceLang: 'ES', destinationLang: 'EN' },
    { id: 'en_es', language: 'English to Spanish', sourceLang: 'EN', destinationLang: 'ES' },
  ];
  const defaultNumberOfWords = 10;

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageChoice>(
    languageChoices[0]
  );
  console.log(selectedCategories)
  const [numberOfWords, setNumberOfWords] = useState<number>(
    defaultNumberOfWords
  );
  const [quizInProgress, setQuizInProgress] = useState(false)

  const handleNumOfWordsChange = (e: any) => {
    const value = e.target.value;
    if (value < 1) {
      alert('Quiz at least one vocab 🤖');
      setNumberOfWords(defaultNumberOfWords);
    } else {
      setNumberOfWords(value);
    }
  };

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
          justifyContent: 'space-between',
          paddingTop: '16px',
        }}
      >
        <FormControl variant="outlined">
          <InputLabel htmlFor="category">Category</InputLabel>
          <Select
            multiple
            onChange={(e: any) => setSelectedCategories(e.target.value)}
            label="category"
            value={selectedCategories}
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
            label="Number of Words"
            type="number"
            value={numberOfWords}
            onChange={handleNumOfWordsChange}
            variant="outlined"
            style={{ width: '130px' }}
          />
        </FormControl>
        <Button onClick={() => setQuizInProgress(true)} variant="outlined" color="primary">
          Start
        </Button>
      </Box>
      )}
    </div>
  );
};

export default QuizInfoSelectForm;
