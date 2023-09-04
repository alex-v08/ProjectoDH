'use client'

import { useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'

export default function DatePicker() {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null
  })

  const handleValueChange = newValue => {
    // console.log('newValue:', newValue)
    setValue(newValue)
  }

  return (
    <>
      <Datepicker
        disabledDates={[
          {
            startDate: '2023-09-08',
            endDate: '2023-09-10'
          },
          {
            startDate: '2023-09-13',
            endDate: '2023-09-15'
          }
        ]}
        useRange={false}
        popoverDirection='down'
        minDate={new Date()}
        maxDate={new Date().setMonth(22)}
        primaryColor={'rose'}
        i18n={'es'}
        startWeekOn='mon'
        placeholder={'Desde - Hasta'}
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
