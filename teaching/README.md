# Teaching Webapp — Water Bender's Expense Tracker

An interactive React + Vite teaching app that explains Python fundamentals and the Expense Tracker project architecture through multi-analogy micro-teaching cards, quizzes, live charts, and an architecture blueprint.

## Run

```bash
npm install
npm run dev      # opens http://localhost:5173
npm run build    # production build into dist/
```

## What's Inside

| Tab | Content |
|---|---|
| **💧 Concepts** | 17 micro-teaching cards (Variables → CLI) with best-fit analogies, quizzes, and code snippets |
| **🔧 Project Flow** | 10 process components mapping each Flask stage to concrete Python code |
| **🏗️ Architecture** | Interactive file tree of the actual Flask project (`app.py`, `db.py`, templates, static) |
| **🔨 Build Plan** | 5-phase implementation roadmap with milestones and file mappings |
| **🎨 Frontend Upgrade** | 9 interactive JS layers (toast, modal, ripple, inline edit, AJAX, live filter, charts, progressive enhancement) |
| **🧪 Sandbox** | Safe "try-it" exercises validating Python code shape |
| **📊 Flow Diagram** | Live Recharts pie/bar/line charts from sample data |

## Deploy

Import this `teaching/` folder into Vercel as a **separate project** (Framework: Vite). It auto-detects `package.json` and builds with `npm run build`.

## Note

This is a **teaching companion** — the actual runnable Expense Tracker lives at the **repo root** (`app.py`, `db.py`, `templates/`, `static/`).
