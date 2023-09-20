'use client'

import Link from 'next/link'
import { HiLocationMarker } from 'react-icons/hi'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import 'dayjs/locale/es-mx'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/authContext'
import CurrencyFormatter from '@/components/util/CurrencyFormatter'
import Swal from 'sweetalert2'
import EmailTemplate from '@/components/checkout/emailTemplate'

const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
const itemsUrl = `${hostUrl}/api/products/`

async function getItem(id) {
  const response = await fetch(itemsUrl + id, {
    cache: 'no-store'
  })
  const data = await response.json()
  return data
}

dayjs.locale('es-mx')

export default function Checkout() {
  const searchParam = useSearchParams()
  const id = searchParam.get('productId')
  const startDate = searchParam.get('startDate')
  const endDate = searchParam.get('endDate')
  const startDateFormated = dayjs(startDate).format('DD-MMMM-YYYY', {
    locale: 'es-mx'
  })
  const endDateFormated = dayjs(endDate).format('DD-MMMM-YYYY', {
    locale: 'es-mx'
  })
  const days = dayjs(endDate).diff(dayjs(startDate), 'day')
  const [productInfo, setProductInfo] = useState(null)
  const { user, loading } = useAuth()
  const [userInfo, setUserInfo] = useState(null)
  const [userForm, setUserForm] = useState({
    id: '',
    address: '',
    dni: '',
    email: '',
    lastName: '',
    name: '',
    phone: '',
    active: ''
  })
  const [reservForm, setReservForm] = useState({
    user_id: '',
    product_id: '',
    dateInit: '',
    dateEnd: ''
  })
  const router = useRouter()

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
          `${hostUrl}/api/users/list/{uuid}?uuid=${user.uid}`
        )
        if (response.ok) {
          const userData = await response.json()
          const userFormData = {
            id: userData[0].id || '',
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

  useEffect(() => {
    // Configurar reservForm aquí después de obtener userFormData y productInfo
    if (userInfo && productInfo) {
      const updatedReservForm = {
        user_id: userInfo.id || '',
        product_id: productInfo.id || '',
        dateInit: startDate || '',
        dateEnd: endDate || ''
      }
      setReservForm(updatedReservForm)
    }
  }, [userInfo, productInfo, startDate, endDate])

  const handleSubmit = async e => {
    e.preventDefault()
    // setError('')
    // console.log(reservForm)

    Swal.fire({
      title: '¿Está seguro que desea confirmar la reserva?',
      text: 'Confirmar reserva!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, confirmar!'
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const hostUrl = process.env.NEXT_PUBLIC_HOST_URL

          const response = await fetch(`${hostUrl}/api/bookings`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservForm) // Send data as JSON string
          })

          if (response.ok) {
            //Enviar Mail
            Swal.fire(
              'Confirmada!',
              'La reserva ha sido completada.',
              'success'
            )
            const emailHTML = EmailTemplate({
              userForm: userForm,
              productInfo: productInfo,
              id: id,
              days: days,
              startDateFormated: startDateFormated,
              endDateFormated: endDateFormated
            })

            const emailResponse = await fetch(
              `${hostUrl}/api/email/send-html`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  to: userForm.email,
                  subject: 'Confirmación de reserva',
                  body: 'Muchas gracias por realizar la reserva.',
                  htmlContent: emailHTML
                })
              }
            )

            if (emailResponse.ok) {
              console.log('Email sent successfully')
              router.push('/reservas')
            } else {
              console.error('Error sending email')
            }
            //REDIRECCIONA A LA PAGINA DE CONFIRMACIÓN
            router.push('/checkout/confirmation')
          } else {
            console.error('Error al confirmar la reserva.')
            Swal.fire(
              'Error',
              'Hubo un problema al confirmar la reserva.',
              'error'
            )
          }
        } catch (error) {
          console.error(error.message)
          Swal.fire(
            'Error',
            'Hubo un error inesperado. Por favor, inténtalo de nuevo más tarde.',
            'error'
          )
        }
      }
    })
  }

  const handleChange = ({ target: { value, name } }) =>
    setUserForm({ ...userForm, [name]: value })

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
              <div className='flex flex-wrap items-start gap-5'>
                <div className='relative h-[149.21px] min-w-[200px]'>
                  {productInfo ? (
                    <Image
                      src={productInfo.imageUrl + '1.png'}
                      fill
                      style={{ objectFit: 'cover' }}
                      alt='Imagen del producto'
                      className='h-[149.21px] w-[200px] rounded-lg bg-gray-300'
                    />
                  ) : (
                    <div className='h-[149.21px] w-[200px] animate-pulse rounded-lg bg-gray-300'></div>
                  )}
                </div>
                <div className='grow'>
                  <div>
                    <div className='mb-1 flex items-center text-gray-400'>
                      <HiLocationMarker className='mr-1 h-4 w-4' />
                      <span className='line-clamp-1 text-sm font-semibold uppercase'>
                        SANTA ROSA, LA PAMPA, ARGENTINA
                      </span>
                    </div>
                    <Link
                      href={`/detail/${productInfo?.id}`}
                      target='_blank'
                      className='line-clamp-1 text-xl font-semibold text-sky-950 transition ease-in-out hover:text-sky-500'
                    >
                      {productInfo?.name}
                    </Link>
                    <div className='mt-2 flex flex-wrap gap-1 font-medium'>
                      <span>Fecha de ingreso:</span>
                      <span className='text-slate-500'>
                        {startDateFormated}
                      </span>
                    </div>
                    <div className='mt-1 flex flex-wrap gap-1 font-medium'>
                      <span>Fecha de salida:</span>
                      <span className='text-slate-500'>{endDateFormated}</span>
                    </div>
                    <div className='mt-1 font-medium'>
                      <span>Cantidad de días: </span>
                      <span className='text-slate-500'>{days}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Calcular subtotal y total en base al precio y la cantidad de dias */}
            <div className='w-full border-b py-5 pr-4 text-right text-xl'>
              <div>
                <span className='font-semibold'>Subtotal: </span>
                <span>
                  {productInfo ? (
                    <CurrencyFormatter value={productInfo.pricePerDay} />
                  ) : (
                    '$'
                  )}
                </span>
              </div>
              <div>
                <span className='font-semibold'>Total: </span>
                <span>
                  {productInfo ? (
                    <CurrencyFormatter value={productInfo.pricePerDay * days} />
                  ) : (
                    '$'
                  )}
                </span>
              </div>
            </div>
          </div>
          {/* Info de contacto */}
          <div className='sticky top-[94px] w-full rounded-lg border border-gray-100 bg-white shadow-lg shadow-gray-200 lg:max-w-[760px]'>
            <div className='px-5 pb-10 pt-5 text-gray-500 sm:px-12'>
              <div className='mb-8 flex items-center border-b pb-2'>
                <span className='pr-2 text-xl font-semibold text-sky-950'>
                  Información de contacto
                </span>
              </div>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
                    <div>
                      <label
                        htmlFor='name'
                        className='block pb-2 text-sm font-semibold uppercase text-sky-950'
                      >
                        Nombre
                      </label>
                      <input
                        type='text'
                        name='name'
                        id='name'
                        onChange={handleChange}
                        className='w-full rounded-lg border-2 p-3 text-gray-700 disabled:bg-green-100'
                        placeholder='Nombre'
                        value={userForm.name}
                        disabled
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='lastName'
                        className='block pb-2 text-sm font-semibold uppercase text-sky-950'
                      >
                        Apellido
                      </label>
                      <input
                        type='text'
                        name='lastName'
                        id='lastName'
                        onChange={handleChange}
                        className='w-full rounded-lg border-2 p-3 text-gray-700 disabled:bg-green-100'
                        placeholder='Apellido'
                        value={userForm.lastName}
                        disabled
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='dni'
                        className='block pb-2 text-sm font-semibold uppercase text-sky-950'
                      >
                        Correo electrónico
                      </label>
                      <input
                        type='email'
                        name='email'
                        id='email'
                        onChange={handleChange}
                        className='w-full rounded-lg border-2 p-3 text-gray-700 disabled:bg-green-100'
                        placeholder='ejemplo@email.com'
                        value={userForm.email}
                        disabled
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='dni'
                        className='block pb-2 text-sm font-semibold uppercase text-sky-950'
                      >
                        DNI
                      </label>
                      <input
                        type='number'
                        name='dni'
                        id='dni'
                        onChange={handleChange}
                        className='w-full rounded-lg border-2 p-3 text-gray-400'
                        placeholder='DNI'
                        value={userForm.dni}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='phone'
                        className='block pb-2 text-sm font-semibold uppercase text-sky-950'
                      >
                        Teléfono
                      </label>
                      <input
                        type='phone'
                        name='phone'
                        id='phone'
                        onChange={handleChange}
                        className='w-full rounded-lg border-2 p-3 text-gray-400'
                        placeholder='Teléfono'
                        value={userForm.phone}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='address'
                        className='block pb-2 text-sm font-semibold uppercase text-sky-950'
                      >
                        Dirección
                      </label>
                      <input
                        type='address'
                        name='address'
                        id='address'
                        onChange={handleChange}
                        className='w-full rounded-lg border-2 p-3 text-gray-400'
                        placeholder='Dirección'
                        value={userForm.address}
                      />
                    </div>
                  </div>

                  <div className='flex flex-col items-center justify-center pt-7 sm:flex-row sm:justify-between sm:gap-0'>
                    <button
                      className='mb-5 w-full rounded-md bg-sky-500 py-3.5 text-center font-semibold uppercase text-white transition ease-in-out hover:bg-sky-900'
                      type='submit'
                    >
                      Finalizar mi reserva
                    </button>
                  </div>
                  <p className='px-0 text-center text-sm xl:px-5'>
                    Ponte en contacto con el propietario para planificar tu
                    viaje o consultar cualquier duda.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
