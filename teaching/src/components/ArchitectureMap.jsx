import { useState, useMemo } from 'react'
import { PROJECT_BLUEPRINT } from '../data/projectBlueprint.js'

const PATTERN = {
  '🚀': '#38bdf8', '📋': '#94a3b8', '📝': '#34d399', '🔑': '#a78bfa',
  '🔗': '#22d3ee', '🏗️': '#fbbf24', '🔌': '#f87171', '➕': '#34d399',
  '✏️': '#fbbf24', '🗑️': '#f87171', '🔍': '#a78bfa', '🎯': '#38bdf8',
  '📊': '#34d399', '📈': '#38bdf8', '📤': '#22d3ee', '📥': '#22d3ee',
  '📉': '#f87171', '💱': '#a78bfa', '🔄': '#22d3ee', '🛡️': '#34d399',
  '✅': '#fbbf24', '📁': '#94a4c0', '📦': '#fbbf24', '🎩': '#a78bfa',
  '🏪': '#fbbf24', '🎨': '#f87171', '🍽️': '#34d399'
}

export default function ArchitectureMap() {
  const [filter, setFilter] = useState('')
  const [activeFile, setActiveFile] = useState(null)

  const files = PROJECT_BLUEPRINT.files
  const filtered = useMemo(() => {
    if (!filter.trim()) return files
    const q = filter.toLowerCase()
    return files.filter(f =>
      f.path.toLowerCase().includes(q) || f.purpose.toLowerCase().includes(q)
    )
  }, [filter, files])

  const groups = useMemo(() => {
    const map = {}
    filtered.forEach(f => {
      const parts = f.path.split('/')
      const pkg = parts.length > 1 ? parts.slice(0, -1).join('/') + '/' : '__root__'
      if (!map[pkg]) map[pkg] = []
      map[pkg].push(f)
    })
    return map
  }, [filtered])

  const colorFor = (icon) => PATTERN[icon] || 'var(--accent)'

  return (
    <div>
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
        <h2 style={{ margin: 0, fontSize: 20 }}>🏗️ Project Architecture</h2>
        <div className="row" style={{ gap: 8 }}>
          {PROJECT_BLUEPRINT.repoUrl && (
            <a
              className="btn btn-primary btn-sm"
              href={PROJECT_BLUEPRINT.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              🐙 Open Expense Tracker on GitHub
            </a>
          )}
          <div className="live-filter-wrap">
            <input
              id="arch-filter"
              className="field"
              style={{ maxWidth: 320, paddingLeft: 36 }}
              placeholder="🔍 Filter files…"
              value={filter}
              onChange={e => setFilter(e.target.value)}
              aria-label="Filter architecture files"
            />
          </div>
        </div>
      </div>

      <div className="arch-grid">
        {Object.entries(groups).sort(([a], [b]) => {
          const ak = a === '__root__' ? '' : a
          const bk = b === '__root__' ? '' : b
          return ak.localeCompare(bk)
        }).map(([pkg, items]) => (
          <div key={pkg} className="card arch-package">
            <div className="arch-package-header">
              <span className="tag">
                <span className="water-ico">📁</span> {pkg === '__root__' ? PROJECT_BLUEPRINT.root : pkg}
              </span>
            </div>
            <div className="arch-package-body">
              {items.map(f => {
                const isActive = activeFile === f.path
                const c = colorFor(f.icon)
                return (
                  <div
                    key={f.path}
                    className={`arch-file ${isActive ? 'arch-file-active' : ''}`}
                    style={{ '--file-accent': c }}
                    onClick={() => setActiveFile(isActive ? null : f.path)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setActiveFile(isActive ? null : f.path)
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-pressed={isActive}
                  >
                    <div className="arch-file-row">
                      <span className="arch-file-icon">{f.icon}</span>
                      <code className="arch-file-name">{f.path.split('/').pop()}</code>
                      <span className="tag arch-file-badge">
                        {f.path.split('/').length > 1 ? 'module' : 'root'}
                      </span>
                    </div>
                    <p className="muted arch-file-purpose">{f.purpose}</p>
                    {isActive && (
                      <div className="arch-file-concepts">
                        {f.concepts.map(cid => (
                          <span key={cid} className="tag" style={{ borderColor: 'var(--accent)', fontSize: 11 }}>
                            💧 {cid}
                          </span>
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
