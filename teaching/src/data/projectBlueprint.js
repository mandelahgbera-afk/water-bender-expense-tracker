// The Python project file structure — explained as a restaurant kitchen.
// Flask app = front-of-house, routes = service stations, DB = walk-in pantry,
// Templates = menu layouts, CSS = plating, AJAX = express counter.

export const PROJECT_BLUEPRINT = {
  name: 'expense_tracker',
  root: 'expense_tracker/',
  repoUrl: 'https://github.com/mandelahgbera-afk/expense-tracker',
  description: 'A Flask-based restaurant for money management. The front-of-house (Flask app) takes orders, the walk-in pantry (SQLite) stores ingredients (transactions), and the menu layouts (Jinja2) plate the experience.',
  files: [
    {
      path: 'expense_tracker/app.py',
      purpose: 'Front-of-house manager — 5 service stations (routes): dashboard, add transaction, edit, delete, budget set/remove. Reads order tickets (query params), checks the pantry (DB), computes budget tallies, sends plates to the pass (Jinja2 render).',
      concepts: ['functions', 'conditionals', 'loops', 'operators', 'dictionaries', 'lists', 'database', 'exceptions', 'cli'],
      icon: '🎩'
    },
    {
      path: 'expense_tracker/db.py',
      purpose: 'Walk-in pantry + inventory system — schema (what bins we have), stockers (CRUD), and nightly tallies (summary analytics).',
      concepts: ['database', 'functions', 'exceptions', 'dictionaries', 'lists', 'file'],
      icon: '🏪'
    },
    {
      path: 'expense_tracker/requirements.txt',
      purpose: 'Equipment order — what to install before opening.',
      concepts: ['file'],
      icon: '📦'
    },
    {
      path: 'expense_tracker/static/style.css',
      purpose: 'Plating and decor — the visual presentation of every dish (page). Colors, spacing, responsive layout.',
      concepts: ['strings', 'file'],
      icon: '🎨'
    },
    {
      path: 'expense_tracker/templates/base.html',
      purpose: 'Menu layout shell — the template every dish (page) is plated on. Holds the logo, nav, footer.',
      concepts: ['strings', 'file'],
      icon: '📄'
    },
    {
      path: 'expense_tracker/templates/dashboard.html',
      purpose: 'Main dining room view — today\'s summary cards, budget progress board, order entry form, order rail (table), and live sales charts.',
      concepts: ['strings', 'dictionaries', 'lists', 'loops', 'conditionals', 'file'],
      icon: '🍽️'
    }
  ]
}
