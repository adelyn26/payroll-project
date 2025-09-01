# ---------- Stage 1: PHP-FPM ----------
FROM php:8.2-fpm-alpine as phpfpm

# Instala herramientas necesarias para compilar extensiones PHP
RUN apk add --no-cache \
    bash \
    libzip-dev \
    oniguruma-dev \
    mariadb-dev \
    gcc \
    g++ \
    make \
    autoconf \
    libc-dev \
    pkgconfig \
    nodejs npm yarn

# Instala extensiones PHP
RUN docker-php-ext-install pdo pdo_mysql

# Define el directorio de trabajo
WORKDIR /var/www/html

# Copia solo lo necesario primero para cachear capas
COPY composer.json composer.lock ./
# Si usas Composer:
# RUN composer install --no-dev --optimize-autoloader

# Copia el resto del código
COPY src ./src
COPY public ./public
#COPY package.json yarn.lock ./

# Instala dependencias de Node/Vite
RUN yarn install

# Expone el puerto de Vite (ajusta si tu app usa otro)
EXPOSE 3000

# Comando por defecto
CMD ["php-fpm"]
