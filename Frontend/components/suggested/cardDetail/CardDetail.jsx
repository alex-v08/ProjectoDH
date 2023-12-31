import CurrencyFormatter from '@/components/util/CurrencyFormatter'
import { staticBlurDataUrl } from '@/components/util/staticBlurDataUrl'
import Image from 'next/image'
import Link from 'next/link'
import HeartButton from '@/components/favs/HeartButton'
import RatingMedia from '@/components/detail/RatingMedia'

export const CardDetail = ({
  imageUrl,
  id,
  name,
  description,
  pricePerDay,
  category,
  placeHolder
}) => {
  return (
    <Link
      className='group relative flex max-w-[450px] flex-col overflow-hidden rounded-lg border shadow-md transition-transform duration-300 ease-in-out hover:scale-[1.02] sm:max-w-full'
      href={`/detail/${id}`}
    >
      <div className='relative h-52 w-full overflow-hidden lg:h-60'>
        <Image
          src={imageUrl}
          alt='Picture of the author'
          loading='eager'
          fill
          blurDataURL={placeHolder || staticBlurDataUrl()}
          placeholder='blur'
          sizes='(max-width: 768px) 100vw'
          style={{ objectFit: 'cover' }}
          className='rounded-t-lg transition duration-150 ease-in-out group-hover:brightness-105'
        />
        <div className='w-full h-1/4 absolute bg-gradient-to-b from-black to-transparent opacity-30'></div>
        <div className='absolute top-0 right-0 m-5'>
          <HeartButton fillColor='white' behaivour='hidden group-hover:block' productId={id} />
        </div>          
      </div>
      <div className='transition duration-300 ease-in-out group-hover:bg-white'>
        <div className='flex flex-col px-5 py-6 text-xs sm:px-7'>
          <div className='flex justify-between'>
            <h5 className='font-semibold uppercase text-sky-500'>
              {category?.name || 'Sin categoria'}
            </h5>
            {/* Rating */}
            <div className='flex'>
                <RatingMedia productId={id} style={'font-medium text-gray-500'}/>
            </div>
          </div>
          <h4 className='my-1 truncate text-lg font-bold uppercase text-sky-900'>
            {name}
          </h4>
          <div className='h-[2.5em] text-gray-500'>
            <p className='line-clamp-2 text-sm leading-[1.5em]'>
              {description}
            </p>
          </div>
        </div>
        <div className=' flex items-center justify-between border-t px-7 py-4'>
          <h3 className='mr-2 text-lg font-extrabold leading-none text-sky-500'>
            <span className='text-[0.65rem] uppercase text-gray-500'>
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
  )
}
