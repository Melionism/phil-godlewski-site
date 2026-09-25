# syntax=docker/dockerfile:1
# Node собирает статику -> Caddy раздаёт на :8080. Один контейнер, один язык.

# ---------- build ----------
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund || (echo "WARN: lock out of sync, falling back to npm install" >&2 && npm install --no-audit --no-fund)

COPY . .

# Публичный адрес сайта: canonical, og:url, sitemap. Задаётся при сборке образа.
ARG SITE_URL=https://philgodlewski.com
ENV SITE_URL=$SITE_URL
ENV NODE_ENV=production

RUN npm run build && test -f dist/index.html || (echo "FATAL: dist/index.html missing"; exit 1)

# ---------- serve ----------
FROM caddy:2.11-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
RUN caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
