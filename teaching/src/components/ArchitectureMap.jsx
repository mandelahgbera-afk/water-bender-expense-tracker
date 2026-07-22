import { useState } from 'react'
import { PROJECT_BLUEPRINT } from '../data/projectBlueprint.js'

const PATTERN = {
  '🚀': '#38bdf8',
  '📋': '#94a3b8',
  '📝': '#34d399',
  '🔑': '#a78bfa',
  '🔗': '#22d3ee',
  '🏗️': '#fbbf24',
  '🔌': '#f87171',
  '➕': '#34d399',
  '✏️': '#fbbf24',
  '🗑️': '#f87171',
  '📋': '#94a3b8',
  '🔍': '#a78bfa',
  '🎯': '#38bdf8',
  '📊': '#34d399',
  '📈': '#38bdf8',
  '📤': '#22d3ee',
  '📥': '#22d3ee',
  '📉': '#f87171',
  '💱': '#a78bfa',
  '🔄': '#22d3ee',
  '🛡️': '#34d399',
  '✅': '#fbbf24',
  '📁': '#94a3b8',
  '📦': '#fbbf24'
}

// ArchitectureMap: interactive file tree of the Python project.
export default function ArchitectureMap() {
  const [filter, setFilter] = useState('')
  const [activeFile, setActiveFile] = useState(null)

  const files = PROJECT_BLUEPRINT.files
  const filtered = filter
    ? files.filter(f => f.path.toLowerCase().includes(filter.toLowerCase()) || f.purpose.toLowerCase().includes(filter.toLowerCase()))
    : files

  // Group by package
  const groups = {}
  filtered.forEach(f => {
    const parts = f.path.split('/')
    const pkg = parts.length > 1 ? parts.slice(0, -1).join('/') + '/' : '__root__'
    if (!groups[pkg]) groups[pkg] = []
    groups[pkg].push(f)
  })

  const colorFor = (icon) => PATTERN[icon] || 'var(--accent)'

  return (
    <div>
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
        <h2 style={{ margin: 0, fontSize: 20 }}>🏗️ Project Architecture</h2>
        <input className="field" style={{ maxWidth: 320 }} placeholder="🔍 Filter files (e.g. auth, csv, backup)…"
          value={filter} onChange={e => setFilter(e.target.value)} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {Object.entries(groups).sort(([a], [b]) => {
          const ak = a === '__root__' ? '' : a
          const bk = b === '__root__' ? '' : b
          return ak.localeCompare(bk)
        }).map(([pkg, items]) => (
          <div key={pkg} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--line)', background: 'rgba(8,15,28,0.6)' }}>
              <span className="tag"><span className="water-ico">📁</span> {pkg === '__root__' ? PROJECT_BLUEPRINT.root : pkg}</span>
            </div>
            <div style={{ padding: '8px 10px' }}>
              {items.map(f => {
                const isActive = activeFile === f.path
                const c = colorFor(f.icon)
                return (
                  <div key={f.path}
                    className="quiz-opt"
                    style={{ marginBottom: 6, borderColor: isActive ? c : 'var(--line)', background: isActive ? 'rgba(8,15,28,0.8)' : 'transparent' }}
                    onClick={() => setActiveFile(activeFile === f.path ? null : f.path)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span><span style={{ marginRight: 8 }}>{f.icon}</span><code style={{ fontSize: 13 }}>{f.path.split('/').pop()}</code></span>
                      <span className="tag" style={{ borderColor: c, color: c, fontSize: 11 }}>{f.path.split('/').length > 1 ? 'module' : 'root'}</span>
                    </div>
                    <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>{f.purpose}</div>
                    {isActive && (
                      <div className="fade-up" style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {f.concepts.map(cid => (
                          <span key={cid} className="tag" style={{ borderColor: 'var(--accent)', fontSize: 11 }}>💧 {cid}</span>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
