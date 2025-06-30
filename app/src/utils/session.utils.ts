import store from '@/redux/store'
import { Credential } from '@/models/credential.model'
import {
  AuthEmptyState,
  AuthState,
  clearSession,
  setSession,
} from '@/redux/states/auth'
import { login } from '@/services/auth/login.service'
import { refresh } from '@/services/auth/refresh.service'
import { logout } from '@/services/auth/logout.service'

export const createSession = async (
  credential: Credential,
  disableCookies?: boolean
) => {
  const { data } = await login(credential, disableCookies)

  store.dispatch(setSession(data.data))
}

export const deleteSession = async () => {
  await logout()

  store.dispatch(clearSession())
}

export const refreshSession = async () => {
  const { data } = await refresh()

  store.dispatch(setSession(data.data))
  return data.data
}

export const getSession = (): AuthState => {
  return store.getState().auth
}

export const haveSession = (): boolean => {
  const auth = store.getState().auth
  return auth !== AuthEmptyState
}
