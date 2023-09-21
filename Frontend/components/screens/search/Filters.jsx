'use client'

import PriceRangeSlider from '@/components/util/PriceRangeSlider'
import { getAllUseClient } from '@/components/util/callAPI'
import { useState, useEffect } from 'react'

export default function Filters({
  handleSelectChangeCategory,
  handleSelectChangeFeatures,
  productsFilters,
  handleSliderChange,
  priceRange,
  categoriesId
}) {
  // Para almacenar la data de inptus
  const [allCategories, setAllCategories] = useState([])
  const [allFeatures, setAllFeatures] = useState([])

  const urlCategories = '/api/products/categories'
  const urlFeatures = '/api/products/features'

  useEffect(() => {
    getAllUseClient(urlFeatures, setAllFeatures)
  }, [])

  useEffect(() => {
    getAllUseClient(urlCategories, setAllCategories)
  }, [productsFilters])

  return (
    <>
      {/* Tipo de bote */}
      <div className=' rounded-lg border border-gray-100 bg-white shadow-lg shadow-gray-200'>
        <div className='mb-8 flex items-center border-b px-12 py-6 lg:px-7 xl:px-12'>
          <i className='floaty-icon-helm text-4xl text-sky-500'></i>
          <span className='pl-2 text-xl font-bold text-sky-950'>
            Tipo de Bote
          </span>
          <span className='text-lg font-bold tracking-tight text-sky-500'></span>
        </div>
        <div className='px-14 pb-10 lg:px-9 xl:px-14'>
          <div className='flex flex-col gap-4 text-lg font-medium text-gray-500'>
            {allCategories &&
              allCategories.map((category, index) => (
                <div className='group flex items-center' key={index}>
                  <input
                    onChange={handleSelectChangeCategory}
                    value={
                      categoriesId === category.id ? categoriesId : category.id
                    }
                    type='checkbox'
                    name={category.name}
                    id={category.id}
                    // checked={categoryIds.includes(category.id) ? true : false}
                    className='h-5 w-5 appearance-none rounded-sm border border-gray-300 transition checked:border-transparent checked:bg-sky-500 checked:text-white hover:border-sky-500'
                  />
                  <label
                    htmlFor={category.name}
                    className='truncate pl-2 transition group-hover:text-sky-500'
                  >
                    {category.name}
                  </label>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* Rango de precio */}
      <div className='mt-10 rounded-lg border border-gray-100 bg-white shadow-lg shadow-gray-200'>
        <div className='mb-8 flex items-center border-b px-12 py-6 lg:px-7 xl:px-12'>
          <i className='floaty-icon-helm text-4xl text-sky-500'></i>
          <span className='pl-2 text-xl font-bold text-sky-950'>
            Rango de Precios
          </span>
          <span className='text-lg font-bold tracking-tight text-sky-500'></span>
        </div>
        <div className='px-14 pb-10 lg:px-9 xl:px-14'>
          <div className='flex flex-col gap-4 text-lg font-medium text-gray-500'>
            <PriceRangeSlider
              priceRange={priceRange}
              handleSliderChange={handleSliderChange}
            />
          </div>
        </div>
      </div>
      {/* Características */}
      <div className='mt-10 rounded-lg border border-gray-100 bg-white shadow-lg shadow-gray-200'>
        <div className='mb-8 flex items-center border-b px-12 py-6 lg:px-7 xl:px-12'>
          <i className='floaty-icon-helm text-4xl text-sky-500'></i>
          <span className='pl-2 text-xl font-bold text-sky-950'>
            Características
          </span>
          <span className='text-lg font-bold tracking-tight text-sky-500'></span>
        </div>
        <div className='px-14 pb-10 lg:px-9 xl:px-14'>
          <div className='flex flex-col gap-4 text-lg font-medium text-gray-500'>
            {allFeatures &&
              allFeatures.map((feature, index) => (
                <div className='group flex items-center' key={index}>
                  <input
                    onChange={handleSelectChangeFeatures}
                    value={feature.id}
                    type='checkbox'
                    name={feature.name}
                    id={feature.image}
                    className='h-5 w-5 appearance-none rounded-sm border border-gray-300 transition checked:border-transparent checked:bg-sky-500 checked:text-white hover:border-sky-500'
                  />
                  <label
                    htmlFor={feature.image}
                    className='truncate pl-2 transition group-hover:text-sky-500'
                  >
                    {feature.name}
                  </label>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
