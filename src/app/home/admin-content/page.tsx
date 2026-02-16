"use client"
import { useEffect, useState } from "react"
import { DialogDemo } from "@/components/dialog-form-register/dialog-register"
import { EmptyComponent } from "@/components/empty"
import { TypographyH2 } from "@/components/text-sub-title"
import { Button } from "@/components/ui/button"
import { Empty } from "@/components/ui/empty"


import {
    Field,
    FieldDescription,
    FieldLabel,
} from "@/components/ui/field"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import axios from "axios"
import { SpinnerEmpty } from "@/components/spinnerEmpty"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { CardContentAdmin } from "@/components/card-content-admin/card-content"
const CardAdmin = CardContentAdmin as any

interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string;
    images: string[];
    categories: Category[];
    githubLink: string;
    projectLink: string;
    userId: number;

}
interface Category {
    id: number;
    name: string;
}

export default function Page() {

    const [data, setData] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const fetchData = async () => {
        try {
            setLoading(true);
            // Con Axios, la data ya viene parseada en res.data
            const res = await axios.get<Project[]>("/api/content/get");
            console.log("Respuesta de Axios:", res);
            setData(res.data);
        } catch (err: any) {
            console.error("Error con Axios:", err);
            setError("No se pudieron cargar las categorías");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <section className="container grid-cols-1 grid gap-10 mx-auto px-1 ">

                <div className="">
                    <TypographyH2 title={'Contenido'} />
                </div>




                <div className="flex justify-center items-end gap-4"> {/* Añadimos flex y gap */}
                    <div className="w-full max-w-sm"> {/* Ajustado para que sea responsive */}
                        <Field>
                            <Select>
                                <SelectTrigger className="bg-slate-900 border-slate-800">
                                    <SelectValue placeholder="Tipo de contenido" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="engineering">Ciencia de datos</SelectItem>
                                    <SelectItem value="design">Inteligencia artificial</SelectItem>
                                    <SelectItem value="fullstack">Full Stack</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                    </div>

                    {/* BOTÓN AGREGAR */}
                    <DialogDemo />
                </div>

                {!loading ? (
                    data.length > 0 ? (
                        <div className="columns-1 md:columns-2 lg:columns-4 gap-6 space-y-6">

                            {data.map((project) => (

                                <CardAdmin
                                    id={project.id}
                                    key={project.id}
                                    title={project.title}
                                    description={project.description}
                                    technologies={project.technologies}
                                    images={project.images}
                                    categories={project.categories}
                                    githubLink={project.githubLink}
                                    projectLink={project.projectLink}
                                />

                            ))}
                        </div>

                    ) : error ? (
                        <EmptyComponent description={error} text={"Error al cargar el contenido"} />
                    ) : (
                        <EmptyComponent description={"No hay contenido disponible"} text={"No hay contenido"} />
                    )
                ) : (
                    <div className=" flex justify-center item-center">
                        <SpinnerEmpty />

                    </div>
                )}

            </section>
        </>
    )
}