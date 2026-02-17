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
      <header className="bg-[#0f172a] border-b border-slate-800/60 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/home/content" className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="font-bold text-xl tracking-tight">{project.title}</h1>
          </div>
          <div className="flex gap-2">
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 space-y-12">

        {/* 1. SECCIÓN DE MEDIOS (VIDEO O IMAGEN) */}

        {project.projectVideo ?
          <section className="bg-[#0f172a] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <div className="relative aspect-video w-full bg-black">

              <iframe
                src={getEmbedUrl(project.projectVideo) || ""}
                className="absolute inset-0 h-full w-full"
                allowFullScreen
              />

            </div>
          </section>
          :
          <section className="border border-slate-800 rounded-2xl ">
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
          <div className="bg-[#0f172a] p-1.5 rounded-xl border border-slate-800/60 inline-flex shadow-sm">
            <TabsList className="bg-transparent h-10 p-0 space-x-1 border-none shadow-none">
              <TabsTrigger value="details" className="rounded-xl text-[16px] px-2 data-[state=active]:bg-slate-800 data-[state=active]:text-indigo-400 text-slate-400 font-bold transition-all border-none">Detalles</TabsTrigger>
              <TabsTrigger value="gallery" className="rounded-xl text-[16px] px-2 data-[state=active]:bg-slate-800 data-[state=active]:text-indigo-400 text-slate-400 font-bold transition-all border-none">Galería</TabsTrigger>
              <TabsTrigger value="comments" className="rounded-xl text-[16px] px-2 data-[state=active]:bg-slate-800 data-[state=active]:text-indigo-400 text-slate-400 font-bold transition-all border-none">Comentarios</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="details" className="mt-0 outline-none">
            <div className="bg-[#0f172a] rounded-xl border border-slate-800/60 p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-4 text-white">Acerca del Proyecto</h3>
              <p className="text-slate-300 leading-relaxed text-lg mb-8">{project.description}</p>
              
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="mt-0 outline-none">
            <div className="bg-[#0f172a] rounded-3xl border border-slate-800/60 p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-white">Capturas de Pantalla</h3>
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
            <div className="bg-[#0f172a] rounded-3xl border border-slate-800/60 p-6 shadow-xl">
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
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>

          <Card className="relative bg-[#0b1221] border-slate-800/60 rounded-[1rem] shadow-2xl overflow-hidden">
            <CardContent className="py-8 px-8">
              <div className="flex flex-col lg:flex-row gap-12 items-center">

                {/* Info del Proyecto */}
                <div className="flex-1 space-y-6 text-center lg:text-left">
                  <div className="space-y-2">
                    <h3 className="text-2xl md:text-2xl font-black tracking-tight text-white">
                      ¿Quieres explorar el código?
                    </h3>
                    <p className="text-slate-400 text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
                      Este proyecto es de código abierto. Puedes revisar la implementación o probar la demo interactiva.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
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

              <Separator className="my-10 bg-slate-800/40" />

              {/* Footer de la tarjeta con Metadatos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="flex items-center gap-4 group/item">
                  <div className="h-12 w-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover/item:border-indigo-500/50 transition-colors">
                    <User className="h-5 w-10 text-slate-500 group-hover/item:text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-[13px] font-black uppercase tracking-tighter text-slate-500">Autor</p>
                    <p className="text-md text-slate-200 font-semibold tracking-tight">Admin del Proyecto</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group/item ">
                  <div className="h-12 w-18 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover/item:border-indigo-500/50 transition-colors">
                    <ShieldCheck className="h-5 w-5 text-slate-500 group-hover/item:text-indigo-400" />
                  </div>
                  <div>
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