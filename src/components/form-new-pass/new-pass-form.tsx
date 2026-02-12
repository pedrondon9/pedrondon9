import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FormField } from "../form-field"
import Link from "next/link";
import { toast } from "sonner";
import { newPassSchema, signInSchema } from "../forms-vadations";
import { onSubmit } from "./onSubmit";
import { useSearchParams } from "next/navigation";



// infer the form data type from the schema
type newPassFormData = z.infer<typeof newPassSchema>;

export function NewPassForm({
    className,
    ...props
}: React.ComponentProps<"div"> & {}) {

    const searchParams = useSearchParams()

    // 1. Extraemos el token que viene en la URL (...?token=xyz)

    const token = searchParams.get("token")

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<newPassFormData>({
        resolver: zodResolver(newPassSchema),
        defaultValues: {
            password_confirm: "",
            password: "",
            token:  token || "", // Asignamos el token extraído de la URL o una cadena vacía si no está presente
        },
    });



    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Cambio de contraseña</CardTitle>
                    <CardDescription>
                        Puedes cambiar tu contraseña aquí, solo ingresa tu nueva contraseña y confírmala para continuar.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup>

                            {/* Campo Password */}

                            <FormField
                                id="password"
                                label="Tu contraseña"
                                type="password"
                                register={register}
                                error={errors.password}

                            />
                            {/* Campo para confirmar Password */}

                            <FormField
                                id="password_confirm"
                                label="Confirma tu contraseña"
                                type="password"
                                register={register}
                                error={errors.password_confirm}

                            />
                            <Field className="">
                                <Button type="submit" disabled={isSubmitting}>Continuar</Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>

        </div>
    )
}
