'use client'
import  {useState, useEffect} from 'react';
import { useAuth } from '@/context/authContext';

const CurrentFavs = () => {
    const [data, setData] = useState([])
    const [changeData, setChangeData] = useState(true)
    const [userId, setUserId] = useState(0);

    const { user } = useAuth();

    const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
   
    useEffect(() => {
      const fetchUserId = async () => {
          try {
              const response = await fetch(`${hostUrl}/users/list/{uuid}?uuid=${user.uid}`)
              console.log("FETCH USER")
              if (response.ok) {
                  const userData = await response.json()
                  setUserId(userData[0].id)
                  fetchData(userId)
                  return userId                  
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
       
    }, [user]
)
        
    async function fetchData(userId) {
      try {
        console.log("FETCH DATA")
        console.log(userId)
        const response = await fetch(`${hostUrl}/api/favorites/findByUserId/${userId}`)
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

    const handleRemoveFav = async (productId) => {
      try {
          const response = await fetch(`${hostUrl}/api/favorites/delete?userId=${userId}&productId=${productId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
    
          if (!response.ok) {
            throw new Error(
              'Error al intentar eliminar el producto de favoritos. Response: ' +
                response.status
            );
          } else {
            // Maneja la respuesta exitosa aquí, si es necesario
          }
        } catch (error) {
          console.error('Error al intentar eliminar el producto de favoritos:', error);
        }
  }

    return (
      <div className='container mx-auto p-4'>
        <h1 className='text-2xl font-semibold my-4  text-sky-900'>Favoritos</h1>
        <div className="grid grid-cols-1 justify-items-center gap-x-6 gap-y-4 pt-6 sm:grid-cols-2 lg:grid-cols-1">
          {data.map((item) => (
            <a
              key={item.id}
              className='group relative flex w-full max-w-[450px] flex-col overflow-hidden rounded-lg border shadow-sm transition-transform duration-300 ease-in-out hover:scale-[1.01] lg:max-w-full lg:flex-row'
              href={`/detail/${item.product.id}`}
            >
              <div className='h-36 max-w-[35%] w-full relative overflow-hidden lg:h-[200px]'>
                <img
                  src={`${item.product.imageUrl}1.png`}
                  alt="imagen de la embarcacion"
                  className='h-full w-full object-cover'
                />
              </div>
              <div className='flex w-full flex-col justify-between px-4 py-4 transition duration-300 ease-in-out group-hover:bg-white lg:px-8'>
                <div>
                  <h3 className='truncate pb-2 text-xl font-bold uppercase text-sky-900'>
                    {item.product.name}
                  </h3>
                  <p className='text-sm font-small text-gray-500 pb-4'>
                    {item.product.description}
                  </p>
                </div>
                <div className='flex items-center justify-between'>
                  <h3 className='text-xl font-extrabold leading-none text-sky-500'>
                    <span className='text-xs mr-2 font-semibold uppercase text-gray-500'>
                      Por noche
                    </span>
                    <span>$ {item.product.pricePerDay}</span>
                  </h3>
                  <a
                    className=' text-sky-600 text-sm px-2 py-1 rounded hover:text-blue-500 cursor-pointer'
                    onClick={() => handleRemoveFav(item.product.id)}
                  >
                    Eliminar de favoritos
                  </a>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      )
  }

export default CurrentFavs