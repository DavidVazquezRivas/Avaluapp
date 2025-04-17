import store from '@/redux/store'
import { Credential } from '@/models/credential.model'
import { clearToken, setToken } from '@/redux/states/auth'
import { login } from '@/services/auth/login.service'
import { refresh } from '@/services/auth/refresh.service'
import { logout } from '@/services/auth/logout.service'

export const createSession = async (credential: Credential) => {
  const { data } = await login(credential)

  const token = data.data.accessToken
  store.dispatch(setToken(token))
}

export const deleteSession = async () => {
  await logout()

  store.dispatch(clearToken())
}

export const refreshSession = async () => {
  const { data } = await refresh()

  const token = data.data.accessToken
  store.dispatch(setToken(token))
}

export const getSession = (): string | null => {
  return store.getState().auth.accessToken
}
