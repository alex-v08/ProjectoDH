import { useState, useEffect } from 'react'
import { Modal } from '../util/modal'
import { FormProduct } from '../register-edit/formProduct'
import Image from 'next/image'

export function RowProduct(props) {
  const {
    id,
    name,
    urlImage,
    category,
    features,
    isChangeData,
    onRefreshData
  } = props
  const [product, setYatcht] = useState({})
  const [modalEditOpen, setModalEditOpen] = useState(false)

  useEffect(() => {
    fetchData()
  }, [isChangeData])

  async function fetchData() {
    const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
    const urlGetProduct = `${hostUrl}/api/${id}`
    try {
      const response = await fetch(urlGetProduct)
      if (!response.ok) {
        throw new Error(
          'Error al intentar cargar los datos del registro: ' + response.status
        )
      }
      const jsonData = await response.json()
      setYatcht(jsonData)
    } catch (error) {
      console.error('Error al intentar cargar los datos del registro: ', error)
    }
  }

  async function handleOnDelete(e) {
    e.preventDefault()
    e.stopPropagation()
    const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
    const urlDelete = `${hostUrl}/api/delete/${id}`
    const opcion = confirm(`Desea eliminar el registro con el id: ${id}`)
    if (opcion) {
      try {
        const response = await fetch(urlDelete, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (!response.ok) {
          throw new Error(
            'Error al intentar eliminar el registro:. Response: ' +
              response.status
          )
        } else {
          onRefreshData()
        }
      } catch (error) {
        console.error('Error al eliminar el registro:', error)
      }
    }
  }

  const handleOpenModalEdit = () => {
    setModalEditOpen(true)
  }

  const handleCloseModalEdit = () => {
    setModalEditOpen(false)
  }

  return (
    <>
      <tr
        className='border-b bg-white hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'
        onClick={handleOpenModalEdit}
      >
        <td className='px-16 py-4'>
          <div>
            <Image
              className='h-11 w-11 rounded-full border-2 border-sky-500'
              width='50'
              height='50'
              src={`${urlImage}1.png`}
              alt='imagen de la embarcación'
              quality={100}
            />
          </div>
        </td>
        <td
          scope='row'
          className='whitespace-nowrap px-16 py-4 font-medium text-gray-900 dark:text-white'
        >
          {id}
        </td>
        <td className='px-16 py-4'>{name}</td>
        <td className='px-8 py-4'><button className="shadow-md w-28 py-1 no-underline rounded-full bg-sky-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none text-center">{category != null ? category.name : 'Sin categorizar'}</button></td>
        <td className='px-6 py-4 text-right'>
          <div>
            <button
              value={id}
              onClick={handleOnDelete}
              className='font-medium text-blue-600 hover:underline dark:text-blue-500'
            >
              <svg
                className='h-6 w-6 text-red-500'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                strokeWidth='2'
                stroke='currentColor'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                {' '}
                <path stroke='none' d='M0 0h24v24H0z' />{' '}
                <line x1='18' y1='6' x2='6' y2='18' />{' '}
                <line x1='6' y1='6' x2='18' y2='18' />
              </svg>
            </button>
          </div>
        </td>
      </tr>
      <Modal isOpen={modalEditOpen} onClose={handleCloseModalEdit}>
        <FormProduct
          formEditData={product}
          onClose={handleCloseModalEdit}
          onRefreshData={onRefreshData}
        />
      </Modal>
    </>
  )
}
