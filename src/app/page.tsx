"use client"

import { BannerHome } from "@/components/banner/banner-home"
import {  CardContents } from "@/components/card-content/card-content"
import { EmptyComponent } from "@/components/empty"
import { Footer } from "@/components/footer/footer"
import { Navbar } from "@/components/navbar/nav-bar"
import { SpinnerEmpty } from "@/components/spinnerEmpty"
import ProjectsGrid from "@/components/table/table-work"
import { TypographyH2 } from "@/components/text-sub-title"
// removed unused CardContent import
import { Empty } from "@/components/ui/empty"
import { Separator } from "@/components/ui/separator"
import axios from "axios"
import { Suspense, useEffect, useState } from "react"

const projects = [
    {
        title: "Sistema Escolar SaaS",
        description: "Plataforma multi-tenant para gestión académica, pagos y calificaciones.",
        tech: ["Express", "PostgreSQL", "React", "Prisma"],
        link: "#",
    },
    {
        title: "App de Seguimiento GPS",
        description: "Aplicación IoT para rastrear vehículos en tiempo real.",
        tech: ["ESP32", "SIM7600G-H", "Django", "React Native"],
        link: "#",
    },
    {
        title: "Plataforma de Análisis de Datos",
        description: "Herramienta para explorar, limpiar y visualizar datasets masivos.",
        tech: ["Python", "Pandas", "Plotly", "FastAPI"],
        link: "#",
    },
    {
        title: "Portal de Pagos Móviles",
        description: "Solución fintech para pagos digitales con tarjetas y móvil.",
        tech: ["Node.js", "MongoDB", "Next.js", "Tailwind"],
        link: "#",
    },
    {
        title: "App de Seguimiento GPS",
        description: "Aplicación IoT para rastrear vehículos en tiempo real.",
        tech: ["ESP32", "SIM7600G-H", "Django", "React Native"],
        link: "#",
    },

]

interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    images?: [{
        url: string,
        id: number,
        projectId: number
    }]
    categories: string[];
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
        <>
            <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Cargando...</div>}>
                <Navbar />
            </Suspense>
            <div className="container grid-cols-1 grid gap-10 mx-auto px-1">
                <BannerHome />

                <div className="">
                    <TypographyH2 title={'Contenido reciente'} />
                </div>
                {!loading ? (
                    data.length > 0 ? (
                        <div className="columns-1 md:columns-2 lg:columns-4 gap-6 space-y-6">

                            {data.map((project) => (
                                <div key={project.id} className="break-inside-avoid">
                                    <CardContents
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

                <div className=" hidden">
                    <TypographyH2 title={'Trabajos reciente'} />
                </div>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 hidden">
                    {projects.map((project, index) => (
                        <div key={index}>
                            <ProjectsGrid
                                title={project.title}
                                description={project.description}
                                tech={project.tech}
                                link={project.link}
                            />
                        </div>
                    ))}
                </div>
                <Empty className="" />
            </div>
            <Footer />
        </>

    )
}
