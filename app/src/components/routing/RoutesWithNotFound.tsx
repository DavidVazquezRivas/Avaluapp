import NotFound from '@/pages/notfound/NotFound'
import { JSX } from 'react'
import { Route, Routes } from 'react-router-dom'

interface Props {
  children: JSX.Element[] | JSX.Element
}

export const RoutesWithNotFound = ({ children }: Props) => {
  return (
    <Routes>
      {children}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default RoutesWithNotFound
