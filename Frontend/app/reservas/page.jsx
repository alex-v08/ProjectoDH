'use client'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/authContext'
import SectionTitle from '@/components/SectionTitle'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { staticBlurDataUrl } from '@/components/util/staticBlurDataUrl'
import { useRouter } from 'next/navigation'

const HistorialReservas = () => {
  const { user } = useAuth()
  const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
  const [userId, setUserId] = useState(null)
  const [data, setData] = useState([])
  const [isLoadingData, setIsLoadingData] = useState(true)

  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  })

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch(
          `${hostUrl}/api/users/list/{uuid}?uuid=${user.uid}`
        )
        if (response.ok) {
          const userData = await response.json()
          setUserId(userData[0].id)
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

  useEffect(() => {
    if (userId !== null) {
      async function fetchData() {
        try {
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
          setIsLoadingData(false)
        } catch (error) {
          console.error('Error cargando los registros: ', error)
        }
      }

      fetchData() // Llamar a fetchData aquí cuando userId no sea nulo
    }
  }, [userId])

  function calculateDays(startDate, endDate) {
    // Parse las fechas en objetos Date
    const start = new Date(startDate)
    const end = new Date(endDate)

    // Calcula la diferencia en milisegundos
    const timeDifference = end - start

    // Convierte la diferencia en días
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

    return daysDifference
  }

  const skeletonCards = Array.from({ length: 8 }).map((_, index) => (
    <div
      key={index}
      className='group relative flex w-full max-w-[450px] flex-col overflow-hidden rounded-lg border shadow-md transition-transform duration-300 ease-in-out hover:scale-[1.02] lg:max-w-full lg:flex-row'
    >
      <div className='relative h-36 min-h-[150px] w-full animate-pulse overflow-hidden bg-gray-300 lg:h-[200px] lg:max-w-[35%] xl:max-w-[35%]'></div>
      <div className='w-full transition duration-300 ease-in-out group-hover:bg-white'>
        <div className='flex flex-col px-5 py-6 text-xs sm:px-7'>
          <div className='flex justify-between'>
            <div className='skeleton-category w-10 animate-pulse bg-gray-300'></div>
            <div className='flex'>
              <div className='skeleton-star h-4 w-5 animate-pulse bg-gray-300'></div>
              <div className='skeleton-rating h-4 w-16 animate-pulse bg-gray-300'></div>
            </div>
          </div>
          <div className='skeleton-name mt-2 h-5 animate-pulse bg-gray-300'></div>
          <div className='skeleton-description mt-2 h-10 animate-pulse bg-gray-300'></div>
        </div>
        <div className='flex items-center justify-between px-7 py-3'>
          <div className='skeleton-price h-6 w-24 animate-pulse bg-gray-300'></div>
          <div className='skeleton-button h-9 w-32 animate-pulse rounded-lg bg-gray-300'></div>
        </div>
      </div>
    </div>
  ))

  return (
    <div className='bg-[#f2f5fa]'>
      <div className='container mx-auto min-h-screen pb-10 pt-8'>
        <SectionTitle antetitulo='volve a disfrutar' titulo='Mis reservas' />
        <div className='grid grid-cols-1 justify-items-center gap-x-6 gap-y-10 sm:grid-cols-2 xl:gap-x-8'>
          {isLoadingData ? (
            <>{skeletonCards}</>
          ) : data.length === 0 ? (
            <p>No hay reservas realizadas</p>
          ) : (
            <>
              {data.map(booking => (
                <Link
                  key={booking.id}
                  className='group relative flex w-full max-w-[450px] flex-col overflow-hidden rounded-lg border shadow-md transition-transform duration-300 ease-in-out hover:scale-[1.02] lg:max-w-full lg:flex-row'
                  href={`/detail/${booking.product.id}`}
                >
                  <div className='relative h-36 min-h-[150px] w-full overflow-hidden lg:h-[200px] lg:max-w-[35%] xl:max-w-[35%]'>
                    <Image
                      src={`${booking.product.imageUrl}1.png`}
                      alt='imagen de la embarcacion'
                      loading='eager'
                      fill
                      blurDataURL={staticBlurDataUrl()}
                      placeholder='blur'
                      sizes='(max-width: 768px) 100vw'
                      style={{ objectFit: 'cover' }}
                      className='transition duration-150 ease-in-out group-hover:brightness-105'
                    />
                  </div>
                  <div className='flex h-full w-full flex-col justify-between px-4 py-4 transition duration-300 ease-in-out group-hover:bg-white lg:max-w-[65%] lg:px-8'>
                    <div>
                      <h3 className='truncate pb-2 text-xl font-bold uppercase text-sky-900'>
                        {booking.product.name}
                      </h3>
                      <div className='font-small mb-4 text-sm text-gray-500'>
                        <p className='font-small text-sm font-semibold text-gray-500'>
                          Reserva realizada:{' '}
                          <span className='mr-2 text-xs font-normal uppercase text-gray-500'>
                            {' '}
                            {dayjs(booking.dateCreated).format('DD-MM-YYYY')}
                          </span>
                        </p>
                        <p className='font-small text-sm font-semibold text-gray-500'>
                          Fecha de ingreso:{' '}
                          <span className='mr-2 text-xs font-normal uppercase text-gray-500'>
                            {dayjs(booking.dateInit).format('DD-MM-YYYY')}
                          </span>
                        </p>
                        <p className='font-small text-sm font-semibold text-gray-500'>
                          Fecha de salida:{' '}
                          <span className='mr-2 text-xs font-normal uppercase text-gray-500'>
                            {dayjs(booking.dateEnd).format('DD-MM-YYYY')}
                          </span>
                        </p>
                        <p className='font-small text-sm font-semibold text-gray-500'>
                          Días:{' '}
                          <span className='mr-2 text-xs font-normal uppercase text-gray-500'>
                            {calculateDays(booking.dateInit, booking.dateEnd)}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center justify-between'>
                      <h3 className='text-l flex flex-col font-extrabold leading-none text-sky-500 md:flex-row'>
                        <span className='mr-2 text-xs font-semibold uppercase text-gray-500'>
                          Total
                        </span>
                        <span>
                          ${' '}
                          {booking.product.pricePerDay *
                            calculateDays(booking.dateInit, booking.dateEnd)}
                        </span>
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default HistorialReservas
