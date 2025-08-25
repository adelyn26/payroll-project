FROM ambimax/worklog-software-fpm:latest-production as phpfpm
FROM node:21-alpine3.19

WORKDIR /var/www/html

COPY --from=phpfpm /var/www/html ./
COPY src/assets ./assets
#COPY src/package.json ./
#COPY src/yarn.lock ./

RUN yarn install

EXPOSE 3000