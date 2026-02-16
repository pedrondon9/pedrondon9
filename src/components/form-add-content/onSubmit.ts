import z from "zod";
import { addContentSchema, registerSchema } from "../forms-vadations";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";

type addContentFormData = z.infer<typeof addContentSchema>;

export const onSubmit = async (data: z.output<typeof addContentSchema>) => {
    try {
        const formData = new FormData();

        // --- 1. PROCESAR TECNOLOGÍAS (De String a Array de Prisma) ---
        // Limpiamos espacios en blanco y filtramos elementos vacíos
        const techArray = data.technologies?data.technologies
            .split(',')
            .map((t: string) => t.trim())
            .filter((t: string) => t !== ""):'';

        // Agregamos al FormData (algunos backends prefieren JSON stringify para arrays)
        formData.append("technologies", JSON.stringify(techArray));

        // --- 2. CAMPOS BÁSICOS ---
        formData.append("title", data.title ?? "");
        formData.append("description", data.description ?? "");
        formData.append("projectLink", data.projectLink ?? "");
        formData.append("githubLink", data.githubLink ?? "");
        formData.append("projectVideo", data.projectVideo ?? "");

        // IMPORTANTE: Enviar cada ID individualmente con el mismo nombre
        data.categoryIds.forEach((id: number) => {
            formData.append("categoryIds", id.toString());
        });

        // --- 3. OPTIMIZACIÓN DE IMÁGENES ---
        if (data.images && data.images.length > 0) {
            const options = {
                maxSizeMB: 0.8,          // Comprimir a menos de 1MB
                maxWidthOrHeight: 1920, // Resolución Full HD max
                useWebWorker: true,
            };

            toast.info("Optimizando imágenes...");

            for (const file of data.images) {
                const compressedFile = await imageCompression(file, options);
                // "files" es el nombre que buscará tu backend (ej. multer.array('files'))
                formData.append("files", compressedFile, compressedFile.name);
            }
        }

        // --- 4. ENVÍO AL API ---
        const response = await fetch("/api/content/add", {
            method: "POST",
            body: formData, // El navegador configura automáticamente el Content-Type a multipart/form-data
        });

        if (!response.ok) throw new Error("Error al guardar el contenido");

        toast.success("¡Contenido publicado con éxito!");
        // Opcional: router.push('/dashboard') o reset()

    } catch (error) {

        if (axios.isAxiosError(error)) {
            // Extraemos la data de la respuesta de forma segura
            const serverResponse = error.response?.data;
            const statusCode = error.response?.status;


            // Buscamos el mensaje de error. Tu servidor envía { error: "mensaje" }
            const errorMessage = typeof serverResponse === 'object' && serverResponse !== null && 'error' in serverResponse
                ? (serverResponse as any).error
                : null;

            if (statusCode === 401) {
                toast.error("Acceso denegado", {
                    // Aquí capturamos exactamente el string "No estas autorizado..." enviado por tu API
                    description: errorMessage || "Tu sesión ha expirado o no tienes permisos.",
                });
            }
            else if (statusCode === 400) {
                toast.error("Datos inválidos", {
                    description: errorMessage || "Revisa los campos del formulario.",
                });
            }
            else if (statusCode === 500) {
                toast.error("Error crítico", {
                    description: "El servidor tuvo un problema interno.",
                });
            }
            else {
                toast.error("Error inesperado", {
                    description: errorMessage || "Ocurrió un error al procesar la solicitud.",
                });
            }
        } else {
            // Errores que no son de Axios (ej: error de ejecución de JS)
            toast.error("Error de sistema", {
                description: "Ocurrió un error inesperado en la aplicación.",
            });
        }


    }
};