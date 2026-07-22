import { createContext, useContext, useState, useCallback } from 'react'

// ToastProvider: lightweight global toast for copy/feedback micro-interactions.
const ToastCtx = createContext(() => {})

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)

  const show = useCallback((msg) => {
    setToast({ msg, id: Date.now() })
    setTimeout(() => setToast(null), 1900)
  }, [])

  return (
    <ToastCtx.Provider value={show}>
      {children}
      {toast && (
        <div className="toast" key={toast.id}>
          <span className="water-ico">💧</span> {toast.msg}
        </div>
      )}
    </ToastCtx.Provider>
  )
}

export const useToast = () => useContext(ToastCtx)
