# Next Character Predictor

Interactive playground for experimenting with a lightweight next character prediction model built with React, TypeScript, Vite, and Zustand. Paste or type a training sample, teach the model, and then type in the playground while the app continually suggests the next character and surfaces the top five candidates.

## Features
- **Local trigram model** - Builds a character transition table across 1-, 2-, and 3-character contexts so predictions respond to short phrases as well as individual letters.
- **Live assistance** - Shows a ghost text area with the currently predicted character and lets you accept suggestions with `Tab` or the right arrow key.
- **Statistics dashboard** - Displays probabilities for the top predictions plus whether a prediction was randomized.
- **Bilingual UI copy** - Switches instructional text between English and Bulgarian with persistence in `localStorage`.
- **Deterministic safeguards** - Requires at least 200 characters of training data and introduces a small randomness factor (`RANDOMISER`) to avoid repetitive outputs.

## Getting Started
### Prerequisites
- Node.js 20 or newer (recommended for compatibility with the provided lockfile)
- npm (bundled with Node.js)

### Installation
```bash
npm install
```

### Available Scripts
| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot reload. |
| `npm run build` | Type-check the project and output a production build. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint across the source files. |

## Using the App
1. **Pick a language** with the toggle in the header so the instructional copy matches your preference.
2. **Provide training text** in the "Train" input. The counter beneath the button must reach the `MIN_INPUT_TEXT_LENGTH` (200 characters) before the button activates.
3. **Train the model**. The app cleans whitespace, builds transition maps (`buildTransitions`), and stores them in a Zustand store.
4. **Start typing** in the "Start typing" area. Every keystroke runs `predictFromLast`, which:
   - Checks the latest 3, 2, then 1 characters for a matching transition table entry.
   - Falls back to a random character (`RANDOMISER = 0.05`) if no context matches or to keep results varied.
5. **Accept predictions** with `Tab` or `ArrowRight`. The accepted character is appended, and a new prediction is generated immediately.
6. **Review statistics**. The sidebar highlights the context length used (for example, "based on last 3 letters"), the probability of each top candidate, and whether the prediction was random.

## Configuration
- `src/core/config.ts` exposes `MIN_INPUT_TEXT_LENGTH` and `RANDOMISER` so you can adjust the minimum training sample size or how often random predictions appear.
- Language copy lives under `src/core/lang`, making it easy to add new locales or tweak the current English and Bulgarian strings.

## Project Structure
```
project root
|-- public/                # Static assets served by Vite
|-- src/
|   |-- components/        # Feature-specific UI pieces (training controls, stats, etc.)
|   |-- core/              # Config, language packs, types, helpers, and Zustand store
|   |-- App.tsx            # Main layout that wires together the UI sections
|   |-- main.tsx           # React entry point
|-- vite.config.ts
```

