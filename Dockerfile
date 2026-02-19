FROM node:22.12.0-alpine AS base

# --- ETAPA 1: Dependencias ---
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock ./
# Si tienes la carpeta prisma, copia el schema aquí para generar el cliente en esta capa
COPY prisma ./prisma/ 

RUN yarn install --frozen-lockfile
# Generamos Prisma aquí: si el schema no cambia, esta capa se queda en CACHÉ
RUN npx prisma generate

# --- ETAPA 2: Builder ---
FROM base AS builder
WORKDIR /app
# Traemos los node_modules que ya tienen el cliente de Prisma generado
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma
COPY . .

# Deshabilitamos telemetría de Next para ganar unos segundos
ENV NEXT_TELEMETRY_DISABLED 1
RUN yarn build

# --- ETAPA 3: Runner ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir -p public/uploads/projects && chown -R nextjs:nodejs public/uploads

# Copiamos solo lo necesario
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]