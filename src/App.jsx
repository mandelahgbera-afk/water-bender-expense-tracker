import { useState, useMemo } from 'react'
import { PYTHON_CONCEPTS } from './data/concepts.js'
import { FLOW_STEPS } from './data/flow.js'
import ConceptCard from './components/ConceptCard.jsx'
import FlowStep from './components/FlowStep.jsx'
import ChartsPanel from './components/ChartsPanel.jsx'
import Sandbox from './components/Sandbox.jsx'
import ArchitectureMap from './components/ArchitectureMap.jsx'
import BuildPlan from './components/BuildPlan.jsx'
import WaterBackground from './components/WaterBackground.jsx'
import { ToastProvider } from './components/ToastProvider.jsx'
import RippleButton from './components/RippleButton.jsx'
import { DropAnim } from './components/LottieStyleSVG.jsx'
import { BUILD_PHASES } from './data/buildPlan.js'
import { PROJECT_BLUEPRINT } from './data/projectBlueprint.js'

const TABS = [
  { id: 'concepts', label: '💧 Concepts' },
  { id: 'flow', label: '🔧 Project Flow' },
  { id: 'architecture', label: '🏗️ Architecture' },
  { id: 'plan', label: '🔨 Build Plan' },
  { id: 'sandbox', label: '🧪 Sandbox' },
  { id: 'charts', label: '📊 Flow Diagram' }
]

function Shell() {
  const [tab, setTab] = useState('concepts')
  const [search, setSearch] = useState('')
  const [conceptStates, setConceptStates] = useState({})
  const [flowDone, setFlowDone] = useState({})
  const [flowCurrent, setFlowCurrent] = useState(FLOW_STEPS[0].id)
  const [phasesOpen, setPhasesOpen] = useState({})

  const conceptsById = useMemo(() => {
    const m = {}
    PYTHON_CONCEPTS.forEach(c => { m[c.id] = c })
    return m
  }, [])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return PYTHON_CONCEPTS.filter(c =>
      c.title.toLowerCase().includes(q) || c.analogy.toLowerCase().includes(q) || c.blurb.toLowerCase().includes(q)
    )
  }, [search])

  const learnedCount = Object.values(conceptStates).filter(s => s === 'learned').length
  const doneCount = Object.values(flowDone).filter(Boolean).length
  const conceptPct = Math.round((learnedCount / PYTHON_CONCEPTS.length) * 100)
  const flowPct = Math.round((doneCount / FLOW_STEPS.length) * 100)
  const completedPhases = Object.values(phasesOpen).filter(Boolean).length
  const phasePct = Math.round((completedPhases / BUILD_PHASES.length) * 100)

  function setConceptState(id, st) {
    setConceptStates(s => ({ ...s, [id]: st }))
  }

  function togglePhase(id) {
    setPhasesOpen(s => ({ ...s, [id]: !s[id] }))
  }

  return (
    <div className="app-shell">
      <WaterBackground />

      <header style={{ marginBottom: 22 }}>
        <div className="tag" style={{ marginBottom: 10 }}>
          <DropAnim size={20} /> Water Bender Engineering Manual
        </div>
        <h1 style={{ margin: 0, fontSize: 32 }} className="gradient-text">
          {PROJECT_BLUEPRINT.name}
        </h1>
        <p className="muted" style={{ maxWidth: 780, marginTop: 8, lineHeight: 1.6 }}>
          {PROJECT_BLUEPRINT.description}
        </p>

        <div className="row" style={{ marginTop: 16, gap: 18, flexWrap: 'wrap' }}>
          <div style={{ minWidth: 200, flex: 1 }}>
            <div className="row" style={{ justifyContent: 'space-between', fontSize: 12 }}>
              <span className="muted">Concepts mastered</span>
              <span className="good">{learnedCount}/{PYTHON_CONCEPTS.length}</span>
            </div>
            <div className="progress-track" style={{ marginTop: 6 }}><div className="progress-fill" style={{ width: `${conceptPct}%` }} /></div>
          </div>
          <div style={{ minWidth: 200, flex: 1 }}>
            <div className="row" style={{ justifyContent: 'space-between', fontSize: 12 }}>
              <span className="muted">Pipeline stages built</span>
              <span className="good">{doneCount}/{FLOW_STEPS.length}</span>
            </div>
            <div className="progress-track" style={{ marginTop: 6 }}><div className="progress-fill" style={{ width: `${flowPct}%` }} /></div>
          </div>
          <div style={{ minWidth: 200, flex: 1 }}>
            <div className="row" style={{ justifyContent: 'space-between', fontSize: 12 }}>
              <span className="muted">Architecture phases reviewed</span>
              <span className="good">{completedPhases}/{BUILD_PHASES.length}</span>
            </div>
            <div className="progress-track" style={{ marginTop: 6 }}><div className="progress-fill" style={{ width: `${phasePct}%` }} /></div>
          </div>
        </div>
      </header>

      <nav style={{ marginBottom: 20 }}>
        <div className="tabbar">
          {TABS.map(t => (
            <RippleButton key={t.id} className={tab === t.id ? 'btn btn-primary' : 'btn'} onClick={() => setTab(t.id)}>
              {t.label}
            </RippleButton>
          ))}
        </div>
      </nav>

      {tab === 'concepts' && (
        <section>
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
            <h2 style={{ margin: 0, fontSize: 20 }}>Micro-Teaching: Python Concepts</h2>
            <input className="field" style={{ maxWidth: 280 }} placeholder="🔍 Filter (pipe, barrel, pump)…"
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="grid-cards">
            {filtered.map(c => (
              <ConceptCard key={c.id} concept={c}
                state={conceptStates[c.id] || 'new'}
                onSetState={(st) => setConceptState(c.id, st)} />
            ))}
          </div>
        </section>
      )}

      {tab === 'flow' && (
        <section>
          <h2 style={{ marginTop: 0, fontSize: 20, marginBottom: 6 }}>Process Components: Project Pipeline</h2>
          <p className="muted" style={{ marginTop: 0, marginBottom: 16, maxWidth: 780 }}>
            Each stage is a <strong>process component</strong> with its <strong>fields/valves</strong>, the water analogy,
            linked concepts, concrete Python code, a live mini-demo, and copyable snippets. Mark stages done to advance the pipe.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {FLOW_STEPS.map((s, i) => {
              const status = flowDone[s.id] ? 'done' : (flowCurrent === s.id ? 'current' : 'todo')
              return (
                <div key={s.id}>
                  <FlowStep
                    step={s}
                    conceptsById={conceptsById}
                    status={status}
                    onAdvance={() => {
                      setFlowDone(d => ({ ...d, [s.id]: true }))
                      const next = FLOW_STEPS[i + 1]
                      if (next) setFlowCurrent(next.id)
                    }}
                  />
                  {i < FLOW_STEPS.length - 1 && <div className="pipe-line" style={{ margin: '6px 0 6px 34px' }} />}
                </div>
              )
            })}
          </div>
        </section>
      )}

      {tab === 'architecture' && <ArchitectureMap />}

      {tab === 'plan' && <BuildPlan />}

      {tab === 'sandbox' && <Sandbox />}

      {tab === 'charts' && (
        <section>
          <h2 style={{ marginTop: 0, fontSize: 20, marginBottom: 6 }}>Data Visualization — Mapping the Flow</h2>
          <p className="muted" style={{ marginTop: 0, marginBottom: 16, maxWidth: 780 }}>
            The <strong>flow diagram</strong> stage drawn live from sample reservoirs.
          </p>
          <ChartsPanel />
        </section>
      )}

      <footer style={{ marginTop: 40, borderTop: '1px solid var(--line)', paddingTop: 16 }} className="muted">
        Teaching artifact · See <code>WATER_BENDER_PYTHON_GUIDE.md</code> for the written manual.
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <Shell />
    </ToastProvider>
  )
}
