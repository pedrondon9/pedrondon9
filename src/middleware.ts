import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // Definir rutas
  const isProtectedRoute = nextUrl.pathname.startsWith("/dashboard") ||
    nextUrl.pathname.startsWith("/admin") ||
    nextUrl.pathname.startsWith("/home/add-content") ||
    nextUrl.pathname.startsWith("/home/admin-content") ||
    nextUrl.pathname.startsWith("/home/edit-content") ||
    nextUrl.pathname.startsWith("/register")


  const isAuthRoute = nextUrl.pathname.startsWith("/login") ||
    nextUrl.pathname.startsWith("/forgot-password") ||
    nextUrl.pathname.startsWith("/new-password")

  // 1. Si es una ruta de autenticación (Login/Register)
  if (isAuthRoute) {
    if (isLoggedIn) {
      // Si ya está logueado, lo mandamos a la ruta raiz /
      return NextResponse.redirect(new URL("/", nextUrl))
    }
    return NextResponse.next() // Si no está logueado, puede ver el login/register
  }

  // 2. Si es una ruta protegida y NO está logueado
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl))
  }

  return NextResponse.next()
})

// IMPORTANTE: El matcher decide qué rutas ejecutan este middleware
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}