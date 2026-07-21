"""
app.py
-----
Expense Tracker & Budget Management System
Flask + SQLite + Jinja2.

Interactive layer:
  - All POST endpoints support both HTML form redirects AND JSON AJAX.
  - New /api/* endpoints serve JSON for live JS components.
  - If the client sends X-Requested-With: XMLHttpRequest, the endpoint
    returns JSON instead of redirecting. This keeps the app fully
    functional without JS (progressive enhancement).
"""

from flask import Flask, render_template, request, redirect, url_for, jsonify
import db

app = Flask(__name__)


# ===================== Helpers =====================

def _wants_json():
    return request.headers.get('X-Requested-With') == 'XMLHttpRequest'


def _json_ok(**kwargs):
    return jsonify(success=True, **kwargs)


def _json_err(msg):
    return jsonify(success=False, error=msg), 400


# ===================== Routes =====================

@app.route("/")
def dashboard():
    """
    Main dashboard. Reads filters from query string, queries the DB,
    computes budget_progress in Python, and renders Jinja2.

    When called via AJAX (X-Requested-With header), returns the full
    HTML page (the JS swaps specific fragments out).
    """
    category = request.args.get("category") or None
    start_date = request.args.get("start_date") or None
    end_date = request.args.get("end_date") or None
    month = request.args.get("month") or db.get_current_month()
    q = request.args.get("q") or None  # live keyword filter

    transactions = db.get_transactions(category, start_date, end_date)

    # Keyword filter (applied server-side so the DB does the heavy lifting)
    if q:
        q_lower = q.lower()
        transactions = [
            t for t in transactions
            if q_lower in t["category"].lower()
            or q_lower in (t["note"] or "").lower()
            or q_lower in t["type"].lower()
            or q_lower in str(t["amount"])
        ]

    summary = db.get_summary(month)
    budgets = db.get_budgets()
    spending = db.get_spending_by_category(month)
    categories = db.get_all_categories()

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


# ===================== Transaction CRUD =====================

@app.route("/add_transaction", methods=["POST"])
def add_transaction():
    """
    Add a transaction. Accepts form-encoded (standard HTML form)
    OR JSON body (AJAX modal submit).
    """
    if request.is_json:
        data = request.get_json()
        type_ = data.get("type")
        category = (data.get("category") or "").strip()
        amount = data.get("amount")
        date = data.get("date")
        note = (data.get("note") or "").strip()
    else:
        type_ = request.form.get("type")
        category = request.form.get("category", "").strip()
        amount = request.form.get("amount")
        date = request.form.get("date")
        note = request.form.get("note", "").strip()

    try:
        amount = float(amount)
    except (TypeError, ValueError):
        amount = 0

    if type_ in ("income", "expense") and category and amount > 0 and date:
        db.add_transaction(type_, category, amount, date, note)
        if _wants_json():
            return _json_ok(message="transaction added")
        return redirect(url_for("dashboard"))

    if _wants_json():
        return _json_err("Invalid input")
    return redirect(url_for("dashboard"))


@app.route("/edit_transaction/<int:transaction_id>", methods=["POST"])
def edit_transaction(transaction_id):
    """
    Edit an existing transaction in place. Accepts JSON body from JS.
    Falls back to JSON error on invalid input.
    """
    if not request.is_json:
        return _json_err("Expected JSON body"), 400

    data = request.get_json()
    type_ = data.get("type")
    category = (data.get("category") or "").strip()
    amount = float(data.get("amount") or 0)
    date = data.get("date")
    note = (data.get("note") or "").strip()

    if not (type_ in ("income", "expense") and category and amount > 0 and date):
        return _json_err("Invalid input"), 400

    db.update_transaction(transaction_id, type_, category, amount, date, note)
    return _json_ok(message="transaction updated")


@app.route("/delete_transaction/<int:transaction_id>", methods=["POST"])
def delete_transaction(transaction_id):
    """
    Delete a transaction. Accepts both form POSTs and AJAX (XHR).
    """
    db.delete_transaction(transaction_id)
    if _wants_json():
        return _json_ok(message="transaction deleted")
    return redirect(url_for("dashboard"))


# ===================== Budget CRUD =====================

@app.route("/set_budget", methods=["POST"])
def set_budget():
    """
    Set (upsert) a monthly budget. Supports both form POST and
    JSON body for AJAX modal submit.
    """
    if request.is_json:
        data = request.get_json()
        category = (data.get("category") or "").strip()
        monthly_limit = float(data.get("monthly_limit") or 0)
    else:
        category = request.form.get("category", "").strip()
        monthly_limit = float(request.form.get("monthly_limit") or 0)

    if category and monthly_limit > 0:
        db.set_budget(category, monthly_limit)
        if _wants_json():
            return _json_ok(message="budget set")
        return redirect(url_for("dashboard"))

    if _wants_json():
        return _json_err("Invalid input"), 400
    return redirect(url_for("dashboard"))


@app.route("/delete_budget/<category>", methods=["POST"])
def delete_budget(category):
    db.delete_budget(category)
    if _wants_json():
        return _json_ok(message="budget removed")
    return redirect(url_for("dashboard"))


# ===================== JSON API (for charts and live filter) =====================

@app.route("/api/summary")
def api_summary():
    month = request.args.get("month") or db.get_current_month()
    summary = db.get_summary(month)
    return jsonify(summary)


@app.route("/api/spending_by_category")
def api_spending_by_category():
    month = request.args.get("month") or db.get_current_month()
    spending = db.get_spending_by_category(month)
    return jsonify(spending)


@app.route("/api/budgets")
def api_budgets():
    budgets = db.get_budgets()
    return jsonify(budgets)


# ===================== Bootstrap =====================

if __name__ == "__main__":
    db.init_db()
    app.run(debug=True)
