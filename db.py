"""
db.py
-----
Handles all database operations for the Expense Tracker & Budget
Management System using SQLite3. Keeping all database logic in one
module keeps app.py focused only on routes (separation of concerns).
"""

import sqlite3
from datetime import datetime

DB_NAME = "expense_tracker.db"


def get_connection():
    """Create and return a new database connection.
    row_factory lets us access columns by name, e.g. row['amount'].
    """
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Create the transactions and budgets tables if they don't exist yet.
    Should be called once when the app starts.
    """
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


# ---------------------------------------------------------------------
# Transaction operations
# ---------------------------------------------------------------------

def add_transaction(type_, category, amount, date, note=""):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO transactions (type, category, amount, date, note) "
        "VALUES (?, ?, ?, ?, ?)",
        (type_, category, amount, date, note)
    )
    conn.commit()
    conn.close()


def delete_transaction(transaction_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM transactions WHERE id = ?", (transaction_id,))
    conn.commit()
    conn.close()


def update_transaction(transaction_id, type_, category, amount, date, note=""):
    """Update an existing transaction row by ID."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE transactions SET type=?, category=?, amount=?, date=?, note=? WHERE id=?",
        (type_, category, amount, date, note, transaction_id)
    )
    conn.commit()
    conn.close()


def get_transactions(category=None, start_date=None, end_date=None):
    """Return transactions, optionally filtered by category and/or a date range.
    Filters are applied only when provided, so calling with no arguments
    returns everything, newest first.
    """
    conn = get_connection()
    cursor = conn.cursor()

    query = "SELECT * FROM transactions WHERE 1=1"
    params = []

    if category:
        query += " AND category = ?"
        params.append(category)
    if start_date:
        query += " AND date >= ?"
        params.append(start_date)
    if end_date:
        query += " AND date <= ?"
        params.append(end_date)

    query += " ORDER BY date DESC, id DESC"

    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()
    return rows


def get_all_categories():
    """Return a sorted list of every category that has ever been used,
    combining both transaction categories and budgeted categories.
    Useful for populating dropdowns in the templates.
    """
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT DISTINCT category FROM transactions")
    tx_categories = {row["category"] for row in cursor.fetchall()}
    cursor.execute("SELECT DISTINCT category FROM budgets")
    budget_categories = {row["category"] for row in cursor.fetchall()}
    conn.close()
    return sorted(tx_categories | budget_categories)


# ---------------------------------------------------------------------
# Budget operations
# ---------------------------------------------------------------------

def set_budget(category, monthly_limit):
    """Insert a new budget or update the limit if the category already
    has one (upsert), since a category should only have one budget.
    """
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO budgets (category, monthly_limit)
        VALUES (?, ?)
        ON CONFLICT(category) DO UPDATE SET monthly_limit = excluded.monthly_limit
    """, (category, monthly_limit))
    conn.commit()
    conn.close()


def get_budgets():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM budgets ORDER BY category ASC")
    rows = cursor.fetchall()
    conn.close()
    return rows


def delete_budget(category):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM budgets WHERE category = ?", (category,))
    conn.commit()
    conn.close()


# ---------------------------------------------------------------------
# Summary / analytics
# ---------------------------------------------------------------------

def get_summary(month=None):
    """Calculate total income, total expense, and balance.
    If month is given (format 'YYYY-MM'), restrict to that month;
    otherwise summarize all transactions ever recorded.
    """
    conn = get_connection()
    cursor = conn.cursor()

    date_filter = ""
    params = []
    if month:
        date_filter = "AND date LIKE ?"
        params.append(f"{month}%")

    cursor.execute(
        f"SELECT COALESCE(SUM(amount), 0) AS total FROM transactions "
        f"WHERE type = 'income' {date_filter}", params
    )
    total_income = cursor.fetchone()["total"]

    cursor.execute(
        f"SELECT COALESCE(SUM(amount), 0) AS total FROM transactions "
        f"WHERE type = 'expense' {date_filter}", params
    )
    total_expense = cursor.fetchone()["total"]

    conn.close()
    return {
        "income": total_income,
        "expense": total_expense,
        "balance": total_income - total_expense
    }


def get_spending_by_category(month=None):
    """Return a dict of {category: amount_spent} for expenses only,
    optionally restricted to a given month ('YYYY-MM').
    """
    conn = get_connection()
    cursor = conn.cursor()

    date_filter = ""
    params = []
    if month:
        date_filter = "AND date LIKE ?"
        params.append(f"{month}%")

    cursor.execute(
        f"SELECT category, COALESCE(SUM(amount), 0) AS total "
        f"FROM transactions WHERE type = 'expense' {date_filter} "
        f"GROUP BY category", params
    )
    rows = cursor.fetchall()
    conn.close()
    return {row["category"]: row["total"] for row in rows}


def get_current_month():
    """Return today's month in 'YYYY-MM' format, used as the default
    period shown on the dashboard."""
    return datetime.now().strftime("%Y-%m")
