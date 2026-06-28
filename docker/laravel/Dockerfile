FROM php:8.4-cli

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    git unzip libpng-dev libonig-dev libxml2-dev libzip-dev \
    libjpeg62-turbo-dev libfreetype6-dev default-mysql-client \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql mbstring bcmath gd zip pcntl \
    && rm -rf /var/lib/apt/lists/*

# composer
COPY --from=composer:2.9 /usr/bin/composer /usr/bin/composer

# copy only composer files first (better cache)
COPY laravel-app/composer.json laravel-app/composer.lock ./

RUN composer install --no-interaction --prefer-dist

# copy full project
COPY laravel-app /var/www/html

# permissions (safe version)
RUN mkdir -p storage bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

# optional scripts
COPY docker/laravel/*.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/*.sh

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]