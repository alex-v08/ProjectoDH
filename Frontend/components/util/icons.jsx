'use client'
import { useState } from 'react'
import Select from 'react-select'

export default function Icons(props) {

  const icons_name = [
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
    'Aire Acondicionado',
    'Ancla',
    'Aqualodge',
    'Sistema de Audio',
    'Piloto automatico',
    'Premio',
    'Nota Bancaria',
    'Barco sin Tripulacian',
    'Bañera',
    'Barbacoa',
    'Camas',
    'Mejor Precio',
    'Ancla 2',
    'Reserva 1',
    'Reserva',
    'Desayuno',
    'Crucero en Cabina',
    'Calendario 1',
    'Calendario 2',
    'Calendario 3',
    'Capitan',
    'Cheque de Tarjeta',
    'Catamaranes',
    'Cheque 1',
    'Cheque 2',
    'Reloj',
    'Cafetera',
    'Comentarios 1',
    'Aire Acondicionado',
    'Cocina',
    'Dedicado',
    'Destino',
    'Diamante',
    'Cenar',
    'Descuento',
    'Tripulacian',
    'Sobre de Correo',
    'Correo Abierto',
    'Gimnasio',
    'Nevera',
    'Totalmente con Tripulacian',
    'Galerias',
    'Generador',
    'Huéspedes',
    'Secador de Pelo',
    'Calefaccian',
    'Timon',
    'Hotel',
    'Imagen Mas 1',
    'Altavoces Internos',
    'Moto Acuatica',
    'Niño',
    'Utensilios de Cocina',
    'Lavanderia',
    'Chaleco Salvavidas',
    'Ubicacian de Oficina',
    'Ubicacion 1',
    'Ubicacion 2',
    'Cerrar',
    'Inicio de Sesian',
    'Marca',
    'Reuniones y Eventos',
    'Menu',
    'Menos',
    'Dinero',
    'Motobarco',
    'Lanchas',
    'Ducha Exterior',
    'Avian de Papel',
    'Estacionamiento',
    'Teléfono 3',
    'Teléfono 1',
    'Avian',
    'Reproducir',
    'Profesionales',
    'Calidad',
    'Pregunta',
    'Cita 2',
    'Cita 3',
    'Radar',
    'Caja Fuerte',
    'Velero',
    'Veleros',
    'Barco de Vela',
    'Caja de Seguridad',
    'Buscar',
    'Compartir',
    'Compartir',
    'Compras 1',
    'Spa',
    'Estrella 2',
    'Estrella Audaz',
    'Estrellas 1',
    'Piscina',
    'Etiqueta Izquierda',
    'Teléfono',
    'Boleto',
    'Toallas',
    'Tren',
    'De Confianza',
    'Televisian',
    'Usuario',
    'Usuarios 1',
    'Usuarios 2',
    'Usuarios 3',
    'Wifi Grande',
    'Yates',
    'Abajo',
    'Izquierda',
    'Derecha',
    'Arriba',
    'Izquierda',
    'Derecha',
    'Horizontal',
    'Barra',
    'Calendario Alternativo',
    'Camara Alternativa',
    'Abajo',
    'Izquierda',
    'Derecha',
    'Arriba',
    'Circulo',
    'Reloj',
    'Descarga de Nube Alternativa',
    'Comentario',
    'Comentarios Alternativos',
    'Comentarios',
    'Contacto',
    'Tarjeta de Crédito',
    'Circulo con Punto',
    'Editar',
    'Sobre',
    'Expandir Alternativa',
    'Enlace Externo Alternativo',
    'Ojo',
    'Ventilador',
    'Archivo Alternativo',
    'Archivo de Archivo',
    'Filtro',
    'Carpeta Abierta',
    'Carpeta',
    'Envio Gratuito',
    'Ceño Fruncido',
    'Regalo',
    'Agarre Horizontal',
    'Corazan Lleno',
    'Corazan',
    'Historia',
    'Casa',
    'Circulo de Informacian',
    'Instagram',
    'Nivel Superior Alternativo',
    'Circulo de Ubicacian',
    'Flecha Larga Hacia Abajo Alternativa',
    'Flecha Larga Hacia la Izquierda Alternativa',
    'Flecha Larga Hacia la Derecha Alternativa',
    'Flecha Larga Hacia Arriba Alternativa',
    'Marca de Verificacian de Marcador de Mapa',
    'Indiferente',
    'Circulo con Menos',
    'Mavil Android Alternativo',
    'Billete de Dinero',
    'Lapiz Alternativo',
    'Reproducir 2',
    'Circulo con Mas',
    'Mas',
    'Cita',
    'Aleatorio',
    'Responder a Todos',
    'Responder',
    'Ampliar Busqueda',
    'Marca de Verificacian de Escudo',
    'Cesta de la Compra',
    'Carro de la Compra',
    'Iniciar Sesian Alternativo',
    'Cerrar Sesian Alternativo',
    'Sonrisa',
    'Spinner',
    'Cuadrado',
    'Estrella',
    'Sincronizar',
    'Tacametro Alternativo',
    'Etiquetas',
    'Cuadricula Grande',
    'Lista Grande',
    'Chincheta',
    'Marca de Verificacian de Circulo con Menos',
    'Marca de Verificacian de Menos',
    'Copa Alternativa',
    'Camian',
    'Desbloquear',
    'Usuario con Auriculares',
    'Usuario Escudo',
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
    'BTC',
    'CentOS',
    'Chrome',
    'CodePen',
    'cPanel',
    'Discord',
    'DocHub',
    'Docker',
    'Dribbble',
    'Dropbox',
    'Drupal',
    'eBay',
    'Facebook F',
    'Facebook',
    'Figma',
    'Firefox',
    'Google Plus',
    'Google',
    'Grunt',
    'Gulp',
    'HTML5',
    'Jenkins',
    'Joomla',
    'Marca de Enlace',
    'LinkedIn',
    'Mailchimp',
    'OpenCart',
    'PayPal',
    'Pinterest P',
    'Reddit',
    'Skype',
    'Slack',
    'Snapchat',
    'Spotify',
    'Trello',
    'Twitter',
    'Vimeo',
    'WhatsApp',
    'WordPress',
    'Yoast',
    'YouTube'
  ];
  
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
