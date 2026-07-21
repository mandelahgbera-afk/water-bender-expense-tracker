# Expense Tracker & Budget Management System (Flask)

Pure Python + Flask + SQLite + Jinja2 + CSS. No client-side JavaScript.

## Run

```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
python app.py
```

Open http://127.0.0.1:5000

## What it does

- Add income / expense transactions
- Delete transactions
- Set monthly budgets per category with visual progress bars
- Filter transactions by category + date range
- Server-computed budget_progress (remaining, percent, over_budget flag)

## Architecture

| File | Role |
|---|---|
| `app.py` | Flask routes — reads query params, computes budget_progress, renders templates |
| `db.py` | SQLite schema + CRUD + analytics |
| `templates/base.html` | Jinja2 layout shell |
| `templates/dashboard.html` | Full UI (cards, progress bars, forms, table) |
| `static/style.css` | Complete theming (green/red/blue, responsive) |
| `requirements.txt` | Flask>=3.0 |
