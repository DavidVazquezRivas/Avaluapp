import { EmptyPanelState, PanelState, PanelType } from '@/models/panels.model'
import React, { useCallback } from 'react'
import { createContext } from 'react'

interface PanelContextValue {
  panelState: PanelState
  openPanel: (panelState: PanelState) => void
  closePanel: () => void
}

const defaultPanelState: EmptyPanelState = {
  type: PanelType.Null,
  isOpen: false,
  content: <></>,
}

const PanelContext = createContext<PanelContextValue | undefined>(undefined)

export const PanelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [panelState, setPanelState] =
    React.useState<PanelState>(defaultPanelState)

  const openPanel = useCallback(
    (newPanelState: PanelState) => {
      // This looks verbose, but is necessary to ensure type is fixed befor opening, to fix the opening animation
      setPanelState({
        ...newPanelState,
      })

      setTimeout(() => {
        setPanelState((prev) => ({
          ...prev,
          isOpen: true,
        }))
      }, 0)
    },
    [setPanelState]
  )

  const closePanel = useCallback(() => {
    setPanelState((prev) => ({ ...prev, isOpen: false }))
  }, [setPanelState])

  return (
    <PanelContext.Provider value={{ panelState, openPanel, closePanel }}>
      {children}
    </PanelContext.Provider>
  )
}

export const usePanel = (): PanelContextValue => {
  const context = React.useContext(PanelContext)
  if (!context) {
    throw new Error('usePanel must be used within a PanelProvider')
  }
  return context
}
