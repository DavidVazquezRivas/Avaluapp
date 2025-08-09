import Layout from '@/components/layout/Layout'
import { useParams } from 'react-router-dom'
import { SurveyForm } from './components/SurveyForm'
import { deleteSession } from '@/utils/session.utils'
import { useEffect } from 'react'

export const SurveyPage = () => {
  const { code } = useParams<{ code: string }>()

  useEffect(() => {
    deleteSession()
  })

  return (
    <Layout>
      <SurveyForm surveyCode={code ?? ''} />
    </Layout>
  )
}

export default SurveyPage
