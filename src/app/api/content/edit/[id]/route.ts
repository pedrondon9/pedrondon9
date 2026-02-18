import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { auth } from "@/auth";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> } // Next.js 15
) {
    try {
        // 1. Verificar Sesión
        const session = await auth();
        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const { id } = await params;
        const projectId = parseInt(id);
        const formData = await req.formData();

        // 2. Procesar IMÁGENES NUEVAS (Local)
        // Nota: En el frontend las mandas como "images" o "files", asegúrate que coincida
        const files = formData.getAll("files") as File[];
        const savedPaths: string[] = [];

        if (files.length > 0 && files[0].size > 0) { // Validar que no sean archivos vacíos
            const uploadDir = path.join(process.cwd(), "public/uploads/projects");
            await mkdir(uploadDir, { recursive: true });

            for (const file of files) {
                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);
                const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
                const absolutePath = path.join(uploadDir, fileName);
                await writeFile(absolutePath, buffer);
                savedPaths.push(`uploads/projects/${fileName}`);
            }
        }

        // 3. Procesar Categorías
        const categoryIds = formData.getAll("categoryIds")
            .map(id => parseInt(id as string, 10))
            .filter(id => !isNaN(id));

        // 4. ACTUALIZAR EN PRISMA
        const updatedProject = await prisma.project.update({
            where: { id: projectId },
            data: {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                technologies: ["a", "b"], // Aquí debes decidir cómo manejar las tecnologías (reemplazar o mantener las anteriores)
                projectLink: formData.get("projectLink") as string,
                githubLink: formData.get("githubLink") as string,
                projectVideo: formData.get("projectVideo") as string,

                // Actualizar Categorías: 
                // set: [] limpia las anteriores y conecta las nuevas para evitar duplicados
                categories: {
                    set: [],
                    connect: categoryIds.map((id) => ({ id })),
                },

                // Agregar imágenes nuevas (sin borrar las anteriores)
                images: {
                    create: savedPaths.map((path) => ({
                        url: `${process.env.AUTH_URL}/${path}`,
                    })),
                },
            },
            include: {
                categories: true,
                images: true,
            },
        });

        return NextResponse.json(updatedProject, { status: 200 });

    } catch (error: any) {
        return NextResponse.json(
            { error: "Error al actualizar el proyecto", details: error.message },
            { status: 500 }
        );
    }
}
