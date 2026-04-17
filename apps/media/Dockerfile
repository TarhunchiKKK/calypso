FROM node:20-alpine

RUN npm install -g bun

WORKDIR /app

COPY . .

RUN bun install

RUN bun run build:media

CMD ["sh", "-c", "cd apps/media && if [ -f dist/main.js ]; then bun dist/main.js; elif [ -f dist/src/main.js ]; then bun dist/src/main.js; else echo 'media service build output not found in dist'; ls -la dist || true; exit 1; fi"]
