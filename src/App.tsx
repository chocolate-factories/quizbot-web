import React from 'react'
import { Container, Typography } from '@material-ui/core'
import Quiz from './components/Quiz'

const App: React.FC = () => {
  return (
    <Container maxWidth="sm" style={{ paddingTop: '50px' }}>
      <Typography variant="h3" gutterBottom style={{ textAlign: 'center' }}>
        Spanish Quizbot 🤖
      </Typography>
      <Quiz />
    </Container>
  )
}

export default App
