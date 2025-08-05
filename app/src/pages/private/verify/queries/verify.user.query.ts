import { VerifyRequest } from '@/models/user.model'
import { MutationOptions } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { verifyUser } from '../services/verify.user.service'
import { refreshSession } from '@/utils/session.utils'
import { NavigateFunction } from 'react-router-dom'
import { PrivateRoutes } from '@/constants/routes'

export default function verifyUserQueryOptions(
  navigate: NavigateFunction
): MutationOptions<AxiosResponse<any, any>, Error, VerifyRequest> {
  return {
    mutationFn: (request: VerifyRequest) => verifyUser(request),
    onSuccess: async () => {
      await refreshSession()
      navigate(PrivateRoutes.Private, { replace: true })
    },
    onError: (error) => console.error('Error verifying user:', error),
  }
}
