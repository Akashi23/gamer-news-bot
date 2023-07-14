## Stage 1 (Build)
FROM node:18 as builder
WORKDIR /app

RUN corepack enable pnpm

COPY pnpm-lock.yaml ./
RUN pnpm fetch

COPY package.json ./
RUN pnpm install --offline

COPY ./ ./
RUN pnpm build

RUN pnpm prune --prod

## Stage 2 (Production)
FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./

CMD node index.js