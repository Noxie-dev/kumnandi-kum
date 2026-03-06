# syntax=docker/dockerfile:1.7
FROM node:22-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

FROM base AS deps

COPY package.json pnpm-lock.yaml ./
COPY patches ./patches

RUN pnpm install --frozen-lockfile --store-dir=/app/.pnpm-store --package-import-method=hardlink \
    && rm -rf /app/.pnpm-store

FROM deps AS builder

ARG VITE_APP_ID
ARG VITE_NEON_AUTH_URL
ARG VITE_OAUTH_PORTAL_URL
ARG VITE_ANALYTICS_ENDPOINT
ARG VITE_ANALYTICS_WEBSITE_ID
ARG VITE_MAPS_API_KEY
ARG VITE_MAPS_PROXY_URL

ENV VITE_APP_ID=$VITE_APP_ID
ENV VITE_NEON_AUTH_URL=$VITE_NEON_AUTH_URL
ENV VITE_OAUTH_PORTAL_URL=$VITE_OAUTH_PORTAL_URL
ENV VITE_ANALYTICS_ENDPOINT=$VITE_ANALYTICS_ENDPOINT
ENV VITE_ANALYTICS_WEBSITE_ID=$VITE_ANALYTICS_WEBSITE_ID
ENV VITE_MAPS_API_KEY=$VITE_MAPS_API_KEY
ENV VITE_MAPS_PROXY_URL=$VITE_MAPS_PROXY_URL

COPY . .

RUN CI=true pnpm build && CI=true pnpm prune --prod

FROM node:22-bookworm-slim AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./

EXPOSE 3000

USER node

CMD ["node", "dist/index.js"]
