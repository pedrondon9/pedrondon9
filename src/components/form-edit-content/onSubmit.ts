import z from "zod";
import { editContentSchema } from "../forms-vadations";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";


// Añadimos el parámetro projectId para la edición
export const onSubmit = async (data: z.output<typeof editContentSchema>, projectId: string | number) => {
    try {
        const formData = new FormData();

        // --- 1. PROCESAR TECNOLOGÍAS ---
        const techArray = data.technologies
            .split(',')
            .map((t: string) => t.trim())
            .filter((t: string) => t !== "");

        formData.append("technologies", JSON.stringify(techArray));

        // --- 2. CAMPOS BÁSICOS ---
        formData.append("title", data.title ?? "");
        formData.append("description", data.description ?? "");
        formData.append("projectLink", data.projectLink ?? "");
        formData.append("githubLink", data.githubLink ?? "");
        formData.append("projectVideo", data.projectVideo ?? "");

        // Categorías
        data.categoryIds.forEach((id: number) => {
            formData.append("categoryIds", id.toString());
        });

        // --- 3. OPTIMIZACIÓN DE IMÁGENES NUEVAS ---
        if (data.images && data.images.length > 0) {
            const options = {
                maxSizeMB: 0.8,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            };

            toast.info("Optimizando nuevas imágenes...");

            for (const file of data.images) {
                // browser-image-compression devuelve un File o Blob
                const compressedFile = await imageCompression(file, options);
                // Usamos "files" para que coincida con lo que espera tu nueva ruta PATCH
                formData.append("files", compressedFile, compressedFile.name);
            }
        }

        // --- 4. ENVÍO AL API (PATCH) ---
        // Usamos la ruta dinámica con el ID del proyecto
        const response = await fetch(`/api/content/edit/${projectId}`, {
            method: "PATCH", 
            body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
            // Si el error viene de la API, lanzamos un error para que lo capture el catch
            throw new AxiosError(
                result.error || "Error al actualizar", 
                undefined, 
                undefined, 
                undefined, 
                { data: result, status: response.status } as any
            );
        }

        toast.success("¡Proyecto actualizado con éxito!");
        return result;

    } catch (error: any) {
        // Manejo de errores con lógica de Axios (o simulada para fetch)
        const statusCode = error.response?.status || error.status;
        const errorMessage = error.response?.data?.error || error.message;

        console.error("Error Detail:", errorMessage);

        if (statusCode === 401) {
            toast.error("No autorizado", { description: "Inicia sesión nuevamente." });
        } else if (statusCode === 404) {
            toast.error("No encontrado", { description: "El proyecto no existe." });
        } else {
            toast.error("Error al actualizar", {
                description: errorMessage || "Ocurrió un error inesperado.",
            });
        }
        throw error; // Re-lanzamos para que el formulario sepa que falló
    }
};