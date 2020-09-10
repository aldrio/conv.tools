# Image for webapp development server
FROM node:12

WORKDIR /usr/src/app

COPY . .
RUN yarn install

COPY *.js *.json yarn.lock ./

VOLUME /usr/src/app/src
EXPOSE 8000

ENTRYPOINT [ "yarn" ]
CMD [ "dev", "-H", "0.0.0.0" ]
