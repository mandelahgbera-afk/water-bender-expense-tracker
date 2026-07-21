# Water Bender — Expense Tracker (React Teaching Webapp)

A modern React webapp that teaches **Python fundamentals** through a consistent
**water / pipeline / water-bender** analogy, then models the full
**Expense Tracker & Budget Management System** as a pipeline flow.

> Companion to `WATER_BENDER_PYTHON_GUIDE.md` (the written manual).

---

## Run it

```bash
npm install
npm run dev      # opens http://localhost:5173
npm run build    # production build into dist/
```

Stack: **Vite + React 18 + Recharts** (pure CSS, no Tailwind build step, no UI kit).

## Modern / Interactive Features

- **Animated water background** — `WaterBackground.jsx` draws shader-style flowing
  wave bands + rising bubbles on a `<canvas>` (requestAnimationFrame, DPR-aware).
- **Lottie-style SVGs** — `LottieStyleSVG.jsx` hand-builds animated drop, gear, pipe,
  and check icons with CSS/SVG keyframes (no external Lottie runtime).
- **Micro-interactions** — `RippleButton.jsx` (water-ripple on click),
  `ToastProvider.jsx` (global feedback toast), cursor-follow glow on concept cards.
- **Component states & substates**
  - Concept card: `new → active (expanded) → learned` (mastered), shown via state dots.
  - Flow step: `todo → current → done`, with animated pipe connectors.
- **Progress tracking** — live bars for concepts mastered, pipeline stages built, and architecture phases reviewed.
- **Practical Sandbox** — `Sandbox.jsx` gives safe, execution-free "try-it" exercises
  that validate the *shape* of the learner's Python.
- **Live mini-demos** — each flow stage can "Run live mini-demo" to simulate its fields.
- **Real Python code** — every flow stage now shows concrete, copyable Python code
  aligned with the actual project file structure.

---

## The Six Views (Tabs)

| Tab | What it teaches | Interactions |
|---|---|---|
| **💧 Concepts** | 17 micro-teaching cards, one per concept | Filter, expand, cursor-glow, **learned** substate, in-card quiz |
| **🔧 Project Flow** | 10 process components building the tracker | Stage states, concrete Python code, live mini-demo, copy |
| **🏗️ Architecture** | Real Python project file tree | Click to explore files, see concepts per module |
| **🔨 Build Plan** | 5-phase implementation roadmap | Expand phases, milestones, key files, concept mapping |
| **🧪 Sandbox** | Practical "try-it" exercises | Safe expression checker, run/next, per-exercise pass state |
| **📊 Flow Diagram** | Real charts from sample reservoirs | Hover tooltips, animated render |

---

## Components

### `ConceptCard` — Micro-Teaching Unit
Located: `src/components/ConceptCard.jsx`
Shows, for **one Python concept**:
- Icon + title + analogy tag
- Blurb + code block + project tie-in
- In-card quiz with correct/wrong micro-interactions
- Substate: `new → active → learned`

### `FlowStep` — Process Component
Located: `src/components/FlowStep.jsx`
Represents **one stage** of the project pipeline. Contains:
- Step number, title, analogy tag, summary
- **Fields / Valves** (name, colored type, note)
- Concept chips
- **Concrete Python code block** — copyable, from `src/data/flow.js`
- Stage pseudo-code copy + live mini-demo + advance button

### `ArchitectureMap` — Project Blueprint
Located: `src/components/ArchitectureMap.jsx`
Interactive file tree of the actual Python project:
- Grouped by package (`auth/`, `transactions/`, `database/`, etc.)
- Each file shows: purpose, icon, color, linked Python concepts
- Click to expand and reveal concept tags
- Filter by file name or purpose

### `BuildPlan` — Phased Roadmap
Located: `src/components/BuildPlan.jsx`
Five build phases, each with:
- Milestones (bulleted)
- Key files (modules to create)
- Python concepts touched (chip tags)
- Expand/collapse with water-themed animations

### `CodeBlock` — Clipboard Pipe
Located: `src/components/CodeBlock.jsx`
Renders a Python snippet with a copy button and toast feedback.

### `ChartsPanel` — Live Flow Diagram
Located: `src/components/ChartsPanel.jsx`
Three Recharts visuals: Pie (category), Bar (monthly), Line (income vs expense).

### `App` — Shell
Located: `src/App.jsx`
Root orchestrator. State slices: `tab`, `search`, `conceptStates`, `flowDone`, `flowCurrent`, `phasesOpen`.
Renders 6 tab views. Three progress bars at the top.

---

## Data Modules

| File | Purpose |
|---|---|
| `src/data/concepts.js` | 17 Python concept definitions with analogies, code, quizzes |
| `src/data/flow.js` | 10 pipeline stage definitions with concrete Python code |
| `src/data/projectBlueprint.js` | 25-file Python project architecture with purposes |
| `src/data/buildPlan.js` | 5-phase implementation plan with milestones, files, concepts |

---

## Python Concepts Covered

Variables · Operators · Conditional Statements · Loops · Functions · Strings ·
Lists · Dictionaries · File Handling · Exception Handling · JSON · Networking ·
REST API · Database Connectivity · Data Visualization · Automation ·
Command Line Arguments

---

## Next Steps

1. Read `WATER_BENDER_PYTHON_GUIDE.md`.
2. In the webapp, explore **🏗️ Architecture** to see the real file layout.
3. Walk **🔧 Project Flow** stage-by-stage; copy concrete Python code.
4. Use **🔨 Build Plan** as your implementation roadmap.
5. Implement the real Python Expense Tracker (SQLite + requests + matplotlib).
