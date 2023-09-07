'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/authContext'
import SectionTitle from '@/components/SectionTitle'
import { BsFillTrashFill } from 'react-icons/bs'

const CurrentFavs = () => {
  const [data, setData] = useState([])
  const [changeData, setChangeData] = useState(true)
  const [userId, setUserId] = useState(null)
  const [isRemove, setIsRemove] = useState(false)

  const { user } = useAuth()

  const hostUrl = process.env.NEXT_PUBLIC_HOST_URL

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

  useEffect(() => {
    fetchData(userId)
  }, [isRemove])

  async function fetchData(userId) {
    try {
      console.log('FETCH DATA')
      console.log(userId)
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
      console.log(data)
    } catch (error) {
      console.error('Error cargando los registros: ', error)
    }
  }

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

  return (
    <div className='bg-[#f2f5fa]'>
      <div className='container mx-auto min-h-screen p-4 pt-8'>
        <SectionTitle antetitulo='elegidos' titulo='Tus favoritos' />
        <div className='grid grid-cols-1 justify-items-center gap-x-6 gap-y-3 sm:grid-cols-2'>
          {data.map(item => (
            <a
              key={item.id}
              className='group relative flex w-full max-w-[450px] flex-col overflow-hidden rounded-lg border shadow-sm transition-transform duration-300 ease-in-out hover:scale-[1.02] lg:max-w-full lg:flex-row'
              href={`/detail/${item.product.id}`}
            >
              <div className='relative h-36 min-h-[150px] w-full overflow-hidden lg:h-[200px] lg:max-w-[35%] xl:max-w-[35%]'>
                <img
                  src={`${item.product.imageUrl}1.png`}
                  alt='imagen de la embarcacion'
                  className='h-full w-full object-cover'
                />
              </div>
              <div className='flex h-full w-full flex-col justify-between px-4 py-4 transition duration-300 ease-in-out group-hover:bg-white lg:px-8'>
                <div>
                  <h3 className='truncate pb-2 text-xl font-bold uppercase text-sky-900'>
                    {item.product.name}
                  </h3>
                  <p className='font-small pb-4 text-sm text-gray-500'>
                    {item.product.description}
                  </p>
                </div>
                <div className='flex items-center justify-between'>
                  <h3 className='text-l flex flex-col font-extrabold leading-none text-sky-500 md:flex-row'>
                    <span className='mr-2 text-xs font-semibold uppercase text-gray-500'>
                      Por noche
                    </span>
                    <span>$ {item.product.pricePerDay}</span>
                  </h3>
                  <a
                    className=' cursor-pointer rounded px-2 py-1 text-sm text-rose-500 transition hover:text-rose-600'
                    onClick={e => {
                      e.preventDefault()
                      handleRemoveFav(item.product.id)
                    }}
                  >
                    <BsFillTrashFill className='h-7 w-7' />
                  </a>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CurrentFavs
