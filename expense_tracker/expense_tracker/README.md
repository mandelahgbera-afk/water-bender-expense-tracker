# Expense Tracker & Budget Management System (Flask)

A restaurant-style money management app built with Python, Flask, SQLite, Jinja2, CSS, and JavaScript.

## Run

```bash
cd expense_tracker/expense_tracker
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
python app.py
```

Open http://127.0.0.1:5000

## Analogy Guide — How the Pieces Fit

| Python / Flask Concept | Analogy | Role |
|---|---|---|
| Flask app (`app.py`) | Front-of-house manager | Takes orders (requests), delegates to stations (routes), sends plates out (responses). |
| Route (`/dashboard`) | Service station | Each station handles one order type — dashboard, add transaction, delete, budget. |
| Request (GET/POST) | Order ticket | The guest\'s request written on a ticket. GET = "show me", POST = "make it happen". |
| Jinja2 template | Menu layout | How the dish (page) is plated and presented to the guest. |
| SQLite DB (`db.py`) | Walk-in pantry | Permanent, structured storage of ingredients (transactions) and stock levels (budgets). |
| `db.row_factory = sqlite3.Row` | Labeled bins | Access any ingredient by name: `row["amount"]` instead of `row[3]`. |
| Budget progress | Station daily spend gauge | Tracks how much each prep station has used vs its daily allowance. |
| CSV export | Inventory vault dump | Fill a crate (file) with today\'s stock list for the back office. |
| JSON import | Universal ledger card | A standard card format any kitchen can read and import. |
| AJAX / JSON endpoints | Express counter | Quick pickup window — no need to seat the guest at a table (full page reload). |
| Modal dialog | Bar express station | Grab a coffee without waiting for a table. Open a channel without clearing the dining room. |
| Inline edit | Ticket correction at the pass | Fix an order line without reprinting the whole ticket. |
| Live filter | Rail sorter | Scan the order rail, reroute matching tickets to the front. |
| Chart.js | Sales board | A wall board showing tonight\'s moves by category at a glance. |
| Progressive enhancement | Full-service restaurant | Works whether you call in by phone, use the call button, or walk up to the counter. |

## Architecture

| File | Role |
|---|---|
| `app.py` | Front-of-house manager — dashboard, add/edit/delete transaction, budget CRUD, JSON APIs |
| `db.py` | Walk-in pantry — schema, stockers (CRUD), nightly tallies (`get_summary`, `get_spending_by_category`) |
| `templates/base.html` | Menu layout shell — links CSS, Chart.js CDN, toast container, modal mount, app.js |
| `templates/dashboard.html` | Main dining room — summary cards, budget board, order entry, order rail, live sales chart |
| `static/style.css` | Plating & decor — micro-interactions (ripple, modal, toast, row animations, live-pulse bars) |
| `static/app.js` | Express counter — toast, modal, AJAX, inline edit, live filter, charts, ripple buttons |
| `requirements.txt` | Equipment order — Flask>=3.0 |
