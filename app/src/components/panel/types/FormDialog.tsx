import { usePanel } from '@/contexts/PanelContext'
import { FormDialogPanelState } from '@/models/panels.model'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

export const FormDialog: React.FC<FormDialogPanelState> = ({
  isOpen = false,
  content,
  title,
  text,
  submitText,
  cancelText,
  onSubmit,
  onCancel,
}) => {
  const { closePanel } = usePanel()
  const { t } = useTranslation()

  const handleClose = () => closePanel()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
    closePanel()
  }
  const handleCancel = () => {
    if (onCancel) onCancel()
    closePanel()
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth
      aria-labelledby='confirm-dialog-title'
      aria-describedby='confirm-dialog-description'
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: handleSubmit,
        },
      }}>
      {title && <DialogTitle id='form-dialog-title'>{title}</DialogTitle>}
      <DialogContent id='form-dialog-description'>
        {text && <DialogContentText>{text}</DialogContentText>}
        {content}
      </DialogContent>
      <DialogActions>
        <Button variant='contained' type='submit'>
          {submitText ?? t('globals.panel.form.button.submit')}
        </Button>
        <Button onClick={handleCancel}>
          {cancelText ?? t('globals.panel.form.button.cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormDialog
