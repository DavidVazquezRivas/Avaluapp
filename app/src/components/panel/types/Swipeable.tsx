import CloseIcon from '@mui/icons-material/Close'
import { usePanel } from '@/contexts/PanelContext'
import { SwipeablePanelState } from '@/models/panels.model'
import { Box, IconButton, SwipeableDrawer, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

export const SwipeablePanel: React.FC<SwipeablePanelState> = ({
  isOpen,
  content,
  title,
  direction,
}) => {
  const { closePanel } = usePanel()
  const { t } = useTranslation()

  const handleClose = () => closePanel()
  const handleOpen = () => {}

  direction = direction ?? 'bottom'

  return (
    <SwipeableDrawer
      anchor={direction}
      open={isOpen}
      onClose={handleClose}
      onOpen={handleOpen}
      swipeAreaWidth={0}
      allowSwipeInChildren={true}
      disableSwipeToOpen
      disableBackdropTransition={true}
      slotProps={{
        paper: {
          sx: (theme) => ({
            width: { xs: '100%', md: '80%' },
            minWidth: { md: theme.breakpoints.values.sm },
            maxWidth: { md: theme.breakpoints.values.lg },
            minHeight: '60vh',
            maxHeight: '90vh',
            margin: '0 auto',
            overflow: 'hidden',
            borderRadius: '16px 16px 0 0',
            boxShadow: (theme) => theme.shadows[4],
            touchAction: 'none',
          }),
        },
      }}
      ModalProps={{
        disableScrollLock: true,
        keepMounted: true,
      }}>
      <Box
        className='only-scrollbar'
        minWidth='100%'
        minHeight='60vh'
        sx={{
          backgroundColor: 'background.default',
          overflow: 'auto',
          overscrollBehavior: 'contain',
        }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 4,
            pt: 2,
            pb: 1.5,
            position: 'sticky',
            top: 0,
            backgroundColor: 'background.default',
          }}>
          <Typography variant='h6' component='div'>
            {title}
          </Typography>

          <IconButton
            onClick={handleClose}
            aria-label={t('globals.panel.swipeable.closeLabel')}
            sx={{ color: 'text.primary', mr: -1 }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            p: 4,
            pt: 0,
            overflow: 'auto',
            overscrollBehavior: 'contain',
          }}>
          {content}
        </Box>
      </Box>
    </SwipeableDrawer>
  )
}

export default SwipeablePanel
