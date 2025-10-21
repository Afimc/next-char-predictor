import { useMemo, useState } from "react";
import { MIN_INPUT_TEXT_LENGTH } from "../../core/config"
import { buildTransitions } from "../../core/helpers"
import { store } from "../../core/store/store";
import "./TrainButtonSection.css";

interface ActionSectionProps {
  inputText: string;
  buttonTitle: string;
  counterLabel: string;
}
 
function TrainButtonSection({  
  inputText,
  buttonTitle,
  counterLabel,
}:ActionSectionProps) {

  const setTransitions = store((state) => state.setTransitions);
  const [lastTrainedText, setLastTrainedText] = useState("");

  const isAllowedToTrain = useMemo(() => {
    const isDifferent = inputText !== lastTrainedText;
    const hasEnough = inputText.length >= MIN_INPUT_TEXT_LENGTH;
    return isDifferent && hasEnough;
  }, [inputText, lastTrainedText]);
    
  const handleTrain = () => {
    const cleanInputTeext = inputText.replace(/\s+/g, " ")
    const builtTransitions = buildTransitions(cleanInputTeext, MIN_INPUT_TEXT_LENGTH);
    setTransitions(builtTransitions);
    setLastTrainedText(inputText);
  };

  return (
    <div className="button-container">
      <button onClick={handleTrain} disabled={!isAllowedToTrain}>{buttonTitle}</button>
      <div className={inputText.length < MIN_INPUT_TEXT_LENGTH ? "counter warn" : "counter"}>
        {inputText.length}/{MIN_INPUT_TEXT_LENGTH} {counterLabel}
      </div>
    </div>
  )

}

export default TrainButtonSection