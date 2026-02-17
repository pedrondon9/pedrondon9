"use client"

import { useEffect, useState } from "react"
import { CardContents } from "@/components/card-content/card-content"
import { EmptyComponent } from "@/components/empty"
const CardContentS = CardContents as any
import { TypographyH2 } from "@/components/text-sub-title"
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
    const [previews, setPreviews] = useState<string[]>([]);

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
        <section className="container grid-cols-1 grid gap-10 mx-auto px-1 ">
            <div className="">
                <TypographyH2 title={'Contenido'} />
            </div>

            <div className="flex justify-center">
                <div className="w-screen md:w-88 lg:w-88 ">
                    <Field className="">

                        <Select >
                            <SelectTrigger className="bg-indigo-600">
                                <SelectValue placeholder="Tipo de contenido" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="engineering">Ciencia de datos</SelectItem>
                                <SelectItem value="design">Inteligencia artificial</SelectItem>
                                <SelectItem value="design">Full Stack</SelectItem>
                            </SelectContent>
                        </Select>

                    </Field>
                </div>
            </div>




            {!loading ? (
                data.length > 0 ? (
                    <div className="columns-1 md:columns-2 lg:columns-4 gap-6 space-y-6">

                        {data.map((project) => (

                            <div key={project.id} className="break-inside-avoid">
                                <CardContentS
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
                            </div>

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
    )
}