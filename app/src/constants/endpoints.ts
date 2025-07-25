export const apiBaseUrl = 'https://avaluapp-api.onrender.com/api'

const authPath = `${apiBaseUrl}/auth`

export const apiEndpoints = {
  auth: {
    login: `${authPath}/login`,
    logout: `${authPath}/logout`,
    refresh: `${authPath}/refresh`,
  },
  users: {
    get: `${apiBaseUrl}/users`,
    create: `${apiBaseUrl}/users`,
    delete: (id: number) => `${apiBaseUrl}/users/${id}`,
    update: (id: number) => `${apiBaseUrl}/users/${id}`,
  },
  projects: {
    get: (id: number) => `${apiBaseUrl}/projects/${id}`,
    getAll: `${apiBaseUrl}/projects`,
    create: `${apiBaseUrl}/projects`,
    delete: (id: number) => `${apiBaseUrl}/projects/${id}`,
    update: (id: number) => `${apiBaseUrl}/projects/${id}`,
  },
  surveys: {
    getAll: (projectId: number) => `${apiBaseUrl}/surveys/${projectId}`,
    create: `${apiBaseUrl}/surveys`,
    delete: (id: number) => `${apiBaseUrl}/surveys/${id}`,
    update: (id: number) => `${apiBaseUrl}/surveys/${id}`,
    getAllLead: `${apiBaseUrl}/surveys`,
    accept: (id: number) => `${apiBaseUrl}/surveys/${id}/accept`,
    reject: (id: number) => `${apiBaseUrl}/surveys/${id}/reject`,
  },
  questions: {
    getAll: (projectId: number) =>
      `${apiBaseUrl}/questions/project/${projectId}`,
    get: (id: number) => `${apiBaseUrl}/questions/${id}`,
    create: `${apiBaseUrl}/questions`,
    delete: (id: number) => `${apiBaseUrl}/questions/${id}`,
    update: (id: number) => `${apiBaseUrl}/questions/${id}`,
  },
}
