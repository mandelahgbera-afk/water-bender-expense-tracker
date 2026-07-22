import { useState, useCallback } from 'react'
import { FRONTEND_LAYERS } from '../data/frontendUpgrade.js'
import CodeBlock from './CodeBlock.jsx'
import { DropAnim, PipeAnim, GearAnim, CheckAnim } from './LottieStyleSVG.jsx'

const LAYER_ICONS = {
  1: DropAnim,
  2: PipeAnim,
  3: GearAnim,
  4: CheckAnim,
  5: GearAnim,
  6: PipeAnim,
  7: DropAnim,
  8: PipeAnim,
  9: CheckAnim
}

export default function FrontendUpgrade() {
  const [openIds, setOpenIds] = useState({})

  const toggle = useCallback((id) => {
    setOpenIds(s => ({ ...s, [id]: !s[id] }))
  }, [])

  return (
    <div>
      <h2 style={{ marginTop: 0, fontSize: 20, marginBottom: 6 }}>Frontend Upgrade — Interactive JS Layers</h2>
      <p className="muted" style={{ marginTop: 0, marginBottom: 16, maxWidth: 780 }}>
        A systematic, progressive enhancement of the Flask app. Each layer is a <strong>water-themed interaction</strong>
        that can be added independently without breaking the no-JS fallback.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {FRONTEND_LAYERS.map(layer => {
          const isOpen = !!openIds[layer.id]
          const IconComp = LAYER_ICONS[layer.num]
          return (
            <div key={layer.id} className={`flow-node layer-node ${isOpen ? 'layer-open' : ''}`}>
              <button
                className="layer-header"
                onClick={() => toggle(layer.id)}
                aria-expanded={isOpen}
                style={{
                  width: '100%', background: 'none', border: 'none', padding: 0,
                  cursor: 'pointer', color: 'inherit', textAlign: 'left'
                }}
              >
                <div className="row" style={{ justifyContent: 'space-between', width: '100%' }}>
                  <div className="row">
                    <div className="flow-step-num">{layer.num}</div>
                    <div>
                      <div style={{ fontWeight: 700 }}>{layer.title}</div>
                      <div className="tag" style={{ marginTop: 4 }}>
                        <span className="water-ico">🌊</span> {layer.analogy}
                      </div>
                    </div>
                  </div>
                  <div className="row" style={{ gap: 8, alignItems: 'center' }}>
                    {IconComp && <IconComp size={24} />}
                    <span className={`layer-chevron ${isOpen ? 'layer-chevron-open' : ''}`} aria-hidden="true">▾</span>
                  </div>
                </div>
              </button>

              <p className="muted" style={{
                margin: isOpen ? '10px 0 0' : '0', fontSize: 13.5, lineHeight: 1.55
              }}>{layer.summary}</p>

              <div className="row" style={{
                gap: 8, flexWrap: 'wrap', marginTop: isOpen ? 10 : 0, marginBottom: isOpen ? 8 : 0
              }}>
                {layer.files.map(f => (
                  <span key={f} className="tag" style={{
                    borderColor: 'var(--accent)', fontFamily: 'monospace', fontSize: 11
                  }}>📄 {f}</span>
                ))}
                {layer.concepts.map(c => (
                  <span key={c} className="tag">💧 {c}</span>
                ))}
              </div>

              {isOpen && (
                <div className="layer-body">
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
