FROM node:22.12.0-alpine AS base

# 1. Instalar dependencias
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiamos los archivos de Yarn
COPY package.json yarn.lock ./
# Instalamos usando Yarn (equivalente a npm ci es frozen-lockfile)
RUN yarn install --frozen-lockfile

# 2. Reconstruir el código fuente
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ¡IMPORTANTE! Generar el cliente de Prisma para que funcione en Linux (Alpine)
# Esto evita el error de "PrismaClient initialization"
RUN npx prisma generate

RUN yarn build

# 3. Imagen de producción
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# Crear la carpeta de uploads y dar permisos ANTES de cambiar al usuario node
RUN mkdir -p public/uploads/projects && chown -R node:node public/uploads

COPY --from=builder /app/public ./public
# Standalone copia solo lo necesario para ejecutar (incluye node_modules optimizados)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]