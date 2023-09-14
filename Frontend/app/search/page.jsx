'use client'
import HeroSearch from '@/components/screens/search/HeroSearch'
import { AiOutlineSortAscending } from 'react-icons/ai'
import React, { useState, useEffect } from 'react'
import { CardDetailSearch } from '@/components/screens/search/CardDetailSearch'
import Filters from '@/components/screens/search/Filters'
import { getAllUseClient } from '@/components/util/callAPI'
import { dynamicBlurDataUrl } from '@/components/util/dynamicBlurDataUrl'
import { useRouter, useSearchParams } from 'next/navigation'
import FormSearchNew from '@/components/form/FormSearchNew'

export default function SearchID() {
  const searchParams = useSearchParams()
  const router = useRouter()
  let selectedCity = searchParams.get('city')
  let dateInit = searchParams.get('dateInit')
  let dateEnd = searchParams.get('dateEnd')
  let featuresId = searchParams.get('featuresId')
  let minPrice = searchParams.get('minPrice')
  let maxPrice = searchParams.get('maxPrice')

  const hostUrl = process.env.NEXT_PUBLIC_HOST_URL

  // Estados para almacenar los items del listado
  const [totalProducts, setTotalProducts] = useState([])
  const [productsFilters, setProductsFilters] = useState([])

  const [loading, setLoading] = useState(true)

  // Estado para almacenar la ciudad seleccionada
  // const [selectedCity, setSelectedCity] = useState(params?.id)

  // Estado para almacenar las opciones de categorias de embarcaciones seleccionadas
  const [selectedOption, setSelectedOption] = useState([])

  // Estado para almacenar las opciones de características de embarcaciones seleccionadas
  const [featuresOptions, setFeaturesOptions] = useState([])

  // Estado para almacenar el slug de características
  const [slugFeatudes, setSlugFeatudes] = useState(false)

  // Estado para almacenar el slug de categorias
  const [slugCategory, setSlugCategory] = useState(false)

  // controla los check de las categorias
  const handleSelectChangeCategory = event => {
    const { value, checked, name } = event.target
    // let link

    if (checked) {
      // Agregar el valor al array si el checkbox está marcado
      setSelectedOption([...selectedOption, value])
      // router.push(
      //   `search?city=${event.target.value}&categoriesId=${selectedOption}&featuresId=${featuresOptions}&minPrice=${minPrice}&maxPrice=${maxPrice}&dateInit=${dateInit}&dateEnd=${dateEnd}`
      // )
    } else {
      // Eliminar el valor del array si el checkbox está desmarcado
      setSelectedOption(selectedOption.filter(item => item !== value))
    }
    if (!checked && selectedOption.length === 1) {
      setProductsFilters(totalProducts)
    }
    // link = selectedOption
    // if (link.length !== 0) {
    //   router.replace(`/search/${link}`)
    // }
  }

  // controla los check de las características
  const handleSelectChangeFeatures = event => {
    const { value, checked } = event.target
    // let link

    if (checked) {
      // Agregar el valor al array si el checkbox está marcado
      setFeaturesOptions([...featuresOptions, value])
      console.log('VER featuresOptions checked', featuresOptions)
    } else {
      // Eliminar el valor del array si el checkbox está desmarcado
      setFeaturesOptions(featuresOptions.filter(item => item !== value))
    }
    // link = selectedOption
    // if (link.length !== 0) {
    //   router.replace(`/search/${link}`)
    // }
  }

  // Para obtener el filtrado de la home
  const urlGetProductsFilterHome = `${hostUrl}/api/allFiltered/?city=${selectedCity}&dateInit=${dateInit}&dateEnd=${dateEnd}`
  console.log('CIUDAD SELECCIONADA', selectedCity, urlGetProductsFilterHome)
  useEffect(() => {
    getAllUseClient(urlGetProductsFilterHome, setProductsFilters, setLoading)
  }, [])

  // Para obtener el filtrado del componete Filters
  useEffect(() => {
    const getSearch = async () => {
      // para generar el slug para las categorias
      let array = selectedOption
      let cadena = array.join(', ')
      const resultado = eval(`[${cadena}]`)

      // para generar el slug para las características
      let arrayFeatures = featuresOptions
      let stringFeatures = arrayFeatures && arrayFeatures.join(', ')
      const resultFeatures = eval(`[${stringFeatures}]`)

      try {
        const response = await fetch(
          `${hostUrl}/api/allFiltered/?city=${selectedCity}&categoriesId=${resultado}&dateInit=${dateInit}&dateEnd=${dateEnd}&featuresId=${resultFeatures}`,
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
  }, [selectedOption, featuresOptions, selectedCity])

  // export default async function SearchID({ params }) {
  //   const results = await getHeader(params)
  //   const placeHolders = await Promise.all(
  //     results.map(product => dynamicBlurDataUrl(`${product.imageUrl}1.png`))
  //   )

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
                <div className='flex items-center'>
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
                </div>
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
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
