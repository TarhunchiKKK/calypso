FROM node:18-alpine

RUN npm install -g bun

WORKDIR /app

COPY package.json ./

COPY bun.lock ./

RUN bun install --no-save --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["bun", "run", "build"]

CMD ["bun", "run", "start"]