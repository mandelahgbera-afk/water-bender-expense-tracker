import { useState, useCallback } from 'react'

// useClipboard: copy text to the system clipboard and surface a transient "copied" flag.
export function useClipboard(timeout = 1400) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
      } else {
        // Fallback for non-secure contexts (e.g. some local previews).
        const ta = document.createElement('textarea')
        ta.value = text
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), timeout)
    } catch (e) {
      setCopied(false)
    }
  }, [timeout])

  return { copied, copy }
}
