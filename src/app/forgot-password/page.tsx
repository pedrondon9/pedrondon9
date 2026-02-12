'use client'

import { EmailForm } from "@/components/form-email/email-form"
import { ArrowBigRight, GalleryVerticalEnd } from "lucide-react"
import Link from "next/link"


export default function EmailPage() {



    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link href="/login" className="flex border px-3 py-1 bg-indigo-600 rounded-full  items-center gap-2 self-center font-medium">
                    Volver al inicio de sesión
                    <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                        <ArrowBigRight className="size-4" />
                    </div>
                </Link>
                <EmailForm />
            </div>
        </div>
    )
}