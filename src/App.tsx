import React from 'react';
import './App.css';
import Quiz from './components/Quiz'
import { Language } from './types'

function App() {
  return (
    <div className="App">
      <Quiz numberOfWords={30} sourceLang={"EN"} destinationLang={"ES"}/>
    </div>
  );
}

export default App;
