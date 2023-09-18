'use client'

import { useEffect, useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'

export default function DatePicker({ setSelectedDate, id }) {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null
  })

  const [disabledDates, setDisabledDates] = useState([])

  useEffect(() => {
    const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
    // Realiza una solicitud GET a la API cuando el componente se monta
    fetch(`${hostUrl}/api/bookings/product/date/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('La solicitud no se completó correctamente.')
        }
        return response.json()
      })
      .then(data => {
        // Transforma los datos recibidos en el formato adecuado para disabledDates
        const transformedDates = data.map(item => ({
          startDate: item.starDate,
          endDate: item.endDate
        }))
        // Actualiza el estado con las fechas deshabilitadas
        setDisabledDates(transformedDates)
      })
      .catch(error => {
        // Maneja los errores si la solicitud no se completa correctamente
        console.error('Error en la solicitud GET:', error)
      })
  }, [id])

  const handleValueChange = newValue => {
    console.log('newValue:', newValue)
    setValue(newValue)
    // Actualiza el estado en el componente padre cuando se selecciona una fecha
    setSelectedDate(newValue)
  }

  return (
    <>
      <Datepicker
        disabledDates={disabledDates}
        readOnly={true}
        useRange={false}
        popoverDirection='down'
        minDate={new Date()}
        maxDate={new Date().setMonth(22)}
        primaryColor={'rose'}
        i18n={'es'}
        startWeekOn='mon'
        placeholder={'Llegada --> Salida'}
        separator={'-'}
        showFooter={false}
        configs={{
          footer: {
            cancel: 'Cancelar',
            apply: 'Aceptar'
          }
        }}
        value={value}
        onChange={handleValueChange}
        displayFormat={'DD/MM/YYYY'}
        inputClassName='w-full p-[13px] border rounded-lg'
        toggleClassName='absolute bg-sky-500 rounded-r-lg text-white right-0 h-full p-[13px] text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed'
      />
    </>
  )
}
