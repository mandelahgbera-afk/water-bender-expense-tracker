// Phased build plan for the ACTUAL Flask Expense Tracker.
// Based on the existing codebase analysis.

export const BUILD_PHASES = [
  {
    id: 'phase1',
    num: 1,
    title: 'Phase 1: Foundation (completed)',
    color: '#34d399',
    analogy: 'Main pipe laid, central reservoir concrete poured, plant operational.',
    duration: 'Done',
    milestones: [
      'Flask app factory in app.py with 5 routes (/dashboard, /add_transaction, /delete_transaction, /set_budget, /delete_budget)',
      'SQLite schema: transactions (type, category, amount, date, note) + budgets (category, monthly_limit) in db.py',
      'Jinja2 templates: base.html (layout) + dashboard.html (full UI — cards, progress bars, forms, table)',
      'Pure CSS theming in static/style.css (green/red/blue, progress bars, badges, responsive)',
      'Server-side budget_progress computation (remaining, percent, over_budget flag)',
      'GET-filtered dashboard (category, start_date, end_date, month)'
    ],
    concepts: ['variables', 'operators', 'conditionals', 'loops', 'functions', 'strings', 'lists', 'dictionaries', 'database', 'exceptions', 'file'],
    files: ['expense_tracker/app.py', 'expense_tracker/db.py', 'expense_tracker/requirements.txt', 'expense_tracker/static/style.css', 'expense_tracker/templates/base.html', 'expense_tracker/templates/dashboard.html']
  },
  {
    id: 'phase2',
    num: 2,
    title: 'Phase 2: Core Transactions',
    color: '#38bdf8',
    analogy: 'Pump stations for add, edit, delete, and search flows.',
    duration: 'Week 2',
    milestones: [
      'Edit transaction route (+ form in dashboard)',
      'Search by keyword (note field) alongside existing category/date filters',
      'Confirm delete with redirect back to filtered dashboard (preserve query params)',
      'Input validation on server (positive amount, required fields)',
      'CSRF protection (Flask-WTF)'
    ],
    concepts: ['functions', 'conditionals', 'loops', 'database', 'exceptions', 'dictionaries', 'lists'],
    files: ['expense_tracker/app.py', 'expense_tracker/templates/dashboard.html', 'expense_tracker/db.py']
  },
  {
    id: 'phase3',
    num: 3,
    title: 'Phase 3: I/O — Export/Import CSV+JSON',
    color: '#22d3ee',
    analogy: 'Reservoir vaults and universal couplings for data portability.',
    duration: 'Week 3',
    milestones: [
      'Export transactions to CSV (csv module, Content-Disposition download)',
      'Import transactions from JSON (json.load, validation loop, batch insert)',
      'Wrap I/O in try/except with user-facing flash messages',
      'Add export/import buttons to dashboard panel'
    ],
    concepts: ['file', 'json', 'functions', 'exceptions', 'lists', 'dictionaries', 'strings'],
    files: ['expense_tracker/app.py', 'expense_tracker/db.py', 'expense_tracker/templates/dashboard.html']
  },
  {
    id: 'phase4',
    num: 4,
    title: 'Phase 4: External Pipes — Currency Rates',
    color: '#a78bfa',
    analogy: 'Open a tap at the public water exchange and bridge reservoirs.',
    duration: 'Week 4',
    milestones: [
      'Create currency service module (fetch_exchange_rate with fallback)',
      'Add "Convert" panel to dashboard (amount + from/to + live rate)',
      'Handle API failure gracefully (fallback rate + flash message)',
      'Cache last-known rate in SQLite to reduce API calls'
    ],
    concepts: ['networking', 'restapi', 'json', 'exceptions', 'dictionaries', 'database'],
    files: ['expense_tracker/currency.py', 'expense_tracker/app.py', 'expense_tracker/db.py', 'expense_tracker/templates/dashboard.html']
  },
  {
    id: 'phase5',
    num: 5,
    title: 'Phase 5: Security, Automation & Polish',
    color: '#fbbf24',
    analogy: 'Self-running pumps, sealed credentials, and final pressure test.',
    duration: 'Week 5',
    milestones: [
      'User registration + login with password hashing (werkzeug.security)',
      'Activity logger (utils/log.py) — spill every action to log.txt',
      'Auto database backup (utils/backup.py) — timestamped snapshots',
      'CLI launcher with argparse (backup, export, reset, run-server levers)',
      'Email receipt generation (smtplib + email.mime — optional)',
      'Flask config class (SECRET_KEY, DEBUG toggle, DB path)'
    ],
    concepts: ['automation', 'cli', 'file', 'exceptions', 'functions', 'strings', 'database'],
    files: ['expense_tracker/auth.py', 'expense_tracker/utils/log.py', 'expense_tracker/utils/backup.py', 'expense_tracker/utils/validators.py', 'expense_tracker/run.py', 'expense_tracker/config.py', 'expense_tracker/app.py']
  }
]
