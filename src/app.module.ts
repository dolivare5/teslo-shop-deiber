import {join} from 'path';
import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {JoiValidationSchema} from "./config/joi.validation";
import {ServeStaticModule} from "@nestjs/serve-static";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [
        /* Configuración de variables de entorno */
        ConfigModule.forRoot({
            /* Validación de variables de entorno */
            envFilePath: join(__dirname, '..', '.env'),
            validationSchema: JoiValidationSchema
        }),
        /* Sirviendo archivos estáticos a través de NestJS */
        ServeStaticModule.forRoot({
            /* Ruta de los archivos estáticos */
            rootPath: join(__dirname, '..', 'public'),
        }),
        
        /* Acceso a la base de datos y configuración de TypeORM */
        TypeOrmModule.forRoot({
            type: 'postgres',
            port: +process.env.POSTGRES_PORT,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [join(__dirname, '**/**.entity{.ts,.js}')],
            synchronize: true,
            autoLoadEntities: true
        })
    
    ]
})
export class AppModule {
}
