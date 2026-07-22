import { useState } from 'react'
import { BUILD_PHASES } from '../data/buildPlan.js'
import { PROJECT_BLUEPRINT } from '../data/projectBlueprint.js'
import { GearAnim } from './LottieStyleSVG.jsx'

export default function BuildPlan() {
  const [openIds, setOpenIds] = useState({})

  const toggle = (id) => {
    setOpenIds(s => ({ ...s, [id]: !s[id] }))
  }

  return (
    <div>
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
        <h2 style={{ margin: 0, fontSize: 20 }}>🔨 Build Plan — Phased Implementation</h2>
        {PROJECT_BLUEPRINT.repoUrl && (
          <a
            className="btn btn-primary btn-sm"
            href={PROJECT_BLUEPRINT.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            🐙 View on GitHub
          </a>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {BUILD_PHASES.map(phase => {
          const isOpen = !!openIds[phase.id]
          return (
            <div key={phase.id} className={`flow-node phase-node ${isOpen ? 'phase-open' : ''}`}
              style={{ borderColor: isOpen ? phase.color : 'var(--line)' }}>
              <button
                className="phase-header"
                onClick={() => toggle(phase.id)}
                aria-expanded={isOpen}
                style={{ width: '100%', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit' }}
              >
                <div className="row" style={{ justifyContent: 'space-between', width: '100%' }}>
                  <div className="row">
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                      background: `linear-gradient(100deg, ${phase.color}, ${phase.color}88)`,
                      color: '#04121f', fontWeight: 800, display: 'grid', placeItems: 'center'
                    }}>{phase.num}</div>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 700, color: phase.color }}>{phase.title}</div>
                      <div className="tag" style={{ marginTop: 4 }}>
                        <span className="water-ico">🌊</span> {phase.analogy}
                      </div>
                    </div>
                  </div>
                  <div className="row" style={{ gap: 8 }}>
                    <span className="tag" style={{ borderColor: phase.color, color: phase.color }}>
                      {phase.duration}
                    </span>
                    <GearAnim size={22} />
                    <span className={`phase-chevron ${isOpen ? 'phase-chevron-open' : ''}`} aria-hidden="true">▾</span>
                  </div>
                </div>
              </button>

              {isOpen && (
                <div className="phase-body">
                  <div style={{ marginBottom: 10 }}>
                    <div style={{
                      fontSize: 12, textTransform: 'uppercase', letterSpacing: 1,
                      color: 'var(--muted)', marginBottom: 6
                    }}>Milestones</div>
                    <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.7 }}>
                      {phase.milestones.map((m, i) => (
                        <li key={i} style={{ marginBottom: 3 }}>{m}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginBottom: 10 }}>
                    <div style={{
                      fontSize: 12, textTransform: 'uppercase', letterSpacing: 1,
                      color: 'var(--muted)', marginBottom: 6
                    }}>Key Files</div>
                    <div className="row" style={{ flexWrap: 'wrap', gap: 6 }}>
                      {phase.files.map(f => (
                        <span key={f} className="tag" style={{
                          borderColor: phase.color, color: phase.color,
                          fontFamily: 'monospace', fontSize: 12
                        }}>{f}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div style={{
                      fontSize: 12, textTransform: 'uppercase', letterSpacing: 1,
                      color: 'var(--muted)', marginBottom: 6
                    }}>Python Concepts Touched</div>
                    <div className="row" style={{ flexWrap: 'wrap', gap: 6 }}>
                      {phase.concepts.map(c => (
                        <span key={c} className="tag">💧 {c}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
