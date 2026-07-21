import { useState } from 'react'
import { BUILD_PHASES } from '../data/buildPlan.js'
import { CheckAnim, GearAnim } from './LottieStyleSVG.jsx'

export default function BuildPlan() {
  const [expanded, setExpanded] = useState(null)

  return (
    <div>
      <h2 style={{ marginTop: 0, fontSize: 20, marginBottom: 14 }}>🔨 Build Plan — Phased Implementation</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {BUILD_PHASES.map(phase => {
          const isOpen = expanded === phase.id
          return (
            <div key={phase.id} className="flow-node" style={{ borderColor: isOpen ? phase.color : 'var(--line)' }}>
              <div className="row" style={{ justifyContent: 'space-between', cursor: 'pointer' }}
                onClick={() => setExpanded(isOpen ? null : phase.id)}>
                <div className="row">
                  <div style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: `linear-gradient(100deg, ${phase.color}, ${phase.color}88)`,
                    color: '#04121f', fontWeight: 800, display: 'grid', placeItems: 'center'
                  }}>{phase.num}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: phase.color }}>{phase.title}</div>
                    <div className="tag" style={{ marginTop: 4 }}><span className="water-ico">🌊</span> {phase.analogy}</div>
                  </div>
                </div>
                <div className="row">
                  <span className="tag" style={{ borderColor: phase.color, color: phase.color }}>{phase.duration}</span>
                  <GearAnim size={22} />
                </div>
              </div>

              {isOpen && (
                <div className="fade-up" style={{ marginTop: 14 }}>
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--muted)', marginBottom: 6 }}>Milestones</div>
                    <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text)', fontSize: 13.5, lineHeight: 1.7 }}>
                      {phase.milestones.map((m, i) => (
                        <li key={i} style={{ marginBottom: 2 }}>{m}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--muted)', marginBottom: 6 }}>Key Files</div>
                    <div className="row" style={{ flexWrap: 'wrap', gap: 6 }}>
                      {phase.files.map(f => (
                        <span key={f} className="tag" style={{ borderColor: phase.color, color: phase.color, fontFamily: 'monospace', fontSize: 12 }}>{f}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--muted)', marginBottom: 6 }}>Python Concepts Touched</div>
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
