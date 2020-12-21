import React, { useState } from 'react'
import {Box, Button, Checkbox, TextField} from '@material-ui/core'
import { Language } from '../types'
import checkTranslation from '../utils/checkTranslation'
import generateWordList from '../utils/generateWordList'

const InputField: React.FC<{onSubmit: (arg0: string) => void}> = ({onSubmit}) => {
  const [input, setInput] = useState("")
  return (
    <>
      <TextField 
        id="standard-basic" 
        label="Type your translation"
        variant="outlined"
        value={input} 
        onChange={(event) => setInput(event.target.value)}
        size={'small'}
      />
      <Button 
        color="primary"
        variant="contained"
        onClick={() => onSubmit(input)}
      > Check </Button>
    </>
  )
}

enum TranslationInputState {
  input,
  validation_correct,
  validation_error,
}

interface QuizParams {
  numberOfWords: number,
  sourceLang: Language,
  destinationLang: Language,
  newGame: () => void,
  categories?: string[]
}

const Quiz: React.FC<QuizParams> = ({
  numberOfWords,
  sourceLang,
  destinationLang,
  newGame,
  categories = []
}) => {
  const [words, setWords] = useState(() => generateWordList(numberOfWords, categories));
  const [currentRound, setCurrentRound] = useState(0)
  const [score, setScore] = useState(0)
  const [inputState, setInputState] = useState(TranslationInputState.input)
  const [currentWord, setCurrentWord] = useState(words[0])
  const [correctTranslation, setCorrectTranslation] = useState('')
  const [replaceSpecialCharacters, setReplaceSpecialCharacters] = useState(false)

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
    setWords(newWords);
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
          <Box style={{
            margin: "16px 0",
            fontSize: "20px"
          }}>{currentWord[sourceLang]}</Box>
          {inputState === TranslationInputState.input && (
            <Box>
              <InputField onSubmit={validate}/>
              <Box style={{
                display: "flex",
                justifyContent: "center"                
              }}>
                <p> Ignore special characters? </p>
                <Checkbox 
                  checked={replaceSpecialCharacters} 
                  onChange={() => setReplaceSpecialCharacters(!replaceSpecialCharacters)}
                />
              </Box>
           </Box>
          )}
          { inputState === TranslationInputState.validation_correct && (
            <Box>
              <Button
                color="primary"
                variant="contained"
                onClick={() => nextWord()}
              > 
                Next word
              </Button>
              <Box style={{
                color:"green",
                fontSize: "20px"
              }}>
                <p>Correct! {correctTranslation}</p>
              </Box>
            </Box>
          )}
          { inputState === TranslationInputState.validation_error && (
            <Box>
              <Button
                color="primary"
                variant="contained"
                onClick={() => nextWord()}
              > 
                Next word
              </Button>
              <Box style={{
                color:"red",
                fontSize: "20px"
              }}>
                <p>Error! {correctTranslation}</p>
              </Box>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => overrule()}
              > 
                Overrule
              </Button>
            </Box>
          )}
          <Box style={{
            fontSize: "20px"
          }}>
            <p>
              Score: {score} / {inputState === TranslationInputState.input ? currentRound : currentRound + 1} 
            </p>
          </Box>
        </Box>
      ) : (
        <Box>
          <p> Game Over! {score} / {currentRound} </p>
          <Button
            color="primary"
            variant="contained"
            onClick={() => newGame()}
          > 
            New game
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => restart()}
          > 
            Restart
          </Button>
        </Box>
      )}
    </>
  )
}

export default Quiz