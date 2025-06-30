import { usePanel } from '@/contexts/PanelContext'
import { FormDialogPanelState } from '@/models/panels.model'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const FormDialog: React.FC<FormDialogPanelState> = ({
  isOpen = false,
  content,
  title,
  text,
  submitText,
  cancelText,
  errorText,
  onSubmit,
  onCancel,
}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { closePanel } = usePanel()
  const { t } = useTranslation()

  const handleClose = () => closePanel()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setLoading(true)
    const formData = new FormData(event.currentTarget)
    try {
      await onSubmit(formData)
      closePanel()
    } catch (error) {
      setError(errorText || t('globals.panel.form.error.default'))
    } finally {
      setLoading(false)
    }
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
      <Box sx={{ backgroundColor: 'background.default' }}>
        {title && <DialogTitle id='form-dialog-title'>{title}</DialogTitle>}
        <DialogContent id='form-dialog-description'>
          {text && <DialogContentText>{text}</DialogContentText>}
          {content}
          {error && (
            <Typography color='error' mt={2}>
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant='contained' type='submit' disabled={loading}>
            {submitText ?? t('globals.panel.form.button.submit')}
          </Button>
          <Button onClick={handleCancel}>
            {cancelText ?? t('globals.panel.form.button.cancel')}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default FormDialog
