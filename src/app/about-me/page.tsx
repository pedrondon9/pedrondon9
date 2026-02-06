'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function AboutStory() {
    return (
        <section className=" flex justify-center ">
            <div className="container flex justify-center px-1 ">

                {/* Texto narrativo */}
                <div className="flex-1 max-w-xl ">
                    <h2 className="text-4xl md:text-5xl font-bold  mb-6">
                        Mi historia
                    </h2>

                    <p className="leading-relaxed mb-6 text-lg ">
                        Nací en <span className="font-semibold  text-white">Guinea Ecuatorial</span>,
                        en un pequeño pueblo donde la curiosidad y las ganas de aprender eran mis mayores herramientas.
                        Desde joven me fascinó entender cómo funcionan las cosas, especialmente la tecnología y la forma
                        en que los sistemas conectan a las personas.
                    </p>

                    <p className="leading-relaxed mb-6">

                    </p>
                    <p className="leading-relaxed text-lg  mb-6">
                        Esa curiosidad me llevó a aprender <span className="font-semibold text-white">programación de manera autodidacta</span>,
                        explorando código, rompiendo cosas y volviéndolas a construir.
                        Al principio creaba proyectos personales solo por diversión,
                        hasta que otras personas empezaron a pedirme ayuda con los suyos.
                    </p>

                    <p className="leading-relaxed text-lg  mb-6">
                        Así fue como entré en el mundo <span className="font-semibold text-white">freelance</span> y me formé como
                        <span className="font-semibold text-white"> desarrollador Full Stack</span>, combinando creatividad y lógica para dar vida a ideas.
                        Para consolidar mis conocimientos, obtuve un <span className="font-semibold text-white">certificado en Full Stack Development de IBM</span>,
                        y mi deseo de seguir creciendo me llevó a matricularme en el
                        <span className="font-semibold text-white"> Grado en Ciencia de Datos e Inteligencia Artificial en la VIU</span>.
                    </p>

                    <p className="leading-relaxed text-lg  mb-6">
                        Hoy sigo descubriendo nuevas formas de conectar la
                        <span className="font-semibold text-white"> tecnología, los datos y la innovación</span>,
                        siempre con la misma curiosidad que me trajo hasta aquí.
                    </p>
                    <Card className=" border-stone-800 text-lg  mb-6">
                        <CardContent className="p-5">
                            <h3 className="text-xl font-semibold text-white mb-3">Formación</h3>
                            <p className="leading-relaxed text-lg ">
                                Actualmente curso <span className="text-white">Ciencias de Datos e Inteligencia Artificial</span>,
                                donde desarrollo mis habilidades en análisis, estadística y machine learning, con el objetivo
                                de aplicar la tecnología al servicio de mi comunidad.
                            </p>
                        </CardContent>
                    </Card>

                    <h3 className="text-xl font-semibold text-white mb-3 text-lg ">Tecnologías que uso</h3>
                                        <Card className=" border-stone-800 text-lg  mb-6">
                        <CardContent className="p-5">
                    <div className="flex flex-wrap gap-2 mb-8">
                        {[
                            "React", "Next.js", "TailwindCSS", "Shadcn/ui",
                            "Node.js", "Express", "Django",
                            "PostgreSQL", "MongoDB", "Docker", "AWS",
                            "Python", "Pandas", "TensorFlow"
                        ].map((tech, i) => (
                            <span key={i} className="px-3 py-1 text-lg  rounded-md text-sm ">
                                {tech}
                            </span>
                        ))}
                    </div>
     </CardContent>
                    </Card>
                    <div className="space-y-6 mb-6">

                        <p className="leading-relaxed font-medium text-white">
                            Si deseas apoyarme, colaborar o compartir ideas, estaré encantado de aprender y crecer contigo.
                        </p>

                        <Button  size="lg" asChild className=" font-extrabold  text-1xl tracking-tight text-balance   w-full">
                            <Link href="#contacto">Conectemos</Link>
                        </Button>
                    </div>
                </div>
                {/* Imagen lateral */}


            </div>
        </section>
    )
}
