'use client'

import Link from 'next/link'
import { HiLocationMarker } from 'react-icons/hi'
import { BsStarFill, BsStar } from 'react-icons/bs'
import Image from 'next/image'
import DatePicker from '@/components/detail/DatePicker'
import { useSearchParams } from 'next/navigation'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/authContext'

const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
const itemsUrl = `${hostUrl}/api/`
const imageUrl = `${hostUrl}/api/urlImage/`

async function getItem(id) {
  const response = await fetch(itemsUrl + id, {
    cache: 'no-store'
  })
  const data = await response.json()
  return data
}

export default function Checkout() {
  const searchParam = useSearchParams()
  const id = searchParam.get('productId')
  const startDate = searchParam.get('startDate')
  const endDate = searchParam.get('endDate')
  const days = dayjs(endDate).diff(dayjs(startDate), 'day')
  const [productInfo, setProductInfo] = useState(null)
  const { user, loading } = useAuth()
  const [userInfo, setUserInfo] = useState(null)
  const [userForm, setUserForm] = useState({
    address: '',
    dni: '',
    email: '',
    lastName: '',
    name: '',
    phone: '',
    active: ''
  })

  useEffect(() => {
    if (id) {
      getItem(id)
        .then(data => {
          setProductInfo(data)
          console.log(data)
        })
        .catch(error => {
          console.error('Error al obtener los datos:', error)
        })
    }
  }, [id])

  useEffect(() => {
    // Realiza una solicitud HTTP para obtener los datos del usuario y su rol.
    const fetchUserInfo = async () => {
      try {
        const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
        const response = await fetch(
          `${hostUrl}/users/list/{uuid}?uuid=${user.uid}`
        )
        if (response.ok) {
          const userData = await response.json()
          const userFormData = {
            address: userData[0].address || '', // Actualiza los campos según la estructura de userData
            dni: userData[0].dni || '',
            email: userData[0].email || '',
            lastName: userData[0].lastName || '',
            name: userData[0].name || '',
            phone: userData[0].phone || '',
            active: userData[0].active || '',
            role: userData[0].role || '',
            uuid: userData[0].uuid || ''
          }
          console.log(userFormData)
          setUserForm(userFormData)
          setUserInfo(userData[0])
        } else {
        }
      } catch (error) {
        console.error(error.message)
      }
    }

    if (user) {
      fetchUserInfo()
    }
  }, [user])

  return (
    <div className='bg-[#f2f5fa] p-4 pt-0 sm:p-10 sm:pt-0'>
      <div className='container py-3 sm:pb-5 sm:pt-10'>
        <div className='flex items-center justify-between text-5xl font-bold text-blue-950'>
          Reserva
        </div>
      </div>
      <div className='container rounded-lg bg-[#fcfcfc] pb-10 pt-5'>
        {/* Container */}
        <div className='flex flex-col items-start gap-8 pt-3 lg:flex-row'>
          {/* Detalles */}
          <div className='w-full'>
            {/* Product info */}
            <h1 className='border-b pb-5 text-3xl font-semibold text-blue-950'>
              Orden #230905-111723548
            </h1>

            {/* Descripcion */}
            <div className='mt-8 border-b pb-8'>
              <h2 className='pb-4 text-2xl font-bold text-sky-950'>
                Detalle de la reserva
              </h2>
              <div className='flex gap-5'>
                {productInfo ? (
                  <Image
                    src={productInfo.imageUrl + '1.png'}
                    width={200}
                    height={200}
                    className='rounded-lg'
                  />
                ) : (
                  <div className='h-[149.21px] w-[200px] animate-pulse rounded-lg bg-gray-300'></div>
                )}
                <div>
                  <div className=''>
                    <Link
                      href={`/detail/${productInfo?.id}`}
                      className='text-xl font-semibold text-sky-950 hover:text-sky-500'
                    >
                      {productInfo?.name}
                    </Link>
                    <div>
                      <span>Fecha de ingreso: </span>
                      <span>{startDate}</span>
                    </div>
                    <div>
                      <span>Fecha de salida: </span>
                      <span>{endDate}</span>
                    </div>
                    <div>
                      <span>Cantidad de días: </span>
                      <span>{days}</span>
                    </div>
                    <div>
                      <span>Personas: </span>
                    </div>
                  </div>
                </div>
                {/* Calcular subtotal y total en base al precio y la cantidad de dias */}
                <div>
                  <div>
                    <span>Subtotal: </span>
                    <span>{productInfo.pricePerDay}</span>
                  </div>
                  <div>
                    <span>Total: </span>
                    <span>{productInfo.pricePerDay * days}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Info de contacto */}
          <div className='sticky top-[94px] w-full rounded-lg border border-gray-100 bg-white shadow-lg shadow-gray-200 lg:max-w-[438px]'>
            <div className='px-5 pb-10 pt-5 text-gray-500 sm:px-12'>
              <div className='mb-8 flex items-center border-b pb-2'>
                <span className='pr-2 font-semibold text-sky-950'>
                  Información de contacto
                </span>
                {/* <span className='text-lg font-bold tracking-tight text-sky-500'>
                  <CurrencyFormatter value={results.pricePerDay} />
                </span> */}
              </div>
              <div>
                <div className='flex items-center pb-2 text-sky-950'>
                  <span className='floaty-icon-calendar pr-3 text-xl'></span>
                  <h2 className='text-sm font-semibold uppercase'>Fecha</h2>
                </div>
                <DatePicker />
                <div className='mt-5 flex items-center pb-2 text-sky-950'>
                  <span className='floaty-icon-guestes pr-3 text-xl'></span>
                  <h2 className='text-sm font-semibold uppercase'>Pasajeros</h2>
                </div>
                <input
                  type='number'
                  placeholder='Cantidad de personas'
                  className='mb-10 w-full rounded-lg border-2 p-3 text-gray-400 dark:[color-scheme:light]'
                />
              </div>
              <div className=''>
                <Link
                  href='/checkout'
                  type='button'
                  className='mb-5 w-full rounded-md bg-sky-500 py-3.5 text-center text-sm font-semibold text-white transition ease-in-out hover:bg-sky-900'
                >
                  Completar mi reserva
                </Link>
              </div>
              <p className='px-0 text-center text-sm xl:px-5'>
                Ponte en contacto con el propietario para planificar tu viaje o
                consultar cualquier duda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
