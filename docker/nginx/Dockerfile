ARG fpm_image_name
FROM ${fpm_image_name} as fpm
FROM nginx:1.23-alpine

USER root
ARG APP_ID=1000
ARG ENV

RUN addgroup -g "$APP_ID" app \
    && adduser -G app -u "$APP_ID" -h /var/www -s /bin/bash -S app
RUN touch /var/run/nginx.pid
RUN mkdir /sock

COPY --chown=app:app docker/nginx/conf/default_$ENV.conf /etc/nginx/conf.d/default.conf
COPY --chown=app:app docker/nginx/ssl /etc/nginx/certs

WORKDIR /var/www/html


RUN mkdir -p /etc/nginx/html /var/www/html \
    && chown -R app:app /etc/nginx /var/www /var/cache/nginx /var/run/nginx.pid /sock

EXPOSE 8000
EXPOSE 8443
USER app:app

COPY --from=fpm --chown=app:app /var/www/html/public public/
