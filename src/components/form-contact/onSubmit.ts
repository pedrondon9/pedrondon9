import z from "zod";
import { contactSchema, registerSchema } from "../forms-vadations";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

type contactFormData = z.infer<typeof contactSchema>;

export const onSubmit = async (data: contactFormData) => {
    try {
        const { email, description, name } = data;

        if (!email || !description || !name) {
            toast.error("Campos incompletos", {
                description: "Por favor, completa todos los campos requeridos.",
            });
            return;
        }

        const response = await axios({
            method: "POST",
            url: "/api/contact",
            data
        });

        if (response.status === 200 || response.status === 201) {
            toast.success("Contacto enviado", {
                description: response.data.message || "Tu mensaje ha sido enviado exitosamente.",
            });
            return response.data;
        }

    } catch (error) {
        // CAPTURA ESPECÍFICA DE ERRORES DE AXIOS
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;

            // El servidor responde con NextResponse.json({ error: "mensaje" })
            const serverError = axiosError.response?.data as { error?: string } | undefined;
            const statusCode = axiosError.response?.status;

            // Mensaje personalizado según el código de estado
            if (statusCode === 400) {
                toast.error("Error en el contacto", {
                    description: serverError?.error || "Datos no válidos. Verifica tu información.",
                });
            }
            else if (statusCode === 409) {
                toast.error("Correo ya contactado", {
                    description: serverError?.error || "Este correo electrónico ya está en uso.",
                });
            }
            else if (statusCode === 500) {
                toast.error("Error del servidor", {
                    description: "No pudimos procesar tu contacto. Intenta más tarde.",
                });
            }
            else {
                // Error genérico del servidor
                toast.error("Error de contacto", {
                    description: serverError?.error || "Ocurrió un error al enviar tu mensaje.",
                });
            }

            console.error("Error en contacto:", {
                status: statusCode,
                data: serverError,
                message: axiosError.message
            });
        }
        else {
            // Error no relacionado con Axios (errores de red, CORS, etc.)
            toast.error("Error de conexión", {
                description: "No se pudo conectar con el servidor. Verifica tu internet.",
            });
        }
    }
};