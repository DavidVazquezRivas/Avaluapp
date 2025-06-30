import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
import { usePanel } from '@/contexts/PanelContext'
import { ConfirmDialogPanelState } from '@/models/panels.model'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

export const ConfirmDialog: React.FC<ConfirmDialogPanelState> = ({
  isOpen = false,
  content,
  title,
  text,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) => {
  const { closePanel } = usePanel()
  const { t } = useTranslation()

  const handleClose = () => closePanel()
  const handleConfirm = () => {
    onConfirm()
    closePanel()
  }
  const handleCancel = () => {
    if (onCancel) onCancel()
    closePanel()
  }

  const dialogContent = content ?? (
    <Stack direction='row' spacing={1} alignItems='center'>
      <WarningRoundedIcon color='warning' />
      <Typography variant='body1'>
        {text ?? t('globals.panel.confirm.text')}
      </Typography>
    </Stack>
  )

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth
      aria-labelledby='confirm-dialog-title'
      aria-describedby='confirm-dialog-description'>
      {title && <DialogTitle id='confirm-dialog-title'>{title}</DialogTitle>}
      <DialogContent id='confirm-dialog-description'>
        {dialogContent}
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={handleConfirm} autoFocus>
          {confirmText ?? t('globals.panel.confirm.button.ok')}
        </Button>
        <Button onClick={handleCancel}>
          {cancelText ?? t('globals.panel.confirm.button.cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
