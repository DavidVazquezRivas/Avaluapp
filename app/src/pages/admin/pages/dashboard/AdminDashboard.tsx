import React from 'react'
import Layout from '@/components/layout/Layout'
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assignment as ProjectIcon,
  Add as AddIcon,
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material'
import { NumberDisplay } from '@/components/graphics'
import { useNavigate } from 'react-router-dom'
import { AdminRoutes } from '@/constants/routes'
import { useDashboardData } from './hooks/useDashboardData'
import { useTranslation } from 'react-i18next'

const QuickActionCard = ({
  title,
  description,
  icon,
  onClick,
  color = 'primary',
}: {
  title: string
  description: string
  icon: React.ReactNode
  onClick: () => void
  color?: 'primary' | 'secondary' | 'success' | 'warning'
}) => {
  return (
    <Card
      sx={{
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
        },
      }}
      onClick={onClick}>
      <CardContent sx={{ textAlign: 'center', p: 3 }}>
        <Box sx={{ mb: 2, color: `${color}.main` }}>{icon}</Box>
        <Typography variant='h6' gutterBottom>
          {title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export const AdminDashboard = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  // Get all dashboard data in a single optimized query
  const {
    totalProjects,
    totalSurveys,
    totalUsers,
    totalResponses,
    recentActivity,
    isLoading,
    error,
    isError,
  } = useDashboardData()

  // Show loading state
  if (isLoading) {
    return (
      <Layout>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 400,
          }}>
          <CircularProgress size={60} />
        </Box>
      </Layout>
    )
  }

  // Show error state
  if (isError) {
    return (
      <Layout>
        <Box sx={{ p: 3 }}>
          <Alert severity='error'>
            {t('admin.dashboard.error')}:{' '}
            {error?.message || t('admin.dashboard.unknownError')}
          </Alert>
        </Box>
      </Layout>
    )
  }

  return (
    <Layout>
      <Box sx={{ p: 3, mt: -15 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <DashboardIcon
              sx={{ mr: 1, color: 'primary.main', fontSize: 32 }}
            />
            <Typography variant='h4' component='h1' fontWeight='600'>
              {t('admin.dashboard.title')}
            </Typography>
          </Box>
        </Box>

        {/* Main Content Layout */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
            gap: 4,
            mb: 4,
          }}>
          {/* Left Side - Stats in 2x2 Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 2,
            }}>
            <NumberDisplay
              value={totalProjects}
              title={t('admin.dashboard.stats.totalProjects')}
              variant='primary'
            />
            <NumberDisplay
              value={totalSurveys}
              title={t('admin.dashboard.stats.totalSurveys')}
              variant='success'
            />
            <NumberDisplay
              value={totalUsers}
              title={t('admin.dashboard.stats.totalUsers')}
              variant='warning'
            />
            <NumberDisplay
              value={totalResponses}
              title={t('admin.dashboard.stats.totalResponses')}
              variant='error'
            />
          </Box>

          {/* Right Side - Recent Activity */}
          <Card
            sx={{ maxHeight: 520, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ pb: 1 }}>
              <Typography variant='h6' gutterBottom>
                {t('admin.dashboard.recentActivity.title')}
              </Typography>
            </CardContent>
            <CardContent sx={{ flexGrow: 1, overflow: 'hidden', pt: 0 }}>
              <List sx={{ height: '100%', overflow: 'auto', py: 0 }}>
                {recentActivity.length > 0 ? (
                  recentActivity.map((activityItem: any) => (
                    <ListItem key={activityItem.id} divider>
                      <ListItemText
                        primary={activityItem.action}
                        secondary={
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 0.5,
                            }}>
                            <Typography variant='caption' color='primary'>
                              {activityItem.entityName}
                            </Typography>
                            <Typography
                              variant='caption'
                              color='text.secondary'>
                              {activityItem.time}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText
                      primary={t('admin.dashboard.recentActivity.noActivity')}
                      secondary={t(
                        'admin.dashboard.recentActivity.noActivityDescription'
                      )}
                    />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Box>

        {/* Quick Actions */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              {t('admin.dashboard.quickActions.title')}
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(4, 1fr)',
                },
                gap: 2,
              }}>
              <QuickActionCard
                title={t('admin.dashboard.quickActions.createProject.title')}
                description={t(
                  'admin.dashboard.quickActions.createProject.description'
                )}
                icon={<AddIcon sx={{ fontSize: 40 }} />}
                onClick={() =>
                  navigate(
                    `${AdminRoutes.Base}/${AdminRoutes.Projects}?action=create`,
                    {
                      replace: true,
                    }
                  )
                }
                color='primary'
              />
              <QuickActionCard
                title={t('admin.dashboard.quickActions.manageUsers.title')}
                description={t(
                  'admin.dashboard.quickActions.manageUsers.description'
                )}
                icon={<PeopleIcon sx={{ fontSize: 40 }} />}
                onClick={() =>
                  navigate(`${AdminRoutes.Base}/${AdminRoutes.Users}`, {
                    replace: true,
                  })
                }
                color='success'
              />
              <QuickActionCard
                title={t('admin.dashboard.quickActions.viewProjects.title')}
                description={t(
                  'admin.dashboard.quickActions.viewProjects.description'
                )}
                icon={<ProjectIcon sx={{ fontSize: 40 }} />}
                onClick={() =>
                  navigate(`${AdminRoutes.Base}/${AdminRoutes.Projects}`, {
                    replace: true,
                  })
                }
                color='warning'
              />
              <QuickActionCard
                title={t('admin.dashboard.quickActions.createUser.title')}
                description={t(
                  'admin.dashboard.quickActions.createUser.description'
                )}
                icon={<PersonAddIcon sx={{ fontSize: 40 }} />}
                onClick={() =>
                  navigate(
                    `${AdminRoutes.Base}/${AdminRoutes.Users}?action=create`,
                    {
                      replace: true,
                    }
                  )
                }
                color='secondary'
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  )
}

export default AdminDashboard
