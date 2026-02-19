'use client'

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Code2,
    Database,
    BrainCircuit,
    Rocket,
    Globe,
    Terminal,
    Layers,
    Cpu
} from "lucide-react";
import { DialogContact } from "@/components/dialog-form-register/dialog-contact";

export default function AboutStory() {
    return (
        <div className="  max-w-4xl mx-auto py-2 px-1.5 space-y-12 bg-background text-foreground">

            {/* Hero Section / Mi Historia */}
            <section className="space-y-6 bg-zinc-900/40">
                <div className="space-y-2 text-center">
                    <h1 className="text-4xl font-extrabold text-emerald-400 text-zinc-100 tracking-tight lg:text-5xl ">
                        Mi historia
                    </h1>
                    <br />
                    <br />
                    <p className="text-xl  text-muted-foreground font-medium">
                        De Guinea Ecuatorial al mundo del código y los datos.
                    </p>
                </div>

                <div className="max-w-none text-center space-y-4 text-lg">
                    <p>
                        Hola, me llamo <strong>Pedro Ndong</strong> nací en <strong>Guinea Ecuatorial</strong>, donde la curiosidad innata se convirtió en mi principal motor de aprendizaje.
                        Ese impulso me llevó a formarme como <strong>programador autodidacta</strong>, experimentando con código hasta profesionalizarme
                        en el mundo <strong>Freelance</strong>, donde aprendí a transformar ideas en soluciones reales.
                    </p>
                    <br />
                    <br />
                    <p>
                        Con el objetivo de estandarizar mis habilidades bajo niveles de industria, obtuve la <strong>Certificación Profesional de IBM
                            en Full Stack Developer</strong> a través de Coursera, consolidando mi dominio en arquitecturas escalables y entornos cloud.
                    </p>
                    <br />
                    <br />
                    <p>
                        Hoy, mi evolución continúa en la <strong>VIU</strong>, cursando el <strong>Grado en Ciencia de Datos e
                            Inteligencia Artificial</strong>. Mi objetivo es fusionar la lógica de la programación con el poder
                        predictivo de los datos para crear soluciones que impacten realmente en el mundo.
                    </p>
                    <br />
                </div>
            </section>


            {/* Stack Tecnológico */}
            <section className="space-y-8">
                <div className="flex items-center gap-2 justify-center ">
                    <h2 className="text-3xl font-bold tracking-tight text-center text-emerald-400 text-zinc-100 ">Stack Tecnológico</h2>
                </div>

                <div className=" grid rounded-md border-muted  grid-cols-1 md:grid-cols-2  gap-6">

                    {/* Data Science & IA Card */}
                    <Card className=" border-rose-900/50 bg-rose-950/20">
                        <CardHeader>
                            <div className="flex items-center gap-2 justify-center">
                                <BrainCircuit className="w-5 h-5 text-indigo-600" />
                                <CardTitle className="text-rose-100 ">Ciencia de Datos e IA</CardTitle>
                            </div>
                            <CardDescription className="text-rose-200 text-center">Análisis predictivo y modelado estadístico</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2 justify-center">
                            {["Python","R", "Pandas", "NumPy", "TensorFlow", "Scikit-learn", "Estadística", "Machine Learning"].map((skill) => (
                                <Badge key={skill} variant="secondary" className="px-1 py-1 font-semibold">
                                    {skill}
                                </Badge>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Full Stack Card */}  
                    <Card className="bg-transparent border-none"> 
                        <CardHeader>
                            <div className="flex items-center justify-center gap-2">
                                <Layers className="w-5 h-5 text-indigo-600" />
                                <CardTitle className="">Desarrollo Full Stack</CardTitle>
                            </div>
                            <CardDescription className="text-purple-200 text-center">Arquitecturas escalables y modernas</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2 justify-center">
                            {["React", "Next.js", "Node.js", "Django", "PostgreSQL", "MongoDB", "DigitalOcean", "Docker", "TailwindCSS"].map((skill) => (
                                <Badge key={skill} variant="secondary" className="px-3 py-1 font-semibold">
                                    {skill}
                                </Badge>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </section>

<br />
<br />
            {/* Formación Actual */} 
            <section className="rounded-md ">
                <Card className="bg-purple-950/20 border-purple-900/40">
                    <CardContent className="pt-6 space-y-4">
                        <div className="flex justify-center gap-2 text-primary font-bold uppercase tracking-wider text-white text-sm">
                            <Terminal className="w-4 h-4 " />
                            <span className="">Formación Actual</span>
                        </div>
                        <p className="text-lg text-center italic leading-relaxed">
                            Actualmente desarrollo mis habilidades en análisis masivo de datos y aprendizaje automático
                            en la VIU, con el firme objetivo de aplicar inteligencia artificial al servicio de los desafíos
                            sociales y tecnológicos actuales.
                        </p>
                    </CardContent>
                </Card>
            </section>
<br />
            {/* Call to Action */}
            <footer className="flex flex-col items-center gap-6 py-8">
                <p className="text-center text-muted-foreground">
                    ¿Deseas apoyarme, colaborar o compartir ideas? Estaré encantado de aprender y crecer contigo.
                </p>
                <DialogContact/>
            </footer>
        </div>
    )
}
