import { useMemo, useState } from "react";
import "./App.css";
import { minInputTextLength } from "./core/config";
import { buildTransitions, predictFromLast } from "./core/helpers";
import { store } from "./store";

function App() {
  const setTransitions = store((state) => state.setTransitions);
  const setInputText = store((state) => state.setInputText);
  const setUserInput = store((state) => state.setUserInput);
  const setNextChar = store((state) => state.setNextChar);
  const inputText = store((state) => state.inputText);
  const userInput = store((state) => state.userInput);
  const nextChar = store((state) => state.nextChar);
  const transitions = store((state) => state.transitions);

  const [lastTrainedText, setLastTrainedText] = useState("");

  const isAllowedToTrain = useMemo(() => {
    const isDifferent = inputText !== lastTrainedText;
    const hasEnough = inputText.length >= minInputTextLength;
    return isDifferent && hasEnough;
  }, [inputText, lastTrainedText, minInputTextLength]);

  const handleTrain = () => {
    const builtTransitions = buildTransitions(inputText, minInputTextLength);
    setTransitions(builtTransitions);
    setLastTrainedText(inputText);
  };

  const handleType = (value: string) => {
    setUserInput(value);
    const predicted = predictFromLast(value, transitions);
    setNextChar(predicted);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>)=> {
    if ((e.key === "Tab" || e.key === "ArrowRight") && nextChar) {
      e.preventDefault();
      const accepted = userInput + nextChar;
      setUserInput(accepted);
      const predicted = predictFromLast(accepted, transitions);
      setNextChar(predicted);
    }
  };

  return (
    <div className="App">
      <div className="input-container">
        <textarea
          className="custom-textarea"
          placeholder="Въведи текст за обучение на алгоритъма"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button onClick={handleTrain} disabled={!isAllowedToTrain}>
          Обучение
        </button>
        <div className={inputText.length < minInputTextLength ? "counter warn" : "counter"}>
          {inputText.length}/{minInputTextLength} букви необходими за обучение
        </div>
      </div>
      <div className="output-container">
        <div className="ghost-wrapper">
          <div className="ghost-track">
            <div className="ghost-overlay" aria-hidden>
              {userInput}{" "}
              {nextChar && <span className="ghost-suggestion">{nextChar}</span>}
            </div>
            <input
              className="ghost-input"
              type="text"
              placeholder="Започни да пишеш"
              value={userInput}
              onChange={(e) => handleType(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
