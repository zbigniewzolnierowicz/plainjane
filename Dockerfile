FROM node:15

ARG PORT=8000

ENV PORT=${PORT}
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

ARG NODE_ENV='production'

RUN yarn run build:client
RUN yarn run build:server

EXPOSE ${PORT}

CMD ["yarn", "run", "start"]
