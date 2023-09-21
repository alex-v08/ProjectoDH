import Link from 'next/link'

export default function Confirmation() {
  return (
    <div className='h-screen bg-[#f2f5fa] p-4 pt-0 sm:p-10 sm:pt-0'>
      <div className='container flex flex-col pb-10 pt-10 lg:pb-20 lg:pt-20 xl:pb-32 xl:pt-32'>
        <div className='flex flex-col items-center pb-10 sm:pb-20 lg:w-3/4 lg:items-start'>
          <h2 className='mb-5 text-center text-2xl font-bold text-blue-950 sm:text-4xl lg:text-left'>
            Reserva realizada con éxito.
          </h2>
          <blockquote className='border-l-4 border-blue-700 pl-4 text-base text-gray-500 sm:pl-6 sm:text-lg'>
            Reserva realizada con éxito. En breve, recibirás un correo
            electrónico con todos los detalles de tu reserva. <br />
            Si tienes alguna pregunta o necesitas asistencia adicional, no dudes
            en ponerte en contacto con nosotros. Estamos aquí para ayudarte.
            <br />
            <br />
            Gracias por elegir OceanWings. Esperamos que tengas una experiencia
            maravillosa.
          </blockquote>
        </div>
        <div className='flex flex-col justify-center sm:flex-row lg:w-3/4 lg:items-start'>
          <Link href='/'>
            <button className='mb-3 h-auto w-full rounded border border-blue-700 bg-blue-700 px-4 py-2 font-semibold text-white transition ease-in-out hover:bg-blue-950 sm:mb-0 sm:mr-3 sm:w-auto lg:min-w-[125px]'>
              Volver a la página principal
            </button>
          </Link>
          <Link href='/reservas'>
            <button className='h-auto w-full rounded border border-blue-700 bg-blue-700 px-4 py-2 font-semibold text-white transition ease-in-out hover:bg-blue-950 sm:w-auto lg:min-w-[125px]'>
              Ir al historial de Reservas
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
