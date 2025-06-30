import { usePanel } from '@/contexts/PanelContext'
import { PanelType } from '@/models/panels.model'
import SwipeablePanel from './types/Swipeable'
import InfoDialog from './types/InfoDialog'
import ConfirmDialog from './types/ConfirmDialog'
import FormDialog from './types/FormDialog'

const panelRendererMap: Record<PanelType, (props: any) => React.ReactNode> = {
  [PanelType.Null]: () => null,
  [PanelType.Swipeable]: (props) => <SwipeablePanel {...props} />,
  [PanelType.ConfirmDialog]: (props) => <ConfirmDialog {...props} />,
  [PanelType.FormDialog]: (props) => <FormDialog {...props} />,
  [PanelType.InfoDialog]: (props) => <InfoDialog {...props} />,
}

export const Panel: React.FC = () => {
  const { panelState } = usePanel()

  if (!panelState.type) return null

  const render = panelRendererMap[panelState.type]

  return <>{render ? render(panelState) : null}</>
}
