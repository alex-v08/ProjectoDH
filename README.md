# Equipo 5

# Refinamiento del Código - Sprint 1

## Meta
El objetivo de este sprint es desarrollar la estructura básica del sitio e implementar funcionalidades de registro, visualización y eliminación de productos.

## Historia de Usuario 1: Colocar encabezado
Como administrador, quiero un encabezado que muestre el logo de la aplicación para poder identificar fácilmente la marca y diferenciarla de otras aplicaciones.

### Alta
#### Criterios de aceptación
- El header debe ocupar el 100% de la pantalla en todas las páginas de la aplicación.
- El header debe estar fijo en la parte superior de la página, incluso al hacer scroll, para que siempre sea visible y accesible para el usuario.
- El header debe ser consistente en todas las páginas de la aplicación y debe ser fácil de usar y entender para el usuario.
- El header debe ser optimizado para diferentes dispositivos y resoluciones de pantalla.
- Dentro del header debe existir un bloque alineado a la izquierda que contenga el logotipo y el lema de la empresa.
- Al hacer clic en el logotipo o el lema, el usuario debe ser redirigido a la página principal de la aplicación.

## Historia de Usuario 2: Definir el cuerpo del sitio
Como administrador, quiero que el color de fondo del sitio web esté en armonía con la identidad de marca de la empresa para mejorar la estética y la coherencia visual de la aplicación.

### Alta
#### Criterios de aceptación
- El body debe tener un color de background que corresponda a la identidad de marca.
- El body debe ocupar el 100 % del alto de la pantalla.
- El body debe ser optimizado para diferentes dispositivos y resoluciones de pantalla.
- Se deben visualizar las tres secciones o bloques: buscador, categorías y recomendaciones de los productos.

## Historia de Usuario 3: Colocar pie de página
Como usuario, quiero un pie de página en la aplicación para poder mostrar el copyright.

### Alta
#### Criterios de aceptación
- Se debe crear un footer que ocupe el 100% del ancho de la pantalla y que esté ubicado en el pie de página en todas las páginas de la aplicación.
- Dentro del footer, debe existir un bloque alineado a la izquierda que contenga el isologotipo de la empresa, el año y el copyright correspondiente.
- El isologotipo, el año y el copyright deben ser legibles y estar diseñados de acuerdo con la identidad visual de la empresa.

## Historia de Usuario 4: Registrar producto
Como administrador, quiero poder agregar nuevos productos para mantener actualizado el catálogo de productos disponibles.

### Alta
#### Criterios de aceptación
- Existe un panel para el administrador con la opción "Agregar producto".
- La página de "Agregar producto" debe incluir campos para ingresar información relevante del producto, como nombre, descripción e imagen.
- El administrador debe poder subir una imagen del producto.
- El administrador debe poder guardar el producto y este debe ser agregado correctamente a la base de datos del sitio.
- Si se intenta agregar un producto con un nombre que ya existe, se debe mostrar un mensaje de error indicando que el nombre ya está en uso.

## Historia de Usuario 5: Visualizar productos en el home
Como usuario, quiero ver una lista de productos aleatorios en el home cuando ingreso por primera vez.

### Alta
#### Criterios de aceptación
- En el home se debe ver una lista aleatoria de productos.
- Garantizar que la lista de productos aleatorios sea verdaderamente aleatoria, sin repetir productos y sin seguir un patrón previsible.

## Historia de Usuario 6: Visualizar detalle de producto
Como usuario, quiero poder visualizar en el detalle de producto para conocer datos básicos del producto.

### Alta
#### Criterios de aceptación
- Visualizar un bloque de header el cual deberá cubrir el 100 % del ancho de la pantalla.
- El título del producto debe estar alineado a la izquierda.
- La flecha para volver atrás debe estar alineada a la derecha.
- En el body debe estar el texto descriptivo del producto y su imagen.

## Historia de Usuario 7: Paginar productos
Como usuario, quiero que la lista de productos muestre solo una cantidad limitada de productos y tenga la opción de ver los siguientes.

### Media
#### Criterios de aceptación
- Se puede visualizar solo una cantidad limitada de productos en la página de resultados de búsqueda o en la categoría seleccionada, al menos 10 productos.
- Mostrar un botón o enlace para que el usuario pueda cargar más productos y ver la siguiente página de resultados.
- Mostrar un botón o enlace para que el usuario pueda ir hacia atrás o al inicio del listado de productos.

## Historia de Usuario 8: Eliminar producto
Como administrador, quiero poder eliminar un producto para mantener una lista actualizada y precisa de los productos disponibles.

### Baja
#### Criterios de aceptación
- Existe un panel para el administrador con la opción de eliminar.
- La información debe actualizarse en la base de datos.
- El producto eliminado no debe mostrarse en el listado de productos.

## Pedidos técnicos

### Planificación y ejecución de los tests

#### Testing/QA - TL Testing
- Planear casos de test basados en las historias de usuarios que existen en el Sprint y luego ejecutarlos.
- Realizar también una prueba exploratoria sobre lo que se desarrolló durante el Sprint.

### Testear la API

#### Testing/QA - TL Testing
- Validar el funcionamiento de la API Rest creada por el Back End durante el Sprint.
- Utilicen Postman para las pruebas y creen los scripts de prueba necesarios.

### Diseño de la red

#### Infraestructura - TL Infra
- Presentar un diseño de la infraestructura necesaria para hacer funcionar el proyecto en AWS.
- Mostrar un boceto de la red y sus componentes, como servidores, almacenamiento, red interna y base de datos.

¡Muchas gracias!
