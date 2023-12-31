import CurrencyFormatter from '@/components/util/CurrencyFormatter'
import { staticBlurDataUrl } from '@/components/util/staticBlurDataUrl'
import Image from 'next/image'
import Link from 'next/link'
import { BsStarFill } from 'react-icons/bs'
import { HiLocationMarker } from 'react-icons/hi'
import RatingMedia from '@/components/detail/RatingMedia'

export const CardDetailSearch = ({
  imageUrl,
  id,
  name,
  location,
  pricePerDay,
  placeHolder
}) => {
  return (
    <>
      <Link
        className='group relative flex w-full max-w-[450px] flex-col overflow-hidden rounded-lg border shadow-sm transition-transform duration-300 ease-in-out hover:scale-[1.01] lg:max-w-full lg:flex-row'
        href={`/detail/${id}`}
      >
        <div className='h-53 relative h-[208px] overflow-hidden lg:h-[215px] lg:min-w-[250px] xl:h-[239px] xl:min-w-[341px] 2xl:min-w-[371px]'>
          <Image
            src={imageUrl}
            alt='Picture of the author'
            loading='eager'
            fill
            blurDataURL={placeHolder || staticBlurDataUrl()}
            placeholder='blur'
            sizes='(max-width: 768px) 100vw'
            style={{ objectFit: 'cover' }}
            className='transition duration-150 ease-in-out group-hover:brightness-105'
          />
        </div>
        <div className='flex w-full flex-col justify-center px-[15px] pt-6 transition duration-300 ease-in-out group-hover:bg-white sm:px-[30px] lg:px-[30px] lg:py-0'>
          <div className='flex justify-between pb-[5px]'>
            <div className='flex items-center'>
              <HiLocationMarker className='mr-1 h-4 w-4 text-gray-400' />
              <p className='mr-3 line-clamp-1 w-full text-xs uppercase text-gray-500'>
                {location === null
                  ? 'SANTA ROSA, ARGENTINA'
                  : `${location.city}, ${location.country}`}
              </p>
            </div>
            <div className='flex items-center'>
              <RatingMedia productId={id} style={'font-medium text-gray-500'}/>
            </div>
          </div>
          <h3 className='truncate pb-[5px] text-xl font-bold uppercase text-sky-900'>
            {name}
          </h3>
          <span className='text-sm font-medium text-gray-500 lg:pb-6'>
            8 Huéspedes 9 Habitaciones 2 Baños 5 Cabinas
          </span>
          <div className='flex flex-wrap items-center justify-between py-4 lg:pb-0 lg:pt-2 xl:pt-4'>
            <h3 className='mr-2 py-4 text-xl font-extrabold leading-none text-sky-500 sm:pt-0 md:pt-4'>
              <span className='text-[0.75rem] font-semibold uppercase text-gray-500'>
                Por noche
              </span>{' '}
              <CurrencyFormatter value={pricePerDay} />
            </h3>
            <button
              type='button'
              className='w-full max-w-[136px] rounded-md border-sky-500 bg-sky-500 px-4 py-2 font-semibold text-white transition ease-in-out hover:bg-sky-900'
            >
              Alquilar
            </button>
          </div>
        </div>
      </Link>
    </>
  )
}
