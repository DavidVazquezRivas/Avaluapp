export enum PanelType {
  Null = 'null',
  Swipeable = 'swipeable',
  InfoDialog = 'info-dialog',
  ConfirmDialog = 'confirm-dialog',
  FormDialog = 'form-dialog',
}

// Panel context state
export interface BasePanelState {
  type: PanelType | null
  content?: React.ReactNode
  isOpen?: boolean
  title?: string
}

export interface EmptyPanelState extends BasePanelState {
  type: PanelType.Null
}

export interface SwipeablePanelState extends BasePanelState {
  type: PanelType.Swipeable
  direction?: 'left' | 'right' | 'top' | 'bottom'
}

export interface InfoDialogPanelState extends BasePanelState {
  type: PanelType.InfoDialog
  content?: React.ReactNode
  text?: string
  acceptText?: string
}

export interface ConfirmDialogPanelState extends BasePanelState {
  type: PanelType.ConfirmDialog
  onConfirm: () => void
  onCancel?: () => void
  text?: string
  confirmText?: string
  cancelText?: string
}

export interface FormDialogPanelState extends BasePanelState {
  type: PanelType.FormDialog
  onSubmit: () => void
  onCancel?: () => void
  text?: string
  submitText?: string
  cancelText?: string
}

export type PanelState =
  | SwipeablePanelState
  | InfoDialogPanelState
  | ConfirmDialogPanelState
  | FormDialogPanelState
  | EmptyPanelState
