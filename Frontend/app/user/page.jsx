'use client'

import HeroUser from '@/components/user/HeroUser'
import { useState } from 'react'

export default function User() {
  const [userForm, setUserForm] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    try {
      await login(userForm.email, userForm.password)
      router.push('/')
    } catch (error) {
      setError(errorMessages[error.code] || error.message)
    }
  }

  const handleChange = ({ target: { value, name } }) =>
    setUserForm({ ...userForm, [name]: value })

  return (
    <>
      <HeroUser />
      <div className=' bg-[#f2f5fa]'>
        <div className='container'>
          <div className='relative -top-20 left-0 z-10 flex w-full flex-col  gap-5 rounded-lg  lg:flex-row '>
            <div className='w-full max-w-[506px] rounded-lg bg-white px-5 py-5 drop-shadow-md lg:px-10 lg:py-9 xl:px-7'>
              1
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
