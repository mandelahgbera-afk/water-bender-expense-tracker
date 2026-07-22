import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid
} from 'recharts'

// ChartsPanel: a live "flow diagram" of sample expense data.
const CATEGORY = [
  { name: 'Food', spent: 320 },
  { name: 'Transport', spent: 140 },
  { name: 'Bills', spent: 260 },
  { name: 'Fun', spent: 90 }
]
const MONTHS = [
  { month: 'Jan', income: 2000, expense: 1200 },
  { month: 'Feb', income: 2100, expense: 1500 },
  { month: 'Mar', income: 1900, expense: 1700 },
  { month: 'Apr', income: 2300, expense: 1300 }
]
const COLORS = ['#38bdf8', '#22d3ee', '#34d399', '#fbbf24']

export default function ChartsPanel() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
      <div className="card">
        <div className="tag" style={{ marginBottom: 10 }}><span className="water-ico">📊</span> Category Breakdown</div>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={CATEGORY} dataKey="spent" nameKey="name" outerRadius={70} label>
              {CATEGORY.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <div className="tag" style={{ marginBottom: 10 }}><span className="water-ico">📊</span> Monthly Spending</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={CATEGORY}>
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Bar dataKey="spent" fill="#38bdf8" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <div className="tag" style={{ marginBottom: 10 }}><span className="water-ico">📊</span> Income vs Expense</div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={MONTHS}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e3358" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#34d399" />
            <Line type="monotone" dataKey="expense" stroke="#f87171" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
