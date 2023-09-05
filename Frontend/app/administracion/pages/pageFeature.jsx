'use client'

import { useState, useEffect, useRef } from 'react'

import { RowFeature } from '../rows/rowFeature'
import { FormFeature } from '../register-edit/formFeature'
import { Modal } from '../util/modal'
import Table from '../util/table'

import { Spline_Sans } from 'next/font/google'
const spline = Spline_Sans({
  weight: '600',
  subsets: ['latin'],
  display: 'swap'
})

export default function PageFeature() {
  const [data, setData] = useState([])
  const [modalFeatureOpen, setModalFeatureOpen] = useState(false)
  const [changeData, setChangeData] = useState(true)
  const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
  const urlGetFeature = `${hostUrl}/api/feature/all`
  async function fetchData() {
    try {
      const response = await fetch(urlGetFeature)
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

  const handleOpenModalFeature = () => {
    setModalFeatureOpen(true)
  }

  const handleCloseModalFeature = () => {
    setModalFeatureOpen(false)
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
            onClick={handleOpenModalFeature}
          >
            Registrar Características
          </button>
        </div>
        <div className='relative mx-auto mt-12  w-full overflow-x-auto rounded-lg shadow-md'>
          <Table className='mx-auto w-full text-left text-sm text-gray-500 dark:text-gray-400'>
            {data.map(feature => (
              <RowFeature
                key={feature.id}
                id={feature.id}
                name={feature.name}
                icon={feature.image}
                isChangeData={changeData}
                onRefreshData={refreshData}
              />
            ))}
          </Table>
        </div>
        <Modal isOpen={modalFeatureOpen} onClose={handleCloseModalFeature}>
          <FormFeature onClose={handleCloseModalFeature} onRefreshData={refreshData}/>
        </Modal>
      </div>
    </div>
  )
}
