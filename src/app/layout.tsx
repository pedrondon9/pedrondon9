
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
    default: 'Pedro Ndong | Data Scientist & Full Stack Developer',
    template: '%s | Pedro Ndong'
  },
  description: 'Especialista en Data Science, Inteligencia Artificial y Desarrollo Full Stack. Soluciones tecnológicas escalables y análisis de datos avanzado.',
  keywords: [
    'Pedro Ndong Ondo Avomo', 
    'Data Scientist', 
    'Machine Learning Engineer', 
    'Full Stack Developer', 
    'IA aplicada', 
    'Desarrollo Web'
  ],
  authors: [{ name: 'Pedro Ndong', url: 'https://pedrondong.com' }],
  creator: 'Pedro Ndong',
  publisher: 'Pedro Ndong',
  metadataBase: new URL('https://pedrondong.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Pedro Ndong | Data Science & AI Expert',
    description: 'Portafolio profesional de Pedro Ndong. Innovación en IA y desarrollo de software de alto impacto.',
    url: 'https://pedrondong.com',
    siteName: 'Pedro Ndong Portfolio',
    images: [
      {
        url: '/og-image.png', // Asegúrate de tener esta imagen en tu carpeta public
        width: 1200,
        height: 630,
        alt: 'Pedro Ndong - Data Science and AI',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pedro Ndong | Data Scientist & Full Stack Developer',
    description: 'Transformando datos en decisiones y código en soluciones.',
    creator: '@tu_usuario_twitter', // Opcional
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
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