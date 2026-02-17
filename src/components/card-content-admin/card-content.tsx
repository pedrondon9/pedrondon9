'use client'

import { useState, type FC } from 'react'

import { BadgeCheckIcon, EllipsisIcon, HeartIcon, MessageCircleIcon, Plus, RepeatIcon, SendIcon, Share, UserPlusIcon } from 'lucide-react'
import { Pencil, Trash2, PowerOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardDescription, CardTitle, CardFooter, CardContent } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'

import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Link from 'next/link'

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
    return (

        <Card className='border-muted border-2 relative rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 shadow-2xl overflow-hidden h-fit'>
            <CardContent className='px-2'>
                <div className='flex h-auto w-full   justify-center items-center'>
                    <div className='flex   items-center '>

                        <img
                            src={mainImage}
                            alt={title || "Imagen del proyecto"}
                            className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
                            loading="lazy"
                        />
                    </div>
                </div>
            </CardContent>

            <CardHeader className='px-2'>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
            </CardHeader>

            <CardFooter className='flex flex-col gap-4 px-2'>
                {/* Estadísticas e Interacción */}
                <div className="flex justify-between items-center w-full">

                    {/* BOTONES NUEVOS: Editar, Desactivar, Borrar */}
                    <div className="flex gap-4">


                        <Button className="bg-indigo-600 hover:bg-indigo-700 h-10 px-4">
                            <Link className="font-bold text-sm" href={`/home/edit-content/${id}`}>

                                <Pencil className="size-4" />


                            </Link>
                        </Button>
                        <Button className="bg-primary-600 hover:bg-primary-700 h-10 px-4">
                            <Link className="font-bold text-sm" href={`/home/edit-content/${id}`}>

                                <PowerOff className="size-4" />

                            </Link>
                        </Button>
                        <Button className="bg-red-600 hover:bg-red-700 h-10 px-4">
                            <Link className="font-bold text-sm" href={`/home/edit-content/${id}`}>

                                <Trash2 className="size-4" />

                            </Link>
                        </Button>

                    </div>
                </div>

                {/* Botón Principal */}
                <Button asChild variant="secondary" size="lg" className="w-full font-extrabold hover:bg-indigo-700">
                    <Link href={`/home/projects/${id}`} >
                        Ver contenido
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}







