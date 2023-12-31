'use client'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useDropzone } from 'react-dropzone'
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'

export const Dropzone = ({ className, params }) => {
  const router = useRouter()
  const [product, setProduct] = useState()
  const [files, setFiles] = useState([])
  const [rejected, setRejected] = useState([])
  const [name, setName] = useState('')
  const [sku, setSku] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [pricePerDay, setPricePerDay] = useState('')
  const [pricePerWeek, setPricePerWeek] = useState('')
  const [pricePerHour, setPricePerHour] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [featuresId, setFeaturesId] = useState([])
  const [categories, setCategories] = useState([])
  const [features, setFeatures] = useState([])
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [available, setAvailable] = useState(true)

  async function fetchData() {
    if (params !== undefined) {
      const idProduct = params.params.id
      const endpoint = `http://3.130.4.28:8080/api/products/${idProduct}`
      try {
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(
            'Error al intentar cargar el producto: ' + response.status
          )
        }
        const jsonData = await response.json()
        setProduct(jsonData)
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: 'Error durante la carga del producto o no se encontró el producto.'
        })
        console.error('Error cargando el producto: ', error)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setName(product == undefined ? '' : product.name)
    setSku(product == undefined ? '' : product.sku)
    setDescription(product == undefined ? '' : product.description)
    setImage(product == undefined ? '' : product.imageUrl)
    setPricePerDay(product == undefined ? '' : product.pricePerDay)
    setPricePerWeek(product == undefined ? '' : product.pricePerWeek)
    setPricePerHour(product == undefined ? '' : product.pricePerHour)
    setCategoryId(
      product == undefined
        ? ''
        : product.category == null
        ? ''
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
    setFiles(
      product == undefined
        ? []
        : product.pictureDataSet == null
        ? []
        : product.pictureDataSet
    )
    setAvailable(product == undefined ? true : product.available)
  }, [product])

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
    const dataSet = []
    e.preventDefault()
    const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
    const url =
      product == undefined
        ? `${hostUrl}/api/products/create`
        : `${hostUrl}/api/products/update/${product.id}`

    const msg =
      product == undefined
        ? `¿Seguro que desea crear un registro para el producto: ${name} con el sku: ${sku}?`
        : `¿Seguro que desea modificar el registro del producto: ${name} con el sku: ${sku}?`

    const msgProduct =
      product == undefined
        ? `El producto '${name}' fue creado correctamente.`
        : `El producto '${name}' fue modificado correctamente.`

    const opcion = await Swal.fire({
      title: msg,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    })

    if (files.length == 0) return

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      const formData = new FormData()

      formData.append('file', file)

      const endpoint = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_URL
      const data = await fetch(endpoint, {
        method: 'POST',
        body: formData
      }).then(res => res.json())
      data.imageOrder = i
      dataSet.push(data)
    }

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
      pictures: dataSet,
      available: available
    }

    if (opcion.isConfirmed) {
      try {
        const response = await fetch(url, {
          method: product == undefined ? 'POST' : 'PATCH',
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
          Swal.fire({
            icon: 'success',
            text: `${msgProduct}`
          })
          router.push('/administracion')
        }

        const data = await response.json()
        console.log('Respuesta del servidor:', data)
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: `El producto '${name}' no pudo ser creado/modificado correctamente. Por favor comuniquese con el proveedor del servicio.`
        })
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

  async function handleCancel(e) {
    e.preventDefault()

    const msg =
      product == undefined
        ? `¿Seguro que desea cancelar la creacion del registro?`
        : `¿Seguro que desea cancelar la modificacion del registro?`

    const text =
      product == undefined
        ? `En caso de aceptar, se cancelara la creacion del registro.`
        : `En caso de aceptar, se cancelara la modificacion del registro quedando los datos como ya estaban.`

    const opcion = await Swal.fire({
      title: msg,
      text: text,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    })

    if (opcion.isConfirmed) {
      router.push('/administracion')
    } 
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
    const urlGetFeatures = `${hostUrl}/api/features/all`
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

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [
        // If allowing multiple files
        ...previousFiles,
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ])
    }

    if (rejectedFiles?.length) {
      setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    //maxSize: 1024 * 1000,
    maxFiles: 9,
    onDrop
  })

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeFile = name => {
    setFiles(files => files.filter(file => file.name !== name))
  }

  const removeAll = () => {
    setFiles([])
    setRejected([])
  }

  const removeRejected = name => {
    setRejected(files => files.filter(({ file }) => file.name !== name))
  }

  return (
    <>
      <button
        onClick={handleCancel}
        className='ml-5 my-4 rounded border border-red-500 bg-transparent px-4 py-2 font-semibold text-red-700 hover:border-transparent hover:bg-red-500 hover:text-white'
      >
        Cancelar
      </button>

      <form onSubmit={handleSubmit}>
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
            <div className='col-span-6 sm:col-span-3 mb-3'>
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
                className='block w-full h-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
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
                className='dropdown block w-full h-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
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
          </div>
        </div>
        <div
          {...getRootProps({
            className: className
          })}
        >
          <input {...getInputProps({ name: 'file' })} />
          <div className='mt-5 container flex flex-col items-center justify-center gap-4 space-y-6 rounded-md border border-gray-300 bg-gray-50 p-6'>
            <ArrowUpTrayIcon className='h-5 w-5 fill-current' />
            {isDragActive ? (
              <p>Suelte los archivos aqui..</p>
            ) : (
              <p>Arraste sus archivos aqui, o click y seleccione</p>
            )}
          </div>
        </div>

        {/* Vista previa */}
        <section className='space-y-6 p-6'>
          <h2 className='title text-center text-3xl font-semibold'>
            Vista previa
          </h2>
          <ul className='mt-3 grid grid-cols-1 gap-10 rounded-md border  p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
            {files.map(file => (
              <li
                key={file.name}
                className='relative h-32 rounded-md shadow-lg'
              >
                <Image
                  src={file.preview || file.imageUrl}
                  alt={file.name || `imagen de ${name}`}
                  width={100}
                  height={100}
                  quality={100}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview)
                  }}
                  className='h-full w-full rounded-md object-contain'
                />
                <button
                  type='button'
                  className='absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full border border-rose-400 bg-rose-400 transition-colors hover:bg-white'
                  onClick={() => removeFile(file.name)}
                >
                  <XMarkIcon className='h-5 w-5 fill-white transition-colors hover:fill-rose-400' />
                </button>
                <p className='mt-2 text-[12px] font-medium text-stone-500'>
                  {file.name}
                </p>
              </li>
            ))}
          </ul>
          <button
            type='button'
            onClick={removeAll}
            className='mt-1 rounded-md border border-rose-400 px-3 py-3 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-rose-400 hover:text-white'
          >
            Remover todo
          </button>
        </section>
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
      </form>
    </>
  )
}

export default Dropzone
