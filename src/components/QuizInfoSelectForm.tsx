import React, { FormEvent, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from '@material-ui/core';
import { getCategories } from '../services/categoryService';
import { Category, LanguageChoice } from '../types';

const QuizInfoSelectForm: React.FC<{}> = () => {
  const categories: Category[] = getCategories();
  const languageChoices: LanguageChoice[] = [
    { id: 'es_en', language: 'Spanish to English' },
    { id: 'en_es', language: 'English to Spanish' },
  ];
  const defaultNumberOfWords = 10;

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].id
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    languageChoices[0].id
  );
  const [numberOfWords, setNumberOfWords] = useState<number>(
    defaultNumberOfWords
  );

  const handleNumOfWordsChange = (e: any) => {
    const value = e.target.value;
    if (value < 1) {
      alert('Quiz at least one vocab 🤖');
      setNumberOfWords(defaultNumberOfWords);
    } else {
      setNumberOfWords(value);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('selectedCategory', selectedCategory);
    console.log('selectedLanguage', selectedLanguage);
    console.log('numberOfWords', numberOfWords);
  };

  return (
    <form onSubmit={handleSubmit}>
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
            native
            onChange={(e: any) => setSelectedCategory(e.target.value)}
            label="category"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="language">Language</InputLabel>
          <Select
            native
            onChange={(e: any) => setSelectedLanguage(e.target.value)}
            label="language"
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
            label="Number of Words"
            type="number"
            value={numberOfWords}
            onChange={handleNumOfWordsChange}
            variant="outlined"
            style={{ width: '130px' }}
          />
        </FormControl>
        <Button type="submit" variant="outlined" color="primary">
          Start
        </Button>
      </Box>
    </form>
  );
};

export default QuizInfoSelectForm;
