import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises"; // Módulo para borrar archivos físicos
import path from "path";

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const imageId = parseInt(id);

        // 1. Buscar la imagen en la DB para obtener su ruta (URL)
        const image = await prisma.projectImage.findUnique({
            where: { id: imageId }
        });

        if (!image) {
            return NextResponse.json({ error: "Imagen no encontrada" }, { status: 404 });
        }

        // 2. Borrar el archivo físico del disco
        // Supongamos que tu URL es "/uploads/imagen.jpg"
        // Necesitamos la ruta absoluta: "C:/proyect/public/uploads/imagen.jpg"
        const filePath = path.join(process.cwd(), "public", image.url);

        try {
            await fs.unlink(filePath); // Intenta borrar el archivo
            console.log("Archivo físico eliminado:", filePath);
        } catch (err) {
            // Si el archivo no existe en el disco, seguimos adelante para limpiar la DB
            console.error("El archivo no existía en el disco, pero se borrará de la DB");
        }

        // 3. Eliminar el registro de la base de datos
        await prisma.projectImage.delete({
            where: { id: imageId },
        });

        return NextResponse.json({ message: "Imagen eliminada de la DB y del disco" });

    } catch (error) {
        console.error("Error en el proceso de borrado:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}