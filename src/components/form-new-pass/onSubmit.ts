import z from "zod";
import { newPassSchema } from "../forms-vadations";
import { signIn } from "next-auth/react"
import axios, { AxiosError } from "axios";
import { toast } from "sonner";


type newPassFormData = z.infer<typeof newPassSchema>;

export const onSubmit = async (data: newPassFormData) => {
    const { token, password } = data

    try {

        if (!password || !token) {
            toast.error("Datos incompletos", {
                description: "Por favor, verifica tu información e intenta de nuevo.",
            });
            return;
        }

        const response = await axios.post("/api/auth/new-password", {
            password,
            token // Aquí deberías obtener el token de alguna manera, por ejemplo, desde la URL o el estado
        })

        // 3. Si no hay error, el cambio de contraseña fue exitoso
        if (response.status === 200 || response.status === 201) {
            toast.success("Contraseña actualizada", {
                description: response.data.message || "Tu contraseña ha sido actualizada exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.",
            });

            // Redirigir al login después de un breve retraso para que el usuario vea el mensaje
            setTimeout(() => {
                window.location.href = "/login"; // Redirige al login después de un breve retraso para que el usuario vea el mensaje
            }, 100);

            return;


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

    }
};