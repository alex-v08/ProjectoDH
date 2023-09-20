import { useState, useEffect } from 'react'
import { Modal } from '../util/modal'
import { FormCat } from '../register-edit/formCategory'
import Swal from 'sweetalert2'
import { BsPencil, BsTrash } from 'react-icons/bs'

export function RowCategory(props) {
  const { id, name, icon, isChangeData, onRefreshData } = props
  const [category, setCategory] = useState({})
  const [dataCategory, setDataCategory] = useState([])
  const [modalEditOpen, setModalEditOpen] = useState(false)

  useEffect(() => {
    fetchData()
    fetchDataCategory()
  }, [isChangeData])

  async function fetchData() {
    const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
    const urlGetCategory = `${hostUrl}/api/categoryById/${id}`
    try {
      const response = await fetch(urlGetCategory)
      if (!response.ok) {
        throw new Error(
          'Error al intentar cargar los datos del registro: ' + response.status
        )
      }
      const jsonData = await response.json()
      setCategory(jsonData)
    } catch (error) {
      console.error('Error al intentar cargar los datos del registro: ', error)
    }
  }

  async function fetchDataCategory() {
    const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
    const urlGetDataCategory = `${hostUrl}/api/allFiltered/?categoriesId=${id}&dateInit=9999-01-01&dateEnd=9999-01-01`
    try {
      const response = await fetch(urlGetDataCategory)
      if (!response.ok) {
        throw new Error(
          'Error al intentar cargar los datos del registro: ' + response.status
        )
      }
      const jsonData = await response.json()
      setDataCategory(jsonData)
    } catch (error) {
      console.error('Error al intentar cargar los datos del registro: ', error)
    }
  }

  async function handleOnDelete(e) {
    e.preventDefault()
    e.stopPropagation()
    const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
    const urlDelete = `${hostUrl}/api/category/delete/${id}`
    const opcion = await Swal.fire({
      title: `¿Estás seguro de que quieres eliminar la categoria '${name}'?`,
      text: `En caso de eliminar esta categoria de la base de datos, todos los productos que esten asociados a ella quedaran sin categorizar.`,
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
            text: `La categoria '${name}' fue eliminada correctamente.`
          })
          onRefreshData()
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: `La categoria '${name}' no pudo ser eliminada correctamente. Por favor comuniquese con el proveedor del servicio.`
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
      <tr className='border-b bg-white hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'>
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
        <td className='px-8 py-4'>
          <button className='border-blue btn-primary hover:bg-blue-light w-28 rounded-full bg-sky-500 py-1 text-center font-sans text-sm font-semibold text-white no-underline shadow-md hover:text-white focus:outline-none active:shadow-none'>
            {dataCategory.length}
          </button>
        </td>
        <td className='flex content-center justify-between px-6 py-6 text-right align-middle'>
          <div className='mr-4'>
            <button
              className='rounded-lg bg-sky-500 px-2 py-2 text-white hover:bg-sky-900'
              onClick={handleOpenModalEdit}
            >
              <BsPencil className='text-xl' />
            </button>
          </div>
          <div>
            <button
              value={id}
              onClick={handleOnDelete}
              className='rounded-lg bg-red-500 px-2 py-2 text-white hover:bg-red-900'
            >
              <BsTrash className='text-xl' />
            </button>
          </div>
        </td>
      </tr>
      <Modal isOpen={modalEditOpen} onClose={handleCloseModalEdit}>
        <FormCat
          formEditData={category}
          isChangeData={isChangeData}
          onClose={handleCloseModalEdit}
          onRefreshData={onRefreshData}
        />
      </Modal>
    </>
  )
}
