// Data: Python concepts mapped to the water / pipeline engineering analogy.
// Each entry powers a "micro-teaching" card in the UI.

export const PYTHON_CONCEPTS = [
  {
    id: 'variables',
    title: 'Variables',
    analogy: 'Labeled Barrels',
    icon: '🛢️',
    blurb: 'A barrel with a painted name in your reservoir. Store a volume (value) and refer to it by name.',
    code: 'balance = 500.0\nuser_name = "Aqua"',
    project: 'Holds balance, budget, current_user.',
    quiz: {
      q: 'What is a variable in the water analogy?',
      options: ['A pipe', 'A labeled barrel', 'A pump station', 'A blockage'],
      answer: 1,
      explain: 'A variable is a labeled barrel storing a volume of water (a value).'
    }
  },
  {
    id: 'operators',
    title: 'Operators',
    analogy: 'Pressure Valves & Flow Math',
    icon: '🔧',
    blurb: 'Valves and gauges that change or compare water volumes: + - * / and gauges > < ==.',
    code: 'remaining = budget - spent\nif remaining < 0: warn()',
    project: 'Compute remaining budget, compare spent vs limit.',
    quiz: {
      q: 'Which operator checks "is remaining below zero"?',
      options: ['remaining = 0', 'remaining < 0', 'remaining > 0', 'remaining + 0'],
      answer: 1,
      explain: 'The "<" comparison gauge reads whether one value is smaller than another.'
    }
  },
  {
    id: 'conditionals',
    title: 'Conditional Statements',
    analogy: 'Forked Pipes',
    icon: '🔀',
    blurb: 'A fork in the main pipe routing water down path A or B based on a gate reading.',
    code: 'if txn == "income":\n    add()\nelse:\n    subtract()',
    project: 'Login success, income vs expense, over-budget warning.',
    quiz: {
      q: 'A conditional statement is like…?',
      options: ['A fork in the pipe', 'A barrel', 'A conveyor', 'A vault'],
      answer: 0,
      explain: 'It routes water down path A or B based on a gate reading.'
    }
  },
  {
    id: 'loops',
    title: 'Loops',
    analogy: 'Recirculating Pumps',
    icon: '🔁',
    blurb: 'A recirculating pump pushing the same stream through a process repeatedly (for / while).',
    code: 'for txn in transactions:\n    print(txn)',
    project: 'Iterate transaction history, generate monthly report.',
    quiz: {
      q: 'A "for" loop is best described as…?',
      options: ['One valve', 'A recirculating pump over buckets', 'A blockage', 'A coupling'],
      answer: 1,
      explain: 'It pushes the same stream through a process once per bucket.'
    }
  },
  {
    id: 'functions',
    title: 'Functions',
    analogy: 'Pump Stations',
    icon: '🏭',
    blurb: 'A pump station: feed water in (args), the bender transforms it, processed water out (return).',
    code: 'def add_expense(amount, cat):\n    save(amount, cat)\n    return balance - amount',
    project: 'add_income(), login(), generate_report().',
    quiz: {
      q: 'A function is like…?',
      options: ['A labeled barrel', 'A pump station', 'A word-stream', 'A gauge'],
      answer: 1,
      explain: 'You feed water in, the bender transforms it, water flows out (return).'
    }
  },
  {
    id: 'strings',
    title: 'Strings',
    analogy: 'Word-Streams',
    icon: '💬',
    blurb: 'A stream of labeled liquid carrying text. Carve, join, or filter it.',
    code: 'msg = "Welcome, " + user_name\n",".join(["10","Food"])',
    project: 'CSV lines, log messages, search queries.',
    quiz: {
      q: 'A string carries…?',
      options: ['Numbers only', 'Text as a word-stream', 'Files', 'Databases'],
      answer: 1,
      explain: 'Strings are streams of labeled liquid carrying text, not just numbers.'
    }
  },
  {
    id: 'lists',
    title: 'Lists',
    analogy: 'Conveyor Belts of Buckets',
    icon: '📦',
    blurb: 'A conveyor carrying ordered buckets of water. Commas are the gaps between buckets.',
    code: 'transactions = [t1, t2, t3]\ntransactions.append(new)',
    project: 'Hold rows of transactions in order.',
    quiz: {
      q: 'A list is like…?',
      options: ['A single barrel', 'A conveyor of ordered buckets', 'A valve panel', 'A vault'],
      answer: 1,
      explain: 'Lists keep buckets of water in flow order; commas separate them.'
    }
  },
  {
    id: 'dictionaries',
    title: 'Dictionaries',
    analogy: 'Tagged Valve Panels',
    icon: '🎛️',
    blurb: 'A control panel where each valve has a name tag (key) and a flow setting (value).',
    code: 'budget = {"Food":200,"Bills":150}\nspent = budget["Food"]',
    project: 'Categorize expenses, store user records, parse JSON.',
    quiz: {
      q: 'In a dictionary, each item has…?',
      options: ['Only a value', 'A name tag (key) + value', 'No order', 'A comma only'],
      answer: 1,
      explain: 'Dictionaries are tagged valve panels: key -> value pairs.'
    }
  },
  {
    id: 'file',
    title: 'File Handling',
    analogy: 'Reservoir Vaults on Disk',
    icon: '🗄️',
    blurb: 'Underground storage vaults keeping water safe when the plant shuts down. Open, pour, seal.',
    code: 'with open("log.txt","a") as v:\n    v.write("login\\n")',
    project: 'Export CSV, import JSON, write activity log.',
    quiz: {
      q: 'File handling is like…?',
      options: ['Temporary barrels', 'Underground vaults on disk', 'Live flow', 'A pump'],
      answer: 1,
      explain: 'Files keep water safe when the plant shuts down; use "with" to auto-seal.'
    }
  },
  {
    id: 'exceptions',
    title: 'Exception Handling',
    analogy: 'Blockage Sensors',
    icon: '🚨',
    blurb: 'Pressure sensors and relief valves that detect a blockage and reroute instead of bursting.',
    code: 'try:\n    rate = fetch()\nexcept NetworkError:\n    rate = 1.0',
    project: 'Bad input, DB errors, API failures, file-not-found.',
    quiz: {
      q: 'Exception handling acts as…?',
      options: ['A blockage that bursts', 'Blockage sensors + relief valves', 'A barrel', 'A chart'],
      answer: 1,
      explain: 'It detects errors and reroutes flow instead of crashing the pipe.'
    }
  },
  {
    id: 'json',
    title: 'JSON',
    analogy: 'Universal Coupling Standard',
    icon: '🔗',
    blurb: 'A standardized pipe coupling every reservoir understands, so water moves between systems.',
    code: 'import json\ndata = json.dumps(txn)',
    project: 'Import/export transactions, talk to APIs.',
    quiz: {
      q: 'JSON is best described as…?',
      options: ['A pipe', 'A universal coupling standard', 'A pump', 'A gauge'],
      answer: 1,
      explain: 'JSON is a standard coupling every reservoir understands for moving water.'
    }
  },
  {
    id: 'networking',
    title: 'Networking',
    analogy: 'Laying Pipes to Other Reservoirs',
    icon: '🌐',
    blurb: 'Digging a pipe to a neighbor reservoir across the land (internet) to pull water.',
    code: 'import urllib.request\nr = urlopen(url)',
    project: 'Reach the live exchange-rate service.',
    quiz: {
      q: 'Networking means…?',
      options: ['Digging a pipe to another reservoir', 'A barrel', 'A loop', 'A string'],
      answer: 0,
      explain: 'It lays pipes across the land (internet) to pull water from elsewhere.'
    }
  },
  {
    id: 'restapi',
    title: 'REST API',
    analogy: 'The Public Water Exchange',
    icon: '💱',
    blurb: 'A public exchange station with a known address. Open a tap, they return live water data.',
    code: 'r = requests.get(".../latest?base=USD")\nrates = r.json()["rates"]',
    project: 'Fetch live exchange rates, convert currency.',
    quiz: {
      q: 'A REST API is like…?',
      options: ['A public water exchange', 'A vault', 'A loop', 'A barrel'],
      answer: 0,
      explain: 'You open a tap at a known address and receive live water (rate) data.'
    }
  },
  {
    id: 'database',
    title: 'Database Connectivity',
    analogy: 'The Central Reservoir',
    icon: '🏞️',
    blurb: 'A permanent underground reservoir (SQLite) where clean structured water lives forever.',
    code: 'conn = sqlite3.connect("tracker.db")\nconn.execute("INSERT ...", (amt,cat))',
    project: 'Store users, transactions, budgets persistently.',
    quiz: {
      q: 'The database is the…?',
      options: ['Temporary barrel', 'Permanent central reservoir', 'A pump', 'A string'],
      answer: 1,
      explain: 'Unlike variables, the reservoir keeps structured water forever on disk.'
    }
  },
  {
    id: 'visualization',
    title: 'Data Visualization',
    analogy: 'Mapping the Flow',
    icon: '📊',
    blurb: 'A flow diagram / pressure map drawn from reservoirs so you see where water goes.',
    code: 'plt.bar(categories, amounts)\nplt.show()',
    project: 'Monthly spending, income vs expense, category breakdown.',
    quiz: {
      q: 'Data visualization draws…?',
      options: ['A flow diagram / pressure map', 'A barrel', 'A valve', 'A coupling'],
      answer: 0,
      explain: 'Charts let you SEE where the water goes across categories and months.'
    }
  },
  {
    id: 'automation',
    title: 'Automation',
    analogy: 'Self-Running Pumps',
    icon: '⚙️',
    blurb: 'Timed, unattended pump cycles — backups, reminders, receipts that run without a bender.',
    code: 'def auto_backup():\n    shutil.copy("tracker.db","backup.db")',
    project: 'Automatic DB backup, daily reminders, email receipts.',
    quiz: {
      q: 'Automation is…?',
      options: ['Manual levers', 'Self-running pump cycles', 'A blockage', 'A string'],
      answer: 1,
      explain: 'Timed, unattended pumps run backups and reminders without a bender.'
    }
  },
  {
    id: 'cli',
    title: 'Command Line Arguments',
    analogy: 'Manual Control Levers',
    icon: '🕹️',
    blurb: 'Manual levers at the plant gate pulled at startup to choose a mode: backup, export.',
    code: 'if sys.argv[1] == "backup":\n    auto_backup()',
    project: 'python tracker.py backup / export.',
    quiz: {
      q: 'Command line arguments are…?',
      options: ['Manual control levers at startup', 'A barrel', 'A pump', 'A chart'],
      answer: 0,
      explain: 'You pull levers like "backup" or "export" when starting the plant.'
    }
  }
]
