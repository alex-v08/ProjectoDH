'use client'
import { useState } from 'react'
import Select from 'react-select'

export default function Icons(props) {

  const icons_name = [
    'floaty-icon-acreage',
    'floaty-icon-air-conditioning',
    'floaty-icon-anchor1',
    'floaty-icon-aqualodge',
    'floaty-icon-audio-system',
    'floaty-icon-autopilot',
    'floaty-icon-award',
    'floaty-icon-bank-note',
    'floaty-icon-bareboat',
    'floaty-icon-bath',
    'floaty-icon-bbq',
    'floaty-icon-beds',
    'floaty-icon-best-price',
    'floaty-icon-boattype',
    'floaty-icon-booking-1',
    'floaty-icon-booking',
    'floaty-icon-breakfast',
    'floaty-icon-cabin-cruise',
    'floaty-icon-calendar-minus',
    'floaty-icon-calendar',
    'floaty-icon-calendar_3',
    'floaty-icon-captain',
    'floaty-icon-card-check-o',
    'floaty-icon-catamarans',
    'floaty-icon-check-1',
    'floaty-icon-check-2',
    'floaty-icon-clock-o',
    'floaty-icon-coffee-machine',
    'floaty-icon-comments1',
    'floaty-icon-conditioning',
    'floaty-icon-cooker',
    'floaty-icon-dedicated',
    'floaty-icon-destination',
    'floaty-icon-diamond',
    'floaty-icon-dine',
    'floaty-icon-discount',
    'floaty-icon-easy-crewed',
    'floaty-icon-envelope-o',
    'floaty-icon-envelope-open',
    'floaty-icon-fitness',
    'floaty-icon-fridge',
    'floaty-icon-fully-crewed',
    'floaty-icon-galleries',
    'floaty-icon-generator',
    'floaty-icon-guestes',
    'floaty-icon-hair-dryer',
    'floaty-icon-heating',
    'floaty-icon-helm',
    'floaty-icon-hotel',
    'floaty-icon-image-plus-1',
    'floaty-icon-inside-speakers',
    'floaty-icon-jetski',
    'floaty-icon-kid',
    'floaty-icon-kitchen-utensils',
    'floaty-icon-laundry',
    'floaty-icon-life-buoy',
    'floaty-icon-location-o',
    'floaty-icon-location1',
    'floaty-icon-location2',
    'floaty-icon-lock',
    'floaty-icon-login-o',
    'floaty-icon-mark',
    'floaty-icon-meeting_events',
    'floaty-icon-menu',
    'floaty-icon-minus',
    'floaty-icon-money',
    'floaty-icon-motoboad',
    'floaty-icon-motorboats',
    'floaty-icon-outsite-shower',
    'floaty-icon-paper_plane',
    'floaty-icon-parking',
    'floaty-icon-phone-3',
    'floaty-icon-phone1',
    'floaty-icon-plane',
    'floaty-icon-play',
    'floaty-icon-professionals',
    'floaty-icon-quality',
    'floaty-icon-question',
    'floaty-icon-quote-2',
    'floaty-icon-quote-3',
    'floaty-icon-radar',
    'floaty-icon-safe',
    'floaty-icon-sailboad',
    'floaty-icon-sailboats',
    'floaty-icon-sailing-boat',
    'floaty-icon-saving-safe',
    'floaty-icon-search',
    'floaty-icon-share-o',
    'floaty-icon-share',
    'floaty-icon-shopping-1',
    'floaty-icon-spa',
    'floaty-icon-star-2',
    'floaty-icon-star-bold',
    'floaty-icon-stars-1',
    'floaty-icon-swiming_pool',
    'floaty-icon-tag-left',
    'floaty-icon-telephone',
    'floaty-icon-ticket',
    'floaty-icon-towels',
    'floaty-icon-train',
    'floaty-icon-trusted',
    'floaty-icon-tv',
    'floaty-icon-user-o',
    'floaty-icon-users-01',
    'floaty-icon-users-o',
    'floaty-icon-users1',
    'floaty-icon-wifi_large',
    'floaty-icon-yachts',
    'floaty-icon-angle-down',
    'floaty-icon-angle-left',
    'floaty-icon-angle-right',
    'floaty-icon-angle-up',
    'floaty-icon-arrow-left',
    'floaty-icon-arrow-right',
    'floaty-icon-arrows-h',
    'floaty-icon-bars',
    'floaty-icon-calendar-alt',
    'floaty-icon-camera-alt',
    'floaty-icon-caret-down',
    'floaty-icon-caret-left',
    'floaty-icon-caret-right',
    'floaty-icon-caret-up',
    'floaty-icon-cart-empty',
    'floaty-icon-check-circle',
    'floaty-icon-check-square',
    'floaty-icon-check',
    'floaty-icon-chevron-circle-left',
    'floaty-icon-chevron-circle-right',
    'floaty-icon-chevron-down',
    'floaty-icon-chevron-left',
    'floaty-icon-chevron-right',
    'floaty-icon-chevron-up',
    'floaty-icon-circle',
    'floaty-icon-clock',
    'floaty-icon-cloud-download-alt',
    'floaty-icon-comment',
    'floaty-icon-comments-alt',
    'floaty-icon-comments',
    'floaty-icon-contact',
    'floaty-icon-credit-card',
    'floaty-icon-dot-circle',
    'floaty-icon-edit',
    'floaty-icon-envelope',
    'floaty-icon-expand-alt',
    'floaty-icon-external-link-alt',
    'floaty-icon-eye',
    'floaty-icon-fan',
    'floaty-icon-file-alt',
    'floaty-icon-file-archive',
    'floaty-icon-filter',
    'floaty-icon-folder-open',
    'floaty-icon-folder',
    'floaty-icon-free_ship',
    'floaty-icon-frown',
    'floaty-icon-gift',
    'floaty-icon-grip-horizontal',
    'floaty-icon-heart-fill',
    'floaty-icon-heart',
    'floaty-icon-history',
    'floaty-icon-home',
    'floaty-icon-info-circle',
    'floaty-icon-instagram',
    'floaty-icon-level-up-alt',
    'floaty-icon-location-circle',
    'floaty-icon-long-arrow-alt-down',
    'floaty-icon-long-arrow-alt-left',
    'floaty-icon-long-arrow-alt-right',
    'floaty-icon-long-arrow-alt-up',
    'floaty-icon-map-marker-check',
    'floaty-icon-meh',
    'floaty-icon-minus-circle',
    'floaty-icon-mobile-android-alt',
    'floaty-icon-money-bill',
    'floaty-icon-pencil-alt',
    'floaty-icon-play-2',
    'floaty-icon-plus-circle',
    'floaty-icon-plus',
    'floaty-icon-quote',
    'floaty-icon-random',
    'floaty-icon-reply-all',
    'floaty-icon-reply',
    'floaty-icon-search-plus',
    'floaty-icon-shield-check',
    'floaty-icon-shopping-basket',
    'floaty-icon-shopping-cart',
    'floaty-icon-sign-in-alt',
    'floaty-icon-sign-out-alt',
    'floaty-icon-smile',
    'floaty-icon-spinner',
    'floaty-icon-square',
    'floaty-icon-star',
    'floaty-icon-sync',
    'floaty-icon-tachometer-alt',
    'floaty-icon-tags',
    'floaty-icon-th-large',
    'floaty-icon-th-list',
    'floaty-icon-thumbtack',
    'floaty-icon-times-circle',
    'floaty-icon-times',
    'floaty-icon-trophy-alt',
    'floaty-icon-truck',
    'floaty-icon-unlock',
    'floaty-icon-user-headset',
    'floaty-icon-user-shield',
    'floaty-icon-user',
    'floaty-icon-users',
    'floaty-icon-video',
    'floaty-icon-adobe',
    'floaty-icon-amazon',
    'floaty-icon-android',
    'floaty-icon-angular',
    'floaty-icon-apper',
    'floaty-icon-apple',
    'floaty-icon-atlassian',
    'floaty-icon-behance',
    'floaty-icon-bitbucket',
    'floaty-icon-bitcoin',
    'floaty-icon-bity',
    'floaty-icon-bluetooth',
    'floaty-icon-btc',
    'floaty-icon-centos',
    'floaty-icon-chrome',
    'floaty-icon-codepen',
    'floaty-icon-cpanel',
    'floaty-icon-discord',
    'floaty-icon-dochub',
    'floaty-icon-docker',
    'floaty-icon-dribbble',
    'floaty-icon-dropbox',
    'floaty-icon-drupal',
    'floaty-icon-ebay',
    'floaty-icon-facebook-f',
    'floaty-icon-facebook',
    'floaty-icon-figma',
    'floaty-icon-firefox',
    'floaty-icon-google-plus',
    'floaty-icon-google',
    'floaty-icon-grunt',
    'floaty-icon-gulp',
    'floaty-icon-html5',
    'floaty-icon-jenkins',
    'floaty-icon-joomla',
    'floaty-icon-link-brand',
    'floaty-icon-linkedin',
    'floaty-icon-mailchimp',
    'floaty-icon-opencart',
    'floaty-icon-paypal',
    'floaty-icon-pinterest-p',
    'floaty-icon-reddit',
    'floaty-icon-skype',
    'floaty-icon-slack',
    'floaty-icon-snapchat',
    'floaty-icon-spotify',
    'floaty-icon-trello',
    'floaty-icon-twitter',
    'floaty-icon-vimeo',
    'floaty-icon-whatsapp',
    'floaty-icon-wordpress',
    'floaty-icon-yoast',
    'floaty-icon-youtube'
  ]

  const icons_name_spanish = [
    'Superficie',
    'Aire acondicionado',
    'Ancla',
    'Aqualodge',
    'Sistema de audio exterior',
    'Piloto automatico',
    'Premio',
    'Billete de banco',
    'Barco sin tripulacion',
    'Baño',
    'Barbacoa',
    'Camas',
    'Mejor precio',
    'Ancla 2',
    'Reserva 1',
    'Reserva',
    'Servicio de desayuno',
    'Crucero en cabina',
    'Calendario menos',
    'Calendario',
    'Calendario 3',
    'Capitan',
    'Comprobar tarjeta',
    'Catamaran',
    'Comprobar 1',
    'Comprobar 2',
    'Reloj',
    'Cafetera',
    'Comentarios 1',
    'Climatizado',
    'Cocina',
    'Servicio de catering',
    'Destino',
    'Diamante',
    'Cena',
    'Descuento',
    'Tripulacion',
    'Sobre cerrado',
    'Sobre abierto',
    'Gimnasio',
    'Heladera',
    'Tripulacion completa',
    'Galerias',
    'Generador',
    'Invitados',
    'Secador de pelo',
    'Calefaccion',
    'Timon',
    'Hotel',
    'Imagen +',
    'Sistema de audio interior',
    'Jet Sky',
    'Juegos para niños',
    'Utensilios de cocina',
    'Lavanderia',
    'Aro salvavidas',
    'Ubicacion 0',
    'Ubicacion 1',
    'Ubicacion 2',
    'Cerradura',
    'Cerrar sesion',
    'Punto de ubicacion',
    'Reuniones y eventos',
    'Menu 1',
    'menu 2',
    'Dinero',
    'Barco 1',
    'Barco 2',
    'Ducha exterior',
    'Avion de papel',
    'Estacionamiento',
    'Telefono 3',
    'Telefono 1',
    'Avion',
    'Play',
    'Profesionales',
    'Calidad',
    'Pregunta',
    'Cotizacion 2',
    'Cotizacion 3',
    'Radar',
    'Caja fuerte',
    'Velero 1',
    'Velero 2',
    'Velero 3',
    'Caja de ahorro',
    'Buscar',
    'Compartir 1',
    'Compartir 2',
    'Compras',
    'Spa',
    'Estrella 1',
    'Estrella 2',
    'Estrellas',
    'Piscina',
    'Etiqueta',
    'Telefono',
    'Boleto',
    'Toallas',
    'Tren',
    'De confianza',
    'Television',
    'Usuario 1',
    'Usuarios 1',
    'Usuarios 2',
    'Usuarios 3',
    'Wifi',
    'Yate',
    'Angulo abajo',
    'Angulo izquierdo',
    'Angulo derecho',
    'Angulo arriba',
    'Flecha izquierda',
    'Flecha derecha',
    'Flechas horizontales',
    'Barras',
    'Calendario alternativo',
    'Camara alternativa',
    'Flecha abajo',
    'Flecha izquierda',
    'Flecha derecha',
    'Flecha arriba',
    'Carrito vacio',
    'Circulo de verificacion',
    'Cuadro de verificacion',
    'Verificar',
    'Chevron circulo izquierdo',
    'Chevron circulo derecho',
    'Chevron abajo',
    'Chevron izquierdo',
    'Chevron derecho',
    'Chevron arriba',
    'Circulo',
    'Reloj',
    'Nube de descarga alternativa',
    'Comentario',
    'Comentarios alternativos',
    'Comentarios',
    'Contacto',
    'Tarjeta de credito',
    'Circulo de punto',
    'Editar',
    'Sobre',
    'Expandir alternativo',
    'Enlace externo alternativo',
    'Ojo',
    'Ventilador',
    'Archivo alternativo',
    'Archivo de archivo',
    'Filtro',
    'Abrir carpeta',
    'Carpeta',
    'Envio gratuito',
    'Ceño fruncido',
    'Regalo',
    'Agarre horizontal',
    'Corazon lleno',
    'Corazon',
    'Historial',
    'Casa',
    'Circulo de informacion',
    'Instagram',
    'Nivel arriba alternativo',
    'Circulo de ubicacion',
    'Flecha larga alternativa',
    'Flecha larga alternativa',
    'Flecha larga alternativa',
    'Flecha larga alternativa',
    'Marca de verificacion del marcador de mapa',
    'Meh',
    'Circulo de menos',
    'Movil android alternativo',
    'Billete de dinero',
    'Lapiz alternativo',
    'Reproducir 2',
    'Circulo mas',
    'Mas',
    'Cita',
    'Aleatorio',
    'Responder a todos',
    'Responder',
    'Buscar mas',
    'Marca de verificacion del escudo',
    'Cesta de compras',
    'Carro de compras',
    'Iniciar sesion alternativo',
    'Cerrar sesion alternativo',
    'Sonreir',
    'Girador',
    'Cuadrado',
    'Estrella 3',
    'Sincronizacion',
    'Cuenta kilometros alternativo',
    'Etiquetas',
    'Th grande',
    'Th lista',
    'Chincheta',
    'Circulo de veces',
    'Veces',
    'Trofeo alternativo',
    'Camion',
    'Desbloquear',
    'Atencion al cliente',
    'Seguro de usuario',
    'Usuario',
    'Usuarios',
    'Video',
    'Adobe',
    'Amazon',
    'Android',
    'Angular',
    'Apper',
    'Apple',
    'Atlassian',
    'Behance',
    'Bitbucket',
    'Bitcoin',
    'Bity',
    'Bluetooth',
    'Btc',
    'Centos',
    'Cromo',
    'Codepen',
    'Cpanel',
    'Discord',
    'Dochub',
    'Docker',
    'Dribbble',
    'Dropbox',
    'Drupal',
    'Ebay',
    'Facebook f',
    'Facebook',
    'Figma',
    'Firefox',
    'Google plus',
    'Google',
    'Grunt',
    'Gulp',
    'Html5',
    'Jenkins',
    'Joomla',
    'Enlace de marca',
    'Linkedin',
    'Mailchimp',
    'Opencart',
    'Paypal',
    'Pinterest p',
    'Reddit',
    'Skype',
    'Slack',
    'Snapchat',
    'Spotify',
    'Trello',
    'Twitter',
    'Vimeo',
    'Whatsapp',
    'Wordpress',
    'Yoast',
    'Youtube'
]

  
  const icons_content = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',

    '',
    '',
    '',
    ''
  ]

  // Unificar los tres arreglos en uno solo
  const icons = icons_name.map((name, index) => ({
    name: name,
    nameSpanish: icons_name_spanish[index],
    content: icons_content[index]
  }))

  const options = icons.map(option => ({
    value: option.name,
    label: option.nameSpanish,
    icon: option.content
  }))


  const customStyles = {
    control: provided => ({
      ...provided,
      padding: 2,
      margin: 0,
      borderRadius: 8,
    })
  }

  return (
    <Select
    styles={customStyles}
    value={props.selectedOption}
    defaultValue={props.default}
    onChange={props.onChange}
    options={options}
    placeholder='Seleccione un icono'
    isClearable={true}
    components={{
      Option: ({ innerProps, data }) => (
        <div className='flex align-items-center ' {...innerProps}>
          <i
            className={`${data.value} text-2xl text-center w-20 px-2`}
          ></i>
          <span className='text-center self-center'>{data.label}</span>
        </div>
      ),
    }}
    />
  )
}
