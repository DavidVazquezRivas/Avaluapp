import InfoIcon from '@mui/icons-material/Info'
import { usePanel } from '@/contexts/PanelContext'
import { InfoDialogPanelState } from '@/models/panels.model'
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

export const InfoDialog: React.FC<InfoDialogPanelState> = ({
  isOpen = false,
  content,
  title,
  text,
  acceptText,
}) => {
  const { closePanel } = usePanel()
  const { t } = useTranslation()

  const handleClose = () => closePanel()
  const dialogContent = content ?? (
    <Stack direction='row' spacing={1} alignItems='center'>
      <InfoIcon color='info' />
      <Typography variant='body1'>
        {text ?? t('globals.panel.info.text')}
      </Typography>
    </Stack>
  )

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth
      aria-labelledby='info-dialog-title'
      aria-describedby='info-dialog-description'>
      {title && <DialogTitle id='info-dialog-title'>{title}</DialogTitle>}
      <DialogContent id='info-dialog-description'>
        {dialogContent}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          {acceptText ?? t('globals.panel.info.button')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default InfoDialog
