"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Navbar } from "@/components/navbar/nav-bar"
import { Footer } from "@/components/footer/footer"

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}