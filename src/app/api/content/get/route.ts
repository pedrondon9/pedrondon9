import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const recentProjects = await prisma.project.findMany({
            // 1. Ordenar por fecha de creación: del más nuevo al más viejo
            orderBy: {
                createdAt: 'desc',
            },
            // 2. Limitar el número de resultados (ej: últimos 6)
            take: 6,
            // 3. Incluir las relaciones para mostrar imágenes y categorías
            include: {
                images: true,
                categories: true,
            },
        });

        return NextResponse.json(recentProjects);
    } catch (error) {
        return NextResponse.json(
            { error: "Error al obtener los proyectos recientes" },
            { status: 500 }
        );
    }
}