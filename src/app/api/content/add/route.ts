import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { auth } from "@/auth";

export async function POST(req: Request) {



  try {

// 1. Obtener la sesión usando el nuevo método de Auth.js v5
    const session = await auth(); 
    if (!session || !session.user?.id) {

      return NextResponse.json({ error: "No estas autorizado para realizar esta acción" }, { status: 401 });
    }
    const userId = session.user.id; // Ya tienes el ID porque lo configuraste en
    


    const formData = await req.formData();

    // --- 1. PROCESAR IMÁGENES (LOCAL) ---
    const files = formData.getAll("files") as File[];
    const savedPaths: string[] = [];

    if (files.length > 0) {
      const uploadDir = path.join(process.cwd(), "public/uploads/projects");
      // Crea la carpeta si no existe
      await mkdir(uploadDir, { recursive: true });

      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generar nombre único
        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
        const absolutePath = path.join(uploadDir, fileName);
        
        await writeFile(absolutePath, buffer);
        savedPaths.push(`uploads/projects/${fileName}`);
      }
    }

    // --- 2. PROCESAR CATEGORÍAS (IDs NUMÉRICOS) ---
    const categoryIds = formData.getAll("categoryIds")
      .map(id => parseInt(id as string, 10))
      .filter(id => !isNaN(id));

    // --- 3. PROCESAR TECNOLOGÍAS (ARRAY DE STRINGS) ---
    const technologiesRaw = formData.get("technologies") as string;
    const technologies = ['a','b'];

    // --- 4. CREAR PROYECTO EN PRISMA ---
    const newProject = await prisma.project.create({
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        technologies: technologies,
        projectLink: formData.get("projectLink") as string,
        githubLink: formData.get("githubLink") as string,
        projectVideo: formData.get("projectVideo") as string,
        
        // El ID del usuario que viene de la sesión (como es String en Auth.js y Int en DB, convertimos)
        userId: Number(userId),
        
        // Relación Muchos a Muchos (Categorías)
        categories: {
          connect: categoryIds.map((id) => ({ id })),
        },

        // Relación Uno a Muchos (Nueva tabla de Imágenes)
        images: {
          create: savedPaths.map((path) => ({
            url: `${process.env.AUTH_URL}/${path}`,
          })),
        },
      },
      include: {
        categories: true,
        images: true, // Incluimos las imágenes en la respuesta para confirmar
      },
    });

    return NextResponse.json(newProject, { status: 201 });

  } catch (error: any) {

    console.error("Error en API /content/add:", error);
    
    // Manejo específico de errores de Prisma (IDs no encontrados)
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: "Una o más categorías seleccionadas no existen en la base de datos." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Error al crear el proyecto", details: error.message },
      { status: 500 }
    );
  }
}