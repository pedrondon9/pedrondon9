"use client";

import React, { useState, useEffect } from "react";

export function VideoPlayer({ videoUrl }: { videoUrl: string }) {
  const getEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : url;
  };

  return (
    <section className="bg-[#0f172a] rounded-3xl overflow-hidden border border-slate-800/60 shadow-2xl">
      <div className="relative aspect-video w-full bg-black">
        <iframe
          key={videoUrl}
          src={getEmbedUrl(videoUrl)}
          className="absolute inset-0 h-full w-full"
          allowFullScreen
        />
      </div>
    </section>
  );
}