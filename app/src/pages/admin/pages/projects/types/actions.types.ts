/**
 * Sistema de acciones para proyectos con tipos discriminados y type safety completo
 */

import { Project } from '@/models/project.model'

// Enum para las acciones disponibles
export enum ProjectActionType {
  CREATE = 'create',
  EDIT = 'edit',
  VIEW = 'view',
  DELETE = 'delete',
}

// Constante para compatibilidad con el código anterior
export const ProjectActions = {
  CREATE: ProjectActionType.CREATE,
  EDIT: ProjectActionType.EDIT,
  VIEW: ProjectActionType.VIEW,
  DELETE: ProjectActionType.DELETE,
} as const

// Interfaz base para todas las acciones
interface BaseProjectAction {
  type: ProjectActionType
  timestamp?: Date
}

// Acciones específicas con sus parámetros
export interface CreateProjectAction extends BaseProjectAction {
  type: ProjectActionType.CREATE
  template?: {
    name?: string
    description?: string
  }
}

export interface EditProjectAction extends BaseProjectAction {
  type: ProjectActionType.EDIT
  projectId: number
  field?: keyof Project
}

export interface ViewProjectAction extends BaseProjectAction {
  type: ProjectActionType.VIEW
  projectId: number
  tab?: 'surveys' | 'questions' | 'tags' | 'results'
}

export interface DeleteProjectAction extends BaseProjectAction {
  type: ProjectActionType.DELETE
  projectId: number
  confirmationRequired?: boolean
}

// Tipo discriminado que une todas las acciones
export type ProjectAction =
  | CreateProjectAction
  | EditProjectAction
  | ViewProjectAction
  | DeleteProjectAction

// Función para validar si una acción es válida (compatibilidad)
export const isValidProjectAction = (
  action: string | null | undefined
): action is keyof typeof ProjectActions => {
  return (
    action !== null &&
    action !== undefined &&
    Object.values(ProjectActions).includes(action as any)
  )
}
