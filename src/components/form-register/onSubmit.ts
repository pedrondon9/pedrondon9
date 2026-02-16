import z from "zod";
import { registerSchema } from "../forms-vadations";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

type registerFormData = z.infer<typeof registerSchema>;

export const onSubmit = async (data: registerFormData) => {
    try {
        const { password, email, name } = data;

        if (!password || !email || !name) {
            toast.error("Campos incompletos", {
                description: "Por favor, completa todos los campos requeridos.",
            });
            return;
        }

        const response = await axios({
            method: "POST",
            url: "/api/auth/register",
            data
        });

        if (response.status === 200 || response.status === 201) {
            toast.success("Registro exitoso", {
                description: response.data.message || "Tu cuenta ha sido creada exitosamente. Por favor, verifica tu correo para activar tu cuenta.",
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
                toast.error("Error en el registro", {
                    description: serverError?.error || "Datos no válidos. Verifica tu información.",
                });
            }
            else if (statusCode === 409) {
                toast.error("Correo ya registrado", {
                    description: serverError?.error || "Este correo electrónico ya está en uso.",
                });
            }
            else if (statusCode === 500) {
                toast.error("Error del servidor", {
                    description: "No pudimos procesar tu registro. Intenta más tarde.",
                });
            }
            else {
                // Error genérico del servidor
                toast.error("Error de registro", {
                    description: serverError?.error || "Ocurrió un error al registrar tu cuenta.",
                });
            }

            console.error("Error en registro:", {
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