'use client'

import { useState } from 'react'

import { BadgeCheckIcon, EllipsisIcon, HeartIcon, MessageCircleIcon, RepeatIcon, SendIcon, Share, UserPlusIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardDescription, CardTitle, CardFooter, CardContent } from '@/components/ui/card'

import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Link from 'next/link'

export const Card_Content = () => {
    const [liked, setLiked] = useState<boolean>(false)

    return (

        <Card className='border-none relative rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 shadow-2xl'>
            
            <CardContent>
                <div className='flex h-60 items-center justify-center '>
                    <img
                        src='https://cdn.shadcnstudio.com/ss-assets/components/card/image-11.png?width=300&format=auto'
                        alt='Shoes'
                        className='w-75'
                    />
                </div>


            </CardContent>
            <CardHeader>
                <CardTitle className=''>Cosmic Blue Waves</CardTitle>
                <CardDescription>
                    Explore the mysteries of the cosmos with deep, swirling waves of blue and purple, evoking a sense of depth
                    and infinite space.
                </CardDescription>
            </CardHeader>
            <CardFooter className='grid grid-cols-1  gap-2'>

                <div>
                    <Button variant='ghost' className='' size='sm' onClick={() => setLiked(!liked)}>
                        <HeartIcon className={cn('size-4', liked && 'fill-destructive stroke-destructive')} />
                        2.1K
                    </Button>
                    <Button className='' variant='ghost' size='sm'>
                        <MessageCircleIcon className='size-4' />
                        1.4K
                    </Button>
                   
                </div>

                <Button asChild variant="secondary" size={"lg"} className=" font-extrabold  hover:bg-indigo-700   ">
                    <Link href="" target="_blank" className="  ">
                        Ver contenido
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}







