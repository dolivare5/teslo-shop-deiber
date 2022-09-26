<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Teslo Shop - Backend API

## Ejecutar en Desarrollo.

1. Clonar el repositorio.
2. Instalar las dependencias.
```bash
$ yarn install
```
3. Tener instalado NestJS CLI.
```bash
$ npm i -g @nestjs/cli
```
4. Tener instalado Docker y Docker Compose.
5. Ejecutar el comando para levantar el contenedor de la base de datos.
```bash
$ docker-compose up -d
```
6. Clonar el archivo __.env.example__ y renombrarlo a __.env__.
7. LLenar las variables de entorno definidas en el archivo __.env__.
8. Ejecutar el comando para levantar el servidor de desarrollo.
```bash
$ yarn start:dev
```