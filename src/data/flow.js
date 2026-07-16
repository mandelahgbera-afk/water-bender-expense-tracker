// Data: the Expense Tracker project flow as pipeline stages.
// Each stage is rendered as a "process component" with fields + micro-teaching.

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
    concepts: ['variables']
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
    concepts: ['dictionaries', 'functions', 'exception', 'database']
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
    concepts: ['functions', 'operators', 'database']
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
    concepts: ['conditionals', 'loops', 'dictionaries', 'database', 'exception']
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
    concepts: ['lists', 'loops', 'strings', 'conditionals']
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
    concepts: ['operators', 'conditionals', 'variables']
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
    concepts: ['file', 'json', 'loops', 'dictionaries', 'strings']
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
    concepts: ['networking', 'restapi', 'json', 'exception']
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
    concepts: ['visualization', 'lists', 'dictionaries']
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
    concepts: ['automation', 'file', 'cli', 'exception']
  }
]
