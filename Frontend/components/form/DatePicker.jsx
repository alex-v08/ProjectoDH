'use client'

import Datepicker from 'react-tailwindcss-datepicker'

export default function DatePicker({ handleTimeChange, selectedTime }) {
  return (
    <>
      <Datepicker
        readOnly={true}
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
        value={selectedTime}
        onChange={handleTimeChange}
        displayFormat={'DD/MM/YYYY'}
        inputClassName='w-full p-[13px] border rounded-lg'
        toggleClassName='absolute bg-sky-500 rounded-r-lg text-white right-0 h-full p-[13px] text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed'
      />
    </>
  )
}
