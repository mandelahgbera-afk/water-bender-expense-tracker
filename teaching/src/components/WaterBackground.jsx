import { useEffect, useRef } from 'react'

// WaterBackground: a lightweight "shader-style" flowing-water canvas.
// Draws drifting wave bands + rising bubbles using requestAnimationFrame.
export default function WaterBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let w, h
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const bubbles = Array.from({ length: 40 }, () => spawnBubble())

    function spawnBubble() {
      return {
        x: Math.random(),
        y: Math.random(),
        r: 1 + Math.random() * 3,
        sp: 0.0006 + Math.random() * 0.0016,
        a: 0.04 + Math.random() * 0.12
      }
    }

    function resize() {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h)
      // layered wave bands
      for (let layer = 0; layer < 3; layer++) {
        const amp = 26 + layer * 16
        const yBase = h * (0.35 + layer * 0.2)
        const speed = 0.0006 + layer * 0.0004
        ctx.beginPath()
        ctx.moveTo(0, h)
        for (let x = 0; x <= w; x += 12) {
          const y = yBase + Math.sin(x * 0.006 + t * speed + layer) * amp
            + Math.sin(x * 0.013 - t * speed * 1.6) * (amp * 0.4)
          ctx.lineTo(x, y)
        }
        ctx.lineTo(w, h)
        ctx.closePath()
        const g = ctx.createLinearGradient(0, yBase - amp, 0, h)
        const alpha = 0.05 + layer * 0.03
        g.addColorStop(0, `rgba(56,189,248,${alpha})`)
        g.addColorStop(1, 'rgba(3,105,161,0)')
        ctx.fillStyle = g
        ctx.fill()
      }
      // bubbles
      for (const b of bubbles) {
        b.y -= b.sp
        if (b.y < -0.05) { b.y = 1.05; b.x = Math.random() }
        ctx.beginPath()
        ctx.arc(b.x * w, b.y * h, b.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(125,211,252,${b.a})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas id="bg-canvas" ref={canvasRef} />
}
