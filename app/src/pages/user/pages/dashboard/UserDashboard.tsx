import React from 'react'
import Layout from '@/components/layout/Layout'
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  Assignment as SurveyIcon,
  BarChart as ResultsIcon,
  Lightbulb as TipIcon,
} from '@mui/icons-material'
import { NumberDisplay } from '@/components/graphics'
import { useNavigate } from 'react-router-dom'
import { UserRoutes } from '@/constants/routes'
import { useUserDashboardData } from './hooks/useUserDashboardData'
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

export const UserDashboard = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  // Get user dashboard data
  const {
    pendingSurveys,
    acceptedSurveys,
    totalResponses,
    totalProjects,
    isLoading,
    error,
    isError,
  } = useUserDashboardData()

  // Get a random tip based on the current day
  const tips = t('user.dashboard.tips.items', {
    returnObjects: true,
  }) as string[]
  const todayTip = tips[new Date().getDay() % tips.length]

  // Determine status based on pending surveys
  const getStatusInfo = () => {
    if (pendingSurveys === 0) {
      return {
        color: '#4caf50', // green
        emoji: '🟢',
        title: t('user.dashboard.status.allGood.title'),
        description: t('user.dashboard.status.allGood.description'),
        actions: [
          t('user.dashboard.status.actions.checkResponses'),
          t('user.dashboard.status.actions.manageProjects'),
        ],
      }
    } else if (pendingSurveys <= 2) {
      return {
        color: '#ff9800', // orange
        emoji: '🟡',
        title: t('user.dashboard.status.someAttention.title'),
        description: t('user.dashboard.status.someAttention.description', {
          count: pendingSurveys,
        }),
        actions: [
          t('user.dashboard.status.actions.reviewPending'),
          t('user.dashboard.status.actions.checkResponses'),
        ],
      }
    } else {
      return {
        color: '#f44336', // red
        emoji: '🔴',
        title: t('user.dashboard.status.needsAttention.title'),
        description: t('user.dashboard.status.needsAttention.description', {
          count: pendingSurveys,
        }),
        actions: [t('user.dashboard.status.actions.reviewPending')],
      }
    }
  }

  const statusInfo = getStatusInfo()

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
            {t('user.dashboard.error')}:{' '}
            {error?.message || t('user.dashboard.unknownError')}
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
              {t('user.dashboard.title')}
            </Typography>
          </Box>
          <Typography variant='body1' color='text.secondary' sx={{ mb: 2 }}>
            {t('user.dashboard.subtitle')}
          </Typography>
        </Box>

        {/* Top Section - Tip of the day (full width, low height) */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TipIcon sx={{ mr: 1, color: 'warning.main' }} />
              <Typography variant='h6'>
                {t('user.dashboard.tips.title')}
              </Typography>
            </Box>
            <Typography variant='body1' color='text.secondary'>
              {todayTip}
            </Typography>
          </CardContent>
        </Card>

        {/* Main Content Layout - Stats left, Status+Actions right */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
            gap: 4,
            mb: 4,
          }}>
          {/* Left Side - Stats in 2x2 Grid (exactly like admin) */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 2,
            }}>
            <NumberDisplay
              value={pendingSurveys}
              title={t('user.dashboard.stats.pendingSurveys')}
              variant='warning'
            />
            <NumberDisplay
              value={acceptedSurveys}
              title={t('user.dashboard.stats.acceptedSurveys')}
              variant='success'
            />
            <NumberDisplay
              value={totalResponses}
              title={t('user.dashboard.stats.totalResponses')}
              variant='primary'
            />
            <NumberDisplay
              value={totalProjects}
              title={t('user.dashboard.stats.totalProjects')}
              variant='error'
            />
          </Box>

          {/* Right Side - Status and Actions stacked */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Top Right - Quick Status */}
            <Card sx={{ flex: 2 }}>
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  {t('user.dashboard.status.title')}
                </Typography>

                {/* Status indicator */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: 'rgba(0,0,0,0.02)',
                  }}>
                  <Typography sx={{ fontSize: '2rem', mr: 2 }}>
                    {statusInfo.emoji}
                  </Typography>
                  <Box>
                    <Typography
                      variant='subtitle1'
                      sx={{ fontWeight: 600, color: statusInfo.color }}>
                      {statusInfo.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {statusInfo.description}
                    </Typography>
                  </Box>
                </Box>

                {/* Quick actions list */}
                <Box>
                  <Typography variant='subtitle2' sx={{ mb: 1 }}>
                    {t('user.dashboard.status.actions.suggested')}
                  </Typography>
                  {statusInfo.actions.map((action, index) => (
                    <Typography
                      key={index}
                      variant='body2'
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 0.5,
                        color: 'text.secondary',
                        '&:before': {
                          content: '"•"',
                          color: statusInfo.color,
                          fontWeight: 'bold',
                          width: '1em',
                          marginRight: '0.5em',
                        },
                      }}>
                      {action}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* Bottom Right - Quick Actions (side by side) */}
            <Card sx={{ flex: 3 }}>
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  {t('user.dashboard.quickActions.title')}
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 2,
                    mt: 2,
                  }}>
                  <QuickActionCard
                    title={t('user.dashboard.quickActions.viewSurveys.title')}
                    description={t(
                      'user.dashboard.quickActions.viewSurveys.description'
                    )}
                    icon={<SurveyIcon sx={{ fontSize: 40 }} />}
                    onClick={() =>
                      navigate(`${UserRoutes.Base}/${UserRoutes.Survey}`, {
                        replace: true,
                      })
                    }
                    color='primary'
                  />
                  <QuickActionCard
                    title={t('user.dashboard.quickActions.viewResults.title')}
                    description={t(
                      'user.dashboard.quickActions.viewResults.description'
                    )}
                    icon={<ResultsIcon sx={{ fontSize: 40 }} />}
                    onClick={() =>
                      navigate(`${UserRoutes.Base}/${UserRoutes.Answers}`, {
                        replace: true,
                      })
                    }
                    color='success'
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

export default UserDashboard
