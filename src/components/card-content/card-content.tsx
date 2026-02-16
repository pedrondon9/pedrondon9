'use client'

import { useState, type FC } from 'react'

import { BadgeCheckIcon, EllipsisIcon, HeartIcon, MessageCircleIcon, RepeatIcon, SendIcon, Share, UserPlusIcon } from 'lucide-react'
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

export const Card_Content: FC<CardContentProps> = ({ title, description, technologies, id, images, categories, githubLink, projectLink }) => {
    const [liked, setLiked] = useState<boolean>(false)
    const mainImage = images && images.length > 0 ? images[0].url : "/placeholder.png";
    return (
            <Link href={`/home/projects/${id}`}>

        <Card className='border-muted border-2  relative rounded-xl bg-gradient-to-br from-slate-900 to-slate-950  overflow-hidden '>
                <CardContent className='px-2'>
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
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>
                        {description}
                    </CardDescription>
                </CardHeader>

                <CardFooter className='flex flex-col gap-4 px-2'>
                    {/* Estadísticas e Interacción */}
                    <div className="flex justify-between items-center w-full hidden">
                        <div className="flex gap-1">
                            <Button variant='ghost' size='sm' onClick={() => setLiked(!liked)}>
                                <HeartIcon className={cn('size-4 mr-1', liked && 'fill-destructive stroke-destructive')} />
                                2.1K
                            </Button>
                            <Button variant='ghost' size='sm'>
                                <MessageCircleIcon className='size-4 mr-1' />
                                1.4K
                            </Button>
                        </div>

                        {/* BOTONES NUEVOS: Editar, Desactivar, Borrar */}
                        <div className="flex gap-4">
                            <Button variant="outline" size="icon" className="size-8">
                                <Pencil className="size-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="size-8 text-yellow-500">
                                <PowerOff className="size-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="size-8 text-destructive">
                                <Trash2 className="size-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Botón Principal */}
                    <Button asChild variant="secondary" size="lg" className="w-full font-extrabold bg-muted">
                        <Link href={`/home/projects/${id}`} >
                            Ver contenido
                        </Link>
                    </Button>
                </CardFooter>
        </Card>            
        </Link>

    )
}







