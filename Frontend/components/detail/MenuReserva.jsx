'use client'
import DatePicker from '@/components/detail/DatePicker'
import CurrencyFormatter from '@/components/util/CurrencyFormatter'
import Link from 'next/link'
import { useState } from 'react'

export default function MenuReserva({ price, id }) {
  const [selectedDate, setSelectedDate] = useState(null) // Agrega un estado para la fecha seleccionada

  const handleReserva = e => {
    if (!selectedDate) {
      // Si no se ha seleccionado una fecha, muestra un mensaje de error o realiza la lógica que desees.
      e.preventDefault()
      alert('Debes seleccionar una fecha antes de realizar la reserva.')
      return // Evita continuar con la reserva
    }

    // Lógica para proceder con la reserva si se selecciona una fecha
    // ...
  }

  return (
    <div className='sticky top-[94px] w-full rounded-lg border border-gray-100 bg-white shadow-lg shadow-gray-200 lg:max-w-[438px]'>
      <div className='px-5 pb-10 pt-5 text-gray-500 sm:px-12'>
        <div className='mb-8 flex items-center border-b pb-2'>
          <span className='pr-2 text-xs font-semibold uppercase'>desde:</span>
          <span className='text-lg font-bold tracking-tight text-sky-500'>
            <CurrencyFormatter value={price} />/ Día
          </span>
        </div>
        <div>
          <div className='flex items-center pb-2 text-sky-950'>
            <span className='floaty-icon-calendar pr-3 text-xl'></span>
            <h2 className='text-sm font-semibold uppercase'>Fecha</h2>
          </div>
          <DatePicker setSelectedDate={setSelectedDate} />
          <div className='mt-5 flex items-center pb-2 text-sky-950'>
            <span className='floaty-icon-guestes pr-3 text-xl'></span>
            <h2 className='text-sm font-semibold uppercase'>Pasajeros</h2>
          </div>
          <input
            type='number'
            placeholder='Cantidad de personas'
            className='mb-10 w-full rounded-lg border-2 p-3 text-gray-400 dark:[color-scheme:light]'
          />
        </div>
        <div className=''>
          <Link
            href={{
              pathname: '/checkout',
              query: {
                startDate: selectedDate ? selectedDate.startDate : '',
                endDate: selectedDate ? selectedDate.endDate : '',
                id: id ? id : ''
              } // Agrega la fecha seleccionada a la ruta
            }}
            type='button'
            onClick={handleReserva}
            className='mb-5 w-full rounded-md bg-sky-500 py-3.5 text-center text-sm font-semibold text-white transition ease-in-out hover:bg-sky-900'
          >
            Reservar ahora
          </Link>
        </div>
        <p className='px-0 text-center text-sm xl:px-5'>
          Ponte en contacto con el propietario para planificar tu viaje o
          consultar cualquier duda.
        </p>
      </div>
    </div>
  )
}
