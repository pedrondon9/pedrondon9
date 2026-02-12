import z from "zod";
import { signInSchema } from "../forms-vadations";
import { signIn } from "next-auth/react"
import { toast } from "sonner";


type signInFormData = z.infer<typeof signInSchema>;

export const onSubmit = async (data: signInFormData) => {

    const { email, password } = data


    try {

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
            //callbackUrl: "/",
        })

                // Primero verificar si hay error
        if (result?.error) {
            
            // Mensajes más específicos según el tipo de error
            if (result.error.includes("CredentialsSignin")) {
                toast.error("Credenciales incorrectas", {
                    description: "El email o contraseña no son válidos.",
                });
            } else {
                toast.error("Error de autenticación", {
                    description: "Verifica tu usuario y contraseña e intenta de nuevo.",
                });
            }

            return ;
        }

        // Si no hay error y ok es true
        if (result?.ok) {

            toast.success("¡Bienvenido!", {
                description: "Has iniciado sesión correctamente.",
            });
            
            // Pequeño delay para que se vea el toast antes de redirigir

            setTimeout(() => {
                window.location.href = "/";
            }, 100);
            
            return ;
        }



    } catch (error) {

        toast.error("Error de conexión", {
            description: "Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde.",
        });

    }
};