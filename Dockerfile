# Builder
FROM node:18 AS builder
WORKDIR /app

# Setup pnpm first
RUN npm install -g pnpm

# Files required by pnpm install
COPY .npmrc package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Bundle app source
COPY . .
RUN pnpm build

# Runner
FROM gcr.io/distroless/nodejs18-debian11
WORKDIR /app

COPY --from=builder /app/.output/ .

EXPOSE 3000 
CMD ["server/index.mjs"]