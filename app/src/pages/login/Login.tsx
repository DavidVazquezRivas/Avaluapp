import Layout from '@/components/layout/Layout'
import SignIn from '@/pages/login/components/SignIn'
import { deleteSession } from '@/utils/session.utils'
import { useEffect } from 'react'

const Login: React.FC = () => {
  useEffect(() => {
    deleteSession()
  })

  return (
    <Layout>
      <SignIn />
    </Layout>
  )
}

export default Login
