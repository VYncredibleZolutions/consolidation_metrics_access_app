FROM node:lts-alpine
LABEL maintainer="VYZ Team"

RUN  rm -rf /var/cache/yum
COPY ./ /var/www/
WORKDIR /var/www/
RUN npm i -g @nestjs/cli
RUN npm i --force
RUN npm run build

ENTRYPOINT npm run start:prod
