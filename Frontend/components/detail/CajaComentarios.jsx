'use client'

import { useAuth } from '@/context/authContext'
import Link from 'next/link'
import { useState } from 'react'

export default function CajaComentarios({ agregarComentario }) {
  const { user, loading } = useAuth()
  const [nuevoComentario, setNuevoComentario] = useState('')

  const handleComentarioChange = e => {
    setNuevoComentario(e.target.value)
  }

  const handlePublicarComentario = () => {
    // Verifica que el usuario haya ingresado un comentario
    if (nuevoComentario.trim() !== '') {
      // Crea un objeto con el nuevo comentario y lo pasa al componente Comentarios
      agregarComentario({
        usuario: user.displayName, // Nombre del usuario (puedes cambiarlo)
        rating: 3, // Rating hardcodeado (puedes cambiarlo)
        fecha: new Date().toLocaleDateString(),
        photoUrl: user.photoURL,
        contenido: nuevoComentario
      })

      // Limpia el textarea después de publicar el comentario
      setNuevoComentario('')

      setTimeout(() => {
        setNuevoComentario('')
      }, 100)
    }
  }

  return (
    <div>
      {user ? (
        // un imput text para escribir el comentario con ancho 100%
        <div>
          <textarea
            type='text'
            id='comentario'
            className='w-full resize-none border bg-white p-3'
            style={{ height: '170px' }}
            value={nuevoComentario}
            onChange={handleComentarioChange}
          />
          <button
            className='mt-3 rounded-lg bg-sky-500 px-4 py-2 text-white'
            onClick={handlePublicarComentario}
          >
            Publicar comentario{' '}
          </button>
        </div>
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
