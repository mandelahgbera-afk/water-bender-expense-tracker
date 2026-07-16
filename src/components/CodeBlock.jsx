import { useClipboard } from '../hooks/useClipboard.js'
import { useToast } from './ToastProvider.jsx'

// CodeBlock: pipe cross-section with clipboard copy + toast feedback.
export default function CodeBlock({ code, label = 'python' }) {
  const { copy } = useClipboard()
  const toast = useToast()

  const onCopy = () => {
    copy(code)
    toast('Snippet copied to your clipboard')
  }

  return (
    <div className="code-wrap">
      <div className="code-head">
        <span className="tag"><span className="water-ico">💧</span> {label}</span>
        <button className="btn btn-ghost" style={{ padding: '4px 10px', fontSize: 12 }} onClick={onCopy}>
          ⧉ Copy
        </button>
      </div>
      <pre className="code"><code>{code}</code></pre>
    </div>
  )
}
