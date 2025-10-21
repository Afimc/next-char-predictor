import { useRef } from "react";
import { predictFromLast } from "../../core/helpers";
import { store } from "../../core/store/store";
import './UserInteractArea.css';

interface UserInteractAreaProps {
  nextChar?: string;
  placeholder: string;
  spellCheck?: boolean;
}

function UserInteractArea({
  nextChar,
  placeholder,
  spellCheck = false,
}: UserInteractAreaProps) {

  const transitions = store((state) => state.transitions);
  const userInput = store((state) => state.userInput)
  const setUserInput = store((state) => state.setUserInput);
  const setNextChar = store((state) => state.setNextChar);
  const setLastStats = store((state) => state.setLastStats);
    
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const ghostRef = useRef<HTMLTextAreaElement | null>(null);

  const handleScroll = () => {
    if (textRef.current && ghostRef.current) {
      ghostRef.current.scrollTop = textRef.current.scrollTop;
    }
  };

    const handleType = (value: string) => {
    setUserInput(value);
    const {char, stats} = predictFromLast(value, transitions);
    setNextChar(char);
    setLastStats(stats);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>)=> {
    if ((e.key === "Tab" || e.key === "ArrowRight") && nextChar) {
      e.preventDefault();
      const accepted = userInput + nextChar;
      setUserInput(accepted);
      const {char, stats} = predictFromLast(accepted, transitions);
      setNextChar(char);
      setLastStats(stats);
    }
  };

  return (
    <div className="output-container">
      <textarea
        className="textarea"
        placeholder={placeholder}
        value={userInput}
        ref={textRef}
        spellCheck={spellCheck}
        onChange={(e) => handleType(e.target.value)}
        onKeyDown={handleKeyDown}
        onScroll={handleScroll}
      />
      <textarea
        className="ghostTextarea"
        value={userInput + " " + (nextChar || "")}
        readOnly
        ref={ghostRef}
        spellCheck={false}
        aria-hidden
        tabIndex={-1}
        onFocus={(e) => e.preventDefault()}
      />
    </div>
  );
}


export default UserInteractArea