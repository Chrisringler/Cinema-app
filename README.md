# Cinema-app Aplicación de Películas
Esta es una aplicación web que permite importar y administrar un listado de películas.

## Requisitos previos
Asegúrate de tener instalado lo siguiente en tu máquina antes de ejecutar la aplicación:

### Node.js: Descarga e instala Node.js.

### MySQL: Descarga e instala MySQL.

## Configuración
Sigue estos pasos para configurar y ejecutar la aplicación:

### Backend

Instala las dependencias:

npm install
Configura la base de datos:

Crea una base de datos MySQL con el nombre que desees.
Completa la información de conexión a la base de datos en el archivo .env.
Crea las tablas en MySQL:

Dentro de la carpeta DB, encontrarás un archivo llamado database.sql. Copia y pega el contenido de este archivo en tu consola de MySQL para crear las tablas necesarias.
Inicia el servidor:

npm run dev
El servidor estará disponible en http://localhost:3001.

### Frontend

Instala las dependencias:

npm install
Inicia la aplicación frontend:

npm start
La aplicación estará disponible en http://localhost:3000.

## Uso
Una vez que la aplicación esté en funcionamiento, puedes utilizar las siguientes funcionalidades:

En el frontend:


Lo primero que verás serán unas vistas para registrarte y luego iniciar sesión. Si no lo haces, no podrás navegar por la página.

---


En la página principal, verás un listado de películas. Puedes buscar películas por título utilizando el campo de búsqueda y navegar entre las diferentes páginas de resultados.

---


En la sección "Subir lista de películas", puedes importar un archivo CSV con el listado de películas haciendo clic en el botón "Seleccionar archivo".

---


En la página de detalles, puedes editar y eliminar la película seleccionada.

---


En la sección "Agregar Película", puedes crear una nueva película.



