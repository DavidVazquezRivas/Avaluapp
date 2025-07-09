import { Box, Stack, Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import { getAdminProjectTabs } from '../../constants/admin.project.tabs'
import { useTranslation } from 'react-i18next'

interface TabManagerProps {
  id: number
}

export const TabManager: React.FC<TabManagerProps> = ({ id }) => {
  const [activeTab, setActiveTab] = useState(0)
  const { t } = useTranslation()

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const adminProjectTabs = getAdminProjectTabs(id)

  return (
    <Stack spacing={2} direction='column'>
      <Stack direction='row' justifyContent='center' width='100%'>
        <Tabs value={activeTab} onChange={handleChange}>
          {adminProjectTabs.map((tab, index) => (
            <Tab
              key={index}
              label={t(`admin.projectdetail.tabs.${tab.label}.label`)}
            />
          ))}
        </Tabs>
      </Stack>

      <Box sx={{ mt: 2 }}>{adminProjectTabs[activeTab].component}</Box>
    </Stack>
  )
}

export default TabManager
