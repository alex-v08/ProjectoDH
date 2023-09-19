import Link from 'next/link'

export default function Confirmation() {
    return (
        <>  
            <div className='container flex flex-col pb-40 pt-[21rem] lg:pb-44 lg:pt-40 xl:pb-44'>
                <div className='flex flex-col items-center lg:w-[55%] lg:items-start pb-20'>
                    <h2 className='mb-7 text-center text-3xl font-bold text-sky-950 sm:text-5xl lg:text-left'>
                        Reserva realizada con éxito.
                    </h2>
                    <blockquote className='border-l-4 border-sky-500 pl-6 text-lg text-gray-500 sm:text-xl'>
                        Hemos recibido tu reserva con éxito. En breve, recibirás un correo electrónico con todos los detalles de tu reserva. <br/> 
                        Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en ponerte en contacto con nosotros. Estamos aquí para ayudarte.<br />
                        <br />
                        Gracias por elegir OceanWings. Esperamos que tengas una experiencia maravillosa.
                    </blockquote>
                </div>
                <div className='flex flex-row justify-between lg:w-[55%] lg:items-start'>
                    <Link href='/'>
                        <button className='trasition h-auto w-auto rounded border border-sky-500 bg-sky-500 px-4 py-2 font-semibold text-white transition ease-in-out hover:bg-sky-900 lg:mt-8 lg:min-w-[125px] lg:max-w-[176px]'>
                            Volver a la página principal
                        </button>
                    </Link>
                    <Link href='/reservas'>
                        <button className='trasition h-auto w-auto rounded border border-sky-500 bg-sky-500 px-4 py-2 font-semibold text-white transition ease-in-out hover:bg-sky-900 lg:mt-8 lg:min-w-[125px] lg:max-w-[176px]'>
                            Ir al historial de Reservas
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}