import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Credential } from '@/models/credential.model'
import { AuthEmptyState, clearSession, setSession } from '@/redux/states/auth'
import { login } from '@/services/auth/login.service'
import { refresh } from '@/services/auth/refresh.service'
import { logout } from '@/services/auth/logout.service'

export const useSession = () => {
  const dispatch = useDispatch()
  const authState = useSelector((state: RootState) => state.auth)

  const createSession = useCallback(
    async (credential: Credential, disableCookies?: boolean) => {
      const { data } = await login(credential, disableCookies)
      dispatch(setSession(data.data))
    },
    [dispatch]
  )

  const deleteSession = useCallback(async () => {
    await logout()
    dispatch(clearSession())
  }, [dispatch])

  const refreshSession = useCallback(async () => {
    const { data } = await refresh()
    dispatch(setSession(data.data))
  }, [dispatch])

  const haveSession = authState !== AuthEmptyState

  return {
    session: authState,
    haveSession,
    createSession,
    deleteSession,
    refreshSession,
  }
}
