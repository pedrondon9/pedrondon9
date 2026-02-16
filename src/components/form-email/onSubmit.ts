import z from "zod";
import { emailSchema } from "../forms-vadations";
import { signIn } from "next-auth/react"
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { toast } from "sonner";


type emailFormData = z.infer<typeof emailSchema>;

export const onSubmit = async (data: emailFormData) => {
    const { email } = data

    try {

        if (!email) {
            toast.error("Correo electrónico requerido", {
                description: "Por favor, ingresa tu correo electrónico para continuar.",
            });
            return;
        }

        const response = await axios.post("/api/auth/forgot-password", {
            email,
        })

        if (response.status === 200 || response.status === 201) {
            toast.success("Recuperación de contraseña", {
                description: response.data.message || "Por favor, pulsa el enlace que te hemos enviado a tu correo para recuperar tu contraseña.",
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
                toast.error("Error en la recuperación de contraseña", {
                    description: serverError?.error || "Datos no válidos. Verifica tu información.",
                });
            }
            else if (statusCode === 409) {
                toast.error("El correo no está registrado", {
                    description: serverError?.error || "Este correo electrónico no está registrado.",
                });
            }
            else if (statusCode === 500) {
                toast.error("Error del servidor", {
                    description: "No pudimos procesar tu recuperación de contraseña. Intenta más tarde.",
                });
            }
            else {
                // Error genérico del servidor
                toast.error("Error de recuperación de contraseña", {
                    description: serverError?.error || "Ocurrió un error al enviar el correo de recuperación.",
                });
            }


        }
        else {
            // Error no relacionado con Axios (errores de red, CORS, etc.)
            toast.error("Error de conexión", {
                description: "No se pudo conectar con el servidor. Verifica tu internet.",
            });
        }

    }
};