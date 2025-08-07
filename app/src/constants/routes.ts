export const AppRoute = 'http://localhost:5173'

export const PublicRoutes = {
  Login: '/login',
  Survey: '/survey/:code',
}

export const PrivateRoutes = {
  Private: '/private',
  Verify: '/verify',
}

export const UserRoutes = {
  Base: '/user',
  Dashboard: 'dashboard',
  Survey: 'surveys',
}

export const AdminRoutes = {
  Base: '/admin',
  Dashboard: 'dashboard',
  Users: 'users',
  Projects: 'projects',
  ProjectDetail: 'projects/:id',
  Questions: 'questions',
}

export const getSurveyUrl = (urlCode: string): string => {
  return `${AppRoute}/survey/${urlCode}`
}
