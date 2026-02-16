import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Github, 
  Globe, 
  MessageSquare, 
  Play, 
  Star, 
  Share2, 
  Calendar,
  User,
  Tag,
  Code2,
  Heart,
  MessageCircle,
  ThumbsUp,
  Send,
  ChevronDown,
  Maximize2,
  Volume2,
  Settings
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { cache } from "react";

// Cachear la consulta para evitar peticiones duplicadas
const getProject = cache(async (id: string) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
      include: { 
        images: {
          orderBy: { id: 'asc' }
        }, 
        categories: true 
      },
    });
    return project;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
});

// Generar metadata dinámica para SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(id);
  
  if (!project) {
    return {
      title: "Proyecto no encontrado",
    };
  }

  return {
    title: project.title,
    description: project.description?.substring(0, 160),
    openGraph: {
      title: project.title,
      description: project.description?.substring(0, 160),
      images: project.images[0]?.url ? [project.images[0].url] : [],
    },
  };
}

// Componente mejorado del reproductor de video
function VideoPlayer({ videoUrl, title }: { videoUrl: string | null; title: string }) {
  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    
    if (url.includes('youtube.com/watch')) {
      return url.replace("watch?v=", "embed/") + "?autoplay=1&modestbranding=1&rel=0";
    }
    if (url.includes('youtu.be')) {
      const videoId = url.split('/').pop();
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;
    }
    if (url.includes('vimeo.com')) {
      const videoId = url.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`;
    }
    return url;
  };

  const embedUrl = videoUrl ? getEmbedUrl(videoUrl) : null;

  return (
    <div className="w-full bg-gradient-to-b from-slate-900/50 via-transparent to-transparent">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="relative group">
          {/* Contenedor del video con efectos */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-black shadow-2xl">
            {embedUrl ? (
              <>
                <div className="relative aspect-video w-full">
                  <iframe
                    src={embedUrl}
                    className="absolute inset-0 h-full w-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    title={title}
                    loading="lazy"
                  />
                </div>
                
                {/* Overlay de controles (simulados para diseño) */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/20">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/20">
                        <Volume2 className="h-4 w-4" />
                      </Button>
                      <div className="text-sm text-white/80">
                        <span>0:00</span>
                        <span className="mx-1">/</span>
                        <span>3:45</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/20">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/20">
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="aspect-video w-full flex flex-col items-center justify-center bg-slate-900">
                <div className="w-20 h-20 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                  <Play className="h-10 w-10 text-indigo-400" />
                </div>
                <p className="text-slate-400 text-lg">Demo en video próximamente</p>
                <p className="text-sm text-slate-600 mt-2">Mientras tanto, explora las imágenes del proyecto</p>
              </div>
            )}
          </div>

          {/* Miniaturas de navegación rápida */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-full px-4 py-2 shadow-xl">
            <button className="w-2 h-2 rounded-full bg-indigo-500" />
            <button className="w-2 h-2 rounded-full bg-slate-600 hover:bg-slate-500 transition-colors" />
            <button className="w-2 h-2 rounded-full bg-slate-600 hover:bg-slate-500 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente mejorado de comentarios placeholder
function CommentsPlaceholder() {
  // Comentarios de ejemplo para el placeholder
  const placeholderComments = [
    {
      id: 1,
      author: "María González",
      avatar: "MG",
      date: "Hace 2 días",
      content: "¡Excelente trabajo! Me encanta la interfaz de usuario. ¿Qué librería usaste para las animaciones?",
      likes: 12,
      replies: 3
    },
    {
      id: 2,
      author: "Carlos Rodríguez",
      avatar: "CR",
      date: "Hace 5 días",
      content: "Muy interesante el stack tecnológico. ¿Tienes pensado hacer un tutorial?",
      likes: 8,
      replies: 1
    },
    {
      id: 3,
      author: "Ana Martínez",
      avatar: "AM",
      date: "Hace 1 semana",
      content: "Me encantaría contribuir a este proyecto. ¿Está abierto a colaboraciones?",
      likes: 5,
      replies: 2
    }
  ];

  return (
    <div className="space-y-8">
      {/* Cabecera de comentarios */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-indigo-400" />
          <h3 className="text-lg font-semibold text-white">Comentarios <span className="text-slate-500">(12)</span></h3>
        </div>
        <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 bg-indigo-500/10">
          Próximamente
        </Badge>
      </div>

      {/* Caja de comentario placeholder */}
      <div className="relative opacity-60">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
              TU
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
              <textarea
                disabled
                placeholder="Inicia sesión para comentar..."
                className="w-full bg-transparent text-slate-300 placeholder-slate-600 p-4 outline-none resize-none"
                rows={3}
              />
              <div className="flex items-center justify-between border-t border-slate-800 px-4 py-3 bg-slate-900/30">
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" disabled className="text-slate-600">
                    <Tag className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" disabled className="text-slate-600">
                    <Code2 className="h-4 w-4" />
                  </Button>
                </div>
                <Button size="sm" disabled className="bg-indigo-500/50 text-white cursor-not-allowed">
                  Comentar
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de comentarios de ejemplo */}
      <div className="space-y-6 opacity-40">
        {placeholderComments.map((comment) => (
          <div key={comment.id} className="flex gap-4 group">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-semibold border border-slate-700">
                {comment.avatar}
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-slate-900/30 rounded-2xl p-4 border border-slate-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-white">{comment.author}</span>
                  <span className="text-xs text-slate-600">•</span>
                  <span className="text-xs text-slate-600">{comment.date}</span>
                </div>
                <p className="text-slate-400 text-sm">{comment.content}</p>
                <div className="flex items-center gap-4 mt-3">
                  <button className="flex items-center gap-1 text-slate-600 hover:text-slate-400 transition-colors">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-xs">{comment.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-slate-600 hover:text-slate-400 transition-colors">
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-xs">{comment.replies} respuestas</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mensaje de "próximamente" superpuesto */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 text-center border border-indigo-500/30 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Comunidad en camino</h3>
            <p className="text-slate-400 max-w-md">
              Estamos trabajando en una sección de comentarios interactiva. 
              Muy pronto podrás compartir tus ideas y feedback con la comunidad.
            </p>
            <div className="flex gap-2 justify-center mt-6">
              <Badge variant="outline" className="border-slate-700 text-slate-400">
                Discusiones
              </Badge>
              <Badge variant="outline" className="border-slate-700 text-slate-400">
                Respuestas en tiempo real
              </Badge>
              <Badge variant="outline" className="border-slate-700 text-slate-400">
                @menciones
              </Badge>
            </div>
          </div>
        </div>
        
        {/* Versión borrosa del contenido para dar sensación de "próximamente" */}
        <div className="blur-sm select-none pointer-events-none">
          {/* Aquí iría el contenido real de comentarios */}
        </div>
      </div>
    </div>
  );
}

// Componente principal
export default async function ProjectViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  if (isNaN(parseInt(id))) {
    notFound();
  }

  const project = await getProject(id);
  
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#020617]">
      {/* Reproductor de video integrado */}
      <VideoPlayer videoUrl={project.projectVideo} title={project.title} />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* CONTENIDO PRINCIPAL */}
          <div className="lg:col-span-2 space-y-8">
            {/* Cabecera del proyecto */}
            <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-2 flex-wrap">
                    {project.categories.map((cat) => (
                      <Badge 
                        key={cat.id} 
                        className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 px-3 py-1 hover:bg-indigo-500/20 transition-colors"
                      >
                        {cat.name}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                      <Star className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                      <Heart className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <h1 className="text-4xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  {project.title}
                </h1>

                {/* Metadata del proyecto */}
                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>Autor del proyecto</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(project.createdAt).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs de contenido */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="bg-slate-900 border border-slate-800 p-1 w-full justify-start overflow-x-auto">
                <TabsTrigger value="description" className="data-[state=active]:bg-indigo-500/20">
                  Descripción
                </TabsTrigger>
                {project.images.length > 0 && (
                  <TabsTrigger value="images" className="data-[state=active]:bg-indigo-500/20">
                    Galería ({project.images.length})
                  </TabsTrigger>
                )}
                <TabsTrigger value="comments" className="relative data-[state=active]:bg-indigo-500/20">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Comentarios
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="py-6">
                <Card className="bg-slate-900/40 border-slate-800">
                  <CardContent className="p-6">
                    <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed">
                      {project.description}
                    </div>
                    
                    {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                      <>
                        <Separator className="my-6 bg-slate-800" />
                        <div>
                          <h3 className="text-sm font-semibold text-slate-400 mb-3 flex items-center gap-2">
                            <Code2 className="h-4 w-4" />
                            Tecnologías utilizadas
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, i) => (
                              <span 
                                key={i} 
                                className="text-xs font-mono bg-slate-800/50 px-3 py-1.5 rounded-md text-slate-300 border border-slate-700 hover:border-indigo-500/30 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {project.images.length > 0 && (
                <TabsContent value="images" className="py-6">
                  <Card className="bg-slate-900/40 border-slate-800">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {project.images.map((img) => (
                          <div 
                            key={img.id} 
                            className="relative aspect-video rounded-xl border border-slate-800 overflow-hidden group cursor-pointer"
                          >
                            <Image
                              src={img.url}
                              alt={`Captura de ${project.title}`}
                              fill
                              className="object-cover transition-transform group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              <TabsContent value="comments" className="py-6">
                <Card className="bg-slate-900/40 border-slate-800">
                  <CardContent className="p-6">
                    <CommentsPlaceholder />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* SIDEBAR MEJORADO */}
          <aside className="space-y-6">
            <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-md sticky top-10">
              <CardHeader>
                <CardTitle className="text-lg text-white">Acciones del proyecto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {project.projectLink && (
                    <Button asChild className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-6 transition-all duration-200 transform hover:scale-[1.02]">
                      <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
                        <Globe className="mr-2 h-5 w-5" /> Demo en Vivo
                      </a>
                    </Button>
                  )}
                  
                  {project.githubLink && (
                    <Button asChild variant="outline" className="w-full border-slate-700 hover:bg-slate-800 hover:text-white py-6 text-slate-200 transition-all duration-200">
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-5 w-5" /> Ver Código
                      </a>
                    </Button>
                  )}
                </div>
                
                <Separator className="bg-slate-800" />
                
                {/* Estadísticas del proyecto */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-slate-800/30 border border-slate-700">
                    <div className="text-2xl font-bold text-indigo-400">123</div>
                    <div className="text-xs text-slate-500">Vistas</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-slate-800/30 border border-slate-700">
                    <div className="text-2xl font-bold text-indigo-400">45</div>
                    <div className="text-xs text-slate-500">Likes</div>
                  </div>
                </div>

                <Separator className="bg-slate-800" />
                
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <Tag className="h-3 w-3" />
                    Especificaciones
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Estado:</span>
                      <span className="text-right text-emerald-400 font-medium bg-emerald-400/10 px-3 py-1 rounded-full text-xs">
                        Completado
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Licencia:</span>
                      <span className="text-right text-slate-200">MIT</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Última actualización:</span>
                      <span className="text-right text-slate-200">
                        {new Date(project.createdAt).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Botón de volver */}
                <div className="pt-4">
                  <Button 
                    variant="ghost" 
                    className="w-full text-slate-400 hover:text-white hover:bg-slate-800"
                    asChild
                  >
                    <Link href="/projects">
                      ← Volver a proyectos
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Proyectos relacionados (placeholder) */}
            <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-sm text-white">Proyectos relacionados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer">
                    <div className="w-12 h-12 rounded-lg bg-slate-800 animate-pulse" />
                    <div className="flex-1">
                      <div className="h-4 bg-slate-800 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-slate-800 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}