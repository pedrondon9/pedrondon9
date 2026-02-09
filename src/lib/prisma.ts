import { PrismaClient } from "@prisma/client"

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Si ya existe una instancia de prisma en el objeto global, la usamos. 
// Si no, creamos una nueva.
export const prisma = globalForPrisma.prisma || new PrismaClient()
// Si estamos en desarrollo, guardamos la instancia de prisma en el objeto global para evitar crear múltiples instancias durante el hot reload.
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma 