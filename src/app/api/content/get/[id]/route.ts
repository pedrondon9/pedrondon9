
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Definimos que params es una Promesa
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    try {
        // 1. "Esperamos" (await) a que los params se resuelvan
        const resolvedParams = await params;
        const id = resolvedParams.id;
            
        console.log("ID recibido y resuelto en el backend:", id);


        if (!id) {
            console.log("ID no proporcionado en los parámetros");
            return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });
        }

        // 2. Buscamos en la base de datos
        const project = await prisma.project.findUnique({
            where: { id: parseInt(id) },
            include: {
                images: true,
                categories: true,
            },
        });

        console.log("Proyecto encontrado:", project);




        if (!project) {
            return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 });
        }

        return NextResponse.json(project);

    } catch (error) {
        console.error("Error al obtener el proyecto:", error);
        return NextResponse.json({ error: "Error de servidor" }, { status: 500 });
    }
}