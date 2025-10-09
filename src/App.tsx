import { useState } from 'react'
import './App.css'

type Transitions = { [key: string]: {[key: string]: number} } ;

function buildTransitions(input: string): Transitions {
  const reworkedText: string = input.replace(/[^\p{L}]/gu, "").toLowerCase();
  const charArray: string[] = Array.from(reworkedText);
  const transitions: Transitions = {};

  for (let i = 0; i < charArray.length - 1; i++) {
    const currentChar = charArray[i];
    const nextChar = charArray[i + 1];

    if(!transitions[currentChar]) {
      transitions[currentChar] = {};
    }

    if(!transitions[currentChar][nextChar]) {
      transitions[currentChar][nextChar] = 0;
    }

    transitions[currentChar][nextChar]++;
  }

  return transitions;
}

function findMostLikelyNextChar(letter: string, transitions: Transitions): string {
  let mostPosibleNextChar = "";
  let highestCount = 0;
  const nextLettersObj = transitions[letter];
  const nextLeeters = Object.keys(nextLettersObj);

  for (let i = 0; i < nextLeeters.length; i++) {
    const nextChar = nextLeeters[i];
    const count = nextLettersObj[nextChar];

    if (count > highestCount) {
      highestCount = count;
      mostPosibleNextChar = nextChar;
    }
  }

  return mostPosibleNextChar
}

function App() {
  const [inputText, setInputText] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [nextChar, setNextChar] = useState<string>('');
  const [transitions, setTransitions] = useState<Transitions>({});

  const handleTrain = () => {
    const builtTransitions = buildTransitions(inputText);
    setTransitions(builtTransitions);
    console.log(transitions)
  };
  

  return (  
     <div className="App"> 
      <div className='input-container'>
        <input 
          type="text"
          placeholder='Въведи текс за убочение на алгоритъма'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <div className='button-container'>
        <button onClick={handleTrain}>Обучение</button>
      </div>
      <div className='output-container'>
        <input 
          type="text"
          placeholder='Започни да пишеш'
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
      </div>
    </div>
      
  )
}

export default App

