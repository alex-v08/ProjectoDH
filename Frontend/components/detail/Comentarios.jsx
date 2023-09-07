'use client'

import CajaComentarios from './CajaComentarios'
import Image from 'next/image'
import { BsStarFill, BsStar } from 'react-icons/bs'
import { useState } from 'react'

export default function Comentarios() {
  const [comentarios, setComentarios] = useState([
    {
      usuario: 'Abel D. Retido',
      fecha: '05/09/2023',
      rating: 5,
      photoUrl: '/avatar.png',
      contenido:
        'El producto era lo que esperaba y superó ampliamente mis espectativas.'
    },
    {
      usuario: 'Adrian Droide',
      fecha: '07/09/2023',
      rating: 4,
      photoUrl: '/avatar.png',
      contenido: 'Quedé muy satisfecho con la atención del vendedor.'
    }
  ])

  // Función para agregar un nuevo comentario
  const agregarComentario = nuevoComentario => {
    setComentarios([...comentarios, nuevoComentario])
  }

  return (
    <div className='mt-8 border-b pb-8'>
      <h2 className='text-2xl font-bold text-sky-950'>Comentarios</h2>
      {comentarios.map((comentario, index) => (
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
              {comentario.usuario}{' '}
              <span className='text-sm font-normal text-gray-500'>
                - {comentario.fecha}
              </span>
            </div>
            <div>{comentario.contenido}</div>
          </div>
        </div>
      ))}
      <div className='pt-6'>
        <h2 className='pb-2 text-xl font-bold text-sky-950'>
          Agregar un comentario
        </h2>
        <CajaComentarios agregarComentario={agregarComentario} />
      </div>
    </div>
  )
}
