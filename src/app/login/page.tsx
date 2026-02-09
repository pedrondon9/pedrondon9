'use client'

import { ArrowBigRight, GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/form-login/login-form"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex border px-3 py-1 bg-indigo-600 rounded-full  items-center gap-2 self-center font-medium">
          
          pedrondong.com
                    <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <ArrowBigRight className="size-4" />
          </div>
        </Link>
        <LoginForm />
      </div>
    </div>
  )
}