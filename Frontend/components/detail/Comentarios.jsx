'use client'

import CajaComentarios from './CajaComentarios'
import Image from 'next/image'
import { BsStarFill, BsStar } from 'react-icons/bs'
import { useState, useEffect } from 'react'

export default function Comentarios( {productId} ) {
  const [comentarios, setComentarios] = useState([])
  const [mostrarComentarios, setMostrarComentarios] = useState(5); // Mostrar los primeros 5 comentarios
  const [cargarMasComentarios, setCargarMasComentarios] = useState(5); // Cargar 5 más a la vez
  const [isLoading, setIsLoading] 
  = useState(true); 
  const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
  const urlGetComments = `${hostUrl}/api/bookings/ratings/${productId}`

  async function fetchComments(productId) {
    try {
      const response = await fetch(urlGetComments)
      if (!response.ok) {
        throw new Error(
          'Error al intentar cargar los comentarios: . Response: ' +
            response.status
        )
      }
      const jsonData = await response.json()
      setComentarios(jsonData)
    } catch (error) {
      console.error('Error cargando los comentarios: ', error)
    } finally {
      setIsLoading(false); // Se indica que terminó de cargar los comentarios
    }
  }

  useEffect(() => {
    fetchComments(productId);
  }, []);

  const cargarMas = () => {
    setMostrarComentarios(prevMostrarComentarios => prevMostrarComentarios + cargarMasComentarios);
  };
  
  // Función para agregar un nuevo comentario
  const agregarComentario = nuevoComentario => {
    setComentarios([...comentarios, nuevoComentario])
  }

  return (
    <div className='mt-8 border-b pb-8'>
      <h2 className='text-2xl font-bold text-sky-950'>Comentarios</h2>
      {isLoading ? 
        (<p className="text-gray-500 mt-2">Cargando comentarios...</p>
      ) : (
        comentarios.length > 0 ? (
          //Si hay comentarios, renderiza los primeros 5, con el botón ver más renderiza otros 5 y así sucesivamente hasta que no haya más comentarios.
          <>
          {comentarios.slice(0, mostrarComentarios).map((comentario, index) => (
            <div key={index} className='comment-body flex border-b pb-5 pt-6'>
              {comentario.photoUrl ? (
                <Image
                  src={comentario.photoUrl}
                  alt='avatar'
                  width={60}
                  height={60}
                  className='mr-5 hidden h-[60px] w-[60px] rounded-full sm:block'
                />
              ) : (
                <Image
                  src='/avatar.png'
                  alt='avatar'
                  width={60}
                  height={60}
                  className='mr-5 hidden h-[60px] w-[60px] rounded-full sm:block'
                />
              )}
              <div>
                <div>
                  {Array(comentario.rating)
                    .fill()
                    .map((_, i) => (
                      <BsStarFill
                        key={i}
                        className='mr-1 inline-block h-[14px] w-[14px] text-sky-500'
                      />
                    ))}
                  {/* y los comentarios con menos de 5 ponerlas con la estrella sin rellenar */}
                  {Array(5 - comentario.rating)
                    .fill()
                    .map((_, i) => (
                      <BsStar
                        key={i}
                        className='mr-1 inline-block h-[14px] w-[14px] text-sky-500'
                      />
                    ))}
                </div>
                <div className='font-semibold'>
                  {comentario.name}{' '}
                  <span className='text-sm font-normal text-gray-500'>
                    - {comentario.date}
                  </span>
                </div>
                <div>{comentario.message}</div>
              </div>
            </div>
          ))}
          {mostrarComentarios < comentarios.length && (
            <button
              onClick={cargarMas}
              className='text-sky-500 hover:underline focus:outline-none mt-4 text-sm'
            >
              Mostrar más comentarios
            </button>
          )}
          </>
          ) : (
            //Si no hay comentarios muestra un mensaje
          <p className="text-gray-500 mt-2">Este producto aún no ha recibido comentarios. ¡Sé el primero en compartir tu experiencia!</p>
          )
      )}
      <div className='pt-6'>
        <h2 className='pb-2 text-xl font-bold text-sky-950'>
          Agregar un comentario
        </h2>
        <CajaComentarios agregarComentario={agregarComentario} />
      </div>
    </div>
  )
}
