FROM node:22-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

FROM base AS deps

COPY package.json pnpm-lock.yaml ./
COPY patches ./patches

RUN pnpm install --frozen-lockfile

FROM deps AS builder

COPY . .

RUN pnpm build

FROM base AS prod-deps

COPY package.json pnpm-lock.yaml ./
COPY patches ./patches

RUN pnpm install --frozen-lockfile --prod

FROM node:22-bookworm-slim AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./

EXPOSE 3000

USER node

CMD ["node", "dist/index.js"]
