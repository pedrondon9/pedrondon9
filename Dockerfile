FROM node:22.12.0-alpine AS base

# 1. Instalar dependencias solo cuando sea necesario
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# 2. Reconstruir el código fuente
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 3. Imagen de producción, copiar los archivos necesarios
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

# Creamos un usuario de sistema para que sea más seguro
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiamos el build standalone (magia de Next.js)
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

# Ejecutamos el servidor de node directamente
CMD ["node", "server.js"]