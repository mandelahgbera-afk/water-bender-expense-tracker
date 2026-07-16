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
  - Concept card: `new` → `active` (expanded) → `learned` (mastered), shown via state dots.
  - Flow step: `todo` → `current` → `done`, with animated pipe connectors.
- **Progress tracking** — live bars for concepts mastered and pipeline stages built.
- **Practical Sandbox** — `Sandbox.jsx` gives safe, execution-free "try-it" exercises
  that validate the *shape* of the learner's Python (e.g. `balance = 1000.0`).
- **Live mini-demos** — each flow stage can "Run live mini-demo" to simulate its fields.

---

## The Four Views (Tabs)

| Tab | What it teaches | Interactions |
|---|---|---|
| **💧 Concepts** | 17 micro-teaching cards, one per concept | Filter, expand, cursor-glow, **learned** substate, in-card quiz |
| **🔧 Project Flow** | 10 process components building the tracker | Stage states (todo/current/done), live mini-demo, copy |
| **🧪 Sandbox** | Practical "try-it" exercises | Safe expression checker, run/next, per-exercise pass state |
| **📊 Flow Diagram** | Real charts from sample reservoirs | Hover tooltips, animated render |

---

## Components

### `ConceptCard` — Micro-Teaching Unit
Located: `src/components/ConceptCard.jsx`
Shows, for **one Python concept**:
- **Icon + title** (e.g. Variables)
- **Analogy tag** (e.g. "Labeled Barrels")
- **Blurb** — plain-English water explanation
- **Code block** — copyable Python snippet
- **"In the project"** line tying it to the Expense Tracker

Fields rendered per card: `icon`, `title`, `analogy`, `blurb`, `code`, `project`.

### `FlowStep` — Process Component
Located: `src/components/FlowStep.jsx`
Represents **one stage** of the project pipeline. Contains:
- **Step number + title**
- **Analogy tag** (e.g. "Forked Pipes + Recirculating Pumps")
- **Summary** — what the stage does
- **Fields / Valves** list — each field has:
  - `name` (e.g. `amount`)
  - `type` (colored tag: `float`, `string`, `date`, `dict-key`, `file`, `json`, `cli`, `computed`…)
  - `note` (what the valve does)
- **Concept chips** — links back to the micro-teaching concepts used
- **Stage pseudo-code block** — copyable

### `CodeBlock` — Clipboard Pipe
Located: `src/components/CodeBlock.jsx`
Renders a Python snippet inside a "pipe cross-section" with a **⧉ Copy** button
that writes to the system clipboard (`useClipboard` hook, `src/hooks/useClipboard.js`)
and shows a transient "✓ Copied" confirmation.

### `ChartsPanel` — Live Flow Diagram
Located: `src/components/ChartsPanel.jsx`
Three Recharts visuals: category **Pie**, monthly **Bar**, income-vs-expense **Line**.

### `App` — Shell
Located: `src/App.jsx`
Holds the tab state, a concept **filter search box**, and lays out the flow with
connecting **pipe-lines** between stages.

---

## The Project Flow (Process Stages)

1. **Installation** — Lay the Main Pipe *(Pipeline Engineering)*
2. **Registration & Login** — Tagged Valve Panel + Blockage Sensors
3. **Add Income** — Pump Station → Central Reservoir
4. **Add / Edit / Delete Expenses** — Forked Pipes + Recirculating Pumps
5. **View & Search History** — Conveyor Belt Inspection
6. **Set Budget & Remaining** — Pressure Gauge Reading
7. **Monthly Report + Export/Import** — Reservoir Vaults + Universal Coupling
8. **Live Rates & Currency Convert** — Public Water Exchange
9. **Visualize** — Mapping the Flow
10. **Logging, Backup & CLI** — Self-Running Pumps + Manual Levers

Each stage's `fields` (name / type / note) live in `src/data/flow.js`.
The 17 concept definitions (title / analogy / blurb / code / project) live in
`src/data/concepts.js`.

---

## Python Concepts Covered

Variables · Operators · Conditional Statements · Loops · Functions · Strings ·
Lists · Dictionaries · File Handling · Exception Handling · JSON · Networking ·
REST API · Database Connectivity · Data Visualization · Automation ·
Command Line Arguments

Each is mapped to its water analogy in both the `.md` guide and the webapp.

---

## Next Steps (for the learner)

1. Read `WATER_BENDER_PYTHON_GUIDE.md`.
2. In the webapp, open **💧 Python Concepts**, filter, and copy snippets to try locally.
3. Walk **🔧 Project Flow** stage-by-stage; copy each stage's pseudo-code.
4. Implement the real Python Expense Tracker (SQLite + requests + matplotlib) using these stages as your blueprint.
