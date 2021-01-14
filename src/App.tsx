import React from 'react'
import { Container, Typography } from '@material-ui/core'
import QuizSelectForm from './components/QuizSelectForm'

const App: React.FC = () => {
  return (
    <Container maxWidth="sm" style={{ paddingTop: '50px' }}>
      <Typography variant="h3" gutterBottom>
        Spanish Quizbot 🤖
      </Typography>
      <QuizSelectForm />
    </Container>
  )
}

export default App
