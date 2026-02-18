import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addContentSchema, contactSchema } from "../forms-vadations";
import { FormField } from "../form-field";
import { FormTextareaField } from "../formTextarea";
import { FormComboboxField } from "../multipleSelect";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import { UploadCloud, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FormImageUploadField } from "../fieldImages";
import { onSubmit } from "./onSubmit";
import axios from "axios";

type contactFormData = z.infer<typeof contactSchema>;
interface Category {
    id: number;
    name: string;
}


export function ContacForm({ className, ...props }: React.ComponentProps<"div">) {


    const {
        control,
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<contactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            description: "",
        },
    });




    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-6", className)}>

                <Card className=" bg-gradient-to-br from-slate-900 to-slate-950 ">
                   
                    <CardContent>

                        <FieldGroup>
                            <FormField
                                id="name"
                                label="Nombre"
                                type="text"
                                placeholder="Ej: Juan Pérez"
                                register={register}
                                error={errors.name}
                            />

                            <FormField
                                id="email"
                                label="Correo electrónico"
                                type="email"
                                placeholder="Ej: usuario@correo.com"
                                register={register}
                                error={errors.email}
                            />

                            {/* SECCIÓN 2: Detalles */}
                            <FormTextareaField
                                id="description"
                                label="Mensaje"
                                placeholder="Escribe tu mensaje aquí..."
                                register={register}
                                error={errors.description}
                                rows={3} // Reducido para no saturar
                            />

                        </FieldGroup>

                    </CardContent>
                </Card>

                <FieldGroup>

                    <Field className="">
                        <Button
                            type="submit"
                            className="w-full py-6 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                        </Button>
                    </Field>
                </FieldGroup>

            </form >

        </div >
    );
}