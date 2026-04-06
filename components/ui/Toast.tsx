'use client'

import { useToast, type Toast as ToastType } from '../../lib/hooks/useToast'
import { useEffect, useState } from 'react'

export function ToastContainer() {
  const { toasts, removeToast } = useToast()
  const [visibleToasts, setVisibleToasts] = useState<ToastType[]>([])

  useEffect(() => {
    setVisibleToasts(toasts)
  }, [toasts])

  if (visibleToasts.length === 0) return null

  const getToastStyles = (type: ToastType['type']) => {
    switch (type) {
      case 'success':
        return 'bg-success-container text-on-success-container border-success'
      case 'error':
        return 'bg-error-container text-on-error-container border-error'
      case 'warning':
        return 'bg-warning-container text-on-warning-container border-warning'
      case 'info':
        return 'bg-primary-container text-on-primary-container border-primary'
      default:
        return 'bg-surface-container text-on-surface border-outline'
    }
  }

  const getIcon = (type: ToastType['type']) => {
    switch (type) {
      case 'success':
        return 'check_circle'
      case 'error':
        return 'error'
      case 'warning':
        return 'warning'
      case 'info':
        return 'info'
      default:
        return 'notifications'
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {visibleToasts.map((toast) => (
        <div
          key={toast.id}
          className={`${getToastStyles(toast.type)} rounded-lg border p-4 shadow-lg transform transition-all duration-300 animate-in slide-in-from-right-5`}
          role="alert"
        >
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined flex-shrink-0">
              {getIcon(toast.type)}
            </span>
            <div className="flex-1">
              <h4 className="font-bold text-sm">{toast.title}</h4>
              <p className="text-sm opacity-90 mt-1">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-current opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Close notification"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}