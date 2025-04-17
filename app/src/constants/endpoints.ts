export const apiBaseUrl = 'http://localhost:8080/api'

const authPath = `${apiBaseUrl}/auth`

export const apiEndpoints = {
  auth: {
    login: `${authPath}/login`,
    logout: `${authPath}/logout`,
    refresh: `${authPath}/refresh`,
  },
}
