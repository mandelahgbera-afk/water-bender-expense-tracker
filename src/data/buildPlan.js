// Phased build plan — restaurant kitchen renovation metaphor.
// Each phase is a stage of opening the restaurant.

export const BUILD_PHASES = [
  {
    id: 'phase1',
    num: 1,
    title: 'Phase 1: Foundation (Kitchen Built & Operational)',
    color: '#34d399',
    analogy: 'The kitchen is built, equipment installed, and first service is running.',
    duration: 'Done',
    milestones: [
      'Flask app as front-of-house manager (5 routes = 5 service stations)',
      'SQLite walk-in pantry with two shelves: transactions + budgets',
      'Jinja2 menu layouts: base.html (shell) + dashboard.html (full dining room)',
      'CSS plating theme (green/red/blue budget board, progress bars, responsive tables)',
      'Server-side budget_progress computation (tally what each station spent)',
      'GET-filtered dashboard (category, date range, month select)'
    ],
    concepts: ['variables', 'operators', 'conditionals', 'loops', 'functions', 'strings', 'lists', 'dictionaries', 'database', 'exceptions', 'file'],
    files: ['expense_tracker/app.py', 'expense_tracker/db.py', 'expense_tracker/requirements.txt', 'expense_tracker/static/style.css', 'expense_tracker/templates/base.html', 'expense_tracker/templates/dashboard.html']
  },
  {
    id: 'phase2',
    num: 2,
    title: 'Phase 2: Core Transactions (Order Management)',
    color: '#38bdf8',
    analogy: 'Adding edit, search, and confirmation flows to the order rail.',
    duration: 'Week 2',
    milestones: [
      'Edit order route (+ inline form in dashboard)',
      'Search by keyword (note field) alongside existing category/date filters',
      'Confirm delete with redirect back to filtered rail (preserve query params)',
      'Server-side input validation (positive amount, required fields)',
      'CSRF protection (Flask-WTF)'
    ],
    concepts: ['functions', 'conditionals', 'loops', 'database', 'exceptions', 'dictionaries', 'lists'],
    files: ['expense_tracker/app.py', 'expense_tracker/templates/dashboard.html', 'expense_tracker/db.py']
  },
  {
    id: 'phase3',
    num: 3,
    title: 'Phase 3: I/O — Export/Import',
    analogy: 'Pantry vaults and universal ledger formats for data portability.',
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
    analogy: 'Opening a line to the currency exchange desk for live rates.',
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
    title: 'Phase 5: Security, Automation & Final Polish',
    analogy: 'Adding timers, sealed credentials, and the final pressure test before opening full service.',
    duration: 'Week 5',
    milestones: [
      'User registration + login with password hashing (werkzeug.security)',
      'Activity logger (utils/log.py) — scribble every action to log.txt',
      'Auto database backup (utils/backup.py) — timestamped snapshots',
      'CLI launcher with argparse (backup, export, reset, serve switches)',
      'Email receipt generation (smtplib + email.mime — optional)',
      'Flask config class (SECRET_KEY, DEBUG toggle, DB path)'
    ],
    concepts: ['automation', 'cli', 'file', 'exceptions', 'functions', 'strings', 'database'],
    files: ['expense_tracker/auth.py', 'expense_tracker/utils/log.py', 'expense_tracker/utils/backup.py', 'expense_tracker/utils/validators.py', 'expense_tracker/run.py', 'expense_tracker/config.py', 'expense_tracker/app.py']
  }
]
