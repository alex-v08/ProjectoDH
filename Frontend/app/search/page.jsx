'use client'
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import HeroSearch from '@/components/screens/search/HeroSearch'
import Filters from '@/components/screens/search/Filters'
import FormSearchNew from '@/components/form/FormSearchNew'
import { CardDetailSearch } from '@/components/screens/search/CardDetailSearch'
import { AiOutlineSortAscending } from 'react-icons/ai'

export default function Search() {
  // Params
  const searchParams = useSearchParams()
  const selectedCity = searchParams.get('city')
  const dateInit = searchParams.get('dateInit')
  const dateEnd = searchParams.get('dateEnd')
  const categoriesId = searchParams.get('categoriesId')

  const router = useRouter()

  const hostUrl = process.env.NEXT_PUBLIC_HOST_URL

  // Pinta el resultado de la busqueda
  const [productsFilters, setProductsFilters] = useState([])

  // Almacena el precio maximo
  const [priceRange, setPriceRange] = useState(5000)

  // Almacena las opciones de categorias de embarcaciones seleccionadas
  const [selectedCategory, setSelectedCategory] = useState([])

  // Almacena las opciones de características de embarcaciones seleccionadas
  const [selectedFeatures, setSelectedFeatures] = useState([])

  // Controla los check de las categorias
  const handleSelectChangeCategory = event => {
    const { value, checked } = event.target
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
    const arrayCategories = convertArrayOfStringsToNumbers(selectedCategory)
    const arrayFeatures = convertArrayOfStringsToNumbers(selectedFeatures)
    router.push(
      `/search?city=${selectedCity}&categoriesId=${arrayCategories}&featuresId=${arrayFeatures}&minPrice=0&maxPrice=${event.target.value}&dateInit=${dateInit}&dateEnd=${dateEnd}`,
      { scroll: false }
    )
  }

  // Controla los check de las características
  const handleSelectChangeFeatures = event => {
    const { value, checked } = event.target

    if (checked) {
      // Agregar el valor al array si el checkbox está marcado
      setSelectedFeatures([...selectedFeatures, value])
    } else {
      // Eliminar el valor del array si el checkbox está desmarcado
      setSelectedFeatures(selectedFeatures.filter(item => item !== value))
    }
  }

  // convierte un array de strings otro de numeros
  const convertArrayOfStringsToNumbers = arrayState => {
    const oneArray = arrayState
    const oneString = oneArray.join(', ')
    const result = eval(`[${oneString}]`)
    return result
  }

  // const tryCatchForIcons = async cat => {
  //   try {
  //     const response = await fetch(
  //       `${hostUrl}/api/products/allFiltered/?city=&categoriesId=${cat}&featuresId=&minPrice=0&maxPrice=5000&dateInit=&dateEnd=`,
  //       {
  //         cache: 'no-store'
  //       }
  //     )
  //     router.push(
  //       `/search?city=null&categoriesId=${categoriesId}&featuresId=null&minPrice=0&maxPrice=5000&dateInit=null&dateEnd=null`,
  //       { scroll: false }
  //     )

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok')
  //     }
  //     const products = await response.json()
  //     setProductsFilters(products)
  //   } catch (error) {
  //     console.error('Error fetching data:', error)
  //   }
  // }

  // Pinta el filtrado del todos los input
  useEffect(() => {
    const getSearch = async () => {
      // para generar el slug para las categorias
      const arrayCategories = convertArrayOfStringsToNumbers(selectedCategory)

      // para generar el slug para las características
      const arrayFeatures = convertArrayOfStringsToNumbers(selectedFeatures)
      // if (
      //   (selectedCity === 'null' && arrayCategories != '') ||
      //   (arrayCategories != 'null' && arrayFeatures == '')
      // ) {
      //   tryCatchForIcons(arrayCategories)
      // } else {
      try {
        const response = await fetch(
          `${hostUrl}/api/products/allFiltered/?city=${selectedCity}&categoriesId=${arrayCategories}&featuresId=${arrayFeatures}&minPrice=0&maxPrice=${priceRange}&dateInit=${dateInit}&dateEnd=${dateEnd}`,
          {
            cache: 'no-store'
          }
        )
        router.push(
          `/search?city=${selectedCity}&categoriesId=${arrayCategories}&featuresId=${arrayFeatures}&minPrice=0&maxPrice=${priceRange}&dateInit=${dateInit}&dateEnd=${dateEnd}`,
          { scroll: false }
        )

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const products = await response.json()
        setProductsFilters(products)
      } catch (error) {
        console.error('Error fetching data:', error)
      }

      //comentar esta
      // }
    }
    getSearch()
  }, [
    selectedCategory,
    selectedFeatures,
    selectedCity,
    priceRange,
    dateInit,
    dateEnd
  ])

  return (
    <>
      <HeroSearch />
      <FormSearchNew
        dateInit={dateInit}
        dateEnd={dateEnd}
        convertArrayOfStringsToNumbers={convertArrayOfStringsToNumbers}
        selectedCategory={selectedCategory}
        selectedFeatures={selectedFeatures}
      />
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
                    ({ imageUrl, id, name, pricePerDay, location }) =>
                      imageUrl !== null ? (
                        <CardDetailSearch
                          location={location}
                          key={id}
                          imageUrl={imageUrl + '1.png'}
                          id={id}
                          name={name}
                          pricePerDay={pricePerDay}
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
                categoriesId={categoriesId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
