'use client'
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/authContext';
import SectionTitle from '@/components/SectionTitle'


const HistorialReservas = () => {
  const { user } = useAuth();
  const hostUrl = process.env.NEXT_PUBLIC_HOST_URL;
  const [userId, setUserId] = useState(null);
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
     
       // Ordena las reservas por fecha de reserva, de la más reciente a la más antigua
       const sortedData = jsonData.sort((a, b) => {
        const dateA = new Date(a.product.dateCreated);
        const dateB = new Date(b.product.dateCreated);
        return dateB - dateA;
      });

      setData(sortedData);
     
    } catch (error) {
      console.error('Error cargando los registros: ', error)
    }
  }
 
  

  return (
    <div className='bg-[#f2f5fa]'>
      <SectionTitle antetitulo='volve a disfrutar' titulo='Tus reservas' />
      <div className='container mx-auto min-h-screen p-4 pt-8'>
        <div  className='grid grid-cols-1 justify-items-center gap-x-6 gap-y-3 sm:grid-cols-2'>
        
        {userId ? (
             
                  data.map((booking) => (
                    <div key={booking.id} className='group h-full w-full flex justify-start rounded shadow-sm transition-transform duration-300 ease-in-out hover:scale-[1.02] '>
                       <div className='relative h-36 min-h-[150px] w-full flex flex-col overflow-hidden lg:h-[200px] lg:max-w-[35%] xl:max-w-[35%]'>
                         <img
                            src={`${booking.product.imageUrl}1.png`}
                            alt='imagen de la embarcacion'
                            className='h-full w-full object-cover rounded'
                          />
                       </div>
                      <div className='pl-4 flex flex-col flex-wrap w-full  transition duration-300 ease-in-out group-hover:bg-white'>
                        <p>Nombre del Producto: {booking.product.name}</p> 
                        <p>Fecha de Reserva: {booking.product.dateCreated}</p> 
                        <p>Fecha de Inicio: {booking.product.dateInit}</p> 
                        <p>Fecha de Fin: {booking.product.dateEnd}</p>
                      </div>
                     
                    </div>
                  ))
                
              ) : (
                <div  className='text-sky-900 font-bold'>Cargando historial de reservas...</div>
              )}
        </div>
      </div>
    </div>
  )
}

export default HistorialReservas;
