'use client'

import { useAuth } from '@/context/authContext'
import Link from 'next/link'
import { useState } from 'react'
import { BsStarFill, BsStar } from 'react-icons/bs'

export default function CajaComentarios(bookingId) {
  const { user } = useAuth()
  const [nuevoComentario, setNuevoComentario] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  const url = process.env.NEXT_PUBLIC_HOST_URL + '/api/bookings/'

  const handleComentarioChange = e => {
    setNuevoComentario(e.target.value)
    updateButtonState(e.target.value, rating)
  }

  async function postRating() {
    try {
      const response = await fetch(url + 'ratings/' + bookingId.bookingId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating: rating })
      })
      if (!response.ok) {
        throw new Error(
          'Error al intentar registrar Rating: . Response: ' + response.status
        )
      }
    } catch (error) {
      console.error('Error al ingresar el rating', error)
    }
    try {
      const response = await fetch(url + 'messages/' + bookingId.bookingId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: nuevoComentario,
          photoURL: user.photoURL
        })
      })
      if (!response.ok) {
        throw new Error(
          'Error al intentar registrar el mensaje: . Response: ' +
            response.status
        )
      }
    } catch (error) {
      console.error('Error al ingresar el mensaje', error)
    }
  }

  const handlePublicarComentario = () => {
    // Verifica que el usuario haya ingresado un comentario
    if (nuevoComentario.trim() !== '') {
      // Crea un objeto con el nuevo comentario y lo pasa al componente Comentarios

      postRating()

      // Limpia las estados después de publicar el comentario
      setNuevoComentario('')
      setRating(0)
      setIsButtonDisabled(true)
    }
  }

  const [rating, setRating] = useState(0)

  const handleStarClick = index => {
    // Cuando el usuario hace clic en una estrella, actualizamos el estado de rating
    // para que sea igual al índice de la estrella más 1.
    setRating(index + 1)
    updateButtonState(nuevoComentario, index + 1)
  }

  const updateButtonState = (comentario, stars) => {
    if (comentario.trim() !== '' && stars > 0) {
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true)
    }
  }

  return (
    <div>
      {user ? (
        // un imput text para escribir el comentario con ancho 100%
        <div>
          <div className='mb-5 mt-2 flex flex-wrap items-center gap-2 leading-none sm:gap-5'>
            <span>Calificación: {rating} estrellas</span>
            <div>
              {[0, 1, 2, 3, 4].map(index => (
                <span
                  key={index}
                  onClick={() => handleStarClick(index)}
                  className='cursor-pointer'
                >
                  {index < rating ? (
                    <BsStarFill className='mr-1 inline-block h-[18px] w-[18px] text-sky-500' />
                  ) : (
                    <BsStar className='mr-1 inline-block h-[18px] w-[18px] text-sky-500' />
                  )}
                </span>
              ))}
            </div>
          </div>
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
              className='mt-3 rounded-lg bg-sky-500 px-4 py-2 text-white transition ease-in-out hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-sky-200'
              onClick={handlePublicarComentario}
              disabled={isButtonDisabled}
            >
              Publicar comentario{' '}
            </button>
          </div>
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
