'use client'
import { useState, useEffect } from 'react'

import { Modal } from '../util/modal'
import Table from '../util/table'
import { FormProduct } from '../register-edit/formProduct'
import { RowProduct } from '../rows/rowProduct'

import { Spline_Sans } from 'next/font/google'
const spline = Spline_Sans({
  weight: '600',
  subsets: ['latin'],
  display: 'swap'
})

export default function PageProduct() {
  const [data, setData] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [changeData, setChangeData] = useState(true)
  const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
  const urlGetYacht = `${hostUrl}/api/all`
  
  async function fetchData() {
    try {
      const response = await fetch(urlGetYacht)
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

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  function refreshData() {
    setChangeData(true)
  }

  return (
    <div className='container'>
      <div className='hidden min-h-screen lg:block'>
        <div className='pt-7'>
          <button
            className='rounded border border-sky-500 bg-transparent px-4 py-2 font-semibold text-sky-700 transition ease-in-out hover:border-transparent hover:bg-sky-500 hover:text-white dark:text-white sm:block'
            onClick={handleOpenModal}
          >
            Registrar Yate
          </button>
        </div>
        <div className='relative mx-auto mt-12  w-full overflow-x-auto rounded-lg shadow-md'>
          <Table>
            {data.map(yacht => (
              <RowProduct
                key={yacht.id}
                id={yacht.id}
                name={yacht.name}
                urlImage={yacht.imageUrl}
                category={yacht.category}
                features={yacht.feature}
                isChangeData={changeData}
                onClose={handleCloseModal}
                onRefreshData={refreshData}
              />
            ))}
          </Table>
        </div>

        <Modal isOpen={modalOpen} onClose={handleCloseModal}>
          <FormProduct isChangeData={changeData} onClose={handleCloseModal} onRefreshData={refreshData} />
        </Modal>
      </div>
    </div>
  )
}
