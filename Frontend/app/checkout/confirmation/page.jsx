import Link from 'next/link'

export default function Confirmation() {
    return (
        <>
            <h1>Reserva realizada con éxito</h1>
            <Link href='/'>Volver a la página principal</Link>
            <Link href='/'>Ir al historial de Reservas</Link>
        </>
    )
}