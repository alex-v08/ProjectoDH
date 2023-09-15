'use client'

import { staticBlurDataUrl } from '@/components/util/staticBlurDataUrl'
import Image from 'next/image'

const FullGalery = ({ images }) => {
  const remainingImages = images.slice(5) // Obtener las imágenes a partir del índice 5 en adelante
  return (
    <>
      <div className='grid grid-cols-2 gap-3 pt-3 md:grid-cols-4'>
        {remainingImages.map((image, index) => (
          <div key={index} className='relative aspect-[4/2.8]'>
            <Image
              src={image.imageUrl}
              alt='gallery'
              loading='eager'
              fill
              blurDataURL={image.placeHolder || staticBlurDataUrl()}
              placeholder='blur'
              style={{ objectFit: 'cover' }}
              className='h-full rounded-lg'
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default FullGalery
