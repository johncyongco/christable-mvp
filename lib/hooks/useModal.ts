'use client'

import { useState, useCallback } from 'react'

interface ModalState<T = any> {
  isOpen: boolean
  data: T | null
}

export function useModal<T = any>() {
  const [modalState, setModalState] = useState<ModalState<T>>({
    isOpen: false,
    data: null
  })

  const openModal = useCallback((data?: T) => {
    setModalState({
      isOpen: true,
      data: data || null
    })
  }, [])

  const closeModal = useCallback(() => {
    setModalState({
      isOpen: false,
      data: null
    })
  }, [])

  const updateModalData = useCallback((data: Partial<T>) => {
    setModalState(prev => ({
      ...prev,
      data: prev.data ? { ...prev.data, ...data } : data as T
    }))
  }, [])

  return {
    isOpen: modalState.isOpen,
    data: modalState.data,
    openModal,
    closeModal,
    updateModalData
  }
}

// Hook for managing multiple modals
export function useMultiModal() {
  const [modals, setModals] = useState<Record<string, ModalState>>({})

  const openModal = useCallback((modalName: string, data?: any) => {
    setModals(prev => ({
      ...prev,
      [modalName]: {
        isOpen: true,
        data: data || null
      }
    }))
  }, [])

  const closeModal = useCallback((modalName: string) => {
    setModals(prev => ({
      ...prev,
      [modalName]: {
        isOpen: false,
        data: null
      }
    }))
  }, [])

  const getModalState = useCallback((modalName: string) => {
    return modals[modalName] || { isOpen: false, data: null }
  }, [modals])

  return {
    modals,
    openModal,
    closeModal,
    getModalState
  }
}