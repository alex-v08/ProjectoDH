import { useState, useEffect } from 'react'
import { Modal } from '../util/modal'
import { FormFeature } from '../register-edit/formFeature'
import Swal from 'sweetalert2'

export function RowFeature(props) {
  const { id, name, icon, isChangeData, onRefreshData } = props
  const [feature, setFeature] = useState({})
  const [dataFeature, setDataFeature] = useState([])
  const [modalEditOpen, setModalEditOpen] = useState(false)

  useEffect(() => {
    fetchData()
    fetchDataFeature()
  }, [isChangeData])

  async function fetchData() {
    const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
    const urlGetFeature = `${hostUrl}/api/featureById/${id}`
    try {
      const response = await fetch(urlGetFeature)
      if (!response.ok) {
        throw new Error(
          'Error al intentar cargar los datos del registro: ' + response.status
        )
      }
      const jsonData = await response.json()
      setFeature(jsonData)
    } catch (error) {
      console.error('Error al intentar cargar los datos del registro: ', error)
    }
  }

  async function fetchDataFeature() {
    const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
    const urlGetDataFeature = `${hostUrl}/api/allFiltered/?featuresId=${id}&dateInit=9999-01-01&dateEnd=9999-01-01`
    try {
      const response = await fetch(urlGetDataFeature)
      if (!response.ok) {
        throw new Error(
          'Error al intentar cargar los datos del registro: ' + response.status
        )
      }
      const jsonData = await response.json()
      setDataFeature(jsonData)
    } catch (error) {
      console.error('Error al intentar cargar los datos del registro: ', error)
    }
  }

  async function handleOnDelete(e) {
    e.preventDefault()
    e.stopPropagation()
    const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
    const urlDelete = `${hostUrl}/api/feature/delete/${id}`
    const opcion = await Swal.fire({
      title: `¿Estás seguro de que quieres eliminar la caracteristica '${name}'?`,
      text: `En caso de eliminar esta caracteristica de la base de datos, todos los productos que esten asociados a ella podrian quedar sin caracteristicas asociadas.`,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    })
    if (opcion.isConfirmed) {
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
          Swal.fire({
            icon: 'success',
            text: `La caracteristica '${name}' a sido eliminada correctamente.`
          })
          onRefreshData()
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: `La caracteristica '${name}' no pudo ser eliminada correctamente. Por favor comuniquese con el proveedor del servicio.`
        })
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
      <>
        <tr
          className='border-b bg-white hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'
          onClick={handleOpenModalEdit}
        >
          <td className='px-8 py-4'>
            <i
              className={`${icon} h-11 w-11 rounded-full text-center text-3xl text-sky-500`}
            ></i>
          </td>
          <th
            scope='row'
            className='whitespace-nowrap px-16 py-4 font-medium text-gray-900 dark:text-white'
          >
            {id}
          </th>
          <td className='px-16 py-4'>{name}</td>
          <td className='px-8 py-4'><button className="shadow-md w-28 py-1 no-underline rounded-full bg-sky-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none text-center">{dataFeature.length}</button></td>
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
          <FormFeature
            formEditData={feature}
            onClose={handleCloseModalEdit}
            onRefreshData={onRefreshData}
          />
        </Modal>
      </>
    </>
  )
}
