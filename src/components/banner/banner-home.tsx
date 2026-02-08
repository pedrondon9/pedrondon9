"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, BrainCircuit, Code2 } from "lucide-react";

export const BannerHome = () => {
  return (
    <section className="relative w-full py-20 lg:py-15 overflow-hidden bg-black text-white">
      {/* Efecto de fondo sutil (Glow) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent blur-3xl" />

      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center text-center space-y-8">
        
        {/* Etiqueta superior */}
        <Badge variant="outline" className="px-4 py-1 border-indigo-500/50 text-indigo-400 bg-indigo-500/5 backdrop-blur-sm">
          <Sparkles className="w-3 h-3 mr-2" />
          Disponible para nuevos desafíos
        </Badge>

        {/* Título Principal */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Ciencia de Datos</span> y el Desarrollo <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Full Stack</span> 
        se encuentran aquí
        </h1>

        {/* Descripción / Subtítulo */}
        <p className="max-w-2xl text-lg md:text-xl text-slate-400 leading-relaxed">
          Nacido en <strong>Guinea Ecuatorial</strong>, mi viaje comenzó como autodidacta y hoy se consolida como 
          <strong> Full Stack Developer certificado por IBM</strong>. Actualmente, curso el Grado en 
          <strong> IA y Ciencia de Datos</strong> para construir el futuro de la tecnología.
        </p>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <Button size="lg" className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-14 text-lg font-semibold shadow-[0_0_20px_rgba(79,70,229,0.4)]">
            ¿Quieres contactarme? <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full mt-10 sm:mt-0 border-slate-700 hover:bg-slate-900 px-8 h-14 text-lg">
            Ver Proyectos
          </Button>
        </div>

        {/* Tecnologías destacadas en el banner */}
        <div className="pt-12 flex flex-wrap justify-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2"><BrainCircuit size={20} /> <span className="text-sm font-mono">TensorFlow</span></div>
          <div className="flex items-center gap-2"><Code2 size={20} /> <span className="text-sm font-mono">Next.js</span></div>
          <div className="flex items-center gap-2"><Sparkles size={20} /> <span className="text-sm font-mono">IBM Certified</span></div>
        </div>
      </div>
    </section>
  );
};

