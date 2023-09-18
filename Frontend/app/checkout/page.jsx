'use client'

import Link from 'next/link'
import { HiLocationMarker } from 'react-icons/hi'
import { BsStarFill, BsStar } from 'react-icons/bs'
import Image from 'next/image'
import DatePicker from '@/components/detail/DatePicker'
import { useSearchParams } from 'next/navigation'
import dayjs from 'dayjs'
import 'dayjs/locale/es-mx'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/authContext'
import CurrencyFormatter from '@/components/util/CurrencyFormatter'
import Swal from 'sweetalert2'

const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
const itemsUrl = `${hostUrl}/api/`

async function getItem(id) {
  const response = await fetch(itemsUrl + id, {
    cache: 'no-store'
  })
  const data = await response.json()
  return data
}

dayjs.locale('es-mx')

export default function Checkout() {
  const searchParam = useSearchParams()
  const id = searchParam.get('productId')
  const startDate = searchParam.get('startDate')
  const endDate = searchParam.get('endDate')
  const startDateFormated = dayjs(startDate).format('DD-MMMM-YYYY', {
    locale: 'es-mx'
  })
  const endDateFormated = dayjs(endDate).format('DD-MMMM-YYYY', {
    locale: 'es-mx'
  })
  const days = dayjs(endDate).diff(dayjs(startDate), 'day')
  const [productInfo, setProductInfo] = useState(null)
  const { user, loading } = useAuth()
  const [userInfo, setUserInfo] = useState(null)
  const [userForm, setUserForm] = useState({
    id: '',
    address: '',
    dni: '',
    email: '',
    lastName: '',
    name: '',
    phone: '',
    active: ''
  })
  const [reservForm, setReservForm] = useState({
    user_id: '',
    product_id: '',
    dateInit: '',
    dateEnd: ''
  })

  useEffect(() => {
    if (id) {
      getItem(id)
        .then(data => {
          setProductInfo(data)
          console.log(data)
        })
        .catch(error => {
          console.error('Error al obtener los datos:', error)
        })
    }
  }, [id])

  useEffect(() => {
    // Realiza una solicitud HTTP para obtener los datos del usuario y su rol.
    const fetchUserInfo = async () => {
      try {
        const hostUrl = process.env.NEXT_PUBLIC_HOST_URL
        const response = await fetch(
          `${hostUrl}/users/list/{uuid}?uuid=${user.uid}`
        )
        if (response.ok) {
          const userData = await response.json()
          const userFormData = {
            id: userData[0].id || '',
            address: userData[0].address || '', // Actualiza los campos según la estructura de userData
            dni: userData[0].dni || '',
            email: userData[0].email || '',
            lastName: userData[0].lastName || '',
            name: userData[0].name || '',
            phone: userData[0].phone || '',
            active: userData[0].active || '',
            role: userData[0].role || '',
            uuid: userData[0].uuid || ''
          }
          console.log(userFormData)
          setUserForm(userFormData)
          setUserInfo(userData[0])
        } else {
        }
      } catch (error) {
        console.error(error.message)
      }
    }

    if (user) {
      fetchUserInfo()
    }
  }, [user])

  useEffect(() => {
    // Configurar reservForm aquí después de obtener userFormData y productInfo
    if (userInfo && productInfo) {
      const updatedReservForm = {
        user_id: userInfo.id || '',
        product_id: productInfo.id || '',
        dateInit: startDate || '',
        dateEnd: endDate || ''
      }
      setReservForm(updatedReservForm)
    }
  }, [userInfo, productInfo, startDate, endDate])

  const handleSubmit = async e => {
    e.preventDefault()
    // setError('')
    // console.log(reservForm)

    Swal.fire({
      title: '¿Está seguro que desea confirmar la reserva?',
      text: 'Confirmar reserva!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, confirmar!'
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const hostUrl = process.env.NEXT_PUBLIC_HOST_URL

          const response = await fetch(`${hostUrl}/api/bookings`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservForm) // Send data as JSON string
          })

          if (response.ok) {
            console.log('Reserva confirmada')
            // setSend(!send)
            Swal.fire(
              'Confirmada!',
              'La reserva ha sido completada.',
              'success'
            )
            //Enviar Mail
            const emailResponse = await fetch(`${hostUrl}/email/send-html`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                to: userForm.email,
                subject: 'Confirmación de reserva',
                body: 'Muchas gracias por realizar la reserva.',
                htmlContent: `<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <meta charset="utf-8"> <!-- utf-8 works for most cases -->
  <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
  <meta name="x-apple-disable-message-reformatting"> <!-- Disable auto-scale in iOS 10 Mail entirely -->
  <title>OceanWings</title> <!-- The title tag shows in email notifications, like Android 4.4. -->

  <link href="https://fonts.googleapis.com/css?family=Work+Sans:200,300,400,500,600,700" rel="stylesheet">

  <!-- CSS Reset : BEGIN -->
  <style>
    /* What it does: Remove spaces around the email design added by some email clients. */
    /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
    html,
    body {
      margin: 0 auto !important;
      padding: 0 !important;
      height: 100% !important;
      width: 100% !important;
      background: #f1f1f1;
    }

    /* What it does: Stops email clients resizing small text. */
    * {
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }

    /* What it does: Centers email on Android 4.4 */
    div[style*="margin: 16px 0"] {
      margin: 0 !important;
    }

    /* What it does: Stops Outlook from adding extra spacing to tables. */
    table,
    td {
      mso-table-lspace: 0pt !important;
      mso-table-rspace: 0pt !important;
    }

    /* What it does: Fixes webkit padding issue. */
    table {
      border-spacing: 0 !important;
      border-collapse: collapse !important;
      table-layout: fixed !important;
      margin: 0 auto !important;
    }

    /* What it does: Uses a better rendering method when resizing images in IE. */
    img {
      -ms-interpolation-mode: bicubic;
    }

    /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
    a {
      text-decoration: none;
    }

    /* What it does: A work-around for email clients meddling in triggered links. */
    *[x-apple-data-detectors],
    /* iOS */
    .unstyle-auto-detected-links *,
    .aBn {
      border-bottom: 0 !important;
      cursor: default !important;
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }

    /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
    .a6S {
      display: none !important;
      opacity: 0.01 !important;
    }

    /* What it does: Prevents Gmail from changing the text color in conversation threads. */
    .im {
      color: inherit !important;
    }

    /* If the above doesn't work, add a .g-img class to any image in question. */
    img.g-img+div {
      display: none !important;
    }

    /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
    /* Create one of these media queries for each additional viewport size you'd like to fix */

    /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
    @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
      u~div .email-container {
        min-width: 320px !important;
      }
    }

    /* iPhone 6, 6S, 7, 8, and X */
    @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
      u~div .email-container {
        min-width: 375px !important;
      }
    }

    /* iPhone 6+, 7+, and 8+ */
    @media only screen and (min-device-width: 414px) {
      u~div .email-container {
        min-width: 414px !important;
      }
    }
  </style>

  <!-- CSS Reset : END -->

  <!-- Progressive Enhancements : BEGIN -->
  <style>
    .primary {
      background: #17bebb;
    }

    .bg_white {
      background: #ffffff;
    }

    .bg_light {
      background: #f7fafa;
    }

    .bg_black {
      background: #000000;
    }

    .bg_dark {
      background: rgba(0, 0, 0, .8);
    }

    .email-section {
      padding: 2.5em;
    }

    /*BUTTON*/
    .btn {
      padding: 10px 15px;
      display: inline-block;
    }

    .btn.btn-primary {
      border-radius: 5px;
      background: #17bebb;
      color: #ffffff;
    }

    .btn.btn-white {
      border-radius: 5px;
      background: #ffffff;
      color: #000000;
    }

    .btn.btn-white-outline {
      border-radius: 5px;
      background: transparent;
      border: 1px solid #fff;
      color: #fff;
    }

    .btn.btn-black-outline {
      border-radius: 0px;
      background: transparent;
      border: 2px solid #000;
      color: #000;
      font-weight: 700;
    }

    .btn-custom {
      color: rgba(0, 0, 0, .3);
      text-decoration: underline;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: 'Work Sans', sans-serif;
      color: #000000;
      margin-top: 0;
      font-weight: 400;
    }

    body {
      font-family: 'Work Sans', sans-serif;
      font-weight: 400;
      font-size: 15px;
      line-height: 1.8;
      color: rgba(0, 0, 0, .4);
    }

    a {
      color: #17bebb;
      text-decoration: none;
      font-weight: 700;
    }

    table {}

    /*LOGO*/

    .logo h1 {
      margin: 0;
    }

    .logo h1 a {
      color: #17bebb;
      font-size: 24px;
      font-weight: 700;
      font-family: 'Work Sans', sans-serif;
    }

    /*HERO*/
    .hero {
      position: relative;
      z-index: 0;
    }

    .hero .text {
      color: rgba(0, 0, 0, .3);
    }

    .hero .text h2 {
      color: #000;
      font-size: 34px;
      margin-bottom: 15px;
      font-weight: 300;
      line-height: 1.2;
    }

    .hero .text h3 {
      font-size: 24px;
      font-weight: 200;
    }

    .hero .text h2 span {
      font-weight: 600;
      color: #000;
    }

    .text-bold {
      font-weight: 600;
      color: #000;
    }


    /*PRODUCT*/
    .product-entry {
      display: block;
      position: relative;
      float: left;
      padding-top: 20px;
    }

    .product-entry .text {
      width: calc(100% - 125px);
      padding-left: 20px;
    }

    .product-entry .text h3 {
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .product-entry .text p {
      margin-top: 0;
    }

    .product-entry img,
    .product-entry .text {
      float: left;
    }

    ul.social {
      padding: 0;
    }

    ul.social li {
      display: inline-block;
      margin-right: 10px;
    }

    /*FOOTER*/

    .footer {
      border-top: 1px solid rgba(0, 0, 0, .05);
      color: rgba(0, 0, 0, .5);
    }

    .footer .heading {
      color: #000;
      font-size: 20px;
    }

    .footer ul {
      margin: 0;
      padding: 0;
    }

    .footer ul li {
      list-style: none;
      margin-bottom: 10px;
    }

    .footer ul li a {
      color: rgba(0, 0, 0, 1);
    }


    @media screen and (max-width: 500px) {}
  </style>


</head>

<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
  <center style="width: 100%; background-color: #f1f1f1;">
    <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
      &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
    </div>
    <div style="max-width: 600px; margin: 0 auto;" class="email-container">
      <!-- BEGIN BODY -->
      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
        <tr>
          <td valign="top" class="bg_white" style="padding: 1em 2.5em 0 2.5em;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td class="logo" style="text-align: left;">
                  <h1><a href="#">OceanWings</a></h1>
                </td>
              </tr>
            </table>
          </td>
        </tr><!-- end tr -->
        <tr>
          <td valign="middle" class="hero bg_white" style="padding: 2em 0 2em 0;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="padding: 0 2.5em; text-align: left;">
                  <div class="text">
                    <h2>${userForm.name}, confirmamos tu reserva</h2>
                    <h3>Detalle de la reserva</h3>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr><!-- end tr -->
        <tr>
          <table class="bg_white" role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr style="border-bottom: 1px solid rgba(0,0,0,.05);">
              <th width="80%" style="text-align:left; padding: 0 2.5em; color: #000; padding-bottom: 20px">Producto</th>
              <th width="20%" style="text-align:right; padding: 0 2.5em; color: #000; padding-bottom: 20px">Precio</th>
            </tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,.05);">
              <td valign="middle" width="80%" style="text-align:left; padding: 0 2.5em;">
                <div class="product-entry">
                  <img src='${
                    productInfo.imageUrl
                  }1.png' alt="" style="width: 100px; max-width: 600px; height: auto; margin-bottom: 20px; display: block; border-radius: 10px;">
                  <div class="text">
                    <h3><a href='http://oceanwingsdh.ddns.net/detail/${id}'>${
                  productInfo?.name
                }</a></h3>
                    <div>
                      <span class="text-bold">Fecha de ingreso:</span><br>
                      <span>
                        ${startDateFormated}
                      </span>
                    </div>
                    <div>
                      <span class="text-bold">Fecha de salida:</span><br>
                      <span>${endDateFormated}</span>
                    </div>
                    <div>
                      <span class="text-bold">Cantidad de días: </span>
                      <span>${days}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td valign="middle" width="20%" style="text-align:left; padding: 0 2.5em;">
                <span class="price" style="color: #000; font-size: 20px;">$ ${
                  productInfo.pricePerDay * days
                }</span>
              </td>
            </tr>
            <tr>
              <td valign="middle" style="text-align:left; padding: 1em 2.5em;">
                <p><a href="#" class="btn btn-primary">Ver reservas realizadas</a></p>
              </td>
            </tr>
          </table>
        </tr><!-- end tr -->
        <!-- 1 Column Text + Button : END -->
      </table>
      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
        <tr>
          <td valign="middle" class="bg_light footer email-section">
            <table>
              <tr>
                <td valign="top" width="33.333%" style="padding-top: 20px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="text-align: left; padding-right: 10px;">
                        <h3 class="heading">Información</h3>
                        <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                      </td>
                    </tr>
                  </table>
                </td>
                <td valign="top" width="33.333%" style="padding-top: 20px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="text-align: left; padding-left: 5px; padding-right: 5px;">
                        <h3 class="heading">Contacto</h3>
                        <ul>
                          <li><span class="text">203 Fake St. Mountain View, San Francisco, California, USA</span></li>
                          <li><span class="text">+2 392 3929 210</span></a></li>
                        </ul>
                      </td>
                    </tr>
                  </table>
                </td>
                <td valign="top" width="33.333%" style="padding-top: 20px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="text-align: left; padding-left: 10px;">
                        <h3 class="heading">Enlaces</h3>
                        <ul>
                          <li><a href="#">Inicio</a></li>
                          <li><a href="#">Cuenta</a></li>
                          <li><a href="#">Favoritos</a></li>
                          <li><a href="#">Reservas</a></li>
                        </ul>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr><!-- end: tr -->
        <tr>
          <td class="bg_white" style="text-align: center;">
            <p>¿Ya no quieres recibir estos correos electrónicos? Puede <a href="#" style="color: rgba(0,0,0,.8);">Darse de baja aquí</a></p>
          </td>
        </tr>
      </table>

    </div>
  </center>
</body>

</html>`
              })
            })

            if (emailResponse.ok) {
              console.log('Email sent successfully')
            } else {
              console.error('Error sending email')
            }
            //REDIRECCIONAR A LA PAGINA DE RESERVAS
          } else {
            console.error('Error al confirmar la reserva.')
            Swal.fire(
              'Error',
              'Hubo un problema al confirmar la reserva.',
              'error'
            )
          }
        } catch (error) {
          console.error(error.message)
          Swal.fire(
            'Error',
            'Hubo un error inesperado. Por favor, inténtalo de nuevo más tarde.',
            'error'
          )
        }
      }
    })
  }

  const handleChange = ({ target: { value, name } }) =>
    setUserForm({ ...userForm, [name]: value })

  return (
    <div className='bg-[#f2f5fa] p-4 pt-0 sm:p-10 sm:pt-0'>
      <div className='container py-3 sm:pb-5 sm:pt-10'>
        <div className='flex items-center justify-between text-5xl font-bold text-blue-950'>
          Reserva
        </div>
      </div>
      <div className='container rounded-lg bg-[#fcfcfc] pb-10 pt-5'>
        {/* Container */}
        <div className='flex flex-col items-start gap-8 pt-3 lg:flex-row'>
          {/* Detalles */}
          <div className='w-full'>
            {/* Product info */}
            <h1 className='border-b pb-5 text-3xl font-semibold text-blue-950'>
              Orden #230905-111723548
            </h1>

            {/* Descripcion */}
            <div className='mt-8 border-b pb-8'>
              <h2 className='pb-4 text-2xl font-bold text-sky-950'>
                Detalle de la reserva
              </h2>
              <div className='flex flex-wrap items-start gap-5'>
                <div className='relative h-[149.21px] min-w-[200px]'>
                  {productInfo ? (
                    <Image
                      src={productInfo.imageUrl + '1.png'}
                      fill
                      style={{ objectFit: 'cover' }}
                      alt='Imagen del producto'
                      className='h-[149.21px] w-[200px] rounded-lg bg-gray-300'
                    />
                  ) : (
                    <div className='h-[149.21px] w-[200px] animate-pulse rounded-lg bg-gray-300'></div>
                  )}
                </div>
                <div className='grow'>
                  <div>
                    <div className='mb-1 flex items-center text-gray-400'>
                      <HiLocationMarker className='mr-1 h-4 w-4' />
                      <span className='line-clamp-1 text-sm font-semibold uppercase'>
                        SANTA ROSA, LA PAMPA, ARGENTINA
                      </span>
                    </div>
                    <Link
                      href={`/detail/${productInfo?.id}`}
                      target='_blank'
                      className='line-clamp-1 text-xl font-semibold text-sky-950 transition ease-in-out hover:text-sky-500'
                    >
                      {productInfo?.name}
                    </Link>
                    <div className='mt-2 flex flex-wrap gap-1 font-medium'>
                      <span>Fecha de ingreso:</span>
                      <span className='text-slate-500'>
                        {startDateFormated}
                      </span>
                    </div>
                    <div className='mt-1 flex flex-wrap gap-1 font-medium'>
                      <span>Fecha de salida:</span>
                      <span className='text-slate-500'>{endDateFormated}</span>
                    </div>
                    <div className='mt-1 font-medium'>
                      <span>Cantidad de días: </span>
                      <span className='text-slate-500'>{days}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Calcular subtotal y total en base al precio y la cantidad de dias */}
            <div className='w-full border-b py-5 pr-4 text-right text-xl'>
              <div>
                <span className='font-semibold'>Subtotal: </span>
                <span>
                  {productInfo ? (
                    <CurrencyFormatter value={productInfo.pricePerDay} />
                  ) : (
                    '$'
                  )}
                </span>
              </div>
              <div>
                <span className='font-semibold'>Total: </span>
                <span>
                  {productInfo ? (
                    <CurrencyFormatter value={productInfo.pricePerDay * days} />
                  ) : (
                    '$'
                  )}
                </span>
              </div>
            </div>
          </div>
          {/* Info de contacto */}
          <div className='sticky top-[94px] w-full rounded-lg border border-gray-100 bg-white shadow-lg shadow-gray-200 lg:max-w-[760px]'>
            <div className='px-5 pb-10 pt-5 text-gray-500 sm:px-12'>
              <div className='mb-8 flex items-center border-b pb-2'>
                <span className='pr-2 text-xl font-semibold text-sky-950'>
                  Información de contacto
                </span>
              </div>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
                    <div>
                      <label
                        htmlFor='name'
                        className='block pb-2 text-sm font-semibold uppercase text-sky-950'
                      >
                        Nombre
                      </label>
                      <input
                        type='text'
                        name='name'
                        id='name'
                        onChange={handleChange}
                        className='w-full rounded-lg border-2 p-3 text-gray-700 disabled:bg-green-100'
                        placeholder='Nombre'
                        value={userForm.name}
                        disabled
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='lastName'
                        className='block pb-2 text-sm font-semibold uppercase text-sky-950'
                      >
                        Apellido
                      </label>
                      <input
                        type='text'
                        name='lastName'
                        id='lastName'
                        onChange={handleChange}
                        className='w-full rounded-lg border-2 p-3 text-gray-700 disabled:bg-green-100'
                        placeholder='Apellido'
                        value={userForm.lastName}
                        disabled
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='dni'
                        className='block pb-2 text-sm font-semibold uppercase text-sky-950'
                      >
                        Correo electrónico
                      </label>
                      <input
                        type='email'
                        name='email'
                        id='email'
                        onChange={handleChange}
                        className='w-full rounded-lg border-2 p-3 text-gray-700 disabled:bg-green-100'
                        placeholder='ejemplo@email.com'
                        value={userForm.email}
                        disabled
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='dni'
                        className='block pb-2 text-sm font-semibold uppercase text-sky-950'
                      >
                        DNI
                      </label>
                      <input
                        type='number'
                        name='dni'
                        id='dni'
                        onChange={handleChange}
                        className='w-full rounded-lg border-2 p-3 text-gray-400'
                        placeholder='DNI'
                        value={userForm.dni}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='phone'
                        className='block pb-2 text-sm font-semibold uppercase text-sky-950'
                      >
                        Teléfono
                      </label>
                      <input
                        type='phone'
                        name='phone'
                        id='phone'
                        onChange={handleChange}
                        className='w-full rounded-lg border-2 p-3 text-gray-400'
                        placeholder='Teléfono'
                        value={userForm.phone}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='address'
                        className='block pb-2 text-sm font-semibold uppercase text-sky-950'
                      >
                        Dirección
                      </label>
                      <input
                        type='address'
                        name='address'
                        id='address'
                        onChange={handleChange}
                        className='w-full rounded-lg border-2 p-3 text-gray-400'
                        placeholder='Dirección'
                        value={userForm.address}
                      />
                    </div>
                  </div>

                  <div className='flex flex-col items-center justify-center pt-7 sm:flex-row sm:justify-between sm:gap-0'>
                    <button
                      className='mb-5 w-full rounded-md bg-sky-500 py-3.5 text-center font-semibold uppercase text-white transition ease-in-out hover:bg-sky-900'
                      type='submit'
                    >
                      Finalizar mi reserva
                    </button>
                  </div>
                  <p className='px-0 text-center text-sm xl:px-5'>
                    Ponte en contacto con el propietario para planificar tu
                    viaje o consultar cualquier duda.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
