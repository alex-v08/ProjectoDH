'use client'

import PriceRangeSlider from '@/components/util/PriceRangeSlider'
import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'

export default function Filters({
  handleSelectChangeCategory,
  handleSelectChangeFeatures
}) {
  // const { idCategory = [] } = props
  // Estado para almacenar el Array de categorias
  const [categories, setCategories] = useState([])
  // Estado para almacenar las opciones seleccionadas
  // const [selectedOption, setSelectedOption] = useState(idCategory)

  // const router = useRouter()

  const urlBase = process.env.NEXT_PUBLIC_HOST_URL
  const urlCategories = `${urlBase}/api/category/all`
  // const urlCategoriesIds = `${urlBase}/api/all/?categoriesId=`

  // const handleSelectChange = event => {
  //   const { value, checked } = event.target
  //   let link
  // console.log('prop ' + idCategory)
  // console.log('state ' + selectedOption)

  // if (checked) {
  // Agregar el valor al array si el checkbox está marcado
  //   setSelectedOption([...selectedOption, value])
  // } else {
  // Eliminar el valor del array si el checkbox está desmarcado
  //   setSelectedOption(selectedOption.filter(item => item !== value))
  // }
  // link = selectedOption
  // if (link.length !== 0) {
  //   router.replace(`/search/${link}`)
  // }
  // }
  //console.log(`${urlCategoriesIds}${selectedOption}`);
  // console.log('updated state ' + selectedOption)

  const getCategories = async () => {
    try {
      const response = await fetch(`${urlCategories}`)
      if (!response.ok) {
        throw new Error('Error al realizar la petición: ' + response.status)
      }
      const jsonData = await response.json()
      setCategories(jsonData)
    } catch (error) {
      console.error('Error al realizar la petición: ', error)
    }
  }

  // const getCheckedCategories = async () => {
  //   try {
  //     const response = await fetch(
  //       `${urlBase}/api/all/?categoriesId=${selectedOption}`
  //     )
  //     if (!response.ok) {
  //       throw new Error('Error al realizar la petición: ' + response.status)
  //     }
  //     const jsonData = await response.json()
  //   } catch (error) {
  //     console.error('Error al realizar la petición: ', error)
  //   }
  // }

  useEffect(() => {
    getCategories()
  }, [])

  // useEffect(() => {
  //   getCheckedCategories()
  // }, [selectedOption])

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
            {categories &&
              categories.map((category, index) => (
                <div className='group flex items-center' key={index}>
                  <input
                    onChange={handleSelectChangeCategory}
                    value={category.id}
                    type='checkbox'
                    name={category.name}
                    id={category.id}
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
            <PriceRangeSlider />
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
            <div className='group flex items-center'>
              <input
                onChange={handleSelectChangeFeatures}
                type='checkbox'
                name=''
                id='acondicionado'
                className='h-5 w-5 appearance-none rounded-sm border border-gray-300 transition checked:border-transparent checked:bg-sky-500 checked:text-white hover:border-sky-500'
              />
              <label
                htmlFor='acondicionado'
                className='truncate pl-2 transition group-hover:text-sky-500'
              >
                Aire acondicionado
              </label>
            </div>
            <div className='group flex items-center'>
              <input
                onChange={handleSelectChangeFeatures}
                type='checkbox'
                name=''
                id='parrilla'
                className='h-5 w-5 appearance-none rounded-sm border border-gray-300 transition checked:border-transparent checked:bg-sky-500 checked:text-white hover:border-sky-500'
              />
              <label
                htmlFor='parrilla'
                className='truncate pl-2 transition group-hover:text-sky-500'
              >
                Parrilla
              </label>
            </div>
            <div className='group flex items-center'>
              <input
                onChange={handleSelectChangeFeatures}
                type='checkbox'
                name=''
                id='television'
                className='h-5 w-5 appearance-none rounded-sm border border-gray-300 transition checked:border-transparent checked:bg-sky-500 checked:text-white hover:border-sky-500'
              />
              <label
                htmlFor='television'
                className='truncate pl-2 transition group-hover:text-sky-500'
              >
                Televisión
              </label>
            </div>
            <div className='group flex items-center'>
              <input
                onChange={handleSelectChangeFeatures}
                type='checkbox'
                name=''
                id='cubiertos'
                className='h-5 w-5 appearance-none rounded-sm border border-gray-300 transition checked:border-transparent checked:bg-sky-500 checked:text-white hover:border-sky-500'
              />
              <label
                htmlFor='cubierto'
                className='truncate pl-2 transition group-hover:text-sky-500'
              >
                Cubiertos
              </label>
            </div>
            <div className='group flex items-center'>
              <input
                onChange={handleSelectChangeFeatures}
                type='checkbox'
                name=''
                id='toallas'
                className='h-5 w-5 appearance-none rounded-sm border border-gray-300 transition checked:border-transparent checked:bg-sky-500 checked:text-white hover:border-sky-500'
              />
              <label
                htmlFor='toallas'
                className='truncate pl-2 transition group-hover:text-sky-500'
              >
                Toallas
              </label>
            </div>
            <div className='group flex items-center'>
              <input
                onChange={handleSelectChangeFeatures}
                type='checkbox'
                name=''
                id='audio'
                className='h-5 w-5 appearance-none rounded-sm border border-gray-300 transition checked:border-transparent checked:bg-sky-500 checked:text-white hover:border-sky-500'
              />
              <label
                htmlFor='audio'
                className='truncate pl-2 transition group-hover:text-sky-500'
              >
                Sistema de audio
              </label>
            </div>
            <div className='group flex items-center'>
              <input
                onChange={handleSelectChangeFeatures}
                type='checkbox'
                name=''
                id='cafetera'
                className='h-5 w-5 appearance-none rounded-sm border border-gray-300 transition checked:border-transparent checked:bg-sky-500 checked:text-white hover:border-sky-500'
              />
              <label
                htmlFor='cafetera'
                className='truncate pl-2 transition group-hover:text-sky-500'
              >
                Cafetera
              </label>
            </div>
            <div className='group flex items-center'>
              <input
                onChange={handleSelectChangeFeatures}
                type='checkbox'
                name=''
                id='heladera'
                className='h-5 w-5 appearance-none rounded-sm border border-gray-300 transition checked:border-transparent checked:bg-sky-500 checked:text-white hover:border-sky-500'
              />
              <label
                htmlFor='heladera'
                className='truncate pl-2 transition group-hover:text-sky-500'
              >
                Heladera
              </label>
            </div>
            <div className='group flex items-center'>
              <input
                onChange={handleSelectChangeFeatures}
                type='checkbox'
                name=''
                id='ducha'
                className='h-5 w-5 appearance-none rounded-sm border border-gray-300 transition checked:border-transparent checked:bg-sky-500 checked:text-white hover:border-sky-500'
              />
              <label
                htmlFor='ducha'
                className='truncate pl-2 transition group-hover:text-sky-500'
              >
                Ducha exterior
              </label>
            </div>
            <div className='group flex items-center'>
              <input
                onChange={handleSelectChangeFeatures}
                type='checkbox'
                name=''
                id='generador'
                className='h-5 w-5 appearance-none rounded-sm border border-gray-300 transition checked:border-transparent checked:bg-sky-500 checked:text-white hover:border-sky-500'
              />
              <label
                htmlFor='generador'
                className='truncate pl-2 transition group-hover:text-sky-500'
              >
                Generador
              </label>
            </div>
            <div className='group flex items-center'>
              <input
                onChange={handleSelectChangeFeatures}
                type='checkbox'
                name=''
                id='piloto'
                className='h-5 w-5 appearance-none rounded-sm border border-gray-300 transition checked:border-transparent checked:bg-sky-500 checked:text-white hover:border-sky-500'
              />
              <label
                htmlFor='piloto'
                className='truncate pl-2 transition group-hover:text-sky-500'
              >
                Piloto automático
              </label>
            </div>
            <div className='group flex items-center'>
              <input
                onChange={handleSelectChangeFeatures}
                type='checkbox'
                name=''
                id='horno'
                className='h-5 w-5 appearance-none rounded-sm border border-gray-300 transition checked:border-transparent checked:bg-sky-500 checked:text-white hover:border-sky-500'
              />
              <label
                htmlFor='horno'
                className='truncate pl-2 transition group-hover:text-sky-500'
              >
                Horno
              </label>
            </div>
            <div className='group flex items-center'>
              <input
                onChange={handleSelectChangeFeatures}
                type='checkbox'
                name=''
                id='calefaccion'
                className='h-5 w-5 appearance-none rounded-sm border border-gray-300 transition checked:border-transparent checked:bg-sky-500 checked:text-white hover:border-sky-500'
              />
              <label
                htmlFor='calefaccion'
                className='truncate pl-2 transition group-hover:text-sky-500'
              >
                Calefacción
              </label>
            </div>
            <div className='group flex items-center'>
              <input
                onChange={handleSelectChangeFeatures}
                type='checkbox'
                name=''
                id='radar'
                className='h-5 w-5 appearance-none rounded-sm border border-gray-300 transition checked:border-transparent checked:bg-sky-500 checked:text-white hover:border-sky-500'
              />
              <label
                htmlFor='radar'
                className='truncate pl-2 transition group-hover:text-sky-500'
              >
                Radar
              </label>
            </div>
            <div className='group flex items-center'>
              <input
                onChange={handleSelectChangeFeatures}
                type='checkbox'
                name=''
                id='altavoces'
                className='h-5 w-5 appearance-none rounded-sm border border-gray-300 transition checked:border-transparent checked:bg-sky-500 checked:text-white hover:border-sky-500'
              />
              <label
                htmlFor='altavoces'
                className='truncate pl-2 transition group-hover:text-sky-500'
              >
                Altavoces interiores
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
