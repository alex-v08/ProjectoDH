'use client'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/authContext'
import SectionTitle from '@/components/SectionTitle'
import dayjs from 'dayjs'

const HistorialReservas = () => {
  const { user } = useAuth()
  const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
  const [userId, setUserId] = useState(null)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch(
          `${hostUrl}/users/list/{uuid}?uuid=${user.uid}`
        )
        console.log('FETCH USER')
        if (response.ok) {
          const userData = await response.json()
          setUserId(userData[0].id)
          fetchData(userId)
        } else {
          // Maneja los errores de la solicitud aquí.
        }
      } catch (error) {
        console.error(error.message)
      }
    }

    if (user) {
      fetchUserId()
    }
  }, [user, userId])

  async function fetchData(userId) {
    try {
      console.log('FETCH DATA')

      const response = await fetch(`${hostUrl}/api/bookings/user/${userId}`)
      if (!response.ok) {
        throw new Error(
          'Error al intentar cargar todos los registros: . Response: ' +
            response.status
        )
      }
      const jsonData = await response.json()

      // Ordena las reservas por fecha de reserva, de la más reciente a la más antigua
      const sortedData = jsonData.sort((a, b) => {
        const dateA = new Date(a.product.dateCreated)
        const dateB = new Date(b.product.dateCreated)
        return dateB - dateA
      })

      setData(sortedData)
    } catch (error) {
      console.error('Error cargando los registros: ', error)
    }
  }

  function calculateDays(startDate, endDate) {
    // Parse las fechas en objetos Date
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    // Calcula la diferencia en milisegundos
    const timeDifference = end - start;
  
    // Convierte la diferencia en días
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    return daysDifference;
  }

  
  return (
    <div className='bg-[#f2f5fa]'>
      <div className='container mx-auto min-h-screen p-4 pt-8'>
        <SectionTitle antetitulo='volve a disfrutar' titulo='Tus reservas' />
        <div className='grid grid-cols-1  gap-x-6 gap-y-6 sm:grid-cols-2'>
          {userId ? (
            data.map(booking => (
              <a href={`/detail/${booking.product.id}`}>

              <div
                key={booking.id}
                className='group flex h-full w-full justify-start rounded shadow-lg transition-transform duration-300 ease-in-out hover:scale-[1.02] '
              >
                <div className='relative flex h-36 min-h-[150px] w-full flex-col overflow-hidden lg:h-[200px] lg:max-w-[35%] xl:max-w-[35%]'>
                  <img
                    src={`${booking.product.imageUrl}1.png`}
                    alt='imagen de la embarcacion'
                    className='h-full w-full rounded object-cover'
                  />
                </div>
                <div className='flex w-full flex-col flex-wrap pl-4  transition duration-300 ease-in-out group-hover:bg-white'>
                  <p className='truncate pb-3 text-xl font-bold uppercase text-sky-900'>
                    {booking.product.name}
                  </p>
                  <p className='font-small pb-3 text-sm text-gray-500'>
                    Hiciste tu reserva el día:{' '}
                    <span className='mr-2 text-xs font-semibold uppercase text-gray-500'>
                      {' '}
                      {dayjs(booking.dateCreated).format('DD-MM-YYYY')}
                    </span>
                  </p>
                  <p className='font-small pb-3 text-sm text-gray-500'>
                    Fecha de ingreso:{' '}
                    <span className='mr-2 text-xs font-semibold uppercase text-gray-500'>
                      {dayjs(booking.dateInit).format('DD-MM-YYYY')}
                    </span>
                  </p>
                  <p className='font-small pb-3 text-sm text-gray-500'>
                    Fecha de salida:{' '}
                    <span className='mr-2 text-xs font-semibold uppercase text-gray-500'>
                      {dayjs(booking.dateEnd).format('DD-MM-YYYY')}
                    </span>
                  </p>
                  <p className='font-small pb-3 text-sm text-gray-500'>
                    Cantidad de días:{' '}
                    <span className='mr-2 text-xs font-semibold uppercase text-gray-500'>
                      {calculateDays(booking.dateInit, booking.dateEnd)}
                    </span>
                  </p>
                </div>
              </div>
              </a>   ))
          ) : (
            <div className='text-center font-bold text-sky-900'>
              Cargando historial de reservas...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HistorialReservas
