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

function findMostLikelyNextChar(Pletter: string, transitions: Transitions): string {
  const letter = Pletter.toLowerCase();
  const nextLettersObj = transitions[letter];
  if (!nextLettersObj) return ""
  const nextLetters = Object.keys(nextLettersObj);
  let mostPosibleNextChar = "";
  let highestCount = 0;

  for (let i = 0; i < nextLetters.length; i++) {
    const nextChar = nextLetters[i];
    const count = nextLettersObj[nextChar];

    if (count > highestCount) {
      highestCount = count;
      mostPosibleNextChar = nextChar;
    }
  }

  return mostPosibleNextChar
}

function getRandomChar(): string {
  const alphabet = 'абвгдежзийклмнопрстуфхцчшщъьюя';
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  return alphabet[randomIndex];
}

function isLetter(char: string): boolean {
  return /^[\p{L}]$/u.test(char);
}

function App() {
  const [inputText, setInputText] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [nextChar, setNextChar] = useState<string>('');
  const [transitions, setTransitions] = useState<Transitions>({});

  const handleTrain = () => {
    const builtTransitions = buildTransitions(inputText);
    setTransitions(builtTransitions);
  };
  
  const handleType = (value: string) => {
    setUserInput(value);
    const lastChar = value.slice(-1).toLowerCase();

    if(lastChar && isLetter(lastChar)) {
    
      if(lastChar && transitions[lastChar]) {
        const predictedChar = findMostLikelyNextChar(lastChar, transitions);
        setNextChar(predictedChar);
      } else {
        const randomChar = getRandomChar();
        setNextChar(randomChar);
      }
    }else {
      setNextChar("");
    }
  }

  return (  
     <div className="App"> 
      <div className='input-container'>
        <input 
          type="text"
          placeholder='Въведи текст за обучение на алгоритъма'
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
          onChange={(e) => handleType(e.target.value)}
        />
      </div>
    </div>
  )
}

export default App

