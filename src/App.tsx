import { useState } from "react";
import { TEXTS } from "./core/lang/lang";
import { store } from "./core/store/store";
import type { Lang } from "./core/types";
import LangSwitch  from "./components/LangSwitch";
import TrainInput from "./components/TrainInput";
import ActionSection from "./components/ActionSection";
import UserInteractArea from "./components/UserInteractArea";
import "./App.css";

function App() {
  const setInputText = store((state) => state.setInputText);
  const inputText = store((state) => state.inputText);
  const nextChar = store((state) => state.nextChar);
 
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("lang") as Lang) || "en");
  const t = TEXTS[lang]; 
  
  const toggleLang = (next: Lang) => {
    setLang(next);
    localStorage.setItem("lang", next);
  };

  return (
    <div className="App">
      <LangSwitch lang={lang} onToggle={toggleLang}/>
      <div className="app-intro">
        <p> {t.introPart1} <strong>{t.train}</strong> {t.introPart2} </p>
      </div>
      <TrainInput value={inputText} placeholder={t.inputPlaceholder} onChange={setInputText}/>
      <ActionSection inputText={inputText} buttonTitle={t.train} counterLabel={t.counterLabel}/>
      <UserInteractArea nextChar={nextChar} placeholder={t.typePlaceholder}/>
    </div>
  );
}

export default App;
