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
    verify: `${apiBaseUrl}/users/verify`,
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
  tags: {
    create: `${apiBaseUrl}/tags`,
    delete: (tagId: number) => `${apiBaseUrl}/tags/${tagId}`,
    getAll: (projectId: number) => `${apiBaseUrl}/tags/project/${projectId}`,
    get: (tagId: number) => `${apiBaseUrl}/tags/${tagId}`,
    update: (tagId: number) => `${apiBaseUrl}/tags/${tagId}`,
  },
  public: {
    getQuestions: (surveyCode: string) =>
      `${apiBaseUrl}/public/answers/${surveyCode}`,
    submitAnswers: (surveyCode: string) =>
      `${apiBaseUrl}/public/answers/${surveyCode}`,
  },
  answers: {
    getProjectAnswers: (projectId: number) =>
      `${apiBaseUrl}/answers/${projectId}`,
    getProjectAnswersByTags: (projectId: number, tagIds: number[]) =>
      `${apiBaseUrl}/answers/${projectId}/tags?tagIds=${tagIds.join(',')}`,
    getProjectAnswersBySurveys: (projectId: number, surveyIds: number[]) =>
      `${apiBaseUrl}/answers/${projectId}/surveys?surveyIds=${surveyIds.join(
        ','
      )}`,
  },
}
