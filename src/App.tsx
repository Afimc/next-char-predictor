import "./App.css";
import { store } from "./utils/stores/Store";


function App() {
  const inputText = store((state) => state.inputText);
  const userInput = store((state) => state.userInput);
  const nextChar = store((state) => state.nextChar);
  const minInputTextLength = store((state) => state.minInputTextLength);
  const isInputTextUpdated = store((state) => state.isInputTextUpdated);
  const setInputText = store((state) => state.setInputText);
  const handleTrain = store((state) => state.handleTrain);
  const handleType = store((state) => state.handleType);
  const handleKeyDown = store((state) => state.handleKeyDown);

  const cleanedText = Array.from(inputText.replace(/[^\p{L}]/gu, "")).length;

  function isAllowedToTrain() {
    if (isInputTextUpdated && cleanedText >= minInputTextLength) {
      return true;
    } else return false;
  }

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
        <button onClick={handleTrain} disabled={!isAllowedToTrain()}>Обучение</button>
        <div className={cleanedText < minInputTextLength ? "counter warn" : "counter"}>
          {cleanedText}/{minInputTextLength} букви необходими за обучение
        </div>
      </div>
      <div className="output-container">
        <div className="ghost-wrapper">
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
            // autoComplete="off"
            // spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
export default App;
