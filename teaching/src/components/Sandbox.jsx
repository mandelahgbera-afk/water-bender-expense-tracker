import { useState, useCallback } from 'react'
import { useToast } from './ToastProvider.jsx'
import { DropAnim } from './LottieStyleSVG.jsx'

const EXERCISES = [
  {
    id: 'e1',
    prompt: 'Create a barrel "balance" with 1000.0',
    hint: 'balance = 1000.0',
    check: (code) => /balance\s*=\s*1000(\.0)?/.test(code),
    ok: 'balance = 1000.0  # barrel filled 💧'
  },
  {
    id: 'e2',
    prompt: 'Compute remaining = budget - spent (use 500 and 320)',
    hint: 'remaining = 500 - 320',
    check: (code) => /remaining\s*=\s*500\s*-\s*320/.test(code) && /180/.test(code),
    ok: 'remaining = 500 - 320  # 180 left in the pipe'
  },
  {
    id: 'e3',
    prompt: 'Make a list of 3 categories',
    hint: 'cats = ["Food", "Transport", "Bills"]',
    check: (code) => /cats\s*=\s*\[[^\]]*\]/.test(code) && (code.match(/,/g) || []).length >= 2,
    ok: 'cats = ["Food", "Transport", "Bills"]  # 3 buckets on belt'
  }
]

export default function Sandbox() {
  const toast = useToast()
  const [code, setCode] = useState('')
  const [results, setResults] = useState({})
  const [current, setCurrent] = useState(0)

  const ex = EXERCISES[current]

  const run = useCallback(() => {
    const pass = ex.check(code)
    setResults(r => ({ ...r, [ex.id]: pass }))
    toast(pass ? 'Flow correct! 🌊' : 'Not quite — adjust your valves')
  }, [ex, code, toast])

  const next = useCallback(() => {
    if (current < EXERCISES.length - 1) {
      setCurrent(i => i + 1)
    } else {
      toast('All exercises complete! 🏆')
      setCurrent(0)
    }
    setCode('')
  }, [current, toast])

  const jumpTo = useCallback((i) => {
    setCurrent(i)
    setCode('')
  }, [])

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <h2 style={{ margin: 0, fontSize: 20 }}>🧪 Practical Sandbox</h2>
        <span className="tag">
          <DropAnim size={22} /> Exercise {current + 1}/{EXERCISES.length}
        </span>
      </div>

      <p className="muted" style={{ margin: 0 }}>
        Type the Python water-command below. We check the <em>shape</em> of your flow (safe, no execution).
      </p>

      <div className="terminal">
        <div className="prompt">$ {ex.prompt}</div>
        <div className="prompt">$ hint: {ex.hint}</div>
      </div>

      <label className="sr-only" htmlFor="sandbox-input">Python code</label>
      <textarea
        id="sandbox-input"
        className="field"
        rows={3}
        placeholder="Type your Python here…"
        value={code}
        onChange={e => setCode(e.target.value)}
        style={{ fontFamily: 'monospace', resize: 'vertical' }}
      />

      <div className="row" style={{ gap: 10, alignItems: 'center' }}>
        <button className="btn btn-primary" onClick={run}>▶ Run flow</button>
        <button className="btn" onClick={next}>Next exercise →</button>
        {results[ex.id] !== undefined && (
          <span className={`status-pill ${results[ex.id] ? 'good' : 'bad'}`}>
            {results[ex.id] ? `✓ ${ex.ok}` : '✗ check your syntax'}
          </span>
        )}
      </div>

      <nav className="exercise-nav" aria-label="Exercise selector">
        {EXERCISES.map((e, i) => {
          const done = results[e.id] === true
          const failed = results[e.id] === false
          return (
            <button
              key={e.id}
              className={`exercise-chip ${i === current ? 'active' : ''} ${done ? 'done' : ''} ${failed ? 'failed' : ''}`}
              onClick={() => jumpTo(i)}
              aria-pressed={i === current}
              aria-label={`Exercise ${i + 1}${done ? ', completed' : failed ? ', needs retry' : ''}`}
            >
              {done ? '✓' : failed ? '✗' : '○'} Ex {i + 1}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
