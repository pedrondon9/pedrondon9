"use client"

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


export default function Page() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">

            <div className="flex w-full max-w-sm flex-col gap-6">
                <FieldGroup>
                    <FieldSeparator className="">
                        Agregar nuevo contenido
                    </FieldSeparator></FieldGroup>


                <AddContentForm />

            </div>
        </div>
    )
}