import type { Lang } from "../core/types";


interface LangSwitchProps {
  lang: Lang;
  onToggle: (next: Lang) => void;
}

function LangSwitch({ lang, onToggle }: LangSwitchProps) {
    return (
        <div className="lang-switch">
        <button
          className={lang === "bg" ? "active" : ""}
          onClick={() => onToggle("bg")}
          aria-label="Bulgarian"
          title="Български"
        >🇧🇬</button>
        <button
          className={lang === "en" ? "active" : ""}
          onClick={() => onToggle("en")}
          aria-label="English"
          title="English"
        >🇬🇧</button>
      </div>
    )
}

export default LangSwitch