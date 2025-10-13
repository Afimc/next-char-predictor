import "./App.css";
import { store } from "./utils/stores/Store";

function App() {
  const inputText = store((state) => state.inputText);
  const userInput = store((state) => state.userInput);
  const nextChar = store((state) => state.nextChar);
  const setInputText = store((state) => state.setInputText);
  const handleTrain = store((state) => state.handleTrain);
  const handleType = store((state) => state.handleType);
  const handleKeyDown = store((state) => state.handleKeyDown);

  return (
    <div className="App">
      <div className="input-container">
        <input
          type="text"
          placeholder="Въведи текст за обучение на алгоритъма"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button onClick={handleTrain}>Обучение</button>
      </div>
      <div className="output-container">
        <div className="ghost-wrapper">
          <div className="ghost-overlay" aria-hidden>
            {userInput}{" "}
            {nextChar && (
              <span className="ghost-suggestion">
                {nextChar}
              </span>
            )}
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
