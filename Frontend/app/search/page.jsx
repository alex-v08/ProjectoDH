'use client'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import HeroSearch from '@/components/screens/search/HeroSearch'
import Filters from '@/components/screens/search/Filters'
import FormSearchNew from '@/components/form/FormSearchNew'
import { CardDetailSearch } from '@/components/screens/search/CardDetailSearch'
import { getAllUseClient } from '@/components/util/callAPI'
// import { AiOutlineSortAscending } from 'react-icons/ai'

export default function SearchID() {
  // Params
  const searchParams = useSearchParams()
  let selectedCity = searchParams.get('city')
  let dateInit = searchParams.get('dateInit')
  let dateEnd = searchParams.get('dateEnd')

  const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
  const urlGetProductsFilterHome = `${hostUrl}/api/allFiltered/?city=${selectedCity}&dateInit=${dateInit}&dateEnd=${dateEnd}`

  // Pinta el resultado de la busqueda
  const [productsFilters, setProductsFilters] = useState([])

  const [loading, setLoading] = useState(true)

  // Almacena el precio maximo
  const [priceRange, setPriceRange] = useState(5000)

  // Almacena las opciones de categorias de embarcaciones seleccionadas
  const [selectedCategory, setSelectedCategory] = useState([])

  // Almacena las opciones de características de embarcaciones seleccionadas
  const [featuresOptions, setFeaturesOptions] = useState([])

  // Controla los check de las categorias
  const handleSelectChangeCategory = event => {
    const { value, checked } = event.target
    // let link

    if (checked) {
      // Agregar el valor al array si el checkbox está marcado
      setSelectedCategory([...selectedCategory, value])
    } else {
      // Eliminar el valor del array si el checkbox está desmarcado
      setSelectedCategory(selectedCategory.filter(item => item !== value))
    }
  }

  // Controla el precio maximo
  const handleSliderChange = event => {
    setPriceRange(event.target.value)
  }

  // Controla los check de las características
  const handleSelectChangeFeatures = event => {
    const { value, checked } = event.target

    if (checked) {
      // Agregar el valor al array si el checkbox está marcado
      setFeaturesOptions([...featuresOptions, value])
      console.log('VER featuresOptions checked', featuresOptions)
    } else {
      // Eliminar el valor del array si el checkbox está desmarcado
      setFeaturesOptions(featuresOptions.filter(item => item !== value))
    }
  }

  // Pinta el filtrado que viene de la home
  useEffect(() => {
    getAllUseClient(urlGetProductsFilterHome, setProductsFilters, setLoading)
  }, [])

  // Pinta el filtrado del todos los input
  useEffect(() => {
    const getSearch = async () => {
      // para generar el slug para las categorias
      let array = selectedCategory
      let cadena = array.join(', ')
      const resultado = eval(`[${cadena}]`)

      // para generar el slug para las características
      let arrayFeatures = featuresOptions
      let stringFeatures = arrayFeatures && arrayFeatures.join(', ')
      const resultFeatures = eval(`[${stringFeatures}]`)

      try {
        const response = await fetch(
          `${hostUrl}/api/allFiltered/?city=${selectedCity}&categoriesId=${resultado}&featuresId=${resultFeatures}&minPrice=0&maxPrice=${priceRange}&dateInit=${dateInit}&dateEnd=${dateEnd}`,
          {
            cache: 'no-store'
          }
        )

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const products = await response.json()
        setProductsFilters(products)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }
    getSearch()
  }, [
    selectedCategory,
    featuresOptions,
    selectedCity,
    priceRange,
    dateInit,
    dateEnd
  ])

  return (
    <>
      <HeroSearch />
      <FormSearchNew dateInit={dateInit} dateEnd={dateEnd} />
      <div className='bg-[#f2f5fa]'>
        <div className='container pb-20 pt-[32rem] sm:pt-[26rem] lg:pt-32'>
          {/* Container */}
          <div className='flex flex-col gap-8 pt-6 lg:flex-row lg:items-start'>
            {/* Detalles */}
            <div className='1 w-full pt-2'>
              <div className='flex flex-wrap  justify-between text-gray-600'>
                <h1 className='flex flex-wrap items-center text-lg'>
                  <div className='pr-2 font-bold'>
                    {productsFilters.length}{' '}
                  </div>
                  <div>Resultados</div>
                </h1>
                {/* <div className='flex items-center'>
                  <div className='hidden text-sm tracking-tight sm:inline-block'>
                    Ordenar por
                  </div>
                  <AiOutlineSortAscending className='mx-2 text-2xl' />
                  <select
                    name=''
                    id=''
                    className='w-32 rounded-md border p-2 outline-none'
                  >
                    <option value=''>Nombre</option>
                    <option value=''>Precio</option>
                    <option value=''>Rating</option>
                  </select>
                </div> */}
              </div>
              <div className='grid grid-cols-1 justify-items-center gap-x-6 gap-y-10 pt-10 sm:grid-cols-2 lg:grid-cols-1'>
                {productsFilters &&
                  productsFilters.map(
                    ({
                      imageUrl,
                      id,
                      name,
                      description,
                      pricePerDay,
                      category
                    }) =>
                      imageUrl !== null ? (
                        <CardDetailSearch
                          key={id}
                          imageUrl={imageUrl + '1.png'}
                          id={id}
                          name={name}
                          description={description}
                          pricePerDay={pricePerDay}
                          category={category}
                          // placeHolder={placeHolders[index]}
                        />
                      ) : null
                  )}
              </div>
            </div>
            {/* Filtros */}
            <div className='w-full lg:max-w-[292.14px] xl:max-w-[426.89px] 2xl:max-w-[438px]'>
              <Filters
                handleSelectChangeCategory={handleSelectChangeCategory}
                handleSelectChangeFeatures={handleSelectChangeFeatures}
                productsFilters={productsFilters}
                handleSliderChange={handleSliderChange}
                priceRange={priceRange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
