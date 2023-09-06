import Link from 'next/link'
import { HiLocationMarker } from 'react-icons/hi'
import { BsStarFill, BsStar } from 'react-icons/bs'
import Image from 'next/image'
import DatePicker from '@/components/detail/DatePicker'

export default function Checkout() {
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
                Descripción
              </h2>
              <p className='text-base text-gray-500'>descripcion</p>
            </div>
          </div>
          {/* Reserva */}
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
