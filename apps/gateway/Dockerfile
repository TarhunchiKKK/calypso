FROM node:20-alpine

ARG APP_PORT

ENV APP_PORT=$APP_PORT

RUN npm install -g bun

WORKDIR /app

COPY . .

RUN bun install

RUN bun run build:gateway

EXPOSE $APP_PORT

CMD ["sh", "-c", "cd apps/gateway && if [ -f dist/main.js ]; then bun dist/main.js; elif [ -f dist/src/main.js ]; then bun dist/src/main.js; else echo 'gateway build output not found in dist'; ls -la dist || true; exit 1; fi"]
