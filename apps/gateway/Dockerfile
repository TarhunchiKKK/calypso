FROM node:18-alpine

ARG APP_PORT

ENV APP_PORT=$APP_PORT

RUN npm install -g bun

WORKDIR /app

COPY package.json ./

COPY bun.lock ./

RUN bun install --no-save --frozen-lockfile

COPY . .

EXPOSE $APP_PORT

CMD ["bun", "run", "build"]

CMD ["bun", "run", "start:prod"]