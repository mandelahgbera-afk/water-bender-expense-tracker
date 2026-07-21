// Python concepts — each gets the analogy that explains it best.
// Multi-analogy system: kitchen, workshop, restaurant, pantry.
// NOT every concept forced through a single water metaphor.

export const PYTHON_CONCEPTS = [
  {
    id: 'variables',
    title: 'Variables',
    analogy: 'Labeled Jars (Kitchen)',
    icon: '🫙',
    blurb: 'A jar with a painted label. You pour an ingredient (value) inside, close it, and refer to it by name later. The label stays even if you swap the contents.',
    code: 'balance = 500.0\nuser_name = "Aqua"',
    project: 'Holds balance, budget, current_user on the dashboard.',
    quiz: {
      q: 'A variable is best thought of as…?',
      options: ['A pipe', 'A labeled jar', 'A recipe', 'An alarm'],
      answer: 1,
      explain: 'A labeled jar stores an ingredient (value); the label is the variable name.'
    }
  },
  {
    id: 'operators',
    title: 'Operators',
    analogy: 'Measuring & Mixing Tools (Kitchen)',
    icon: '⚖️',
    blurb: 'The tools that transform ingredients: + adds flour to water, - takes salt out, < compares teaspoon to tablespoon.',
    code: 'remaining = budget - spent\nif remaining < 0: warn()',
    project: 'Compute remaining budget, compare spent vs limit.',
    quiz: {
      q: 'The "<" operator is like…?',
      options: ['Mixing bowls', 'A measuring comparison', 'A recipe', 'A filing cabinet'],
      answer: 1,
      explain: 'Comparison operators measure one value against another, like comparing cups.'
    }
  },
  {
    id: 'conditionals',
    title: 'Conditional Statements',
    analogy: 'Recipe Branches (Kitchen)',
    icon: '🔀',
    blurb: 'A recipe says: "If the crust is golden, pull it out; else, keep baking." That branch is an if/else.',
    code: 'if txn == "income":\n    add()\nelse:\n    subtract()',
    project: 'Login success, income vs expense routing, over-budget warning.',
    quiz: {
      q: 'An if/else is like…?',
      options: ['A jar', 'A recipe branch', 'A shelf', 'A timer'],
      answer: 1,
      explain: 'It chooses one path or another based on a condition, just like a recipe decision.'
    }
  },
  {
    id: 'loops',
    title: 'Loops',
    analogy: 'Kneading / Stirring (Kitchen)',
    icon: '🔁',
    blurb: 'A recipe says " Knead for 10 minutes." You repeat the motion until time/condition is met. That\'s a loop — same motion, repeated.',
    code: 'for txn in transactions:\n    print(txn)',
    project: 'Iterate transaction history rows, generate monthly totals.',
    quiz: {
      q: 'A "for" loop is like…?',
      options: ['One stir', 'Kneading — repeated motion', 'A jar', 'An alarm'],
      answer: 1,
      explain: 'It repeats an action for each item, like stirring a pot 50 times.'
    }
  },
  {
    id: 'functions',
    title: 'Functions',
    analogy: 'Recipes (Kitchen)',
    icon: '📜',
    blurb: 'A recipe is a written procedure: ingredients in, steps, result out. Anyone can follow it. You can reuse it, tweak it, pass it to someone else.',
    code: 'def add_expense(amount, cat):\n    save(amount, cat)\n    return balance - amount',
    project: 'add_income(), login(), generate_report() — all are recipes.',
    quiz: {
      q: 'A function is like…?',
      options: ['An ingredient', 'A recipe', 'A label', 'A timer'],
      answer: 1,
      explain: 'A recipe takes inputs, performs steps, and returns a dish (output).'
    }
  },
  {
    id: 'strings',
    title: 'Strings',
    analogy: 'Labels & Recipe Cards (Kitchen)',
    icon: '🏷️',
    blurb: 'Text written on a jar, a recipe card, or a sticky note. You can read it, copy it, search it, or tape two cards together.',
    code: 'msg = "Welcome, " + user_name\n",".join(["10","Food"])',
    project: 'CSV lines, log messages, search queries, jinja2 text output.',
    quiz: {
      q: 'A string carries…?',
      options: ['Only numbers', 'Text as readable labels', 'Files', 'Databases'],
      answer: 1,
      explain: 'Strings are text labels — readable, searchable, joinable.'
    }
  },
  {
    id: 'lists',
    title: 'Lists',
    analogy: 'Shelves / Shopping Lists (Kitchen)',
    icon: '📋',
    blurb: 'A shelf with ordered jars, or a shopping list with numbered items. You can append, remove, or look up by position.',
    code: 'transactions = [t1, t2, t3]\ntransactions.append(new)',
    project: 'Hold rows of transactions in order, category lists.',
    quiz: {
      q: 'A list is like…?',
      options: ['A single jar', 'A shelf with ordered items', 'A filing cabinet', 'A vault'],
      answer: 1,
      explain: 'Lists keep items in sequence — like jars on a shelf in a specific order.'
    }
  },
  {
    id: 'dictionaries',
    title: 'Dictionaries',
    analogy: 'Filing Cabinet / Index (Kitchen)',
    icon: '🗂️',
    blurb: 'A filing cabinet where each drawer has a tag. You don\'t hunt through every drawer — you pull by name: budget["Food"] → open the Food drawer.',
    code: 'budget = {"Food": 200, "Bills": 150}\nspent = budget["Food"]',
    project: 'Categorize expenses, store user records, parse JSON.',
    quiz: {
      q: 'A dictionary is like…?',
      options: ['A shelf (order only)', 'A filing cabinet (look up by name)', 'A jar', 'A timer'],
      answer: 1,
      explain: 'Dictionaries let you find values by key — like pulling a drawer by its label.'
    }
  },
  {
    id: 'file',
    title: 'File Handling',
    analogy: 'Pantry Vaults (Kitchen)',
    icon: '🏺',
    blurb: 'Underground vaults keeping preserves safe when the kitchen shuts down. You open a vault door, pour/withdraw, seal it. Use "with" so it auto-seals.',
    code: 'with open("log.txt","a") as v:\n    v.write("login\\n")',
    project: 'Export CSV, import JSON, write activity log.',
    quiz: {
      q: 'File handling is like…?',
      options: ['Temporary jars', 'Underground vaults/pantry', 'Live stirring', 'A recipe'],
      answer: 1,
      explain: 'Files keep data safe long-term — like a pantry outlasts a single cooking session.'
    }
  },
  {
    id: 'exceptions',
    title: 'Exception Handling',
    analogy: 'Kitchen Alarms (Kitchen)',
    icon: '🚨',
    blurb: 'Smoke detector, timer beep, overflow sensor. When something goes wrong, the alarm triggers a reroute — not a kitchen fire.',
    code: 'try:\n    rate = fetch()\nexcept NetworkError:\n    rate = 1.0',
    project: 'Bad input, DB errors, API failures, file-not-found.',
    quiz: {
      q: 'Exception handling acts as…?',
      options: ['A kitchen fire', 'An alarm + reroute', 'A jar', 'A recipe'],
      answer: 1,
      explain: 'It detects problems and reroutes flow instead of crashing the pipe.'
    }
  },
  {
    id: 'json',
    title: 'JSON',
    analogy: 'Standard Recipe Card (Kitchen)',
    icon: '📝',
    blurb: 'A standardized recipe card format every kitchen understands. You slip it under the door, another kitchen reads it, and they can recreate the dish.',
    code: 'import json\ndata = json.dumps(txn)',
    project: 'Import/export transactions, talk to APIs.',
    quiz: {
      q: 'JSON is best described as…?',
      options: ['A pipe', 'A universal standard format', 'A pump', 'A gauge'],
      answer: 1,
      explain: 'JSON is a universal card format any system can read and write.'
    }
  },
  {
    id: 'networking',
    title: 'Networking',
    analogy: 'Phone-in Orders (Restaurant)',
    icon: '📞',
    blurb: 'Calling another kitchen to source ingredients you don\'t have. You dial their number, place the order, they deliver.',
    code: 'import urllib.request\nr = urlopen(url)',
    project: 'Reach the live exchange-rate service.',
    quiz: {
      q: 'Networking means…?',
      options: ['Calling another kitchen', 'A jar', 'A loop', 'A string'],
      answer: 0,
      explain: 'It\'s making a request to a remote system over the internet.'
    }
  },
  {
    id: 'restapi',
    title: 'REST API',
    analogy: 'Supplier Catalogue (Restaurant)',
    icon: '📖',
    blurb: 'A published catalogue from a wholesale supplier. You request "page 12" (endpoint) and they return a list of available ingredients with prices.',
    code: 'r = requests.get(".../latest?base=USD")\nrates = r.json()["rates"]',
    project: 'Fetch live exchange rates, convert currency.',
    quiz: {
      q: 'A REST API is like…?',
      options: ['A supplier catalogue', 'A vault', 'A loop', 'A jar'],
      answer: 0,
      explain: 'You request a known page and get structured data back — like a catalogue.'
    }
  },
  {
    id: 'database',
    title: 'Database Connectivity',
    analogy: 'Walk-in Pantry / Archive (Restaurant)',
    icon: '🏪',
    blurb: 'A large, organized room where every ingredient has a bin and a label. Unlike a jar (variable), it keeps structured supplies forever, even after closing the kitchen.',
    code: 'conn = sqlite3.connect("tracker.db")\nconn.execute("INSERT ...", (amt,cat))',
    project: 'Store users, transactions, budgets persistently.',
    quiz: {
      q: 'The database is the…?',
      options: ['Temporary jar', 'Permanent walk-in pantry', 'A pump', 'A string'],
      answer: 1,
      explain: 'Unlike in-memory variables, the database persists structured data on disk.'
    }
  },
  {
    id: 'visualization',
    title: 'Data Visualization',
    analogy: 'Sales Dashboard (Restaurant)',
    icon: '📊',
    blurb: 'A wall board showing tonight\'s sales by category. You don\'t read every receipt — the board shows patterns instantly.',
    code: 'plt.bar(categories, amounts)\nplt.show()',
    project: 'Monthly spending, income vs expense, category breakdown charts.',
    quiz: {
      q: 'Data visualization draws…?',
      options: ['A sales dashboard', 'A jar', 'A valve', 'A coupling'],
      answer: 0,
      explain: 'Charts turn raw data into a visual board you can read at a glance.'
    }
  },
  {
    id: 'automation',
    title: 'Automation',
    analogy: 'Timers & Auto-Brew (Kitchen)',
    icon: '⏲️',
    blurb: 'A timer on the oven, an auto-brew coffee maker, a dishwasher cycle. Set it once, it runs unattended.',
    code: 'def auto_backup():\n    shutil.copy("tracker.db","backup.db")',
    project: 'Automatic DB backup, daily reminders, email receipts.',
    quiz: {
      q: 'Automation is…?',
      options: ['Manual stirring', 'Self-running timers', 'A blockage', 'A string'],
      answer: 1,
      explain: 'Timed, unattended cycles run without a bender present.'
    }
  },
  {
    id: 'cli',
    title: 'Command Line Arguments',
    analogy: 'Kitchen Command Board (Restaurant)',
    icon: '🎛️',
    blurb: 'Before opening service, the chef flips switches on the command board: "backup mode", "export menu", "reset pantry". These are startup levers.',
    code: 'if sys.argv[1] == "backup":\n    auto_backup()',
    project: 'python tracker.py backup / export.',
    quiz: {
      q: 'CLI args are like…?',
      options: ['Ingredients', 'Startup switches on a command board', 'A recipe', 'A timer'],
      answer: 1,
      explain: 'They set the initial mode before the program runs.'
    }
  }
]
