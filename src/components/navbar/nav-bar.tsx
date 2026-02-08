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



export function Navbar() {
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
                <NavigationMenu className="hidden md:flex">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href="/content" legacyBehavior passHref>
                                <NavigationMenuLink
                                    className={`${navigationMenuTriggerStyle()} ${pathname === '/home/content' ? 'text-primary' : ''
                                        }`}
                                >
                                    Contenido
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>


                        <NavigationMenuItem className=''>
                            <Link href="/block" legacyBehavior passHref>
                                <NavigationMenuLink
                                    className={`${navigationMenuTriggerStyle()} ${pathname === '/home/block' ? 'text-primary' : ''
                                        }`}
                                >
                                    Trabajos
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Link href="/about-me" legacyBehavior passHref>
                                <NavigationMenuLink
                                    className={`${navigationMenuTriggerStyle()} ${pathname === '/home/about-me' ? 'text-primary' : ''
                                        }`}
                                >
                                    Sobre mi
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Desktop Actions */}
                <div className="hidden md:hidden  items-center space-x-4 ">
                    <ThemeToggle /> {/*Toggle modo oscuro */}
                </div>

                {/* Mobile Menu */}

                <SideNav isOpen={isOpen} setIsOpen={setIsOpen} />

            </div>
        </div>
    )
}
