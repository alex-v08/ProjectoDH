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
        // disabledDates={[
        //   {
        //     startDate: '2023-09-05',
        //     endDate: '2023-09-08'
        //   },
        //   {
        //     startDate: '2023-09-15',
        //     endDate: '2023-09-20'
        //   }
        // ]}
        minDate={new Date()}
        maxDate={new Date().setMonth(22)}
        primaryColor={'rose'}
        i18n={'es'}
        startWeekOn='mon'
        placeholder={'Llegada --> Salida'}
        separator={'-'}
        popoverDirection='down'
        showFooter={true}
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
