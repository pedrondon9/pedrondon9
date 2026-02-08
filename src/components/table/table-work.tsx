'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "../ui/badge"


type Project = {
    title: string
    description: string
    tech: string[]
    link: string
}

export default function ProjectsGrid({ title, description, link, tech }: Project) {
    return (

        <Card
            className="border  bg-gradient-to-br from-slate-900 to-slate-950 shadow-2xl"
        >
            <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription className="">
                    {description}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <p className="text-sm  mb-2">Tecnologías:</p>
                <div className="flex flex-wrap gap-2">
                    {tech.map((t, j) => (
                        <Badge
                            key={j}
                            className=" px-2 py-2 rounded-md text-xs bg-transparent border-gray "
                        >
                            {t}
                        </Badge>
                    ))}
                </div>
            </CardContent>

            <CardFooter>
                <Button asChild variant="secondary" size={"lg"} className="w-full font-extrabold bg-indigo-600  hover:bg-indigo-700  ">
                    <Link href={link} target="_blank" className="  ">
                        Ver proyecto
                    </Link>
                </Button>
            </CardFooter>
        </Card>

    )
}
