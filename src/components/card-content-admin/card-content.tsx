'use client'

import { useMemo, useState, type FC } from 'react'

import { BadgeCheckIcon, EllipsisIcon, HeartIcon, MessageCircleIcon, RepeatIcon, SendIcon, Share, UserPlusIcon } from 'lucide-react'
import { Pencil, Trash2, PowerOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardDescription, CardTitle, CardFooter, CardContent } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'

import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Link from 'next/link'
const SCHEMES = [
    // --- LOS ORIGINALES ---
    { bg: "bg-slate-900/40", border: "border-slate-800", title: "text-slate-100", accent: "text-blue-400" },
    { bg: "bg-zinc-900/40", border: "border-zinc-800", title: "text-zinc-100", accent: "text-emerald-400" },
    { bg: "bg-neutral-900/40", border: "border-neutral-800", title: "text-neutral-100", accent: "text-amber-400" },
    { bg: "bg-indigo-950/20", border: "border-indigo-900/50", title: "text-indigo-100", accent: "text-indigo-400" },
    { bg: "bg-purple-950/20", border: "border-purple-900/50", title: "text-purple-100", accent: "text-purple-400" },
    { bg: "bg-rose-950/20", border: "border-rose-900/50", title: "text-rose-100", accent: "text-rose-400" },

    // --- NUEVAS INCORPORACIONES ---
    // Cyan/Teal: Muy tecnológico y limpio
    { bg: "bg-cyan-950/20", border: "border-cyan-900/40", title: "text-cyan-50", accent: "text-cyan-400" },

    // Esmeralda/Bosque: Transmite confianza y estabilidad
    { bg: "bg-teal-950/20", border: "border-teal-900/40", title: "text-teal-50", accent: "text-teal-400" },

    // Naranja/Ámbar: Ideal para destacar proyectos creativos
    { bg: "bg-orange-950/20", border: "border-orange-900/40", title: "text-orange-50", accent: "text-orange-400" },

    // Azul Cielo: Vibrante pero profesional
    { bg: "bg-sky-950/20", border: "border-sky-900/40", title: "text-sky-50", accent: "text-sky-400" },

    // Lima/Neon: Da un toque de modernidad extrema
    { bg: "bg-lime-950/20", border: "border-lime-900/40", title: "text-lime-50", accent: "text-lime-400" },

    // Fucsia/Violeta: Un toque artístico y elegante
    { bg: "bg-fuchsia-950/20", border: "border-fuchsia-900/40", title: "text-fuchsia-50", accent: "text-fuchsia-400" },
];
type CardContentProps = {
    title?: string
    id: number
    description?: string
    technologies?: string[]
    images?: [{
        url: string,
        id: number,
        projectId: number
    }]
    categories?: string[]
    githubLink?: string
    projectLink?: string
}

export const CardContentAdmin: FC<CardContentProps> = ({ title, description, technologies, id, images, categories, githubLink, projectLink }) => {
    const [liked, setLiked] = useState<boolean>(false)
    const mainImage = images && images.length > 0 ? images[0].url : "/placeholder.png";

    const scheme = useMemo(() => {
        return SCHEMES[id % SCHEMES.length];
    }, [id]);

    console.log(mainImage, 'main image')
    return (

        <Card className={cn(
            'relative rounded-[5px] overflow-hidden ',
            scheme.bg,
            scheme.border,
            'border-[1px] ' // Efecto profesional de cristal
        )}>
            <CardContent className='px-0 hidden'>
                <div className='flex h-auto w-full   justify-center items-center'>
                    <div className='flex   items-center '>

                        <img
                            src={mainImage}
                            alt={title || "Imagen del proyecto"}
                            className="w-full h-auto object-contain "
                            loading="lazy"
                        />
                    </div>
                </div>
            </CardContent>

            <CardHeader className='px-2'>
                <CardTitle className={cn('text-xl font-bold tracking-tight', scheme.title)}>{title}</CardTitle>
                <CardDescription>
                    {description?.slice(0, 200)}
                </CardDescription>
            </CardHeader>
            <div className="flex justify-between items-center w-full ">
                <div className="flex gap-1">
                    <Button variant='ghost' size='sm' onClick={() => setLiked(!liked)}>
                        <HeartIcon className={cn('size-4 mr-1', liked && 'fill-destructive stroke-destructive')} />
                        0K
                    </Button>
                    <Button variant='ghost' size='sm'>
                        <MessageCircleIcon className='size-4 mr-1' />
                        0K
                    </Button>
                </div>

                <div className="flex gap-4 px-2">


                    <Button asChild className="bg-indigo-600 hover:bg-indigo-700 h-10 ">
                        <Link className="font-bold text-sm" href={`/home/edit-content/${id}`}>

                            <Pencil className="size-4" />


                        </Link>
                    </Button>
                    <Button asChild className=" h-10 px-4" variant="outline">
                        <Link className="font-bold text-sm" href={`/home/edit-content/${id}`}>

                            <PowerOff className="size-4" />

                        </Link>
                    </Button>
                    <Button asChild variant="destructive" className=" h-10 px-4">
                        <Link className="font-bold text-sm" href={`/home/edit-content/${id}`}>

                            <Trash2 className="size-4" />

                        </Link>
                    </Button>

                </div>
            </div>
            <CardFooter className='flex flex-col gap-4 px-2'>
                {/* Estadísticas e Interacción */}

                {/* Enlaces externos */}
                {(githubLink || projectLink) && (
                    <div className="flex gap-2 w-full">

                        {projectLink && (
                            <Button
                                size="lg"
                                asChild
                                className="flex-1 relative border-2 z-20  bg-indigo-600 hover:bg-indigo-700 border-slate-700"
                            >
                                <Link href={projectLink} target="_blank" rel="noopener noreferrer">
                                    Demo
                                </Link>
                            </Button>
                        )}
                        {githubLink && (
                            <Button
                                size="lg"
                                variant="outline"
                                asChild
                                className="flex-1 relative z-20 border-slate-700 "
                            >
                                <Link href={githubLink} target="_blank" rel="noopener noreferrer">
                                    Código
                                </Link>
                            </Button>
                        )}
                    </div>
                )}


                {/* Botón Principal */}
                <Button asChild variant="ghost" size="lg" className="w-full font-extrabold ">
                    <Link href={`/home/projects/${id}`} >
                        Ver contenido
                    </Link>
                </Button>
            </CardFooter>
        </Card>

    )
}






















