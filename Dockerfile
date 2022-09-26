# Se crea la imagen que se va a utilizar para el despliegue. Esta imagen se crea a partir de la imagen de node:18-alpine3.15
# Se instalan las dependencias de node y se copian al directorio /app del contenedor
# La imagen se llama deps y contiene las dependencias de node
FROM node:18-alpine3.15 AS deps
# Se procede a limpiar el cache de apk
RUN apk add --no-cache libc6-compat
# Se crea el directorio /app
WORKDIR /app
# Se copian los archivos package.json y yarn.lock al directorio /app
COPY package.json yarn.lock ./
# Se instalan las dependencias de node
RUN yarn install --frozen-lockfile

# Se crea la imagen de builder. Esta imagen se crea para que no se vuelva a instalar las dependencias cada vez que se haga un cambio en el código fuente.
FROM node:18-alpine3.15 AS builder
# Se crea el directorio /usr/src/app
WORKDIR /app
# Se copian los modulos de node de la imagen deps al directorio /app
COPY --from=deps /app/node_modules ./node_modules
# Se procede a copiar el resto de archivos al directorio /app
COPY . .
# Se procede a compilar el código fuente
RUN yarn build


# Se crea la imagen de producción. Esta imagen se encarga de construir la aplicación
FROM node:18-alpine3.15 AS runner
# Se crea el directorio /usr/src/app
WORKDIR /usr/src/app
# Se copian los archivos package.json y yarn.lock al directorio /usr/src/app
COPY package.json yarn.lock ./
# Se instalan las dependencias de node
RUN yarn install --prod
# Se copian los archivos de la carpeta dist al directorio /usr/src/app
COPY --from=builder /app/dist ./dist
# Se copia el directorio y su contenido
RUN mkdir -p ./teslo-shop
# Se copian los archivos de la carpeta dist al directorio /usr/src/app
COPY --from=builder /app/dist ./dist
# Se copian los archivos .env al directorio /usr/src/app
COPY ./.env ./dist/.env
# Se crea el usuario teslo-shop-user
RUN adduser --disabled-password teslo-shop-user
# Se cambia el propietario del directorio teslo-shop
RUN chown -R teslo-shop-user:teslo-shop-user ./teslo-shop
USER teslo-shop-user
# Se expone el puerto 3003
EXPOSE 3003

# Se ejecuta el comando node dist/main
CMD [ "node","dist/main" ]