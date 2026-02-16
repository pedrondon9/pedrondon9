import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addContentSchema } from "../forms-vadations";
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

type addContentFormData = z.infer<typeof addContentSchema>;
interface Category {
  id: number;
  name: string;
}


export function AddContentForm({ className, ...props }: React.ComponentProps<"div">) {
    // 1. Estado local para previsualizar (opcional si usas un componente dedicado)
    const [previews, setPreviews] = React.useState<string[]>([]);

    const [frameworks, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);



    // Manejador de imágenes
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        // Guardar en react-hook-form
        setValue("images", files);

        // Generar previsualizaciones
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(newPreviews);
    };
    const {
        control,
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<addContentFormData>({
        resolver: zodResolver(addContentSchema),
        defaultValues: {
            title: "",
            description: "",
            technologies: "",
            categoryIds: [],
            projectLink: "",
            projectVideo: "",
            githubLink: "",
            imageLink: "",
        },
    });



    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                // Con Axios, la data ya viene parseada en res.data
                const res = await axios.get<Category[]>("/api/categories");
                setCategories(res.data);
            } catch (err: any) {
                console.error("Error con Axios:", err);
                setError("No se pudieron cargar las categorías");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-6", className)}>

                <Card className=" bg-gradient-to-br from-slate-900 to-slate-950 ">
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Informacion del contenido</CardTitle>
                        <CardDescription>
                            Agrega la información principal de tu proyecto, como tipo de contenido, título, descripción y tecnologías utilizadas.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>

                        <FieldGroup>
                            <FormComboboxField
                                name="categoryIds"
                                label="Tecnologías / Frameworks"
                                control={control}
                                items={frameworks}
                                error={errors.categoryIds}
                            />

                            <FormField
                                id="title"
                                label="Título del proyecto"
                                type="text"
                                placeholder="Ej: E-commerce Platform"
                                register={register}
                                error={errors.title}
                            />


                            {/* SECCIÓN 2: Detalles */}
                            <FormTextareaField
                                id="description"
                                label="Descripción"
                                placeholder="Resume brevemente de qué trata tu proyecto..."
                                register={register}
                                error={errors.description}
                                rows={3} // Reducido para no saturar
                            />

                           

                        </FieldGroup>

                    </CardContent>
                </Card>
                <Card className="  ">
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Enlaces del contenido</CardTitle>
                        <CardDescription>
                            Agrega enlaces relacionados a tu proyecto, como demo en vivo, repositorio de GitHub o video demostrativo.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FieldGroup>

                            {/* SECCIÓN 3: Enlaces (Grid de 2 columnas) */}
                            <FormField
                                id="projectLink"
                                label="Demo Link"
                                type="url"
                                placeholder="https://..."
                                register={register}
                                error={errors.projectLink}
                            />
                            <FormField
                                id="githubLink"
                                label="GitHub"
                                type="url"
                                placeholder="https://github.com/..."
                                register={register}
                                error={errors.githubLink}
                            />
                            <FormField
                                id="projectVideo"
                                label="Video Demo (URL)"
                                type="url"
                                placeholder="YouTube o Vimeo link"
                                register={register}
                                error={errors.projectVideo}
                            />

                        </FieldGroup>

                    </CardContent>
                </Card >

                <Card className=" bg-gradient-to-br from-slate-900 to-slate-950 shadow-2xl">
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Imagenes del contenido </CardTitle>
                        <CardDescription>
                            Agrega imágenes para mostrar tu proyecto de la mejor manera.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>

                        <FieldGroup>
                            <FormImageUploadField
                                name="images" // Debe coincidir con tu schema Zod
                                label="Galería del Proyecto"
                                control={control}
                                error={errors.images}
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
                            {isSubmitting ? "Publicando..." : "Publicar Proyecto"}
                        </Button>
                    </Field>
                </FieldGroup>

            </form >

        </div >
    );
}