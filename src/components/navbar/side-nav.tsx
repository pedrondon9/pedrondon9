'use client'


import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "../ui/sheet";
import Link from "next/link";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Menu,
    Home,
    Settings,
    User,
    CreditCard,
    Bell,
    HelpCircle,
    LogOut,
    ChevronRight,
    Building,
    BarChart3,
    Users,
    FileText,
    ShoppingCart,
    MessageSquare,
    Shield,
    Zap,
    Star,
    PlusCircle,
    UserPlus2,
    BugIcon,
    ContainerIcon,
    BlocksIcon,
    LogIn
} from 'lucide-react'
import { usePathname } from "next/navigation";


type SideNavProps = {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}


const items = [

    { url: "/home/content", title: "Contenido", icon: ContainerIcon, isActive: true },
    { url: "/home/admin-content", title: "Gestión de proyectos", icon: BlocksIcon },
    { url: "/home/about-me", title: "Sobre mi", icon: User },
]




export default function SideNav({ isOpen, setIsOpen }: SideNavProps) {

    const pathname = usePathname()
    const { data: session, status } = useSession();


    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">

                {/* Header del Sidebar */}
                <SheetHeader className="p-6 border-b">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/"
                            className="flex items-center space-x-3"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="flex flex-col">
                                <span className="font-bold text-lg">pedrondong.com</span>
                            </div>
                        </Link>
                    </div>
                </SheetHeader>





                <ScrollArea className="flex-1 px-6">
                    <div className="space-y-8 py-6">
                        <nav className="space-y-2">
                            {items.map(({ url, icon: Icon, title, isActive }) => (
                                <Link
                                    key={url}
                                    href={url}
                                    onClick={() => setIsOpen(false)}
                                    className="flex border-b items-center gap-3 py-3 rounded-md hover:bg-gray-100 transition"
                                >
                                    <Icon className="w-5 h-5 text-gray-600" />
                                    <span
                                        className={`text-small leading-none font-medium ${pathname == url ? '' : 'text-muted-foreground '}`}

                                    >{title}</span>
                                </Link>

                            ))}
                        </nav >
                    </div>
                </ScrollArea>






                {/* Footer del Sidebar */}
                <SheetFooter className="p-6 border-t mt-auto ">
                    <div className="w-full space-y-4">
                        {/* User Profile */}
                        {session ?
                            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/avatars/01.png" alt="Usuario" />
                                    <AvatarFallback>{session.user?.name?.substring(0, 2).toUpperCase() || 'US'}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{session.user?.name || 'Usuario'}</p>
                                    <p className="text-xs text-muted-foreground truncate">{session.user?.email || 'admin@acme.com'}</p>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Settings className="h-4 w-4" />
                                </Button>
                            </div>
                            :
                            <></>}

                        {/* Action Buttons */}
                        <div className="grid grid-cols-1 gap-2">
                            <Button variant="outline" size="sm" className="h-9 hidden" asChild>
                                <Link href="/support" onClick={() => setIsOpen(false)}>
                                    <HelpCircle className="h-4 w-4 mr-2" />
                                    Help
                                </Link>
                            </Button>
                            {session ?
                                <Button onClick={() => signOut()} variant="outline" size="lg" className="h-9 text-red-600 hover:text-red-700 hover:bg-red-50">
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Salir
                                </Button>
                                :
                                <Button asChild onClick={() => signOut()} variant="outline" size="lg" className="h-9 px-2 text-white hover:text-green-700 hover:bg-green-50">
                                    <Link href="/login"><LogIn className="h-4 w-4 mr-2" />
                                        Iniciar sesión</Link>
                                </Button>
                            }

                        </div>

                        {/* Status */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <span>pedrondong.com todos los derechos reservados</span>
                            </div>

                        </div>
                    </div>
                </SheetFooter>

            </SheetContent>
        </Sheet>
    )
}