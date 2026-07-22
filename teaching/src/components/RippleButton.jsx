import { useState, useRef } from 'react'

// RippleButton: button with a water-ripple micro-interaction on click.
export default function RippleButton({ children, onClick, className = 'btn', ...rest }) {
  const [ripples, setRipples] = useState([])
  const idRef = useRef(0)

  function handle(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const id = idRef.current++
    const r = {
      id,
      x: e.clientX - rect.left - size / 2,
      y: e.clientY - rect.top - size / 2,
      size
    }
    setRipples(rs => [...rs, r])
    setTimeout(() => setRipples(rs => rs.filter(x => x.id !== id)), 600)
    onClick && onClick(e)
  }

  return (
    <button className={className} onClick={handle} {...rest}>
      {ripples.map(r => (
        <span key={r.id} className="ripple" style={{ left: r.x, top: r.y, width: r.size, height: r.size }} />
      ))}
      {children}
    </button>
  )
}
