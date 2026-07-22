import { useState } from 'react'
import { FRONTEND_LAYERS } from '../data/frontendUpgrade.js'
import CodeBlock from './CodeBlock.jsx'
import { DropAnim, PipeAnim, GearAnim } from './LottieStyleSVG.jsx'

const ICONS = { 1: DropAnim, 2: PipeAnim, 3: GearAnim }

export default function FrontendUpgrade() {
  const [open, setOpen] = useState(null)

  return (
    <div>
      <h2 style={{ marginTop: 0, fontSize: 20, marginBottom: 6 }}>Frontend Upgrade — Interactive JS Layers</h2>
      <p className="muted" style={{ marginTop: 0, marginBottom: 16, maxWidth: 780 }}>
        A systematic, progressive enhancement of the Flask app. Each layer is a <strong>water-themed interaction</strong>
        that can be added independently without breaking the no-JS fallback.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {FRONTEND_LAYERS.map(layer => {
          const isOpen = open === layer.id
          const IconComp = ICONS[layer.num]
          return (
            <div key={layer.id} className={`flow-node ${isOpen ? 'is-current' : ''}`}>
              <div className="row" style={{ justifyContent: 'space-between', cursor: 'pointer' }}
                onClick={() => setOpen(isOpen ? null : layer.id)}>
                <div className="row">
                  <div className="flow-step-num">{layer.num}</div>
                  <div>
                    <div style={{ fontWeight: 700 }}>{layer.title}</div>
                    <div className="tag" style={{ marginTop: 4 }}><span className="water-ico">🌊</span> {layer.analogy}</div>
                  </div>
                </div>
                <div className="row" style={{ gap: 6 }}>
                  {IconComp && <IconComp size={24} />}
                </div>
              </div>

              <p className="muted" style={{ margin: '10px 0', fontSize: 13.5, lineHeight: 1.5 }}>{layer.summary}</p>

              <div className="row" style={{ gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                {layer.files.map(f => (
                  <span key={f} className="tag" style={{ borderColor: 'var(--accent)', fontFamily: 'monospace', fontSize: 11 }}>📄 {f}</span>
                ))}
                {layer.concepts.map(c => (
                  <span key={c} className="tag">💧 {c}</span>
                ))}
              </div>

              {isOpen && (
                <div className="fade-up">
                  <CodeBlock code={layer.code} label={`layer-${layer.id}.js`} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
