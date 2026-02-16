import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addContentSchema, editContentSchema } from "../forms-vadations";
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
import axios from "axios";
import { toast } from "sonner";
import { onSubmit } from "./onSubmit";

type editContentFormData = z.infer<typeof editContentSchema>;
interface Category {
    id: number;
    name: string;
}

type Project = {
    title?: string
    description?: string
    technologies?: string[]
    images?: [{
        url: string,
        id: number,
        projectId: number
    }]
    categories?: string[]
    githubLink?: string
    projectLink?: string
}

interface EditContentFormProps extends React.ComponentProps<"div"> {
    initialData: any; // El proyecto que viene de la DB
}


export function EditContentForm({ className, id, ...props }: React.ComponentProps<"div"> & { id: string }) {
    // 1. Estado local para previsualizar (opcional si usas un componente dedicado)
    const [previews, setPreviews] = useState<string[]>([]);
    const [existingImages, setExistingImages] = useState<{ id: number, url: string }[]>([]);
    const [frameworks, setCategories] = useState<Category[]>([]);
    const [contentData, setContentData] = useState<Project[]>([]); // Estado para los datos del contenido
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);



    const {
        control,
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<editContentFormData>({
        resolver: zodResolver(editContentSchema),
        defaultValues: {
            title: "",
            description: "",
            technologies: "",
            categoryIds: [],
            projectLink: "",
            projectVideo: "",
            githubLink: "",
            imageLink: "",
            images: []

        },
    });

    const fetchData = async () => {
        try {
            setLoading(true); // Asumiendo que tienes un estado de carga
            console.log("Consultando ID:", id);

            const res = await axios.get(`/api/content/get/${id}`);


            if (res.status === 200) {
                console.log(res.data)

                //const parsed = Array.isArray(res.data.technologies) ? JSON.parse(res.data.technologies):res.data.technologies
                //const techString = Array.isArray(parsed) ? parsed.join(", ") : res.data.technologies;
                reset({
                    title: res.data.title || "",
                    description: res.data.description || "",
                    technologies: res.data.technologies || "",
                    // Convertimos el array de objetos de Prisma a array de IDs numéricos
                    categoryIds: res.data.categories?.map((c: any) => c.id) || [],
                    projectLink: res.data.projectLink || "",
                    projectVideo: res.data.projectVideo || "",
                    githubLink: res.data.githubLink || "",
                    images: []  // No pre-cargamos las imágenes nuevas, solo mostramos las existentes
                });
                setExistingImages(res.data.images || []);
            }

            // Si tu API devuelve un objeto único y no un array, asegúrate de guardarlo bien
            setContentData(res.data);

        } catch (err: any) {
            console.error("Error al obtener datos:", err.response?.data || err.message);
            setError("No se pudo cargar la información del proyecto");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                // Con Axios, la data ya viene parseada en res.data
                const res = await axios.get<Category[]>("/api/categories");
                setCategories(res.data);
            } catch (err: any) {
                setError("No se pudieron cargar las categorías");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        // Solo disparamos la petición si el id existe y no es "undefined" (string)

        fetchData();

    }, [id]);


    const handleRemoveExistingImage = async (imageId: number) => {
        if (confirm("¿Seguro que quieres eliminar esta imagen?")) {
            try {
                await axios.delete(`/api/image/delete/${imageId}`);
                // Actualizar la UI quitando la imagen del estado
                setExistingImages(prev => prev.filter(img => img.id !== imageId));
                toast.success("Imagen eliminada");
            } catch (error) {
                toast.error("Error al eliminar imagen");
            }
        }
    };


    const onSubmitHandler = async (data: editContentFormData) => {
        // Ensure images is always present (not optional)
        await onSubmit(
            {
                ...data,
                images: data.images ?? []
            },
            id
        );
    };


    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form onSubmit={handleSubmit((data, event) => onSubmitHandler(data))} className={cn("space-y-6", className)}>

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
                        {/* --- NUEVO: Visualización de imágenes existentes --- */}
                        {existingImages.length > 0 && (
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                {existingImages.map((img) => (
                                    <div key={img.id} className="relative group">
                                        <img
                                            src={img.url}
                                            alt="Preview"
                                            className="h-24 w-full object-cover rounded-lg border border-slate-700"
                                        />
                                        {/* Botón para eliminar imagen existente si lo deseas */}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveExistingImage(img.id)}
                                            className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="size-3 text-white" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
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