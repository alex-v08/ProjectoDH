import Image from 'next/image'
import imaHero from '../../../public/bg1-2.jpg'

export default function Hero() {
  return (
    <div className='relative flex h-[50vh] items-center justify-center lg:h-[73vh]'>
      <Image
        src={imaHero}
        alt='hero'
        priority={true}
        loading='eager'
        placeholder='blur'
        fill
        style={{ objectFit: 'cover' }}
        quality={100}
      />
      <h2 className='text-center font-autography text-7xl tracking-[-0.04em] text-slate-50 drop-shadow-md md:text-8xl xl:text-9xl'>
        Life is better on the water
      </h2>
    </div>
  )
}
