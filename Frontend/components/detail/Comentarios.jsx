'use client'

import { useAuth } from '@/context/authContext'
import Link from 'next/link'

export default function Comentarios() {
  const { user, loading } = useAuth()
  return (
    <div>
      {user ? (
        // Contenido para el usuario autenticado
        <p>Caja de comentarios</p>
      ) : (
        <p>
          Debes{' '}
          <Link
            href='/login'
            className='font-semibold transition ease-in-out hover:text-sky-500'
          >
            iniciar sesión
          </Link>{' '}
          para publicar un comentario.
        </p>
      )}
    </div>
  )
}
