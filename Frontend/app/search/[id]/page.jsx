'use client'
import FormSearch from '@/components/form/FormSearch'
import HeroSearch from '@/components/screens/search/HeroSearch'
import { AiOutlineSortAscending } from 'react-icons/ai'
import React, { useMemo, useState, useEffect } from 'react'
import { CardDetailSearch } from '@/components/screens/search/CardDetailSearch'
import Filters from '@/components/screens/search/Filters'

export default function SearchID(props) {
  const { idCategory = [], params } = props

  const [productsFilters, setProductsFilters] = useState([])

  const [totalProducts, setTotalProducts] = useState([])

  const [loading, setLoading] = useState(true)
  // Estado para almacenar las opciones de categorias de embarcaciones seleccionadas
  const [selectedOption, setSelectedOption] = useState(idCategory)

  // Estado para almacenar las opciones de categorias de embarcaciones seleccionadas
  const [selectedFeatures, setSelectedFeatures] = useState([])

  const handleSelectChange = event => {
    const { value, checked } = event.target
    // let link

    if (checked) {
      // Agregar el valor al array si el checkbox está marcado
      setSelectedOption([...selectedOption, value])
    } else {
      // Eliminar el valor del array si el checkbox está desmarcado
      setSelectedOption(selectedOption.filter(item => item !== value))
    }
    // link = selectedOption
    // if (link.length !== 0) {
    //   router.replace(`/search/${link}`)
    // }
  }

  const handleSelectChangeFeatures = event => {
    const { value, checked } = event.target
    // let link

    if (checked) {
      // Agregar el valor al array si el checkbox está marcado
      setSelectedFeatures([...selectedFeatures, value])
    } else {
      // Eliminar el valor del array si el checkbox está desmarcado
      setSelectedFeatures(selectedFeatures.filter(item => item !== value))
    }
    // link = selectedOption
    // if (link.length !== 0) {
    //   router.replace(`/search/${link}`)
    // }
  }

  // useMemo(() => first, [second])

  // Para obtener todos los productos
  // useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       const response = await fetch('/api/products')
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok')
  //       }
  //       const products = await response.json()
  //       setTotalProducts(products)
  //       setLoading(false)
  //     } catch (error) {
  //       console.error('Error fetching data:', error)
  //       setLoading(false)
  //     }
  //   }
  //   getProducts()
  // }, [])

  // Para obtener el filtrado de la home
  useEffect(() => {
    const getSearchHome = async () => {
      const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
      try {
        const response = await fetch(
          `${hostUrl}/api/productByCategoryName/?categoryName=${params.id}`,
          {
            cache: 'no-store'
          }
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const products = await response.json()
        console.log('products desde [id]/page.jsx', products)

        setProductsFilters(products)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }
    getSearchHome()
  }, [])

  // Para obtener el filtrado del componete Filters
  useEffect(() => {
    const getSearch = async () => {
      const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
      const array = selectedOption
      const cadena = array.join(', ')
      const resultado = eval(`[${cadena}]`)

      try {
        const response = await fetch(
          `${hostUrl}/api/productByCategoryId/?categoriesId=${resultado}`,
          // `${hostUrl}/api/all/?categoriesId=${resultado}1&featuresId=3&featuresId=2${resultado}`,
          {
            // {
            cache: 'no-store'
          }
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const products = await response.json()
        console.log('products desde [id]/page.jsx', products)
        setProductsFilters(products)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }
    getSearch()
  }, [selectedOption])

  return (
    <>
      <HeroSearch />
      <FormSearch />
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
                        />
                      ) : null
                  )}
              </div>
            </div>
            {/* Filtros */}
            <div className='w-full lg:max-w-[292.14px] xl:max-w-[426.89px] 2xl:max-w-[438px]'>
              <Filters
                handleSelectChange={handleSelectChange}
                handleSelectChangeFeatures={handleSelectChangeFeatures}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
