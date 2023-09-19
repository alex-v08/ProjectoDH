'use client'

export default function PriceRangeSlider({ priceRange, handleSliderChange }) {
  return (
    <div className='w-full'>
      <input
        type='range'
        min='0'
        max='5000' // Ajusta estos valores según tu rango de precios
        value={priceRange}
        onChange={handleSliderChange}
        className='slider h-3 w-full cursor-pointer appearance-none rounded-full bg-sky-500'
      />
      <div className='flex justify-between'>
        <span className='text-gray-500'>Desde: $0</span>
        <span className='text-gray-500'>Hasta: ${priceRange}</span>
      </div>
    </div>
  )
}
