import { useState, useCallback } from 'react'
import { useClipboard } from '../hooks/useClipboard.js'
import { useToast } from './ToastProvider.jsx'
import { PipeAnim, GearAnim } from './LottieStyleSVG.jsx'

const FIELD_TYPE_COLOR = {
  string: 'var(--accent)', float: 'var(--good)', date: 'var(--warn)',
  dict: 'var(--accent-2)', 'dict-key': 'var(--accent-2)', list: 'var(--water)',
  file: 'var(--muted)', json: 'var(--accent)', state: 'var(--good)',
  computed: 'var(--warn)', source: 'var(--muted)', valve: 'var(--good)',
  gauge: 'var(--warn)', cli: 'var(--bad)', render: 'var(--accent-2)'
}

function FieldRow({ field }) {
  const color = FIELD_TYPE_COLOR[field.type] || 'var(--muted)'
  return (
    <div className="field-row">
      <span className="tag" style={{ borderColor: color, color }}>{field.type}</span>
      <span style={{ fontWeight: 600, minWidth: 130 }}>{field.name}</span>
      <span className="muted" style={{ fontSize: 12.5 }}>{field.note}</span>
    </div>
  )
}

export default function FlowStep({ step, conceptsById, status, onAdvance }) {
  const { copy } = useClipboard()
  const toast = useToast()
  const [demo, setDemo] = useState(null)

  const pseudo = `# ${step.title}\n# (${step.analogy})\n` +
    step.fields.map(f => `${f.name} = <${f.type}>  # ${f.note}`).join('\n')

  const runDemo = useCallback(() => {
    const names = step.fields.map(f => f.name)
    const sample = {
      amount: '120.00', spent: '540.00', remaining: '460.00',
      monthly_budget: '1000.00', rate: '1.08', converted: '129.60'
    }
    const lines = names.map(n => `${n} → ${sample[n] || '✓ set'}`)
    setDemo(lines)
    toast(`Simulating: ${step.title}`)
  }, [step.fields, step.title, toast])

  const isDone = status === 'done'
  const isCurrent = status === 'current'

  const nodeClass = [
    'flow-node',
    isCurrent ? 'is-current' : '',
    isDone ? 'is-done' : ''
  ].filter(Boolean).join(' ')

  return (
    <div className={nodeClass}>
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 10 }}>
        <div className="row">
          <div className="flow-step-num" aria-label={`Step ${step.num}`}>
            {isDone ? '✓' : step.num}
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>{step.title}</div>
            <div className="tag" style={{ marginTop: 4 }}>
              <span className="water-ico">🔧</span> {step.analogy}
            </div>
          </div>
        </div>
        <div className="row" style={{ gap: 6 }} aria-hidden="true">
          {step.id === 'automation' ? <GearAnim size={26} /> : <PipeAnim size={26} active={isDone} />}
        </div>
      </div>

      <p className="muted" style={{ margin: '0 0 10px', fontSize: 13.5, lineHeight: 1.55 }}>
        {step.summary}
      </p>

      <div style={{ marginBottom: 12 }}>
        <div style={{
          fontSize: 12, textTransform: 'uppercase', letterSpacing: 1,
          color: 'var(--muted)', marginBottom: 4
        }}>Fields / Valves</div>
        {step.fields.map((f, i) => <FieldRow key={i} field={f} />)}
      </div>

      <div className="row" style={{ gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
        {step.concepts.map(c => (
          <span key={c} className="tag" style={{ borderColor: 'var(--accent)' }}>
            💧 {conceptsById[c]?.title || c}
          </span>
        ))}
      </div>

      {step.code && (
        <div style={{ marginBottom: 12 }}>
          <CodeBlock code={step.code} label={`${step.id}.py`} />
        </div>
      )}

      <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
        <button
          className="btn btn-ghost"
          style={{ padding: '6px 12px', fontSize: 12 }}
          onClick={() => { copy(pseudo); toast('Pseudo-code copied') }}
        >
          ⧉ Copy pseudo-code
        </button>
        <button
          className="btn btn-ghost"
          style={{ padding: '6px 12px', fontSize: 12 }}
          onClick={runDemo}
        >
          ▶ Run mini-demo
        </button>
        {!isDone && (
          <button
            className="btn btn-primary"
            style={{ padding: '6px 12px', fontSize: 12 }}
            onClick={onAdvance}
          >
            ✓ Mark done
          </button>
        )}
        {isDone && (
          <span className="tag good" style={{ borderColor: 'var(--good)', color: 'var(--good)' }}>
            ✓ Completed
          </span>
        )}
      </div>

      {demo && (
        <div className="terminal" style={{ marginTop: 12 }}>
          <div className="prompt">$ simulate {step.id}</div>
          {demo.map((l, i) => <div key={i}>  {l}</div>)}
          <div className="prompt">$ done ✓</div>
        </div>
      )}
    </div>
  )
}
