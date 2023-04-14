# foli-web

## Preguntar
- En el modelo PostPlant he creado un campo llamado 'date' para luego modificar la fecha. Lo que me interesa es que se encuentre dentro de imagenes. Cuando lo pongo de esa manera, luego no puedo acceder a las imágenes

## TODO
- En la vista de plantas, incorporar un buscador.
- ~~Ordenar las plantas por orden alfabético.~~
- ~~¿Hacer paginación? Si no lo hago, incorporpar un botón para que me lleve al inicio de la página. => No lo voy a hacer~~
- Crear filtros en función de ciertas características
- Crear un enlace a la lente de google para que puedas ver qué planta es.
- Hacer Logout
- ~~Manipulación del DOM para que cuando quite un bookmark desde mi perfil, desaparezca sin recargar la página~~
- Que se me quede guardado la elección de los filtros cuando vuelvo del detalle de una planta
- ~~Lógicas para hacer el guardado de las fichas de plantas~~
- Meter comentarios
- Meter en el modelo post, la key de fecha y que por defecto sea la de hoy. Luego en el formulario de edición de planta poder incorporar la fecha.
- Edición de Post (sólo el mío) y poder ver los post de los demás sin que yo pueda editar
- Hacer likes
- Quiero que la primera letra del commonName de cada planta esté en mayúscula
- En el navBar, tengo que hacer en vez del login, poner un logOut porque el login se hace directamente cuando se inicia la sesión
- Meter que en cada ficha de planta, aparezcan imágenes de post de otros ususarios con esas plantas
- Que las plantas del listado me vengan directamente ordenadas por orden alfabético.
Hacer un sort antes en el código para que el array ya esté ordenado. Mirar como en posts

- **En el back, hay que hacer que la primera letra de cada planta sea en mayúscula. ¿Cambiar el json?**

## NO ME SALE
- ~~Acceder al detalle del Post~~
- ~~En crear un post, cuando le doy al botón no hace nada~~
- ~~El el 'PlantCard' no quiero que aparezca User: cuando estoy dentro de mi perfil~~
- ~~No se cómo enfrentarme a un editar perfil usuario~~

## Problemas
- En el directorio de plantas, en muchas de ellas, la imagen es la misma e incluso, muchas tienen el mismo nombre (por ejemplo daylily)

## Dudas
- ~~En el modelo de Post, el campo 'image' es un objeto. Cómo ponerlo en el formulario~~
- En este mismo modelo, en campo state es para sacar un desplegable. Cómo lo pongo.
- En el formulario, a la hora de elegir el nombre debería dejar escribir como cuando hacer el search en plantas.
Si no está la planta, que deje seleccionar un 'sin categoría'
- En la zona de comentarios la gente puede ponerlos aunque no sea suyo



## Cosas de CSS de incorporar aunque no funcionen:
- Followers y Following
- Icono de notificación de que han escrito en alguno de tus post.
- Estados en los que se encuentran algunas plantas