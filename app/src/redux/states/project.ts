import { Project } from '@/pages/admin/pages/projects/models/project.model'
import { createSlice } from '@reduxjs/toolkit'

export interface ProjectState {
  projects: Project[]
}

export const ProjectEmptyState: ProjectState = {
  projects: [],
}

export const projectSlice = createSlice({
  name: 'project',
  initialState: ProjectEmptyState,
  reducers: {
    setProjects: (_state, action) => ({ ..._state, projects: action.payload }),
    clearProjects: () => ProjectEmptyState,
  },
})

export const { setProjects, clearProjects } = projectSlice.actions
export default projectSlice.reducer
