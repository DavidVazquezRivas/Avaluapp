// src/hooks/useLoginMutation.ts
import { useMutation } from '@tanstack/react-query'
import { createSession } from '@/utils/session.utils'

interface Credentials {
  username: string
  password: string
  forget: boolean
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: ({ username, password, forget }: Credentials) =>
      createSession({ username, password }, forget),
  })
}
