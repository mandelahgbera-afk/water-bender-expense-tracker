// Data: the Expense Tracker project flow as pipeline stages.
// Each stage now includes a concrete Python code example.

export const FLOW_STEPS = [
  {
    id: 'install',
    num: 1,
    title: 'Installation — Lay the Main Pipe',
    analogy: 'Pipeline Engineering',
    summary: 'Install Python (the master pipe kit) and an editor (control room). Verify flow with python --version.',
    fields: [
      { name: 'python.org download', type: 'source', note: 'Order the master pipe kit.' },
      { name: 'Add to PATH', type: 'valve', note: 'Connect valve to your dashboard.' },
      { name: 'python --version', type: 'gauge', note: 'Confirm water gushes (version shows).' }
    ],
    concepts: ['variables'],
    code: `# Verify your pipe is connected
python --version
# Output: Python 3.11.x

# Create the project directory (excavate the plot)
mkdir expense_tracker && cd expense_tracker
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\activate`
  },
  {
    id: 'auth',
    num: 2,
    title: 'User Registration & Login',
    analogy: 'Tagged Valve Panel + Blockage Sensors',
    summary: 'A bender registers (barrel of credentials) and logs in through a forked pipe that checks the central reservoir.',
    fields: [
      { name: 'username', type: 'string', note: 'Labeled barrel for the bender name.' },
      { name: 'password (hashed)', type: 'string', note: 'Sealed water — never stored plain.' },
      { name: 'session', type: 'state', note: 'Open valve while bender is active.' }
    ],
    concepts: ['dictionaries', 'functions', 'exception', 'database'],
    code: `# auth/register.py
import hashlib, sqlite3

def hash_password(pw):
    return hashlib.sha256(pw.encode()).hexdigest()

def register(username, password):
    hashed = hash_password(password)
    conn = sqlite3.connect("tracker.db")
    conn.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, hashed))
    conn.commit()
    conn.close()`
  },
  {
    id: 'income',
    num: 3,
    title: 'Add Income',
    analogy: 'Pump Station → Central Reservoir',
    summary: 'Open the income pump station: feed amount + source, transform, store in the reservoir.',
    fields: [
      { name: 'amount', type: 'float', note: 'Volume of water in.' },
      { name: 'source', type: 'string', note: 'Where the water came from.' },
      { name: 'date', type: 'date', note: 'Timestamp on the bucket.' }
    ],
    concepts: ['functions', 'operators', 'database'],
    code: `# transactions/add.py
from datetime import datetime

def add_income(user_id, amount, source):
    if amount <= 0:
        raise ValueError("Amount must be positive")
    conn = sqlite3.connect("tracker.db")
    conn.execute(
        "INSERT INTO transactions (user_id, type, amount, category, note, date) VALUES (?, ?, ?, ?, ?, ?)",
        (user_id, "income", amount, "Income", source, datetime.now().isoformat())
    )
    conn.commit()
    conn.close()`
  },
  {
    id: 'expense',
    num: 4,
    title: 'Add / Edit / Delete Expenses',
    analogy: 'Forked Pipes + Recirculating Pumps',
    summary: 'Route water to the expense drain, categorize it, and allow re-pumping (edit) or draining out (delete).',
    fields: [
      { name: 'amount', type: 'float', note: 'Volume out.' },
      { name: 'category', type: 'dict-key', note: 'Food / Transport / Bills valve tag.' },
      { name: 'note', type: 'string', note: 'Optional label on the bucket.' }
    ],
    concepts: ['conditionals', 'loops', 'dictionaries', 'database', 'exception'],
    code: `CATEGORIES = ["Food", "Transport", "Bills", "Entertainment", "Health", "Other"]

def add_expense(user_id, amount, category, note=""):
    if category not in CATEGORIES:
        raise ValueError(f"Invalid category: {category}")
    # same INSERT pattern as income but type="expense"
    ...

def edit_expense(txn_id, new_amount=None, new_category=None):
    # recirculating pump: fetch, modify, push back
    ...

def delete_expense(txn_id):
    conn = sqlite3.connect("tracker.db")
    conn.execute("DELETE FROM transactions WHERE id = ?", (txn_id,))
    conn.commit()
    conn.close()`
  },
  {
    id: 'history',
    num: 5,
    title: 'View & Search History',
    analogy: 'Conveyor Belt Inspection',
    summary: 'Run the recirculating pump over the conveyor of buckets; filter by word-stream search.',
    fields: [
      { name: 'filter', type: 'string', note: 'Word-stream to match.' },
      { name: 'range', type: 'date', note: 'From / to gates.' },
      { name: 'results', type: 'list', note: 'Buckets that pass the gate.' }
    ],
    concepts: ['lists', 'loops', 'strings', 'conditionals'],
    code: `def list_transactions(user_id):
    conn = sqlite3.connect("tracker.db")
    rows = conn.execute(
        "SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC", (user_id,)
    ).fetchall()
    conn.close()
    return rows  # list of tuples

def search_transactions(user_id, keyword):
    keyword = keyword.lower()
    return [t for t in list_transactions(user_id)
            if keyword in str(t).lower()]`
  },
  {
    id: 'budget',
    num: 6,
    title: 'Set Budget & Remaining',
    analogy: 'Pressure Gauge Reading',
    summary: 'Paint budget barrels per category; subtract spent water; warn when pressure drops below zero.',
    fields: [
      { name: 'monthly_budget', type: 'float', note: 'Max volume allowed.' },
      { name: 'spent', type: 'float', note: 'Water already drained.' },
      { name: 'remaining', type: 'computed', note: 'budget - spent (operator valve).' }
    ],
    concepts: ['operators', 'conditionals', 'variables'],
    code: `def set_budget(user_id, category, amount):
    conn = sqlite3.connect("tracker.db")
    conn.execute(
        "INSERT OR REPLACE INTO budgets (user_id, category, amount) VALUES (?, ?, ?)",
        (user_id, category, amount)
    )
    conn.commit()
    conn.close()

def get_remaining(user_id, category):
    budget = fetch_budget(user_id, category)
    spent = sum_expenses(user_id, category)
    remaining = budget - spent  # operator valve
    if remaining < 0:
        print(f"⚠️  Over budget by {abs(remaining):.2f}")
    return max(remaining, 0)`
  },
  {
    id: 'report',
    num: 7,
    title: 'Monthly Report + Export/Import',
    analogy: 'Reservoir Vaults + Universal Coupling',
    summary: 'Summarize the month, pour records into a CSV vault, and import JSON via the standard coupling.',
    fields: [
      { name: 'report', type: 'dict', note: 'Totals per category.' },
      { name: 'export CSV', type: 'file', note: 'Pour to a vault on disk.' },
      { name: 'import JSON', type: 'json', note: 'Couple external water in.' }
    ],
    concepts: ['file', 'json', 'loops', 'dictionaries', 'strings'],
    code: `import csv, json

def export_csv(user_id, filename="transactions.csv"):
    rows = list_transactions(user_id)
    with open(filename, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["id","type","amount","category","note","date"])
        writer.writerows(rows)  # pour to vault

def import_json(user_id, filename):
    with open(filename, "r") as f:
        data = json.load(f)  # standard coupling
    for txn in data:
        add_transaction(user_id, txn)`
  },
  {
    id: 'exchange',
    num: 8,
    title: 'Live Rates & Currency Convert',
    analogy: 'Public Water Exchange',
    summary: 'Dig a pipe to the exchange, open a tap for live rates, then convert expenses through the coupling.',
    fields: [
      { name: 'base/target', type: 'string', note: 'Which reservoirs to bridge.' },
      { name: 'rate', type: 'float', note: 'Live water reading (with fallback).' },
      { name: 'converted', type: 'computed', note: 'amount * rate.' }
    ],
    concepts: ['networking', 'restapi', 'json', 'exception'],
    code: `import requests

def fetch_exchange_rate(base="USD", target="EUR"):
    try:
        url = f"https://api.exchangerate.host/latest?base={base}&symbols={target}"
        r = requests.get(url, timeout=5)
        r.raise_for_status()
        return r.json()["rates"][target]  # live reading
    except Exception:
        return 0.92  # relief valve: cached fallback

def convert(amount, rate):
    return amount * rate  # bridge the reservoirs`
  },
  {
    id: 'charts',
    num: 9,
    title: 'Visualize — Mapping the Flow',
    analogy: 'Flow Diagram',
    summary: 'Draw the pressure map: monthly spending, income vs expense, category breakdown.',
    fields: [
      { name: 'series', type: 'list', note: 'Buckets grouped by category.' },
      { name: 'chart', type: 'render', note: 'Bar / pie / line drawn.' }
    ],
    concepts: ['visualization', 'lists', 'dictionaries'],
    code: `import matplotlib.pyplot as plt

def plot_category_pie(expenses):
    cats = {}
    for e in expenses:
        cats[e["category"]] = cats.get(e["category"], 0) + e["amount"]
    labels, sizes = zip(*cats.items())
    plt.pie(sizes, labels=labels, autopct="%1.1f%%")
    plt.title("Spending by Category")
    plt.show()

def plot_monthly_bar(monthly_data):
    months = list(monthly_data.keys())
    totals = list(monthly_data.values())
    plt.bar(months, totals)
    plt.title("Monthly Spending")
    plt.show()`
  },
  {
    id: 'automation',
    num: 10,
    title: 'Logging, Backup & CLI',
    analogy: 'Self-Running Pumps + Manual Levers',
    summary: 'Spill every action to a log vault, auto-backup the reservoir, and pull levers (backup/export) at startup.',
    fields: [
      { name: 'log.txt', type: 'file', note: 'Activity spillway.' },
      { name: 'backup.db', type: 'file', note: 'Snapshot of reservoir.' },
      { name: 'argv', type: 'cli', note: 'backup / export lever.' }
    ],
    concepts: ['automation', 'file', 'cli', 'exception'],
    code: `import sys, shutil, datetime
from utils.log import log_action
from utils.backup import auto_backup

def main():
    if len(sys.argv) > 1:
        if sys.argv[1] == "backup":
            auto_backup()  # pull the lever
            return
        if sys.argv[1] == "export":
            export_csv(current_user.id)
            return
    # interactive loop
    ...

if __name__ == "__main__":
    main()`
  }
]
