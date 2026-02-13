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
import { addContentSchema, registerSchema, } from "../forms-vadations";
import { onSubmit } from "./onSubmit";



// infer the form data type from the schema
type addContentFormData = z.infer<typeof addContentSchema>;

export function AddContentForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<addContentFormData>({ 
        resolver: zodResolver(addContentSchema),
        defaultValues: {
            title: "",
            description: "",
            technologies: "", // Ahora TypeScript sabe que aquí es un string
            categoryIds: [], 
            projectLink: "",
            projectVideo: "",
            githubLink: "",
            imageLink: "",
        },
    });

    const onSubmit = (data: z.output<typeof addContentSchema>) => {
        // Aquí 'data.technologies' ya es un array de strings []
        console.log(data);
    };


    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>

                <FormField
                    id="name"
                    label="Tu nombre"
                    type="text"
                    placeholder="Tu nombre"
                    register={register}
                    error={errors.title}
                />
                {/* Campo Email */}
                <FormField
                    id="email"
                    label="Tu correo"
                    type="email"
                    placeholder="m@example.com"
                    register={register}
                    error={errors.description}
                />

                {/* Campo Password */}

                <FormField
                    id="password"
                    label="Tu contraseña"
                    type="password"
                    register={register}
                    placeholder="Tu contraseña"
                    error={errors.technologies}

                />
                <Field className="">
                    <Button type="submit" disabled={isSubmitting}>Agregar</Button>

                </Field>
            </FieldGroup>
        </form>

    )
}
