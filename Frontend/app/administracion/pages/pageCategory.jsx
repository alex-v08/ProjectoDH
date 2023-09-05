'use client'

import { useState, useEffect } from 'react'

import { RowCategory } from '../rows/rowCategory'
import { FormCat } from '../register-edit/formCategory'
import { Modal } from '../util/modal'
import Table from '../util/table'

import { Spline_Sans } from 'next/font/google'
const spline = Spline_Sans({
  weight: '600',
  subsets: ['latin'],
  display: 'swap'
})

export default function PageCategory() {
  const [data, setData] = useState([])
  const [modalCatOpen, setModalCatOpen] = useState(false)
  const [changeData, setChangeData] = useState(true)
  const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
  const urlGetCategory = `${hostUrl}/api/category/all`
  
  async function fetchData() {
    try {
      const response = await fetch(urlGetCategory)
      if (!response.ok) {
        throw new Error(
          'Error al intentar cargar todos los registros: . Response: ' +
            response.status
        )
      }
      const jsonData = await response.json()
      setData(jsonData)
    } catch (error) {
      console.error('Error cargando los registros: ', error)
    }
  }

  useEffect(() => {
    if (changeData) {
      fetchData()
      setChangeData(false)
    }
  }, [changeData])

  const handleOpenModalCat = () => {
    setModalCatOpen(true)
  }

  const handleCloseModalCat = () => {
    setModalCatOpen(false)
  }

  function refreshData() {
    setChangeData(true)
  }

  return (
    <div className='container min-h-screen w-full'>
      <div className='hidden lg:block'>
        <div className='pt-7'>
          <button
            className='rounded border border-sky-500 bg-transparent px-4 py-2 font-semibold text-sky-700 transition ease-in-out hover:border-transparent hover:bg-sky-500 hover:text-white dark:text-white sm:block'
            onClick={handleOpenModalCat}
          >
            Registrar Categoría
          </button>
        </div>
        <div className='relative mx-auto mt-12  w-full overflow-x-auto rounded-lg shadow-md'>
          <Table>
            {data.map(category => (
              <RowCategory
                key={category.id}
                id={category.id}
                name={category.name}
                icon={category.image}
                isChangeData={changeData}
                onRefreshData={refreshData}
              />
            ))}
          </Table>
        </div>
        <Modal isOpen={modalCatOpen} onClose={handleCloseModalCat}>
          <FormCat isOpen={modalCatOpen} onClose={handleCloseModalCat} onRefreshData={refreshData}/>
        </Modal>
      </div>
    </div>
  )
}
