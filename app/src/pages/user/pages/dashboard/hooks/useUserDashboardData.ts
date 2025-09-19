import { useQuery } from '@tanstack/react-query'
import {
  getUserDashboardStats,
  UserDashboardStats,
} from '../services/user-dashboard.service'

// Hook that gets all user dashboard data in a single query
export const useUserDashboardData = () => {
  const dashboardQuery = useQuery({
    queryKey: ['user-dashboard-stats'],
    queryFn: getUserDashboardStats,
    select: (data) => data.data.data as UserDashboardStats,
    staleTime: 60 * 1000, // 1 minute
  })

  const dashboardData = dashboardQuery.data

  return {
    // Stats for user dashboard
    pendingSurveys: dashboardData?.pendingSurveys || 0,
    acceptedSurveys: dashboardData?.acceptedSurveys || 0,
    totalResponses: dashboardData?.totalResponses || 0,
    totalProjects: dashboardData?.totalProjects || 0,

    // Query states
    isLoading: dashboardQuery.isLoading,
    error: dashboardQuery.error,
    isError: dashboardQuery.isError,
    refetch: dashboardQuery.refetch,

    // Raw data for advanced usage
    rawData: dashboardData,
  }
}
