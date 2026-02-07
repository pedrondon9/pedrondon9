"use client"

import ProjectsGrid from "@/components/table/table-work"
import { TypographyH2 } from "@/components/text-sub-title"
import { Field, FieldDescription } from "@/components/ui/field"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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
        <section className="container grid-cols-1 grid gap-10 mx-auto px-1">
            <div className="">
                <TypographyH2 title={'Trabajos'} />
            </div>
            <div className="flex justify-center">
                <div className="w-screen md:w-88 lg:w-88">
                    <Field>
                        <FieldDescription>
                            Selecciona el tipo de contenido
                        </FieldDescription>
                        <Select>
                            <SelectTrigger>
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
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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
        </section>
    )
}