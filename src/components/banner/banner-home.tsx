"use client"


import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import Bearn from "./bearn"
import SkillsDiagram from "./bearn"
import { Button } from "../ui/button"
import { Field } from "../ui/field"
import { Card, CardContent } from "../ui/card"


export function BannerHome() {
    return (
        <Card className="shadow-none border border-neutral-400 dark:border-neutral-800 bg-gradient-to-l from-neutre-950 to-stone-900 w-full h-auto rounded-lg ">
            <CardContent>

                <div className="grid grid-cols-1  md:grid-cols-2 gap-10 h-auto  w-full  ">
                    <div className="grid grid-cols-1 gap-10">
                        <div>
                            <h1 className="scroll-m-20 text-4xl text-left   font-extrabold tracking-tight text-balance space-2">
                                Bienvenido a mi espacio, donde la Ciencia de Datos y el Desarrollo Full Stack se encuentran
                            </h1>
                        </div>

                        <div>
                            
                            <p className="mt-3  text-muted-foreground text-l">
                            Aquí comparto ideas, proyectos y conocimientos sobre análisis de datos,
                            inteligencia artificial y desarrollo web moderno, con el objetivo de inspirar, aprender y construir tecnología que marque la diferencia.
                            </p>
                        </div>
                        <div className=" flex sm:justify-start justify-center ">
                            <Button
                                type="submit"
                                size={"lg"}
                                disabled={false}
                                className=" text-1xl tracking-tight text-balance font-extrabold  w-full "
                            >
                                Quieres contactarme
                            </Button>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <h1 className="scroll-m-20 text-9xl text-neutral-300  text-center font-extrabold tracking-tight text-balance space-2"></h1>
                    </div>

                </div>
            </CardContent>

        </Card>

    )
}