'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/authContext'
import SectionTitle from '@/components/SectionTitle'
import { BsFillTrashFill } from 'react-icons/bs'
import Image from 'next/image'
import Link from 'next/link'
import { staticBlurDataUrl } from '@/components/util/staticBlurDataUrl'
import { useRouter } from 'next/navigation'

const CurrentFavs = () => {
  const [data, setData] = useState([])
  const [changeData, setChangeData] = useState(true)
  const [userId, setUserId] = useState(null)
  const [isRemove, setIsRemove] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)

  const { user } = useAuth()

  const hostUrl = process.env.NEXT_PUBLIC_HOST_URL

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
        // console.log('FETCH USER')
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

  // Utiliza un useEffect para cargar los datos cuando userId cambia
  useEffect(() => {
    if (userId !== null) {
      async function fetchData() {
        try {
          // console.log('FETCH DATA')
          // console.log(userId)
          const response = await fetch(
            `${hostUrl}/api/favorites/findByUserId/${userId}`
          )
          if (!response.ok) {
            throw new Error(
              'Error al intentar cargar todos los registros: . Response: ' +
                response.status
            )
          }
          const jsonData = await response.json()
          setData(jsonData)
          setIsLoadingData(false)
        } catch (error) {
          console.error('Error cargando los registros: ', error)
        }
      }

      fetchData() // Llamar a fetchData aquí cuando userId no sea nulo
    }
  }, [userId, isRemove])

  useEffect(() => {
    if (changeData) {
      setChangeData(false)
    }
  }, [changeData])

  const handleRemoveFav = async productId => {
    try {
      const response = await fetch(
        `${hostUrl}/api/favorites/delete?userId=${userId}&productId=${productId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      setIsRemove(!isRemove)

      if (!response.ok) {
        throw new Error(
          'Error al intentar eliminar el producto de favoritos. Response: ' +
            response.status
        )
      } else {
        // Maneja la respuesta exitosa aquí, si es necesario
      }
    } catch (error) {
      console.error(
        'Error al intentar eliminar el producto de favoritos:',
        error
      )
    }
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
        <SectionTitle antetitulo='elegidos' titulo='Mis favoritos' />
        <div className='grid grid-cols-1 justify-items-center gap-x-6 gap-y-10 sm:grid-cols-2 xl:gap-x-8'>
          {isLoadingData ? (
            <>{skeletonCards}</>
          ) : data.length === 0 ? (
            <p>No tienes favoritos todavía</p>
          ) : (
            <>
              {data.map(item => (
                <Link
                  key={item.id}
                  className='group relative flex w-full max-w-[450px] flex-col overflow-hidden rounded-lg border shadow-md transition-transform duration-300 ease-in-out hover:scale-[1.02] lg:max-w-full lg:flex-row'
                  href={`/detail/${item.product.id}`}
                >
                  <div className='relative h-36 min-h-[150px] w-full overflow-hidden lg:h-[200px] lg:max-w-[35%] xl:max-w-[35%]'>
                    <Image
                      src={`${item.product.imageUrl}1.png`}
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
                        {item.product.name}
                      </h3>
                      <div className='font-small mb-4 line-clamp-3 text-sm text-gray-500'>
                        {item.product.description}
                      </div>
                    </div>
                    <div className='flex items-center justify-between'>
                      <h3 className='text-l flex flex-col font-extrabold leading-none text-sky-500 md:flex-row'>
                        <span className='mr-2 text-xs font-semibold uppercase text-gray-500'>
                          Por noche
                        </span>
                        <span>$ {item.product.pricePerDay}</span>
                      </h3>
                      <button
                        className=' cursor-pointer rounded px-2 py-1 text-sm text-rose-400 transition hover:rotate-12 hover:text-rose-500'
                        onClick={e => {
                          e.preventDefault()
                          handleRemoveFav(item.product.id)
                        }}
                      >
                        <BsFillTrashFill className='h-6 w-6' />
                      </button>
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

export default CurrentFavs
