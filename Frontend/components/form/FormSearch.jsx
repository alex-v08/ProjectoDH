'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import DatePicker from './DatePicker'
import { BiCurrentLocation, BiCalendar, BiSearch } from 'react-icons/bi'
import { getAllUseClient } from '../util/callAPI'

export default function FormSearch() {
  // Almacena la ciudad selecionada
  const [selectedCity, setSelectedCity] = useState('')

  // Almacena los dias seleccionados
  const [selectedTime, setSelectedTime] = useState({
    startDate: '',
    endDate: ''
  })

  // Almacena el Array de ciudades para el select
  const [locations, setLocations] = useState([])

  const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
  const urlLocations = `${hostUrl}/api/location/all`

  // Controla el cambio de ciudad seleccionada
  const handleSelectChangeCity = event => {
    setSelectedCity(event.target.value)
  }

  // Controla el cambio de fecha seleccionada
  const handleTimeChange = newValue => {
    if (newValue.startDate !== null || newValue.endDate !== null) {
      setSelectedTime(newValue)
    }
  }

  // Pinta el listado de ciudades para el select
  useEffect(() => {
    getAllUseClient(urlLocations, setLocations)
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
          <Link
            href={`/search?city=${selectedCity}&categoriesId=null&featuresId=null&minPrice=0&maxPrice=5000&dateInit=${selectedTime.startDate}&dateEnd=${selectedTime.endDate}`}
          >
            <button className='trasition h-12 w-full rounded border border-sky-500 bg-sky-500 px-4 py-2 font-semibold text-white transition ease-in-out hover:bg-sky-900 lg:mt-8 lg:min-w-[125px] lg:max-w-[176px]'>
              Buscar <BiSearch className='ml-2 inline-block h-6 w-6' />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
