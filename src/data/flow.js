// The Expense Tracker project flow — each stage uses the metaphor that best explains it.
// Mix of Kitchen (preparation, recipes), Restaurant (service, orders), Pantry (storage).

export const FLOW_STEPS = [
  {
    id: 'install',
    num: 1,
    title: 'Installation — Set Up the Kitchen',
    analogy: 'Kitchen Setup',
    summary: 'Install Python (stove/oven), set up the workspace (mise en place), and verify the burners light (python --version).',
    fields: [
      { name: 'python.org download', type: 'source', note: 'Order the commercial stove.' },
      { name: 'Add to PATH', type: 'valve', note: 'Connect gas line to the control panel.' },
      { name: 'python --version', type: 'gauge', note: 'Confirm flame (version shows).' }
    ],
    concepts: ['variables'],
    code: `# Verify your kitchen is ready
python --version

# Create project directory (set up the station)
mkdir expense_tracker && cd expense_tracker
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\activate`
  },
  {
    id: 'auth',
    num: 2,
    title: 'User Registration & Login',
    analogy: 'Member Card System (Restaurant)',
    summary: 'A new guest registers for a member card (credentials stored in the vault). On return, they show the card — the host checks it and seats them.',
    fields: [
      { name: 'username', type: 'string', note: 'Name on the membership card.' },
      { name: 'password (hashed)', type: 'string', note: 'Sealed PIN — never stored in plain text.' },
      { name: 'session', type: 'state', note: 'Active table assignment while guest is present.' }
    ],
    concepts: ['dictionaries', 'functions', 'exceptions', 'database'],
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
    analogy: 'Receiving Stock Delivery (Restaurant)',
    summary: 'A supplier delivers fresh stock. You log it into the inventory: what came in, how much, and when.',
    fields: [
      { name: 'amount', type: 'float', note: 'Quantity delivered.' },
      { name: 'source', type: 'string', note: 'Which supplier brought it.' },
      { name: 'date', type: 'date', note: 'Delivery timestamp on the crate.' }
    ],
    concepts: ['functions', 'operators', 'database'],
    code: `# transactions/add.py
from datetime import datetime

def add_income(user_id, amount, source):
    if amount <= 0:
        raise ValueError("Amount must be positive")
    conn = sqlite3.connect("tracker.db")
    conn.execute(
        "INSERT INTO transactions (type, amount, category, note, date) "
        "VALUES (?, ?, ?, ?, ?)",
        (user_id, "income", amount, "Income", source, datetime.now().isoformat())
    )
    conn.commit()
    conn.close()`
  },
  {
    id: 'expense',
    num: 4,
    title: 'Add / Edit / Delete Expenses',
    analogy: 'Prep Station Workflow (Kitchen)',
    summary: 'Plating expenses: portion out an amount, assign it to a prep station (category), note the recipe. You can reroute (edit) or discard (delete).',
    fields: [
      { name: 'amount', type: 'float', note: 'Portion size going out.' },
      { name: 'category', type: 'dict-key', note: 'Which prep station: Grill / Fry / Salad.' },
      { name: 'note', type: 'string', note: 'Chef\'s note on the ticket.' }
    ],
    concepts: ['conditionals', 'loops', 'dictionaries', 'database', 'exceptions'],
    code: `CATEGORIES = ["Food", "Transport", "Bills", "Entertainment", "Health", "Other"]

def add_expense(user_id, amount, category, note=""):
    if category not in CATEGORIES:
        raise ValueError(f"Invalid station: {category}")
    # INSERT same pattern as income but type="expense"
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
    analogy: 'Order Rail Inspection (Restaurant)',
    summary: 'Run your eyes down the order rail (transaction list). Filter by type of dish, date range, or keyword in the notes.',
    fields: [
      { name: 'filter', type: 'string', note: 'Keyword to match in tickets.' },
      { name: 'range', type: 'date', note: 'From / to service dates.' },
      { name: 'results', type: 'list', note: 'Tickets that pass the filter.' }
    ],
    concepts: ['lists', 'loops', 'strings', 'conditionals'],
    code: `def list_transactions(user_id):
    conn = sqlite3.connect("tracker.db")
    rows = conn.execute(
        "SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC",
        (user_id,)
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
    analogy: 'Budget Ledger (Restaurant)',
    summary: 'Set weekly produce budgets per station. Track what\'s been spent against each envelope. Warn when a station overspends.',
    fields: [
      { name: 'monthly_budget', type: 'float', note: 'Max allowed per station.' },
      { name: 'spent', type: 'float', note: 'What the station has already used.' },
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
    remaining = budget - spent
    if remaining < 0:
        print(f"⚠️  Over budget by {abs(remaining):.2f}")
    return max(remaining, 0)`
  },
  {
    id: 'report',
    num: 7,
    title: 'Monthly Report + Export/Import',
    analogy: 'End-of-Month Inventory & Filing (Restaurant)',
    summary: 'Tally the month\'s receipts, store the archive in the vault (CSV), and import an external ledger via the standard card format (JSON).',
    fields: [
      { name: 'report', type: 'dict', note: 'Totals per station/category.' },
      { name: 'export CSV', type: 'file', note: 'Pour records into a vault file.' },
      { name: 'import JSON', type: 'json', note: 'Couple an external ledger in.' }
    ],
    concepts: ['file', 'json', 'loops', 'dictionaries', 'strings'],
    code: `import csv, json

def export_csv(user_id, filename="transactions.csv"):
    rows = list_transactions(user_id)
    with open(filename, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["id","type","amount","category","note","date"])
        writer.writerows(rows)

def import_json(user_id, filename):
    with open(filename, "r") as f:
        data = json.load(f)
    for txn in data:
        add_transaction(user_id, txn)`
  },
  {
    id: 'exchange',
    num: 8,
    title: 'Live Rates & Currency Convert',
    analogy: 'Currency Exchange Desk (Restaurant)',
    summary: 'When a foreign guest pays, check the live board at the exchange desk for today\'s rate, then convert the bill.',
    fields: [
      { name: 'base/target', type: 'string', note: 'From / to currency booths.' },
      { name: 'rate', type: 'float', note: 'Today\'s board rate (with fallback).' },
      { name: 'converted', type: 'computed', note: 'amount × rate.' }
    ],
    concepts: ['networking', 'restapi', 'json', 'exceptions'],
    code: `import requests

def fetch_exchange_rate(base="USD", target="EUR"):
    try:
        url = f"https://api.exchangerate.host/latest?base={base}&symbols={target}"
        r = requests.get(url, timeout=5)
        r.raise_for_status()
        return r.json()["rates"][target]
    except Exception:
        return 0.92  # fallback rate

def convert(amount, rate):
    return amount * rate`
  },
  {
    id: 'charts',
    num: 9,
    title: 'Visualize — Sales Board',
    analogy: 'Restaurant Sales Board',
    summary: 'A wall board showing tonight\'s sales by dish type, weekly revenue trend, and table turnover — all at a glance.',
    fields: [
      { name: 'series', type: 'list', note: 'Orders grouped by category.' },
      { name: 'chart', type: 'render', note: 'Pie / bar / line drawn on the board.' }
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
    title: 'Logging, Backup & Command Board',
    analogy: 'Kitchen Timers & Command Board (Restaurant)',
    summary: 'Every action is scribbled on the log pad (activity log). Nightly, an auto-backup copies the inventory. At startup, the chef flips switches on the command board.',
    fields: [
      { name: 'log.txt', type: 'file', note: 'Activity scratch pad.' },
      { name: 'backup.db', type: 'file', note: 'Timestamped inventory snapshot.' },
      { name: 'argv', type: 'cli', note: 'Startup switches: backup / export / serve.' }
    ],
    concepts: ['automation', 'file', 'cli', 'exceptions'],
    code: `import sys, shutil, datetime
from utils.log import log_action
from utils.backup import auto_backup

def main():
    if len(sys.argv) > 1:
        if sys.argv[1] == "backup":
            auto_backup()  # flip the backup switch
            return
        if sys.argv[1] == "export":
            export_csv(current_user.id)
            return
    # interactive service loop
    ...

if __name__ == "__main__":
    main()`
  }
]
