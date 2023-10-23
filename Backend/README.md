## Set up

#### Paso 1:

Se debe de crear el usuario gifter en la base de datos con la contraseña gifter.

#### Paso 2:

Se debe de crear la base de datos gifter.

#### Paso 3:

Ejecutar los comandos de el archivo db.sql para asi crear todo el contenido de la base de datos y en caso de ya contar con archivos eliminar los antiguos.

#### Paso 4:

Crear el archivo .env en la raiz del proyecto con las variables de entorno las cuales son:

    FASTIFY_HOST
    FASTIFY_PORT
    POSTGRES_HOST
    POSTGRES_PORT
    POSTGRES_USER
    POSTGRES_PASSWORD
    POSTGRES_DB

#### Paso 5:

Ejecutar el comando:
`npm install`

## Ejecutar aplicación

Ejecutar el comando:
`npm run dev`

## Ejecutar tests

Ejecutar el comando:
`npm run test`