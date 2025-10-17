import { useMemo, useRef, useState } from "react";
import { MIN_INPUT_TEXT_LENGTH } from "./core/config";
import { TEXTS } from "./core/lang/lang";
import { buildTransitions, predictFromLast } from "./core/helpers";
import { store } from "./core/store/store";
import type { Lang } from "./core/types";
import "./App.css";

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
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("lang") as Lang) || "en");

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const ghostTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const t = TEXTS[lang];
  
  const isAllowedToTrain = useMemo(() => {
    const isDifferent = inputText !== lastTrainedText;
    const hasEnough = inputText.length >= MIN_INPUT_TEXT_LENGTH;
    return isDifferent && hasEnough;
  }, [inputText, lastTrainedText]);
  
  const toggleLang = (next: Lang) => {
    setLang(next);
    localStorage.setItem("lang", next);
  };

  const handleTrain = () => {
    const cleanInputTeext = inputText.replace(/\s+/g, " ")
    const builtTransitions = buildTransitions(cleanInputTeext, MIN_INPUT_TEXT_LENGTH);
    setTransitions(builtTransitions);
    setLastTrainedText(inputText);
  };

  const handleType = (value: string) => {
    setUserInput(value);
    const predicted = predictFromLast(value, transitions);
    setNextChar(predicted);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>)=> {
    if ((e.key === "Tab" || e.key === "ArrowRight") && nextChar) {
      e.preventDefault();
      const accepted = userInput + nextChar;
      setUserInput(accepted);
      const predicted = predictFromLast(accepted, transitions);
      setNextChar(predicted);
    }
  };

  const handleScroll = () => {
    if (ghostTextareaRef.current && textareaRef.current) {
      ghostTextareaRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  return (
    <div className="App">
      <div className="lang-switch">
        <button
          className={lang === "bg" ? "active" : ""}
          onClick={() => toggleLang("bg")}
          aria-label="Bulgarian"
          title="Български"
        >🇧🇬</button>
        <button
          className={lang === "en" ? "active" : ""}
          onClick={() => toggleLang("en")}
          aria-label="English"
          title="English"
        >🇬🇧</button>
      </div>
      <div className="app-intro">
        <p> {t.introPart1} <strong>{t.train}</strong> {t.introPart2} </p>
      </div>
      <div className="input-container">
        <textarea
          className="input-textarea"
          placeholder={t.inputPlaceholder}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button onClick={handleTrain} disabled={!isAllowedToTrain}>
          {t.train}
        </button>
        <div className={inputText.length < MIN_INPUT_TEXT_LENGTH ? "counter warn" : "counter"}>
          {inputText.length}/{MIN_INPUT_TEXT_LENGTH} {t.counterLabel}
        </div>
      </div>
      <div className="output-container" >
        <textarea
          className="textarea"
          placeholder={t.typePlaceholder}
          value={userInput}
          ref={textareaRef}
          spellCheck={false}
          onChange={(e) => handleType(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll} 
        />
        <textarea
          className="ghostTextarea"
          value={userInput + " " + (nextChar || '')}
          readOnly
          ref={ghostTextareaRef}
          spellCheck={false}
          aria-hidden
          tabIndex={-1}
          onFocus={(e) => e.preventDefault()}
        />
      </div>
    </div>
  );
}

export default App;
