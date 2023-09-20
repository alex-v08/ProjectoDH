'use client'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Dropzone from '../../register-edit/formProduct'

export default function ProductWithId(params) {
  return (
    <>
      <Dropzone params={params} />
    </>
  )
}
