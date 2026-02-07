import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Esto es vital para servidores Docker
};

export default nextConfig;
