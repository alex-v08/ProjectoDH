'use client'
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/authContext';


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
 
  

  return (
    <div className='bg-[#f2f5fa]'>
      <div className='container mx-auto min-h-screen p-4 pt-8'>
        <h3>Historial de Reservas</h3>
        {userId ? (
          <ul>
            {data.map((booking) => (
              <li key={booking.id}>
                Nombre del Producto: {booking.product.name}<br />
                Fecha de Reserva: {booking.product.dateCreated}<br />
                Fecha de Inicio: {booking.product.dateInit}<br />
                Fecha de Fin: {booking.product.dateEnd}<br />
              </li>
            ))}
          </ul>
        ) : (
          <div>Cargando historial de reservas...</div>
        )}
      </div>
    </div>
  );
};

export default HistorialReservas;
