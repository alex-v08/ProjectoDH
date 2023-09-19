import Galeria from '@/components/suggested/galeriaImagenes/Galeria'
import Link from 'next/link'
import { HiLocationMarker } from 'react-icons/hi'
import { ButtonBack } from '@/components/suggested/buttonBack/ButtonBack'
import ShareButton from '@/components/favs/ShareButton'
import HeartButton from '@/components/favs/HeartButton'
import Image from 'next/image'
import { dynamicBlurDataUrl } from '@/components/util/dynamicBlurDataUrl'
import Comentarios from '@/components/detail/Comentarios'
import MediaShare from '@/components/mediaShare/MediaShare'
import MenuReserva from '@/components/detail/MenuReserva'
import RatingMedia from '@/components/detail/RatingMedia'
import Feature from '@/components/detail/Feature'

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

// async function getGallery(id) {
//   const response = await fetch(imageUrl + id, {
//     cache: 'no-store'
//   })
//   const data = await response.json()
//   return data
// }

export default async function Detalle({ params }) {
  const index = parseInt(params.id)
  const results = await getItem(index)
  // console.log('RESULTS', results)
  const imgUrls = results.pictureDataSet.map(async image => ({
    ...image,
    placeHolder: await dynamicBlurDataUrl(image.imageUrl)
  }))

  const images = await Promise.all(imgUrls)

  // Ordenar las imágenes por el campo 'imageOrder' en orden ascendente
  images.sort((a, b) => a.imageOrder - b.imageOrder)

  // console.log(images)

  return (
    <div className='bg-[#f2f5fa] p-4 pt-0 sm:p-10 sm:pt-0'>
      <div className='container py-3 text-xs font-medium uppercase text-gray-500 sm:py-5'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center tracking-tight'>
            <Link
              href='/'
              className='transition ease-in-out hover:text-sky-500'
            >
              Inicio
            </Link>
            <span className='px-2'>{'>'}</span>
            <Link
              href='/search'
              className='transition ease-in-out hover:text-sky-500'
            >
              Barcos
            </Link>
            <span className='px-2'>{'>'}</span>
            <div className='line-clamp-1 pr-2'>{results.name}</div>
          </div>
          <ButtonBack />
        </div>
      </div>

      <div
        className='container relative rounded-lg bg-[#fcfcfc] pb-10 pt-5'
        href={`/detail/${index}`}
      >
        <div className='mr-2 flex items-center justify-end space-x-4'>
          <ShareButton />
          <HeartButton fillColor='#0EA5E9' productId={index} />
        </div>

        <Galeria images={images} />

        {/* Container */}
        <div className='flex flex-col items-start gap-8 pt-6 lg:flex-row'>
          {/* Detalles */}
          <div className='1 w-full pt-2'>
            {/* Product info */}
            <h1 className='pb-5 text-4xl font-bold uppercase text-blue-950'>
              {results.name}
            </h1>
            <div className='flex items-center text-gray-400'>
              <HiLocationMarker className='mr-1 h-4 w-4' />
              <span className='text-sm font-semibold uppercase'>
                SANTA ROSA, LA PAMPA, ARGENTINA
              </span>
            </div>
            <div className='mt-4 flex items-center border-b border-t py-4 font-medium text-sky-950'>
              <span className='pr-3'>
                8 Huéspedes 9 Habitaciones 2 Baños 5 Cabinas
              </span>
              {/* Rating */}
              <RatingMedia productId={index} style='font-bold' />
            </div>

            {/* Descripcion */}
            <div className='mt-8 border-b pb-8'>
              <h2 className='pb-4 text-2xl font-bold text-sky-950'>
                Descripción
              </h2>
              <p className='text-base text-gray-500'>{results.description}</p>
            </div>

            {/* Caracteristicas */}
            <div className='mt-8 border-b pb-8'>
              <h2 className='pb-4 text-2xl font-bold text-sky-950'>
                Características
              </h2>
              <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3'>
                {results.feature.map(feature => (
                  <Feature key={feature.id} feature={feature} />
                ))}
              </div>
            </div>

            {/* Politicas */}
            <div className='mt-8 border-b pb-8'>
              <h2 className='pb-6 text-2xl font-bold text-sky-950'>
                Políticas del producto
              </h2>
              <div className='mb-8 flex flex-wrap gap-3 bg-slate-200 px-5 py-5 sm:gap-14 sm:px-12'>
                <div>
                  <span className='font-semibold'>Ingreso:</span> 2:00PM
                </div>
                <div>
                  <span className='font-semibold'>Salida:</span> 12:00AM{' '}
                </div>
              </div>
              <div className='wrapper mb-6'>
                <div className='title mb-1 flex items-center'>
                  <i className='floaty-icon-life-buoy pr-3 text-2xl text-sky-600 sm:pr-6'></i>
                  <div className='font-semibold text-gray-950'>
                    Con o sin capitán
                  </div>
                </div>
                <div className='content'>
                  <p className='pl-9 text-gray-500 sm:pl-12'>
                    Puedes navegar el barco tú mismo (se requiere licencia) o
                    contratar un Capitán durante la reserva.
                  </p>
                </div>
              </div>
              <div className='wrapper mb-6'>
                <div className='title mb-1 flex items-center'>
                  <i className='floaty-icon-bank-note pr-3 text-2xl text-sky-600 sm:pr-6'></i>
                  <div className='font-semibold text-gray-950'>
                    Sin cargos adicionales
                  </div>
                </div>
                <div className='content'>
                  <p className='pl-9 text-gray-500 sm:pl-12'>
                    El precio total incluye las tasas a pagar en el momento del
                    check-in (combustible no incluido a menos que se especifique
                    lo contrario).
                  </p>
                </div>
              </div>
              <div className='wrapper mb-6'>
                <div className='title mb-1 flex items-center'>
                  <i className='floaty-icon-card-check-o pr-3 text-2xl text-sky-600 sm:pr-6'></i>
                  <div className='font-semibold text-gray-950'>
                    Pago por adelantado
                  </div>
                </div>
                <div className='content'>
                  <p className='pl-9 text-gray-500 sm:pl-12'>
                    Se requiere un prepago del 50% para confirmar su reserva.
                  </p>
                </div>
              </div>
              <div className='wrapper'>
                <div className='title mb-1 flex items-center'>
                  <i className='floaty-icon-calendar-minus pr-3 text-2xl text-sky-600 sm:pr-6'></i>
                  <div className='font-semibold text-gray-950'>
                    Política de cancelación
                  </div>
                </div>
                <div className='content'>
                  <p className='pl-9 text-gray-500 sm:pl-12'>
                    Flexible: Reembolso total hasta 1 día antes de la llegada,
                    excluyendo gastos de servicio y comisión de Ocean Wings.
                  </p>
                </div>
              </div>
            </div>

            {/* Comentarios */}
            <Comentarios productId={results.id} />
          </div>
          {/* Reserva */}
          <MenuReserva price={results.pricePerDay} id={results.id} />
        </div>
      </div>
    </div>
  )
}
