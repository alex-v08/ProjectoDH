'use client'

import { useEffect, useState } from 'react'

export function FormProduct(props) {
  const { formEditData, onClose, onRefreshData } = props
  const [product, setProduct] = useState(formEditData)
  const [name, setName] = useState(product == undefined ? '' : product.name)
  const [sku, setSku] = useState(product == undefined ? '' : product.sku)
  const [description, setDescription] = useState(
    product == undefined ? '' : product.description
  )
  const [image, setImage] = useState(product == undefined ? '' : product.imageUrl)
  const [pricePerDay, setPricePerDay] = useState(
    product == undefined ? '' : product.pricePerDay
  )
  const [pricePerWeek, setPricePerWeek] = useState(
    product == undefined ? '' : product.pricePerWeek
  )
  const [pricePerHour, setPricePerHour] = useState(
    product == undefined ? '' : product.pricePerHour
  )
  const [categoryId, setCategoryId] = useState(
    product == undefined ? '' : product.category == null ? '' : product.category.id
  )
  const [featuresId, setFeaturesId] = useState(
    product == undefined
      ? []
      : product.feature == null
      ? []
      : product.feature.map(feature => feature.id)
  )
  const [categories, setCategories] = useState([])
  const [features, setFeatures] = useState([])
  const [country, setCountry] = useState(
    product == undefined
      ? ''
      : product.location == null
      ? ''
      : product.location.country
  )
  const [city, setCity] = useState(
    product == undefined ? '' : product.location == null ? '' : product.location.city
  )
  const [available, setAvailable] = useState(
    product == undefined ? true : product.available
  )

  const optionSelect = features.map(feature => ({
    value: `${feature.id}`,
    label: `${feature.name}`
  }))

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeSku(e) {
    setSku(e.target.value)
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleChangeImage(e) {
    setImage(e.target.value)
  }

  function handleChangePricePerDay(e) {
    setPricePerDay(e.target.value.trim())
  }

  function handleChangePricePerWeek(e) {
    setPricePerWeek(e.target.value.trim())
  }

  function handleChangePricePerHour(e) {
    setPricePerHour(e.target.value.trim())
  }

  function handleChangeCategory(e) {
    setCategoryId(e.target.value.trim())
  }

  function handleChangeFeature(e) {
    const selectedValues = Array.from(
      e.target.selectedOptions,
      option => option.value
    )
    setFeaturesId(selectedValues)
  }

  function handleChangeCountry(e) {
    setCountry(e.target.value)
  }

  function handleChangeCity(e) {
    setCity(e.target.value)
  }

  function handleChangeAvailable() {
    setAvailable(!available)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const productForm = {
      name: name,
      sku: sku,
      description: description,
      imageUrl: image,
      pricePerDay: pricePerDay,
      pricePerWeek: pricePerWeek,
      pricePerHour: pricePerHour,
      categoryId: categoryId,
      featuresId: featuresId,
      location: {
        country: country,
        city: city
      },
      available: available
    }
    console.log(JSON.stringify(productForm))
    const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
    const url =
      product == undefined
        ? `${hostUrl}/api/create`
        : `${hostUrl}/api/update/${product.id}`

    const msg =
      product == undefined
        ? `Seguro que desea crear un registro para el producto: ${name} con el sku: ${sku}`
        : `Seguro que desea modificar el registro para el producto: ${name} con el sku: ${sku}`

    const opcion = confirm(msg)

    if (opcion) {
      try {
        const response = await fetch(url, {
          method: product == undefined ? 'POST' : 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(productForm)
        })

        if (!response.ok) {
          throw new Error(
            'Error al cargar los datos en el registro. Response: ' +
              response.status
          )
        } else {
          onRefreshData()
          onClose()
        }

        const data = await response.json()
        console.log('Respuesta del servidor:', data)
      } catch (error) {
        console.error('Error al realizar la solicitud POST:', error)
      }
    }
  }

  function handleReset(e) {
    e.preventDefault()
    setName(product == undefined ? '' : product.name)
    setSku(product == undefined ? '' : product.sku)
    setDescription(product == undefined ? '' : product.description)
    setImage(product == undefined ? '' : product.imageUrl)
    setPricePerDay(product == undefined ? '' : product.pricePerDay)
    setPricePerWeek(product == undefined ? '' : product.pricePerWeek)
    setPricePerHour(product == undefined ? '' : product.pricePerHour)
    setCategoryId(
      product == undefined
        ? categoryId
        : product.category == null
        ? categoryId
        : product.category.id
    )
    setFeaturesId(
      product == undefined
        ? []
        : product.feature == null
        ? []
        : product.feature.map(feature => feature.id)
    )
    setCountry(
      product == undefined
        ? ''
        : product.location == null
        ? ''
        : product.location.country
    )
    setCity(
      product == undefined
        ? ''
        : product.location == null
        ? ''
        : product.location.city
    )
    setAvailable(product == undefined ? true : product.available)
  }

  async function fetchCategories() {
    const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
    const urlGetCategories = `${hostUrl}/api/category/all`
    try {
      const response = await fetch(urlGetCategories)
      if (!response.ok) {
        throw new Error(
          'Error al intentar cargar todas las categorias: . Response: ' +
            response.status
        )
      }
      const jsonData = await response.json()
      setCategories(jsonData)
    } catch (error) {
      console.error('Error cargando las categorias: ', error)
    }
  }

  async function fetchFeatures() {
    const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
    const urlGetFeatures = `${hostUrl}/api/feature/all`
    try {
      const response = await fetch(urlGetFeatures)
      if (!response.ok) {
        throw new Error(
          'Error al intentar cargar todas las caracteristicas: . Response: ' +
            response.status
        )
      }
      const jsonData = await response.json()
      setFeatures(jsonData)
    } catch (error) {
      console.error('Error cargando las caracteristicas: ', error)
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchFeatures()
  }, [])

  return (
    <form
      className='relative rounded-lg opacity-100 shadow dark:bg-gray-700'
      onSubmit={handleSubmit}
    >
      <div className='space-y-6 p-6'>
        <div className='grid grid-cols-6 gap-6'>
          <div className='col-span-6 sm:col-span-3'>
            <label
              htmlFor='name'
              className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
            >
              Nombre del producto
            </label>
            <input
              type='text'
              value={name}
              onChange={handleChangeName}
              placeholder='Ingrese nombre del producto'
              id='name'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
              required
            />
          </div>
          <div className='col-span-6 sm:col-span-3'>
            <label
              htmlFor='sku'
              className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
            >
              SKU del producto
            </label>
            <input
              type='text'
              value={sku}
              onChange={handleChangeSku}
              placeholder='Ingrese sku del producto'
              id='sku'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
              required
            />
          </div>
          <div className='col-span-6 sm:col-span-3'>
            <label
              htmlFor='description'
              className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
            >
              Descripcion del producto
            </label>
            <textarea
              type='text'
              value={description}
              onChange={handleChangeDescription}
              placeholder='Ingrese una breve descripcion del producto'
              id='description'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            />
          </div>
          <div className='col-span-6 sm:col-span-3'>
            <label
              htmlFor='image'
              className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
            >
              Imagen del producto
            </label>
            <input
              type='text'
              value={image}
              onChange={handleChangeImage}
              placeholder='Ingrese la imagen del producto'
              id='image'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            />
          </div>
          <div className='col-span-6 sm:col-span-3'>
            <label
              htmlFor='pricePerDay'
              className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
            >
              Precio por dia
            </label>
            <input
              type='text'
              value={pricePerDay}
              onChange={handleChangePricePerDay}
              placeholder='Ingrese precio de alquiler por dia'
              id='pricePerDay'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            />
          </div>
          <div className='col-span-6 sm:col-span-3'>
            <label
              htmlFor='pricePerWeek'
              className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
            >
              Precio por semana
            </label>
            <input
              type='text'
              value={pricePerWeek}
              onChange={handleChangePricePerWeek}
              placeholder='Ingrese precio de alquiler por semana'
              id='pricePerWeek'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            />
          </div>
          <div className='col-span-6 sm:col-span-3'>
            <label
              htmlFor='pricePerHour'
              className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
            >
              Precio por hora
            </label>
            <input
              type='text'
              value={pricePerHour}
              onChange={handleChangePricePerHour}
              placeholder='Ingrese precio de alquiler por hora'
              id='pricePerHour'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            />
          </div>
          <div className='col-span-6 sm:col-span-3'>
            <label
              htmlFor='category'
              className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
            >
              Categoria
            </label>
            <select
              onChange={handleChangeCategory}
              value={categoryId}
              id='category'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            >
              <option value=''>Sin categorizar</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className='col-span-6 sm:col-span-3'>
            <label
              htmlFor='country'
              className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
            >
              Pais de inicio
            </label>
            <input
              type='text'
              value={country}
              onChange={handleChangeCountry}
              placeholder='Ingrese pais de inicio'
              id='country'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            />
          </div>
          <div className='col-span-6 sm:col-span-3'>
            <label
              htmlFor='city'
              className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
            >
              Ciudad de inicio
            </label>
            <input
              type='text'
              value={city}
              onChange={handleChangeCity}
              placeholder='Ingrese ciudad de inicio'
              id='city'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            />
          </div>
          <div className='col-span-6 sm:col-span-3'>
            <label
              htmlFor='feature'
              className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
            >
              Caracteristicas
            </label>
            <select
              multiple
              onChange={handleChangeFeature}
              value={featuresId}
              id='feature'
              className='dropdown block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            >
              {features.map(feature => (
                <option key={feature.id} value={feature.id}>
                  {feature.name}
                </option>
              ))}
            </select>
          </div>
          <div className='col-span-6 sm:col-span-3'>
            <label
              htmlFor='available'
              className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
            >
              Disponibilidad
            </label>
            <label className='relative inline-flex cursor-pointer items-center'>
              <input
                type='checkbox'
                value={available}
                onChange={handleChangeAvailable}
                id='available'
                checked={available}
                className='peer sr-only'
              />
              <div className="h-6 w-11 cursor-default rounded-full border bg-gray-500 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 dark:border-gray-600"></div>
              <span className='ml-3 cursor-default text-sm font-medium text-gray-900 dark:text-gray-300'>
                {available ? 'Disponible' : 'No disponible'}
              </span>
            </label>
          </div>
          <div className='col-span-6 flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600'>
            <div className='mx-auto'>
              <button
                type='reset'
                className='mr-5 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                onClick={handleReset}
              >
                Reiniciar
              </button>
              <button
                type='submit'
                className='rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
