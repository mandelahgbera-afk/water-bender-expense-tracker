import { useState, useCallback } from 'react'
import CodeBlock from './CodeBlock.jsx'
import { DropAnim, CheckAnim } from './LottieStyleSVG.jsx'
import { useToast } from './ToastProvider.jsx'

const STATE_CONFIG = {
  new:      { dot: 'state-new',      label: 'New',      icon: DropAnim },
  active:   { dot: 'state-active',   label: 'Studying', icon: DropAnim },
  learned:  { dot: 'state-learned',  label: 'Learned',  icon: CheckAnim }
}

export default function ConceptCard({ concept, state, onSetState }) {
  const [quizOpen, setQuizOpen] = useState(false)
  const [picked, setPicked] = useState(null)
  const toast = useToast()

  const cfg = STATE_CONFIG[state] || STATE_CONFIG.new
  const IconComp = cfg.icon
  const isLearned = state === 'learned'
  const isActive = state === 'active'

  const handleCardClick = useCallback(() => {
    if (isLearned) return
    onSetState(isActive ? 'new' : 'active')
  }, [isLearned, isActive, onSetState])

  const handleMarkLearned = useCallback((e) => {
    e.stopPropagation()
    const next = isLearned ? 'active' : 'learned'
    onSetState(next)
    if (!isLearned) toast(`Mastered: ${concept.title}`)
  }, [isLearned, onSetState, toast, concept.title])

  const handleAnswer = useCallback((i, e) => {
    e.stopPropagation()
    setPicked(i)
    if (i === concept.quiz.answer) toast('Correct! 💧')
  }, [concept.quiz.answer, toast])

  // Stable cursor tracking — update CSS vars directly to avoid re-render cascade
  const handleMouseMove = useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 100
    const y = ((e.clientY - r.top) / r.height) * 100
    e.currentTarget.style.setProperty('--mx', `${x}%`)
    e.currentTarget.style.setProperty('--my', `${y}%`)
  }, [])

  return (
    <div
      className={`card concept ${isActive ? 'is-active' : ''}`}
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
    >
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div className="row">
          <span style={{ fontSize: 28 }}>{concept.icon}</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{concept.title}</div>
            <div className="tag" style={{ marginTop: 4 }}>
              <span className="water-ico">🌊</span> {concept.analogy}
            </div>
          </div>
        </div>
        <span
          className={`state-dot ${cfg.dot}`}
          title={cfg.label}
          aria-label={cfg.label}
        />
      </div>

      <p className="muted" style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55 }}>
        {concept.blurb}
      </p>

      <div style={{ marginTop: 12 }}>
        <details open={isActive}>
          <summary className="sr-only">Toggle {concept.title} details</summary>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <CodeBlock code={concept.code} />
            <p style={{ fontSize: 12.5, color: 'var(--accent-2)', margin: 0 }}>
              <strong>⚙️ In the project:</strong> {concept.project}
            </p>

            <button
              className="quiz-trigger"
              onClick={(e) => { e.stopPropagation(); setQuizOpen(o => !o) }}
              aria-expanded={quizOpen}
            >
              🧪 {quizOpen ? 'Hide' : 'Try a'} quick-check question
            </button>

            {quizOpen && (
              <div className="quiz-panel">
                <p style={{ margin: '0 0 8px', fontSize: 13.5 }}>{concept.quiz.q}</p>
                {concept.quiz.options.map((opt, i) => {
                  const isCorrect = i === concept.quiz.answer
                  const isWrongPick = picked === i && !isCorrect
                  const isRightPick = picked === i && isCorrect
                  return (
                    <button
                      key={i}
                      className={`quiz-opt ${isRightPick ? 'correct' : ''} ${isWrongPick ? 'wrong' : ''}`}
                      onClick={(e) => handleAnswer(i, e)}
                      disabled={picked !== null}
                    >
                      {opt}
                      {isRightPick && <span className="quiz-check"> ✓</span>}
                    </button>
                  )
                })}
                {picked === concept.quiz.answer && (
                  <p className="good" style={{ fontSize: 12.5, margin: '8px 0 0' }}>
                    {concept.quiz.explain}
                  </p>
                )}
              </div>
            )}

            <div className="row" style={{ justifyContent: 'space-between', marginTop: 4 }}>
              <span className="tag">
                <IconComp size={16} /> {cfg.label}
              </span>
              <button
                className="btn btn-ghost"
                style={{ padding: '6px 12px', fontSize: 12 }}
                onClick={handleMarkLearned}
              >
                {isLearned ? '↺ Review' : '✓ Mark learned'}
              </button>
            </div>
          </div>
        </details>
      </div>
    </div>
  )
}
