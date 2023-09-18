'use client'

import { useState, useEffect } from 'react'
import DatePicker from './DatePicker'
import { BiCurrentLocation, BiCalendar } from 'react-icons/bi'
import { useSearchParams, useRouter } from 'next/navigation'

export default function FormSearchNew() {
  // Params
  const searchParams = useSearchParams()
  const router = useRouter()
  const paramsCity = searchParams.get('city')
  const time = {
    startDate: searchParams.get('dateInit'),
    endDate: searchParams.get('dateEnd')
  }

  const urlBase = process.env.NEXT_PUBLIC_HOST_URL
  const urlLocations = `${urlBase}/api/location/all`

  // Almacena la ciudad selecionada
  const [selectedCity, setSelectedCity] = useState(
    paramsCity || 'Elija su lugar de inicio'
  )

  // Almacena los dias seleccionados
  const [selectedTime, setSelectedTime] = useState(time)

  // Controla el cambio de ciudad
  const handleSelectChangeCity = event => {
    setSelectedCity(event.target.value)
    router.push(
      `/search?city=${event.target.value}&dateInit=${selectedTime.startDate}&dateEnd=${selectedTime.endDate}`,
      { scroll: false }
    )
  }

  // Controla el cambio de fecha
  const handleTimeChange = newValue => {
    if (newValue.startDate !== null || newValue.endDate !== null) {
      setSelectedTime(newValue)
      router.push(
        `/search?city=${selectedCity}&dateInit=${newValue.startDate}&dateEnd=${newValue.endDate}`,
        { scroll: false }
      )
    }
  }
  // Almacena el Array de lugares para la peticion
  const [locations, setLocations] = useState([])

  // Obtiene el listado de ciudades para el select
  const getLocations = async () => {
    try {
      const response = await fetch(`${urlLocations}`)
      if (!response.ok) {
        throw new Error('Error al realizar la petición: ' + response.status)
      }
      const jsonData = await response.json()
      setLocations(jsonData)
    } catch (error) {
      console.error('Error al realizar la petición: ', error)
    }
  }

  // Pinta el listado de ciudades para el select
  useEffect(() => {
    getLocations()
  }, [])

  return (
    <div className='container'>
      <div className='relative'>
        <div className='absolute -top-20 left-0 z-10 flex w-full flex-col items-center gap-4 rounded-lg bg-white px-5 py-5 drop-shadow-md lg:flex-row lg:gap-2 lg:px-10 lg:py-9 xl:gap-6 xl:px-16'>
          <div className='mb-6 w-full lg:mb-0'>
            <div className='mb-2 flex items-center'>
              <BiCurrentLocation className='mr-3 h-6 w-6 text-sky-500' />
              <h2 className='text-sm font-medium uppercase'>Ubicación</h2>
            </div>
            {/* locations */}
            <select
              name=''
              id=''
              onChange={handleSelectChangeCity} // Manejar el cambio de opción seleccionada
              value={selectedCity} // Establecer el valor seleccionado en el estado
              className='w-full min-w-[210px] rounded-lg border-2 bg-white p-3 text-gray-400'
            >
              <option value='' hidden defaultValue>
                {selectedCity === ''
                  ? 'Elija su lugar de inicio'
                  : decodeURIComponent(selectedCity)}
              </option>
              {locations &&
                locations.map((location, index) => (
                  <option value={`${location.city}`} key={index}>
                    {location.city}
                  </option>
                ))}
            </select>
          </div>
          <div className='flex w-full flex-col sm:flex-row sm:gap-4'>
            <div className='mb-6 w-full lg:mb-0'>
              <div className='mb-2 flex items-center'>
                <BiCalendar className='mr-3 h-6 w-6 text-sky-500 lg:mr-2 xl:mr-3' />
                <h2 className='truncate pr-5 text-sm font-medium uppercase lg:pr-2 xl:pr-6'>
                  Fecha
                </h2>
              </div>
              <DatePicker
                selectedTime={selectedTime}
                handleTimeChange={handleTimeChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
