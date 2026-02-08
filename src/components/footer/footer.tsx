'use client'

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Github, Twitter, Linkedin, GitBranchIcon, YoutubeIcon } from "lucide-react"

export function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="w-full border-t mt-10 bg-gradient-to-br from-slate-900 to-slate-950 shadow-2xl">
            <Card className="border-0 shadow-none rounded-none bg-gradient-to-br from-slate-900 to-slate-950 shadow-2xl ">
                <CardContent className="container mx-auto py-10 px-4">
                    <div className="grid grid-cols-1 gap-8">


                        <div className="flex justify-center flex-col gap-10">
                            <div className="flex justify-center">
                                <div className="flex space-x-6">

                                    <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
                                        <YoutubeIcon  className="w-11 h-11 " />
                                    </Link>
                                    <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                                        <Linkedin  className="w-11 h-11" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        
                    </div>

                    <Separator className="my-8" />

                    {/* Copyright */}
                    <div className="text-center text-sm text-muted-foreground">
                        © {year} pedro ndong. Todos los derechos reservados.
                    </div>
                </CardContent>
            </Card>
        </footer>
    )
}
