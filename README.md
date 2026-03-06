# Kumnandi Kum

Marketing site and assessment app for Kumnandi Kum, built with React, Vite, Express, tRPC, Drizzle, Neon Postgres, and Neon Auth.

## Local Development

Requirements:

- Node 22+
- `pnpm`
- A populated `.env`

Install and run:

```bash
pnpm install
pnpm dev
```

Useful routes:

- `/`
- `/aidt`
- `/auth/sign-in`
- `/auth/sign-up`
- `/account`
- `/healthz`
- `/readyz`
- `/status/dependencies`

## Environment

Key variables:

- `DATABASE_URL`
- `JWT_SECRET`
- `VITE_NEON_AUTH_URL`
- `VITE_ANALYTICS_ENDPOINT` (optional)
- `VITE_ANALYTICS_WEBSITE_ID` (optional)
- `VITE_APP_ID` / `VITE_OAUTH_PORTAL_URL` / `OAUTH_SERVER_URL` for the legacy OAuth flow
- `OWNER_OPEN_ID` (optional bootstrap owner)
- `FORGE_ENABLED`
- `FORGE_API_URL` / `FORGE_API_KEY` when `FORGE_ENABLED=true`
- `VITE_MAPS_API_KEY` / `VITE_MAPS_PROXY_URL` for browser-side maps

## Database

The app is configured for Neon Postgres through Drizzle.

Commands:

```bash
pnpm db:push
pnpm db:generate
pnpm db:migrate
```

`pnpm db:push` is the fastest way to sync the current schema to a Neon database for deployment.

## Production Deploy

The repo includes a Render blueprint in [render.yaml](/Users/director/kumnandi-kum/render.yaml) and a production Docker image in [Dockerfile](/Users/director/kumnandi-kum/Dockerfile).

Current deploy flow:

1. In Render, create a new Blueprint service from this repository so [render.yaml](/Users/director/kumnandi-kum/render.yaml) is imported.
2. Set the required env vars in Render, especially `DATABASE_URL`, `VITE_NEON_AUTH_URL`, and `FORGE_ENABLED`.
3. Run `pnpm db:push` against the target Neon database.
4. Push to `main`.
5. Render auto-deploys from `main`.
6. Verify `GET /healthz` returns `200` and `GET /readyz` returns `200` before sending traffic.

## Verification

Core checks:

```bash
pnpm check
pnpm test
pnpm build
```
