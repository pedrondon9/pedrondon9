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
import { emailSchema } from "../forms-vadations";
import { onSubmit } from "./onSubmit";



// infer the form data type from the schema
type emailFormData = z.infer<typeof emailSchema>;

export function EmailForm({
    className,
    ...props
}: React.ComponentProps<"div"> & {  }) {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<emailFormData>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: "",
        },
    });



    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Recuperar contraseña</CardTitle>
                    <CardDescription>
                        Ingresa tu correo electrónico para restablecer tu contraseña.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup>

                            {/* Campo correo */}

                            <FormField
                                id="email"
                                label="Tu correo electrónico"
                                type="email"
                                register={register}
                                error={errors.email}
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
