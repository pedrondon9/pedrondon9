"use client"

import { BannerHome } from "@/components/banner/banner-home"
import { Card_Content } from "@/components/card-content/card-content"
import { EmptyComponent } from "@/components/empty"
import { Footer } from "@/components/footer/footer"
import { Navbar } from "@/components/navbar/nav-bar"
import ProjectsGrid from "@/components/table/table-work"
import { TypographyH2 } from "@/components/text-sub-title"
import { Empty } from "@/components/ui/empty"
import { Separator } from "@/components/ui/separator"

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
export default function Page() {
    return (
        <>
            <Navbar />
            <div className="container grid-cols-1 grid gap-10 mx-auto px-1">
                <BannerHome />

                <div className="">
                    <TypographyH2 title={'Contenido reciente'} />
                </div>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card_Content />
                    <Card_Content />
                    <Card_Content />
                    <Card_Content />
                </div>
                <Empty className="" />

                <div className="">
                    <TypographyH2 title={'Trabajos reciente'} />
                </div>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 ">
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
