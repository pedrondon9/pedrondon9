"use client"

import { Card_Content } from "@/components/card-content/card-content"
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
import { Plus } from "lucide-react"


export default function Page() {
    return (
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

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
                <Card_Content />
                <Card_Content />
                <Card_Content />
                <Card_Content />
                <Card_Content />
            </div>
            <div>
                <EmptyComponent description={""} text={"Todavia no hay contenido"} />
            </div>



        </section>
    )
}