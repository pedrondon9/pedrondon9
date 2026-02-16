"use client"

import * as React from "react" // Importamos React para usar React.use()
import { Card_Content } from "@/components/card-content/card-content"
import { DialogDemo } from "@/components/dialog-form-register/dialog-register"
import { EmptyComponent } from "@/components/empty"
import { AddContentForm } from "@/components/form-add-content/add-content-form"
import { TypographyH2 } from "@/components/text-sub-title"
import { Button } from "@/components/ui/button"
import { Empty } from "@/components/ui/empty"

import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Plus } from "lucide-react"
import { EditContentForm } from "@/components/form-edit-content/edit-content-form"

// Definimos que params es una Promesa en la interfaz
interface PageProps {
    params: Promise<{ id: string }>
}

export default function Page({ params }: PageProps) {
    // "Desenvolvemos" los params usando React.use()
    const { id } = React.use(params);


    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <FieldGroup>
                    <FieldSeparator className="">
                        Editar contenido
                    </FieldSeparator>
                </FieldGroup>

                {/* Ahora el id es un string limpio */}
                <EditContentForm id={id} />
            </div>
        </div>
    )
}