// Enums for activity actions (values that come from the server)
export enum ActivityAction {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

// Enums for entity types (values that come from the server)
export enum EntityType {
  PROJECT = 'PROJECT',
  SURVEY = 'SURVEY',
  USER = 'USER',
}

// Interface for recent activity items
export interface RecentActivity {
  id: string
  action: ActivityAction
  entityName: string
  entityType: EntityType
  timestamp: string
}

// Interface for the dashboard API response
export interface DashboardStats {
  totalProjects: number
  totalSurveys: number
  totalUsers: number
  totalResponses: number
  recentActivity: Array<RecentActivity>
}
