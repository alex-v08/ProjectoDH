import Image from 'next/image'
import Link from 'next/link'

export default function HeroUser() {
  return (
    <div className='relative flex h-[204px] w-full items-center justify-center sm:h-[303px] lg:h-[400px]'>
      <Image
        src='/bg-header-2.jpg'
        alt='hero'
        priority={true}
        loading='eager'
        blurDataURL='data:...'
        placeholder='blur'
        fill
        style={{ objectFit: 'cover' }}
        quality={100}
        className='h-full w-full brightness-75'
      />
      <div className='z-10'>
        <h2 className='text-center text-4xl font-bold tracking-[-0.04em] text-slate-50 drop-shadow-md sm:text-5xl lg:text-6xl'>
          Datos de usuario
        </h2>
        <div className='flex items-center justify-center pt-5 text-xs font-semibold tracking-tight text-white'>
          <Link href='/' className='transition ease-in-out hover:text-sky-500'>
            INICIO
          </Link>
          <span className='px-2 text-gray-400'>{'>'}</span>
          INFORMACIÓN DE USUARIO
        </div>
      </div>
    </div>
  )
}
