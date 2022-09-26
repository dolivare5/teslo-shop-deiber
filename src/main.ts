/* NestFactory es una clase que permite crear una instancia de la aplicación NestJS. */
import {NestFactory} from '@nestjs/core';
/* AppModule es la clase que contiene la configuración de la aplicación NestJS. */
import {AppModule} from './app.module';
/* Validation Pipe es una librería que permite validar los datos de entrada de las rutas. */
import {ValidationPipe} from "@nestjs/common";

async function main() {
    /* Creando una instancia de la aplicación NestJS */
    const app = await NestFactory.create(AppModule);
    /* Configuración del prefijo global para todas las rutas. */
    app.setGlobalPrefix('api');
    /* Configuración de la validación de datos de entrada. */
    app.useGlobalPipes(
        /* ValidationPipe es un pipe que se encarga de validar los datos de entrada de las rutas. */
        new ValidationPipe({
            /* whitelist es una propiedad que indica si se deben ignorar los datos de entrada que no estén definidos en la clase DTO. */
            whitelist: true,
            /* forbidNonWhitelisted es una propiedad que indica si se debe lanzar una excepción cuando se reciban datos de entrada que no estén definidos en la clase DTO. */
            forbidNonWhitelisted: true,
            /* transform es una propiedad que indica si se deben transformar los datos de entrada a los tipos definidos en la clase DTO. */
            transform: true,
            /* transformOptions es una propiedad que permite configurar la transformación de datos de entrada. */
            transformOptions: {
                /* enableImplicitConversion es una propiedad que indica si se deben transformar los datos de entrada a los tipos definidos en la clase DTO. */
                enableImplicitConversion: true
            }
        })
    );
    /* Configuración del puerto en el que se ejecutará la aplicación. */
    await app.listen(process.env.PORT_SERVER );
}

main().then(() =>  console.log(`Server running on port ${process.env.PORT_SERVER} successfully`));
