import React, { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Switch,
  TextField,
  Typography
} from '@material-ui/core'
import { Language } from '../types'
import checkTranslation from '../utils/checkTranslation'
import generateWordList from '../utils/generateWordList'

enum TranslationInputState {
  input,
  validation_correct,
  validation_error
}

interface QuizParams {
  numberOfWords: number
  sourceLang: Language
  destinationLang: Language
  newGame: () => void
  categories?: string[]
}

const QuizSession: React.FC<QuizParams> = ({
  numberOfWords,
  sourceLang,
  destinationLang,
  newGame,
  categories = []
}) => {
  const [words, setWords] = useState(() => generateWordList(numberOfWords, categories))
  const [currentRound, setCurrentRound] = useState(0)
  const [score, setScore] = useState(0)
  const [inputState, setInputState] = useState(TranslationInputState.input)
  const [input, setInput] = useState('')
  const [currentWord, setCurrentWord] = useState(words[0])
  const [correctTranslation, setCorrectTranslation] = useState('')
  const [replaceSpecialCharacters, setReplaceSpecialCharacters] = useState(true)

  const gameOver = currentRound === words.length

  const validate = (input: string) => {
    const translation = currentWord[destinationLang]
    setCorrectTranslation(translation)
    const isCorrect = checkTranslation(input, translation, replaceSpecialCharacters)
    if (isCorrect) {
      setInputState(TranslationInputState.validation_correct)
      setScore(score + 1)
    } else {
      setInputState(TranslationInputState.validation_error)
    }
  }

  const nextWord = () => {
    setInputState(TranslationInputState.input)
    setInput('')
    if (currentRound + 1 < words.length) {
      setCurrentWord(words[currentRound + 1])
    }
    setCurrentRound(currentRound + 1)
  }

  const overrule = () => {
    setScore(score + 1)
    nextWord()
  }

  const restart = () => {
    const newWords = generateWordList(numberOfWords, categories, words)
    setWords(newWords)
    setCurrentRound(0)
    setScore(0)
    setInputState(TranslationInputState.input)
    setCurrentWord(newWords[0])
    setCorrectTranslation('')
  }

  return (
    <>
      {!gameOver ? (
        <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {currentWord[sourceLang]}
              </Typography>
              <Box marginBottom="10px">
                <FormControlLabel
                  control={
                    <Switch
                      size="small"
                      checked={replaceSpecialCharacters}
                      onChange={() => setReplaceSpecialCharacters(!replaceSpecialCharacters)}
                    />
                  }
                  label="Ignore special characters"
                />
                <Box style={{ display: 'flex', marginTop: '12px' }}>
                  <TextField
                    label="Type your answer"
                    variant="outlined"
                    value={input}
                    disabled={inputState !== TranslationInputState.input}
                    onChange={(event) => setInput(event.target.value)}
                    size="small"
                    style={{ marginRight: '10px' }}
                  />
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={inputState !== TranslationInputState.input}
                    onClick={() => validate(input)}
                  >
                    Check{' '}
                  </Button>
                </Box>
              </Box>
              {inputState === TranslationInputState.validation_correct && (
                <Box>
                  <Typography variant="body1" color="primary" gutterBottom>
                    Correct! {correctTranslation}
                  </Typography>
                  <Button color="primary" variant="contained" onClick={() => nextWord()}>
                    Next word
                  </Button>
                </Box>
              )}
              {inputState === TranslationInputState.validation_error && (
                <Box>
                  <Typography variant="body1" color="secondary" gutterBottom>
                    Incorrect! {correctTranslation}
                  </Typography>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => overrule()}
                    style={{ marginRight: '10px' }}
                  >
                    Overrule
                  </Button>
                  <Button color="primary" variant="contained" onClick={() => nextWord()}>
                    Next word
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
          <Typography variant="h6" style={{ marginTop: '10px' }}>
            Score: {score} /{' '}
            {inputState === TranslationInputState.input ? currentRound : currentRound + 1}
          </Typography>
        </Box>
      ) : (
        <Box>
          <Typography variant="h6" gutterBottom>
            {' '}
            Game Over! {score} / {currentRound}{' '}
          </Typography>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => restart()}
            style={{ marginRight: '10px' }}
          >
            Restart
          </Button>
          <Button color="primary" variant="contained" onClick={() => newGame()}>
            New category
          </Button>
        </Box>
      )}
    </>
  )
}

export default QuizSession
