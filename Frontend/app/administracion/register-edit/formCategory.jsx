'use client'

import Icons from '@/components/util/icons'
import { useState } from 'react'
import Swal from 'sweetalert2'

export function FormCat(props) {
  const { formEditData, onClose, onRefreshData } = props
  const [category, setCategory] = useState(formEditData)
  const [name, setName] = useState(category == undefined ? '' : category.name)
  const [description, setDescription] = useState(
    category == undefined
      ? ''
      : category.description == null
      ? ''
      : category.description
  )
  const [image, setImage] = useState(
    category == undefined
      ? null
      : category.image == null
      ? null
      : category.image
  )
  const [selectedOption, setSelectedOption] = useState(
    category == undefined
      ? null
      : category.image == null
      ? null
      : {
          value: category.image,
          label: category.image,
          icon: category.image
        }
  )

  const [defaultOption, setDefaultOption] = useState(
    category == undefined
      ? null
      : category.image == null
      ? null
      : {
          value: category.image,
          label: category.image,
          icon: category.image
        }
  )

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleChangeImage(selectedOption) {
    setSelectedOption(selectedOption)
    setImage(selectedOption != null ? selectedOption.value : null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
    const url =
      category == undefined
        ? `${hostUrl}/api/category/create`
        : `${hostUrl}/api/category/update/${category.id}`

    const msg =
      category == undefined
        ? `¿Seguro que desea crear un registro para la categoria: ${name}?`
        : `¿Seguro que desea modificar el registro de la categoria: ${name}?`

    const msgCategory =
      category == undefined
        ? `La categoria '${name}' fue creada correctamente.`
        : `La categoria '${name}' fue modificada correctamente.`

    const opcion = await Swal.fire({
      title: msg,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    })

    const categorySubmit = {
      name: name,
      description: description,
      image: image
    }
    console.log(JSON.stringify(categorySubmit))

    if (opcion.isConfirmed) {
      try {
        const response = await fetch(url, {
          method: category == undefined ? 'POST' : 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(categorySubmit)
        })

        if (!response.ok) {
          throw new Error(
            'Error al cargar los datos en el registro. Response: ' +
              response.status
          )
        } else {
          onClose()
          Swal.fire({
            icon: 'success',
            text: `${msgCategory}`
          })
          onRefreshData()
        }
        const data = await response.json()
        console.log('Respuesta del servidor:', data)
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: `La categoria '${name}' no pudo ser creada/modificada correctamente. Por favor comuniquese con el proveedor del servicio.`
        })
        console.error('Error al realizar la solicitud POST:', error)
      }
    }
  }

  function handleReset(e) {
    e.preventDefault()
    setName(category == undefined ? '' : category.name)
    setDescription(category == undefined ? '' : category.description)
    setSelectedOption(category == undefined ? '' : defaultOption)
  }

  return (
    <form
      className='relative rounded-lg bg-white shadow dark:bg-gray-700'
      onSubmit={handleSubmit}
    >
      <div className='space-y-6 p-6'>
        <div className='grid grid-cols-2 grid-rows-3 gap-6'>
          <div>
            <label
              htmlFor='name'
              className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
            >
              Nombre de categoría
            </label>
            <input
              type='text'
              value={name}
              onChange={handleChangeName}
              placeholder='Ingrese nombre de la categoría'
              id='name'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
              required
            />
          </div>
          <div className='mt-5 col-start-1 row-start-2'>
            <label
              htmlFor='image'
              className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
            >
              Icono de la categoría
            </label>
            <div>
              <Icons
                default={defaultOption}
                selectedOption={selectedOption}
                onChange={handleChangeImage}
              />
            </div>
          </div>
          <div className='row-span-2 col-start-2 row-start-1'>
            <label
              htmlFor='description'
              className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
            >
              Descripcion de la categoría
            </label>
            <textarea
              type='text'
              value={description}
              onChange={handleChangeDescription}
              placeholder='Ingrese una descripcion de la categoría'
              id='description'
              rows={4}
              className='block w-full h-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            />
          </div>
          <div className='col-span-2 row-start-3 flex justify-center items-center space-x-4'>
            <button
              type='reset'
              className='rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
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
    </form>
  )
}
