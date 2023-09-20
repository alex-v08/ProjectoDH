'use client'

import Image from 'next/image'
import HeroUser from '@/components/user/HeroUser'
import { useAuth } from '@/context/authContext'
import { useState, useEffect, use } from 'react'
import { BsCameraFill } from 'react-icons/bs'
import Swal from 'sweetalert2'

export default function User() {
  const [userForm, setUserForm] = useState({
    address: '',
    dni: '',
    email: '',
    lastName: '',
    name: '',
    phone: '',
    enabled: ''
  })
  const [error, setError] = useState('')
  const { user, loading } = useAuth()
  const [userInfo, setUserInfo] = useState(null)
  const [send, setSend] = useState(false)

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
            address: userData[0].address || '', // Actualiza los campos según la estructura de userData
            dni: userData[0].dni || '',
            email: userData[0].email || '',
            lastName: userData[0].lastName || '',
            name: userData[0].name || '',
            phone: userData[0].phone || '',
            enabled: userData[0].enabled || '',
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
  }, [user, send])

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    Swal.fire({
      title: '¿Está seguro que desea actualizar la información?',
      text: 'Se actualizaran tus datos!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, actualizar!'
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
          console.log(userForm)
          const response = await fetch(`${hostUrl}/api/users/${userInfo.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userForm) // Send the updated user data as JSON
          })

          if (response.ok) {
            console.log('User data updated successfully')
            setSend(!send)
            Swal.fire(
              'Actualizado!',
              'La actualización ha sido completada.',
              'success'
            )
          } else {
            console.error('Error updating user data')
            Swal.fire(
              'Error',
              'Hubo un problema al actualizar los datos.',
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
    <>
      <HeroUser />
      <div className=' bg-[#f2f5fa]'>
        <div className='container'>
          <div className='relative -top-20 left-0 z-10 flex w-full flex-col  gap-5 rounded-lg  lg:flex-row '>
            <div className='flex w-full flex-col items-center rounded-lg bg-white px-5 py-5 drop-shadow-md lg:max-w-[506px] lg:px-10 lg:py-9 xl:px-7'>
              {user && userInfo ? (
                <>
                  <div className='photo relative'>
                    {user.photoURL ? (
                      <Image
                        src={user.photoURL}
                        alt='Picture of the user'
                        width={128}
                        height={128}
                        className='rounded-full border-2 border-sky-500'
                      />
                    ) : (
                      <div className='flex h-[128px] w-[128px] cursor-pointer items-center justify-center rounded-full border-2 border-sky-500 bg-gradient-to-r from-cyan-500 to-blue-500'>
                        <div className='text-4xl font-bold uppercase tracking-tighter text-white'>
                          {userInfo.name.charAt(0) +
                            userInfo.lastName.charAt(0)}
                        </div>
                      </div>
                    )}
                    <BsCameraFill className='absolute -right-2 bottom-0 h-[40px] w-[40px] cursor-pointer rounded-full bg-sky-500 p-2 text-2xl text-white' />
                  </div>
                  <div className='mt-4 text-2xl font-bold text-sky-950'>
                    {userInfo.name} {userInfo.lastName}
                  </div>
                  <div className='mt-2 rounded-lg border border-emerald-500 px-3 py-1 lowercase text-emerald-500'>
                    {userInfo.role}
                  </div>
                  <div className='mt-4 flex w-full flex-col gap-3'>
                    <div className='border-b border-t pb-3 pt-3'>
                      <span className='pl-2 font-semibold'>Correo:</span>{' '}
                      {userInfo.email}
                    </div>
                    <div className='border-b pb-3'>
                      <span className='pl-2 font-semibold'>DNI:</span>{' '}
                      {userInfo.dni ? userInfo.dni : 'No registrado'}
                    </div>
                    <div className='border-b pb-3'>
                      <span className='pl-2 font-semibold'>Teléfono:</span>{' '}
                      {userInfo.phone ? userInfo.phone : 'No registrado'}
                    </div>
                    <div className='border-b pb-3'>
                      <span className='pl-2 font-semibold'>Direccion:</span>{' '}
                      {userInfo.address ? userInfo.address : 'No registrado'}
                    </div>
                    <div className='border-b pb-3'>
                      <span className='pl-2 font-semibold'>Estado:</span>{' '}
                      {userInfo.enabled ? 'activo' : 'sin activar'}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
            <div className='w-full rounded-lg bg-white px-5 py-5 drop-shadow-md lg:px-10 lg:py-9 xl:px-7'>
              <form onSubmit={handleSubmit}>
                <div className='border-b border-sky-600 pb-4 text-xl font-semibold'>
                  Configuración de cuenta
                </div>
                <div className='grid grid-cols-1 gap-6 pt-6 lg:grid-cols-2'>
                  <div>
                    <label
                      htmlFor='name'
                      className='mb-2 block font-medium text-gray-700'
                    >
                      Nombre
                    </label>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      onChange={handleChange}
                      className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
                      placeholder='Nombre'
                      value={userForm.name}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='lastName'
                      className='mb-2 block font-medium text-gray-700'
                    >
                      Apellido
                    </label>
                    <input
                      type='text'
                      name='lastName'
                      id='lastName'
                      onChange={handleChange}
                      className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
                      placeholder='Apellido'
                      value={userForm.lastName}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='dni'
                      className='mb-2 block font-medium text-gray-700'
                    >
                      Correo electrónico
                    </label>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      onChange={handleChange}
                      className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
                      placeholder='ejemplo@email.com'
                      value={userForm.email}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='dni'
                      className='mb-2 block font-medium text-gray-700'
                    >
                      DNI
                    </label>
                    <input
                      type='number'
                      name='dni'
                      id='dni'
                      onChange={handleChange}
                      className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
                      placeholder='DNI'
                      value={userForm.dni}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='phone'
                      className='mb-2 block font-medium text-gray-700'
                    >
                      Teléfono
                    </label>
                    <input
                      type='phone'
                      name='phone'
                      id='phone'
                      onChange={handleChange}
                      className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
                      placeholder='Teléfono'
                      value={userForm.phone}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='address'
                      className='mb-2 block font-medium text-gray-700'
                    >
                      Dirección
                    </label>
                    <input
                      type='address'
                      name='address'
                      id='address'
                      onChange={handleChange}
                      className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
                      placeholder='Dirección'
                      value={userForm.address}
                    />
                  </div>
                </div>

                <div className='flex flex-col items-center justify-center pt-7 sm:flex-row sm:justify-between sm:gap-0'>
                  <button
                    className='focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
                    type='submit'
                  >
                    Actualizar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
