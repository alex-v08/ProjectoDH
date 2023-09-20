import Image from 'next/image'
import Swal from 'sweetalert2'
import Link from 'next/link'
import { BsPencil, BsTrash } from 'react-icons/bs'
export function RowProduct(props) {
  const { id, name, urlImage, category, isChangeData, onRefreshData } = props

  async function handleOnDelete(e) {
    e.preventDefault()
    e.stopPropagation()
    const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
    const urlDelete = `${hostUrl}/api/delete/${id}`
    const opcion = await Swal.fire({
      title: `¿Estás seguro de que quieres eliminar el producto '${name}'?`,
      text: `En caso de eliminar este producto de la base de datos, este ya no aparecera en la pagina y se perderan todos sus datos.`,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    })
    if (opcion.isConfirmed) {
      try {
        const response = await fetch(urlDelete, {
          method: 'PATCH',
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
            text: `El producto '${name}' fue eliminado correctamente.`
          })
          onRefreshData()
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: `El producto '${name}' no pudo ser eliminado correctamente. Por favor comuniquese con el proveedor del servicio.`
        })
        console.error('Error al eliminar el registro:', error)
      }
    }
  }

  const handleEdit = () => {
    const urlEdit = `/administracion/formProduct/${id}`
    return urlEdit
  }

  return (
    <>
      <tr className='border-b bg-white hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'>
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
        <th
          scope='row'
          className='whitespace-nowrap px-16 py-4 font-medium text-gray-900 dark:text-white'
        >
          {id}
        </th>
        <td className='px-16 py-4'>{name}</td>
        <td className='px-8 py-4'>
          <button className='border-blue btn-primary hover:bg-blue-light w-28 rounded-full bg-sky-500 py-1 text-center font-sans text-sm font-semibold text-white no-underline shadow-md hover:text-white focus:outline-none active:shadow-none'>
            {category != null ? category.name : 'Sin categorizar'}
          </button>
        </td>
        <td className='flex content-center justify-between px-6 py-6 text-right align-middle'>
          <div className='mr-4'>
            <button className='rounded-lg bg-sky-500 px-2 py-2 text-white hover:bg-sky-900'>
              <Link href={handleEdit()}>
                <BsPencil className='text-xl' />
              </Link>
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
    </>
  )
}
