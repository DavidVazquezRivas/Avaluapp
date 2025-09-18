import { useQuery } from '@tanstack/react-query'
import { getDashboardStats } from '../services/dashboard.service'
import { DashboardStats } from '@/models/dashboard.model'
import { formatTimeAgo } from '@/utils/renderers/date.renderer'
import { useTranslation } from 'react-i18next'

// Simplified hook that gets all dashboard data in a single query
export const useDashboardData = () => {
  const { t } = useTranslation()
  const dashboardQuery = useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: getDashboardStats,
    select: (data) => data.data.data as DashboardStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const dashboardData = dashboardQuery.data

  // Transform data for chart components
  const chartData = {
    // Activity data with formatted time and localized text using combined translations
    activityData: dashboardData
      ? dashboardData.recentActivity.map((activity) => ({
          id: activity.id,
          action: t(
            `globals.formatters.activityCombined.${activity.entityType}.${activity.action}`
          ),
          entityName: activity.entityName, // Always show entity name
          entityType: activity.entityType,
          time: formatTimeAgo(activity.timestamp, t),
        }))
      : [],
  }

  return {
    // Raw stats
    totalProjects: dashboardData?.totalProjects || 0,
    totalSurveys: dashboardData?.totalSurveys || 0,
    totalUsers: dashboardData?.totalUsers || 0,
    totalResponses: dashboardData?.totalResponses || 0,

    // Chart data
    recentActivity: chartData.activityData,

    // Query states
    isLoading: dashboardQuery.isLoading,
    error: dashboardQuery.error,
    isError: dashboardQuery.isError,
    refetch: dashboardQuery.refetch,

    // Raw data for advanced usage
    rawData: dashboardData,
  }
}
