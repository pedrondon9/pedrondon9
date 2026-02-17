"use client"


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
import { ArrowLeft, Plus, Share2, Star } from "lucide-react"
import Link from "next/link"


export default function Page() {
    return (
        

            <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                {/* HEADER */}

                <div className="flex w-full max-w-sm flex-col gap-6">
                    <FieldGroup>
                        <FieldSeparator className="">
                            Agregar nuevo contenido
                        </FieldSeparator>
                    </FieldGroup>


                    <AddContentForm />

                </div>
            </div>
        
    )
}