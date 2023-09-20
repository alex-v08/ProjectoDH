'use client'
import { useState, useEffect } from 'react'

import Table from '../util/table'
import { RowProduct } from '../rows/rowProduct'
import Swal from 'sweetalert2'
import Link from 'next/link'

export default function PageProduct() {
  const [data, setData] = useState([])
  const [changeData, setChangeData] = useState(true)
  const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
  const urlGetProduct = `${hostUrl}/api/all`

  async function fetchData() {
    try {
      const response = await fetch(urlGetProduct)
      if (!response.ok) {
        throw new Error(
          'Error al intentar cargar todos los registros: . Response: ' +
            response.status
        )
      }
      const jsonData = await response.json()
      setData(jsonData)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: `Error durante la carga de registros o no hay registros para mostrar.`
      })
      console.error('Error cargando los registros: ', error)
    }
  }

  useEffect(() => {
    if (changeData) {
      fetchData()
      setChangeData(false)
    }
  }, [changeData])

  function handleCreateProduct() {
    const urlCreate = `/administracion/formProduct`
    return urlCreate
  }

  function refreshData() {
    setChangeData(true)
  }

  return (
    <div className='container'>
      <div className='hidden min-h-screen lg:block'>
        <div className='pt-7'>
          <button className='rounded border border-sky-500 bg-transparent px-4 py-2 font-semibold text-sky-700 transition ease-in-out hover:border-transparent hover:bg-sky-500 hover:text-white dark:text-white sm:block'>
            <Link href={handleCreateProduct()}>Registrar Producto</Link>
          </button>
        </div>
        <div className='relative mx-auto mt-12  w-full overflow-x-auto rounded-lg shadow-md'>
          <Table>
            {data.length !== 0 ? (
              data.map(product => (
                <RowProduct
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  urlImage={product.imageUrl}
                  category={product.category}
                  features={product.feature}
                  isChangeData={changeData}
                  onRefreshData={refreshData}
                />
              ))
            ) : (
              <tr>
                <td colSpan='5' className='text-center'>
                  No hay registros para mostrar
                </td>
              </tr>
            )}
          </Table>
        </div>
      </div>
    </div>
  )
}
