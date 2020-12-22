import React from 'react';
import { Container, Typography } from '@material-ui/core';
import QuizInfoSelectForm from './components/QuizInfoSelectForm';

function App() {
  return (
    <Container style={{ paddingTop: '50px' }}>
      <Typography variant="h3" gutterBottom>
        Spanish Quizbot 🤖
      </Typography>
      <QuizInfoSelectForm/>
    </Container>
  );
}

export default App;
