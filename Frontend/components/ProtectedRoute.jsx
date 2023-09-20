'use client'

import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Loading from './util/loading'

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [userRole, setUserRole] = useState(null)
  const loadingElement = <div className='container h-screen'>Cargando...</div>
  const loadinScreen = <Loading />

  useEffect(() => {
    // Realiza una solicitud HTTP para obtener los datos del usuario y su rol.
    const fetchUserRole = async () => {
      try {
        const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
        const response = await fetch(
          `${hostUrl}/api/users/list/{uuid}?uuid=${user.uid}`
        )
        if (response.ok) {
          const userData = await response.json()
          setUserRole(userData[0].role) // Suponiendo que el rol se encuentra en userData.role
        } else {
          // Maneja los errores de la solicitud aquí.
        }
      } catch (error) {
        console.error(error.message)
      }
    }

    if (user) {
      fetchUserRole()
    }
  }, [user])

  if (loading) return loadinScreen

  if (!user) {
    router.push('/')
    return loadinScreen
  }

  if (userRole === null) return loadinScreen

  if (userRole !== 'ADMIN') {
    router.push('/')
    return loadinScreen
  }

  return <>{children}</>
}
