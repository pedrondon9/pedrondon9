'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { Rocket } from 'lucide-react'
import { ThemeToggle } from "./theme-toggle"
import SideNav from './side-nav'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { useSession, signIn, signOut } from "next-auth/react";


export function Navbar() {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    return (
        <div className="border-b mb-10 px-1">
            <div className="flex h-16 items-center container mx-auto">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 mr-8 border py-1 px-3 rounded-full bg-indigo-600">

                    <span className="font-bold   ">pedrondong.com</span>

                </Link>
                {/* Desktop Navigation */}
                <NavigationMenu className="hidden md:flex" >
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                asChild

                                className={`${navigationMenuTriggerStyle()} ${pathname === '/home/content' ? 'bg-muted' : ''
                                    }`}
                            >
                                <Link href="/home/content">

                                    Contenido

                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem className='hidden'>
                            <NavigationMenuLink
                                asChild
                                className={`${navigationMenuTriggerStyle()} ${pathname === '/home/block' ? 'bg-muted' : ''
                                    }`}
                            >
                                <Link href="/home/block" >

                                    Trabajos
                                </Link>
                            </NavigationMenuLink>

                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                asChild
                                className={`${navigationMenuTriggerStyle()} ${pathname === '/home/about-me' ? 'bg-muted' : ''
                                    }`}
                            >
                                <Link href="/home/about-me">

                                    Sobre mi
                                </Link>
                            </NavigationMenuLink>

                        </NavigationMenuItem>
                        {session && (
                            <NavigationMenuItem className=''>
                                <NavigationMenuLink
                                    asChild
                                    className={`${navigationMenuTriggerStyle()} ${pathname === '/home/admin-content' ? 'bg-muted' : ''
                                        }`}
                                >
                                    <Link href="/home/admin-content">

                                        admin. tus contenidos
                                    </Link>
                                </NavigationMenuLink>

                            </NavigationMenuItem>
                        )}
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center space-x-4">
                    {session ? (
                        <>
                            <span className="text-sm">Hola, {session.user?.name}</span>
                            <Button variant="outline" onClick={() => signOut()}>Salir</Button>
                        </>
                    ) : (

                        <Button variant="outline" asChild>
                            <Link href="/login"> Iniciar</Link>
                        </Button>
                    )}
                </div>




                {/* Desktop Actions */}
                <div className="hidden md:hidden  items-center space-x-4 ">
                    <ThemeToggle /> {/*Toggle modo oscuro */}
                </div>

                {/* Mobile Menu */}

                <SideNav isOpen={isOpen} setIsOpen={setIsOpen} />

            </div>
        </div >
    )
}
