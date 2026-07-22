import { useState } from 'react'
import CodeBlock from './CodeBlock.jsx'
import { DropAnim, CheckAnim } from './LottieStyleSVG.jsx'
import { useToast } from './ToastProvider.jsx'

// ConceptCard: micro-teaching unit with states + substates.
// States: idle -> active (expanded) -> learned (marked).
// Interactions: click to expand, cursor-follow glow, "Mark learned" toggle, quiz.
export default function ConceptCard({ concept, state, onSetState }) {
  const [mx, setMx] = useState(50)
  const [my, setMy] = useState(0)
  const [quizOpen, setQuizOpen] = useState(false)
  const [picked, setPicked] = useState(null)
  const toast = useToast()

  const isActive = state === 'active'
  const isLearned = state === 'learned'

  function onClick() {
    if (isLearned) return
    onSetState(isActive ? 'new' : 'active')
  }

  function markLearned(e) {
    e.stopPropagation()
    onSetState(isLearned ? 'active' : 'learned')
    if (!isLearned) toast(`Mastered: ${concept.title} 🌊`)
  }

  function answer(i, e) {
    e.stopPropagation()
    setPicked(i)
    if (i === concept.quiz.answer) toast('Correct! Water flows clearly now 💧')
  }

  return (
    <div
      className={`card concept fade-up ${isActive ? 'is-active' : ''}`}
      style={{ '--mx': `${mx}%`, '--my': `${my}%` }}
      onClick={onClick}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect()
        setMx(((e.clientX - r.left) / r.width) * 100)
        setMy(((e.clientY - r.top) / r.height) * 100)
      }}
    >
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div className="row">
          <div style={{ fontSize: 28 }}>{concept.icon}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{concept.title}</div>
            <div className="tag" style={{ marginTop: 4 }}><span className="water-ico">🌊</span> {concept.analogy}</div>
          </div>
        </div>
        <span className={`state-dot ${isLearned ? 'state-learned' : isActive ? 'state-active' : 'state-new'}`} title={isLearned ? 'Learned' : isActive ? 'Studying' : 'New'} />
      </div>

      <p className="muted" style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5 }}>{concept.blurb}</p>

      {isActive && (
        <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <CodeBlock code={concept.code} />
          <div style={{ fontSize: 12.5, color: 'var(--accent-2)' }}>
            <strong>⚙️ In the project:</strong> {concept.project}
          </div>

          <button className="quiz-opt" onClick={(e) => { e.stopPropagation(); setQuizOpen(o => !o) }}>
            🧪 {quizOpen ? 'Hide' : 'Try a'} quick-check question
          </button>

          {quizOpen && (
            <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 13.5 }}>{concept.quiz.q}</div>
              {concept.quiz.options.map((opt, i) => (
                <div
                  key={i}
                  className={`quiz-opt ${picked === i ? (i === concept.quiz.answer ? 'correct' : 'wrong') : ''}`}
                  onClick={(e) => answer(i, e)}
                >
                  {opt}
                </div>
              ))}
              {picked === concept.quiz.answer && (
                <div className="good" style={{ fontSize: 12.5 }}>✓ {concept.quiz.explain}</div>
              )}
            </div>
          )}

          <div className="row" style={{ justifyContent: 'space-between' }}>
            <span className="tag">{isLearned ? <CheckAnim size={18} /> : <DropAnim size={20} />} {isLearned ? 'Learned' : 'Studying'}</span>
            <button className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: 12 }} onClick={markLearned}>
              {isLearned ? '↺ Review' : '✓ Mark learned'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
