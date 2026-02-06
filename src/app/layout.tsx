
import "./globals.css";
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider as NextThemesProvider } from "next-themes"
import SessionProviderWrapper from "./SessionProviderWrapper";
import { Navbar } from "@/components/navbar/nav-bar";
import { Footer } from "@/components/footer/footer";


// Optimización de fuentes con next/font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Metadata para SEO
export const metadata = {
  title: {
    default: 'Tu Sitio Web - Título Principal',
    template: '%s | Tu Sitio Web'
  },
  description: 'Descripción profesional de tu sitio web',
  keywords: ['palabra clave 1', 'palabra clave 2', 'palabra clave 3'],
  authors: [{ name: 'Tu Nombre' }],
  creator: 'Tu Nombre',
  publisher: 'Tu Empresa',
  metadataBase: new URL('https://tudominio.com'),
  openGraph: {
    title: 'Tu Sitio Web',
    description: 'Descripción profesional de tu sitio web',
    url: 'https://tudominio.com',
    siteName: 'Tu Sitio Web',
    locale: 'es_ES',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

type LayoutProps = {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Preconnect para recursos externos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Manifest para PWA */}
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color */}
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Skip link para accesibilidad (sin event handlers) */}
        <a
          href="#main-content"
          className="skip-link hidden"
        >
          Saltar al contenido principal
        </a>

        {/* Estructura principal */}
        <div id="app">
          <main id="main-content" tabIndex={-1}>
            <SessionProviderWrapper>
              <NextThemesProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                <div className="flex min-h-screen  flex-col">
                  <Navbar />
                  {children}
                  <Footer />
                </div>
                <Toaster
                  position="top-center"
                  richColors
                  toastOptions={{
                    className: "text-sm",
                    descriptionClassName: "text-gray-400",
                  }}
                  duration={8000}
                />
              </NextThemesProvider>
            </SessionProviderWrapper>
          </main>
        </div>
      </body>
    </html>
  );
}