FROM oven/bun:1.1-alpine AS builder
WORKDIR /app

COPY package.json bun.lock turbo.json ./
COPY apps/gateway/package.json ./apps/gateway
COPY apps/boards/package.json ./apps/boards
COPY apps/media/package.json ./apps/media
COPY apps/mails/package.json ./apps/mails

COPY packages/api/common/package.json ./packages/api/common
COPY packages/api/cache/package.json ./packages/api/cache
COPY packages/api/logs/package.json ./packages/api/logs
COPY packages/config/typescript/package.json ./packages/config/typescript
COPY packages/contracts/broker/package.json ./packages/contracts/broker
COPY packages/contracts/grpc/package.json ./packages/contracts/grpc
COPY packages/contracts/http/package.json ./packages/contracts/http
COPY packages/lib/common/package.json ./packages/lib/common
COPY packages/lib/auth/package.json ./packages/lib/auth
COPY packages/lib/projects/package.json ./packages/lib/projects
COPY packages/lib/boards/packages.json ./packages/lib/boards
COPY packages/lib/media/package.json ./packages/lib/media

RUN bun install --frozen-lockfile

COPY . .

RUN bun install --production

FROM oven/bun:1.1-alpine AS runner
WORKDIR /app

ARG APP_PORT=3000
ENV APP_PORT=${APP_PORT}

ARG APP_NAME
ENV APP_NAME=${APP_NAME}

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/apps/${APP_NAME} ./apps/${APP_NAME}
COPY --from=builder /app/package.json ./package.json

EXPOSE ${APP_PORT}

WORKDIR /app/apps/${APP_NAME}

CMD ["bun", "run", "src/main.ts"]
