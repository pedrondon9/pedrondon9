import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Github, Globe, ArrowLeft, Star,
  Share2, Image as ImageIcon, ShieldCheck, User, Send, Play
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SCHEMES = [
    // --- LOS ORIGINALES ---
    { bg: "bg-slate-900/40", border: "border-slate-800", title: "text-slate-100", accent: "text-blue-400" },
    { bg: "bg-zinc-900/40", border: "border-zinc-800", title: "text-zinc-100", accent: "text-emerald-400" },
    { bg: "bg-neutral-900/40", border: "border-neutral-800", title: "text-neutral-100", accent: "text-amber-400" },
    { bg: "bg-indigo-950/20", border: "border-indigo-900/50", title: "text-indigo-100", accent: "text-indigo-400" },
    { bg: "bg-purple-950/20", border: "border-purple-900/50", title: "text-purple-100", accent: "text-purple-400" },
    { bg: "bg-rose-950/20", border: "border-rose-900/50", title: "text-rose-100", accent: "text-rose-400" },

    // --- NUEVAS INCORPORACIONES ---
    // Cyan/Teal: Muy tecnológico y limpio
    { bg: "bg-cyan-950/20", border: "border-cyan-900/40", title: "text-cyan-50", accent: "text-cyan-400" },
    
    // Esmeralda/Bosque: Transmite confianza y estabilidad
    { bg: "bg-teal-950/20", border: "border-teal-900/40", title: "text-teal-50", accent: "text-teal-400" },
    
    // Naranja/Ámbar: Ideal para destacar proyectos creativos
    { bg: "bg-orange-950/20", border: "border-orange-900/40", title: "text-orange-50", accent: "text-orange-400" },
    
    // Azul Cielo: Vibrante pero profesional
    { bg: "bg-sky-950/20", border: "border-sky-900/40", title: "text-sky-50", accent: "text-sky-400" },
    
    // Lima/Neon: Da un toque de modernidad extrema
    { bg: "bg-lime-950/20", border: "border-lime-900/40", title: "text-lime-50", accent: "text-lime-400" },
    
    // Fucsia/Violeta: Un toque artístico y elegante
    { bg: "bg-fuchsia-950/20", border: "border-fuchsia-900/40", title: "text-fuchsia-50", accent: "text-fuchsia-400" },
];

export default async function ProjectViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id: parseInt(id) },
    include: { images: true, categories: true },
  });


  if (!project) notFound();

  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11)
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  };

  const coverImage = project.images.length > 0 ? project.images[0].url : null;

  return (
    <div className="min-h-screen bg-black text-slate-50 selection:bg-indigo-500/30">

      {/* HEADER */}
      <header className="bg-transparent border-none border-slate-800/60 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-1  flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" className={cn('my-5')}>
              <Link href="/home/content" className={cn('p-2  rounded-full  text-slate-400',SCHEMES[project.id % SCHEMES.length].bg,
              SCHEMES[project.id % SCHEMES.length].border,'border-[1px] ' )}> 
                <ArrowLeft className="h-5 w-5" />
                Atras
              </Link>
            </Button>
          </div>
          <div className="flex gap-2">
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-1 md:px-1 py-8 space-y-12">

        <h1 className={cn('font-bold text-3xl tracking-tight',SCHEMES[project.id % SCHEMES.length].title)}>{project.title}</h1>

        {/* 1. SECCIÓN DE MEDIOS (VIDEO O IMAGEN) */}

        {project.projectVideo ?
          <section className={cn('bg-[#0f172a] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl',SCHEMES[project.id % SCHEMES.length].bg,
            SCHEMES[project.id % SCHEMES.length].border,
            'border-[1px] ' )}>
            <div className="relative aspect-video w-full bg-black">

              <iframe
                src={getEmbedUrl(project.projectVideo) || ""}
                className="absolute inset-0 h-full w-full"
                allowFullScreen
              />

            </div>
          </section>
          :
          <section className="border border-slate-800 rounded-2xl hidden">
            <div className="relative md:h-150 w-full group">
              <img
                src={`${process.env.AUTH_URL}/${coverImage}`}
                alt={project.title}
                className="h-full w-full object-contain "
              />

            </div>
          </section>
        }


        {/* 2. SECCIÓN DE TABS (DETALLES, GALERÍA, COMENTARIOS) - AHORA SEGUNDO */}
        <Tabs defaultValue="details" className="w-full space-y-6">
          <div 
            className={cn(
              'relative rounded-[5px] overflow-hidden p-1.5 rounded-xl border  inline-flex',
              SCHEMES[project.id % SCHEMES.length].bg,
              SCHEMES[project.id % SCHEMES.length].border,
              'border-none ' // Efecto profesional de cristal
            )}>

            <TabsList className="bg-transparent h-10 p-0 space-x-1 border-none shadow-none">
              <TabsTrigger value="details" className="rounded-xl text-[16px] px-2 data-[state=active]:bg-slate-800 data-[state=active]:text-indigo-400 text-slate-400 font-bold transition-all border-none">Detalles</TabsTrigger>
              <TabsTrigger value="gallery" className="rounded-xl text-[16px] px-2 data-[state=active]:bg-slate-800 data-[state=active]:text-indigo-400 text-slate-400 font-bold transition-all border-none hidden">Galería</TabsTrigger>
              <TabsTrigger value="comments" className="rounded-xl text-[16px] px-2 data-[state=active]:bg-slate-800 data-[state=active]:text-indigo-400 text-slate-400 font-bold transition-all border-none hidden">Comentarios</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="details" className="mt-0 outline-none">
            <div className={cn('rounded-xl p-1.5',SCHEMES[project.id % SCHEMES.length].bg,
              SCHEMES[project.id % SCHEMES.length].border,
              'border-none ' )} >
              <h3 className={cn('text-2xl font-bold mb-4 tracking-tight',SCHEMES[project.id % SCHEMES.length].title)}>Acerca del Proyecto</h3>
              <p className="text-slate-300 leading-relaxed text-lg mb-8">{project.description}</p>

            </div>
          </TabsContent>

          <TabsContent value="gallery" className="mt-0 outline-none">
            <div className={cn('rounded-xl p-8 ',SCHEMES[project.id % SCHEMES.length].bg,
              SCHEMES[project.id % SCHEMES.length].border,
              'border-[1px] ' )}>
              <h3 className={cn('text-2xl font-bold mb-4 tracking-tight',SCHEMES[project.id % SCHEMES.length].title)}>Capturas de Pantalla</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.images.map((img) => (
                  <div key={img.id} className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-black aspect-video">
                    <img src={img.url} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Preview" />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="comments" className="mt-0 outline-none space-y-6">
            <div className={cn('rounded-xl p-8 ',SCHEMES[project.id % SCHEMES.length].bg,
              SCHEMES[project.id % SCHEMES.length].border,
              'border-none ' )}>
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20"><User className="h-5 w-5" /></div>
                <textarea placeholder="Deja una duda o aporte..." className="flex-1 bg-transparent border-none text-slate-300 focus:ring-0 resize-none h-12" disabled />
              </div>
            </div>
            <p className="text-center text-sm text-slate-600 italic">No hay comentarios aún.</p>
          </TabsContent>
        </Tabs>

        {/* 3. SECCIÓN DE ENLACES Y ACCIONES - DISEÑO PREMIUM */}
        <section className="relative group">
          {/* Decoración de fondo (un brillo sutil detrás de la tarjeta) */}

          <Card
          className={cn('rounded-[1rem] p-1.5 overflow-hidden relative' ,SCHEMES[project.id % SCHEMES.length].bg,
              SCHEMES[project.id % SCHEMES.length].border,
              'border-none ' )}
          
          >
            <CardContent className="p-1">
              <div className="flex flex-col  lg:flex-row gap-12 ">

                {/* Info del Proyecto */}
                <div className="space-y-6   text-left">
                  <div className="space-y-2">
                    <h3 className={cn('text-2xl font-bold mb-4 tracking-tight',SCHEMES[project.id % SCHEMES.length].title)}>
                      ¿Quieres explorar el código?
                    </h3>
                    <p className="text-slate-400 text-lg mx-auto lg:mx-0 leading-relaxed">
                      Este proyecto es de código abierto. Puedes revisar la implementación o probar la demo interactiva.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-start">
                    {project.categories.map((cat) => (
                      <span key={cat.id} className="text-[14px] font-bold uppercase tracking-[0.2em] text-indigo-400/80 bg-indigo-500/5 px-3 py-1 rounded-md border border-muted">
                        {cat.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Botones de Acción */}
                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                  <Button asChild className="h-16 px-10 rounded-2xl bg-white text-black hover:bg-slate-200 font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all active:scale-95">
                    <a href={project.projectLink || "#"} target="_blank">
                      <Globe className="mr-2 h-5 w-5" /> Lanzar Demo
                    </a>
                  </Button>

                  <Button asChild variant="outline" className="h-16 px-10 rounded-2xl border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-white font-bold text-lg transition-all active:scale-95">
                    <a href={project.githubLink || "#"} target="_blank">
                      <Github className="mr-2 h-5 w-5" /> GitHub
                    </a>
                  </Button>
                </div>
              </div>


              {/* Footer de la tarjeta con Metadatos */}
              <div className="grid grid-cols-1 mt-15 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="flex items-center gap-4 group/item">
                  <div className="h-12 w-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover/item:border-indigo-500/50 transition-colors">
                    <User className="h-5 w-10 text-slate-500 group-hover/item:text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-[13px] font-black uppercase tracking-tighter text-slate-500">Autor</p>
                    <p className="text-md text-slate-200 font-semibold tracking-tight">pedro ndong</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group/item hidden">
                  <div className="h-12 w-18 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover/item:border-indigo-500/50 transition-colors">
                    <ShieldCheck className="h-5 w-5 text-slate-500 group-hover/item:text-indigo-400" />
                  </div>
                  <div className="">
                    <p className="text-[13px] font-black uppercase tracking-tighter text-slate-500">Licencia</p>
                    <p className="text-md text-slate-200 font-semibold tracking-tight">MIT Open Source</p>
                  </div>
                </div>

                {/* Añadimos un dato extra para llenar espacio: Fecha */}
                <div className="flex items-center gap-4 group/item hidden">
                  <div className="h-12 w-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover/item:border-indigo-500/50 transition-colors">
                    <Star className="h-5 w-5 text-slate-500 group-hover/item:text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-tighter text-slate-500">Estado</p>
                    <p className="text-sm text-slate-200 font-semibold tracking-tight">Verificado</p>
                  </div>
                </div>

                {/* Botón rápido de compartir */}
                <div className="flex items-center justify-center sm:justify-end hidden">
                  <Button variant="ghost" className="text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl gap-2">
                    <Share2 className="h-4 w-4" /> Compartir
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

      </main>
    </div>
  );
}