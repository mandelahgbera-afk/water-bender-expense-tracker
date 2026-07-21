"""
app.py
------
Expense Tracker & Budget Management System
Pure Python + HTML + CSS (no JavaScript).

Every user action (adding a transaction, setting a budget, filtering,
deleting) is handled through a normal HTML <form> POST/GET request.
Flask processes the request, updates the SQLite database, recalculates
all totals/budget usage in Python, and re-renders the dashboard with
Jinja2 templates. There is no client-side scripting at all.
"""

from flask import Flask, render_template, request, redirect, url_for
import db

app = Flask(__name__)


@app.route("/")
def dashboard():
    # Read optional filters from the query string (?category=Food&start_date=...)
    category = request.args.get("category") or None
    start_date = request.args.get("start_date") or None
    end_date = request.args.get("end_date") or None
    month = request.args.get("month") or db.get_current_month()

    transactions = db.get_transactions(category, start_date, end_date)
    summary = db.get_summary(month)
    budgets = db.get_budgets()
    spending = db.get_spending_by_category(month)
    categories = db.get_all_categories()

    # Build a budget progress list: how much of each budget has been used,
    # and whether the category is over budget. This logic lives in Python
    # since there's no JS to compute it on the client.
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

    return render_template(
        "dashboard.html",
        transactions=transactions,
        summary=summary,
        budget_progress=budget_progress,
        categories=categories,
        selected_category=category,
        start_date=start_date,
        end_date=end_date,
        month=month
    )


@app.route("/add_transaction", methods=["POST"])
def add_transaction():
    type_ = request.form.get("type")
    category = request.form.get("category", "").strip()
    amount = request.form.get("amount")
    date = request.form.get("date")
    note = request.form.get("note", "").strip()

    # Basic server-side validation since there's no JS to validate in the browser
    try:
        amount = float(amount)
    except (TypeError, ValueError):
        amount = 0

    if type_ in ("income", "expense") and category and amount > 0 and date:
        db.add_transaction(type_, category, amount, date, note)

    return redirect(url_for("dashboard"))


@app.route("/delete_transaction/<int:transaction_id>", methods=["POST"])
def delete_transaction(transaction_id):
    db.delete_transaction(transaction_id)
    return redirect(url_for("dashboard"))


@app.route("/set_budget", methods=["POST"])
def set_budget():
    category = request.form.get("category", "").strip()
    monthly_limit = request.form.get("monthly_limit")

    try:
        monthly_limit = float(monthly_limit)
    except (TypeError, ValueError):
        monthly_limit = 0

    if category and monthly_limit > 0:
        db.set_budget(category, monthly_limit)

    return redirect(url_for("dashboard"))


@app.route("/delete_budget/<category>", methods=["POST"])
def delete_budget(category):
    db.delete_budget(category)
    return redirect(url_for("dashboard"))


if __name__ == "__main__":
    db.init_db()
    app.run(debug=True)
