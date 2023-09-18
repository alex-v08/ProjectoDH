'use client'

import { staticBlurDataUrl } from '@/components/util/staticBlurDataUrl'
import Image from 'next/image'

const SmallGallery = ({ images }) => {
  const firstFiveImages = images.slice(0, 5)
  return (
    <>
      <div className='relative grid h-full w-full grid-cols-2 gap-3 pt-4 md:grid-cols-4'>
        {firstFiveImages.map((image, index) => (
          <div
            key={index}
            className={`relative aspect-[4/2.8] ${
              index === 0 ? 'col-span-2 row-span-2' : ''
            }`}
          >
            <Image
              src={image.imageUrl}
              alt='gallery'
              loading='eager'
              fill
              blurDataURL={image.placeHolder || staticBlurDataUrl()}
              placeholder='blur'
              style={{ objectFit: 'cover' }}
              className='h-full rounded-lg'
              quality={index === 0 ? 100 : 60} // Establecer calidad 100 solo para la primera imagen
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default SmallGallery
