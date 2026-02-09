import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Esto es vital para servidores Docker
  eslint: {
    // Ignora errores de ESLint durante el build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignora errores de TypeScript durante el build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
