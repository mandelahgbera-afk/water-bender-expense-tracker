# Expense Tracker & Budget Management System

A pure **Python + HTML + CSS** web application (no JavaScript) for
tracking income/expenses and managing category budgets.

## Tech Stack
- **Python (Flask)** — routing, business logic, budget calculations
- **SQLite3** — data storage (transactions + budgets tables)
- **Jinja2** — server-side HTML templating
- **HTML** — forms for every user action (add, filter, delete)
- **CSS** — styling, progress bars, color-coded alerts

There is **no JavaScript**. Every action (adding a transaction,
setting a budget, filtering, deleting) submits a normal HTML form and
reloads the page with fresh data computed in Python.

## Project Structure
```
expense_tracker/
├── app.py              # Flask routes
├── db.py                # All SQLite3 database logic
├── requirements.txt
├── templates/
│   ├── base.html         # Shared layout
│   └── dashboard.html    # Main page: cards, budgets, forms, table
└── static/
    └── style.css          # All styling
```

## How to Run

1. Install Flask:
   ```
   pip install -r requirements.txt
   ```

2. Run the app:
   ```
   python app.py
   ```

3. Open your browser to:
   ```
   http://127.0.0.1:5000
   ```

The database file `expense_tracker.db` is created automatically the
first time you run the app.

## Features
- Add income and expense transactions (category, amount, date, note)
- Set a monthly budget limit per category
- Dashboard summary: total income, total expense, balance
- Budget progress bars, with a red "Over Budget" badge when exceeded
- Filter transactions by category and date range
- Delete transactions or budgets
- Fully responsive layout (usable on phone or desktop)

## How It Works (for your defense)
1. A form submits data via `POST` (e.g. `/add_transaction`).
2. Flask reads `request.form`, validates it in Python, and saves it
   to SQLite via functions in `db.py`.
3. Flask redirects back to `/` (the dashboard route).
4. The dashboard route recalculates totals and budget usage in
   Python (`get_summary`, `get_spending_by_category`) and passes
   them into `dashboard.html`.
5. Jinja2 renders the final HTML with the numbers already baked in —
   the browser never runs any calculation itself.
