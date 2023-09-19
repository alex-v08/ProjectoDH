export function RowUser(props) {
  const {
    id,
    name,
    lastName,
    dni,
    password,
    email,
    phone,
    address,
    role,
    uuid,
    active,
    onRefreshData
  } = props

  async function handleOnEditRole(newRole) {
    const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
    const urlEditRole = `${hostUrl}/users/update/role/` + id

    const opcion = confirm(
      newRole === 'ADMIN'
        ? `Designar como administrador el id: ${id}`
        : `Descartar como administrador el id: ${id}`
    )

    if (opcion) {
      try {
        const response = await fetch(urlEditRole, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify(newRole)
        })

        if (!response.ok) {
          throw new Error(
            `Error al intentar ${
              newRole === 'ADMIN' ? 'designar' : 'descartar'
            } el usuario como administrador. Response: ${response.status}`
          )
        } else {
          onRefreshData()
        }
      } catch (error) {
        console.error(
          `Error al ${
            newRole === 'ADMIN' ? 'designar' : 'descartar'
          } como administrador el registro:`,
          error
        )
      }
    }
  }

  return (
    <tr className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'>
      <th
        scope='row'
        className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'
      >
        {id}
      </th>
      <td className='px-6 py-4'>{name}</td>
      <td className='px-6 py-4'>{lastName}</td>
      <td className='px-6 py-4'>{dni}</td>
      <td className='px-6 py-4'>{email}</td>
      <td className='px-6 py-4'>{phone}</td>
      <td className='px-6 py-4'>{address}</td>
      <td className='px-6 py-4'>{role}</td>
      <td className='px-6 py-4 text-right'>
        {role === 'ADMIN' ? (
          <button
            value={id}
            onClick={() => handleOnEditRole('USER_DEFAULT')}
            className='text-xs text-red-600 hover:underline dark:text-red-500'
          >
            Descartar como admin.
          </button>
        ) : (
          <button
            value={id}
            onClick={() => handleOnEditRole('ADMIN')}
            className='text-xs text-blue-600 hover:underline dark:text-blue-500'
          >
            Designar como admin.
          </button>
        )}
      </td>
    </tr>
  )
}
