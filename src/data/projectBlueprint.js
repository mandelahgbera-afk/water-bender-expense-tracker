// The ACTUAL Python project file structure for the Expense Tracker.
// Flask + SQLite + Jinja2 — pure server-rendered, no client-side JS.

export const PROJECT_BLUEPRINT = {
  name: 'expense_tracker',
  root: 'expense_tracker/',
  description: 'A Flask-based Expense Tracker & Budget Management System using SQLite, Jinja2 templates, and pure CSS. All logic lives server-side; every action is a POST/GET form handled by Flask.',
  files: [
    {
      path: 'expense_tracker/app.py',
      purpose: 'Flask routes — dashboard, add_transaction, delete_transaction, set_budget, delete_budget. Reads query params, queries db, computes budget_progress in Python, renders Jinja2 template.',
      concepts: ['functions', 'conditionals', 'loops', 'operators', 'dictionaries', 'lists', 'database', 'exceptions', 'cli'],
      icon: '🚀',
      concrete: `from flask import Flask, render_template, request, redirect, url_for
import db

app = Flask(__name__)

@app.route("/")
def dashboard():
    category = request.args.get("category") or None
    start_date = request.args.get("start_date") or None
    end_date = request.args.get("end_date") or None
    month = request.args.get("month") or db.get_current_month()

    transactions = db.get_transactions(category, start_date, end_date)
    summary = db.get_summary(month)
    budgets = db.get_budgets()
    spending = db.get_spending_by_category(month)
    categories = db.get_all_categories()

    # Budget progress computed server-side
    budget_progress = []
    for b in budgets:
        spent = spending.get(b["category"], 0)
        limit = b["monthly_limit"]
        percent = min(round((spent / limit) * 100), 100) if limit > 0 else 0
        over_budget = spent > limit
        budget_progress.append({
            "category": b["category"],
            "limit": limit,
            "spent": spent,
            "percent": percent,
            "over_budget": over_budget,
            "remaining": limit - spent
        })

    return render_template("dashboard.html",
        transactions=transactions, summary=summary,
        budget_progress=budget_progress, categories=categories,
        selected_category=category, start_date=start_date,
        end_date=end_date, month=month)`
    },
    {
      path: 'expense_tracker/db.py',
      purpose: 'Database module — SQLite connection factory, schema creation (transactions + budgets), CRUD helpers, summary analytics (get_summary, get_spending_by_category, get_all_categories).',
      concepts: ['database', 'functions', 'exceptions', 'dictionaries', 'lists', 'file'],
      icon: '🏞️',
      concrete: `import sqlite3
from datetime import datetime

DB_NAME = "expense_tracker.db"

def get_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row  # access columns by name
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
            category TEXT NOT NULL,
            amount REAL NOT NULL,
            date TEXT NOT NULL,
            note TEXT
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS budgets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT NOT NULL UNIQUE,
            monthly_limit REAL NOT NULL
        )
    """)
    conn.commit()
    conn.close()

def add_transaction(type_, category, amount, date, note=""):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO transactions (type, category, amount, date, note) VALUES (?, ?, ?, ?, ?)",
        (type_, category, amount, date, note))
    conn.commit()
    conn.close()`
    },
    {
      path: 'expense_tracker/requirements.txt',
      purpose: 'Single dependency: Flask>=3.0. No JS/CSS frameworks — pure Python + HTML + CSS.',
      concepts: ['file'],
      icon: '📦',
      concrete: 'Flask>=3.0'
    },
    {
      path: 'expense_tracker/static/style.css',
      purpose: 'Complete UI styling — CSS custom properties (green/red/blue theme), summary cards, budget progress bars (green/red when over), form grid, tables, badges, responsive breakpoints.',
      concepts: ['strings', 'file'],
      icon: '🎨',
      concrete: `:root {
    --green: #1a7f4e; --green-light: #e6f6ee;
    --red: #c0392b; --red-light: #fdecea;
    --blue: #2563eb; --gray-bg: #f5f6f8;
}
/* ... 272 lines of pure CSS, no JS */
.progress-bar-fill { background: var(--green); border-radius: 999px; }
.progress-bar-fill.over { background: var(--red); }`
    },
    {
      path: 'expense_tracker/templates/base.html',
      purpose: 'Jinja2 base layout — declares blocks (title, content). Links static/style.css. Server-rendered shell; no JS scripts.',
      concepts: ['strings', 'file'],
      icon: '📄',
      concrete: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{% block title %}Expense Tracker{% endblock %}</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
</head>
<body>
    <header class="topbar">
        <h1>💰 Expense Tracker & Budget Manager</h1>
    </header>
    <main class="container">
        {% block content %}{% endblock %}
    </main>
    <footer class="footer">
        <p>Built with Python, Flask, SQLite3, HTML & CSS — no JavaScript.</p>
    </footer>
</body>
</html>`
    },
    {
      path: 'expense_tracker/templates/dashboard.html',
      purpose: 'Main view — extends base.html. Renders: summary cards (Income/Expense/Balance), budget progress bars, add-transaction form, filter form, transactions table with delete. Pure Jinja2 loops — no JS.',
      concepts: ['strings', 'dictionaries', 'lists', 'loops', 'conditionals', 'file'],
      icon: '📊',
      concrete: `{% extends "base.html" %}
{% block content %}
<section class="summary-cards">
    <div class="card income-card">
        <h3>Total Income</h3>
        <p class="amount">₦{{ "%.2f"|format(summary.income) }}</p>
    </div>
    <div class="card expense-card">
        <h3>Total Expense</h3>
        <p class="amount">₦{{ "%.2f"|format(summary.expense) }}</p>
    </div>
    <div class="card balance-card {{ 'negative' if summary.balance < 0 else '' }}">
        <h3>Balance</h3>
        <p class="amount">₦{{ "%.2f"|format(summary.balance) }}</p>
    </div>
</section>
{# ... budget progress, forms, table ... #}
{% endblock %}`
    }
  ]
}
