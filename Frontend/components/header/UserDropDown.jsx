import { useAuth } from '@/context/authContext'
import Link from 'next/link'
import { BsGear } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'
import { AiOutlineHome } from 'react-icons/ai'
import { AiOutlineHeart } from 'react-icons/ai'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Dropdown({ openMenu }) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    // Realiza una solicitud HTTP para obtener los datos del usuario y su rol.
    const fetchUserRole = async () => {
      try {
        const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
        const response = await fetch(
          `${hostUrl}/users/list/{uuid}?uuid=${user.uid}`
        )
        if (response.ok) {
          const userData = await response.json()
          setUserRole(userData[0].role) // Suponiendo que el rol se encuentra en userData.role
        } else {
          // Maneja los errores de la solicitud aquí.
        }
      } catch (error) {
        console.error(error.message)
      }
    }

    if (user) {
      fetchUserRole()
    }
  }, [user])

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div
      className={`absolute right-0 top-12 flex w-[200px] flex-col rounded-xl border bg-white p-2 text-sm drop-shadow-lg ${
        openMenu ? 'block' : 'hidden'
      }`}
    >
      <div className='cursor-pointer rounded-lg p-3 font-semibold hover:bg-slate-200'>
        <div>Registrado como</div>
        <div className='truncate'>{user.displayName}</div>
      </div>
      <Link href='/' className='rounded-lg px-3 py-2 hover:bg-slate-200'>
        <AiOutlineHome className='mr-2 inline-block text-base' />
        Inicio
      </Link>
      <Link
        href='/favoritos'
        className='rounded-lg px-3 py-2 hover:bg-slate-200'
      >
        <AiOutlineHeart className='mr-2 inline-block text-base' />
        Favoritos
      </Link>
      <Link href='/user' className='rounded-lg px-3 py-2 hover:bg-slate-200'>
        <BsGear className='mr-2 inline-block text-base' />
        Configuración
      </Link>
      {userRole === 'ADMIN' && (
        <Link
          href='/administracion'
          className='rounded-lg px-3 py-2 hover:bg-slate-200'
        >
          <MdOutlineAdminPanelSettings className='mr-2 inline-block text-base' />
          Administración
        </Link>
      )}
      <button
        onClick={handleLogout}
        className='rounded-lg px-3 py-2 text-left hover:bg-rose-200 hover:text-pink-600 '
      >
        <BiLogOut className='mr-2 inline-block text-base' />
        Cerrar sesión
      </button>
    </div>
  )
}
