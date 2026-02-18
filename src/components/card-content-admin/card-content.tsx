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




        <Card className='border-none  relative rounded-xl   overflow-hidden  '>
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
                <CardTitle className='text-xl'>{title}</CardTitle>
                <CardDescription>
                    {description?.slice(0, 200)}
                </CardDescription>
            </CardHeader>
            <div className="flex justify-between items-center w-full ">
                <div className="flex gap-1 hidden"> {/* Ocultamos los botones de interacción */}
                    <Button variant='ghost' size='sm' onClick={() => setLiked(!liked)}>
                        <HeartIcon className={cn('size-4 mr-1', liked && 'fill-destructive stroke-destructive')} />
                        0K
                    </Button>
                    <Button variant='ghost' size='sm'>
                        <MessageCircleIcon className='size-4 mr-1' />
                        0K
                    </Button>
                </div>

                    {/* BOTONES NUEVOS: Editar, Desactivar, Borrar */}
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
                                className="flex-1 relative border-1 z-20  bg-indigo-600 hover:bg-indigo-700  border-slate-700"
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







