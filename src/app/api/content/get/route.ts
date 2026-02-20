import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    // 1. Obtener el parámetro 'category' de la URL
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    // 2. Construir el objeto de filtrado de Prisma
    const whereClause = category && category !== "all" 
      ? {
          categories: {
            some: {
              name: category, // Filtra si alguna categoría tiene este nombre
            },
          },
        }
      : {}; // Si no hay categoría, no filtra nada

    const projects = await prisma.project.findMany({
      where: whereClause,
      include: {
        categories: true,
        images: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}