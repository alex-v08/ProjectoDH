'use client'
import { useState, useEffect } from 'react'
import { BsStarFill } from 'react-icons/bs'

const RatingMedia = ({productId, style}) => {
    const [rating, setRating] = useState(null)
    const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
    const urlGetRating = `${hostUrl}/api/bookings/ratings/media/${productId}`

    async function fetchRating(productId) {
        try {
          const response = await fetch(urlGetRating)
          if (!response.ok) {
            throw new Error(
              'Error al intentar cargar el rating: . Response: ' +
                response.status
            )
          }
          const data = await response.json()
          setRating(data.media)
        } catch (error) {
          console.error('Error cargando el rating: ', error)
          setRating('--')
        } 
      }

    useEffect(() => {
        fetchRating(productId);
    }, []);

    return (
        <>
            {isNaN(rating) ? (
            <>
                <BsStarFill className='mr-2 inline-block h-[14px] w-[14px] text-gray-300' />
                <span className='font-bold text-gray-300'>--</span>
            </>
            ):(
            <>
                <BsStarFill className='mr-2 inline-block h-[14px] w-[14px] text-sky-500' />
                <span className={style}>{rating}</span>
            </>
            )}
        </>
    )
}

export default RatingMedia


