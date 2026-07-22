# Expense Tracker & Budget Management System

A restaurant-style money management app built with **Python, Flask, SQLite, Jinja2, CSS, and JavaScript**.

Your teammate can clone this repo and run it in 60 seconds.

---

## Quick Start

```bash
# 1. Clone
git clone https://github.com/mandelahgbera-afk/water-bender-expense-tracker.git
cd water-bender-expense-tracker

# 2. Install
pip install -r requirements.txt

# 3. Run
python app.py
```

Open **http://127.0.0.1:5000**

---

## What's Inside

| File/Folder | Purpose |
|---|---|
| `app.py` | Flask routes — dashboard, add/edit/delete transactions, budget CRUD, JSON APIs |
| `db.py` | SQLite schema + CRUD + analytics (`get_summary`, `get_spending_by_category`) |
| `templates/` | Jinja2 layouts (`base.html`, `dashboard.html`) |
| `static/` | CSS (`style.css`) + interactive JS (`app.js`) |
| `requirements.txt` | Flask>=3.0 |

---

## Features

**Server-side (no JS required):**
- Add income / expense transactions
- Delete transactions
- Set / remove monthly budgets per category
- Budget progress bars (server-computed: percent, over_budget, remaining)
- Filter by category + date range

**Interactive (JS-enhanced):**
- Toast notifications on every action
- Modal add-transaction (quick-add without leaving dashboard)
- Inline edit — click Edit on any row, save without reload
- AJAX delete with smooth row animation
- Live debounced keyword search
- Chart.js pie chart (spending by category)
- Animated budget bars (live-pulse)
- Ripple buttons on every click

All interactive features degrade gracefully — the app works fully without JavaScript via `<noscript>` fallback forms.

---

## Project Structure (Flattened)

```
water-bender-expense-tracker/
├── app.py                  ← Flask routes (5 stations + 3 JSON APIs)
├── db.py                   ← SQLite walk-in pantry (schema + CRUD + tallies)
├── requirements.txt        ← Flask>=3.0
├── static/
│   ├── app.js              ← Interactive foundation (toast, modal, inline edit, live filter, charts)
│   └── style.css           ← Plating + micro-interactions (ripple, modal, toast, row animations)
├── templates/
│   ├── base.html           ← Menu layout shell
│   └── dashboard.html      ← Main dining room (cards, progress, forms, table, chart)
├── teaching/               ← React teaching webapp (optional, for learning)
└── README.md               ← You are here
```

---

## Teaching Webapp (Optional)

The `teaching/` folder contains a separate React + Vite webapp that explains the Python concepts and project architecture with interactive diagrams, quizzes, and a live flow visualization.

```bash
cd teaching
npm install
npm run dev
```

---

## Deployment

**Flask app** — deploy to Render, Railway, Fly.io, or any Python host:
```bash
# On Render: set build command to `pip install -r requirements.txt`
# Set start command to `gunicorn app:app` (install gunicorn first)
```

**Teaching webapp** — already live on Vercel (import the `teaching/` subfolder as a separate project).

---

## License

MIT — free to use, modify, and share.
