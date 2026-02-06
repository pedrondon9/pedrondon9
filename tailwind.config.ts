import type { Config } from "tailwindcss"

const config: Config = {
  theme: {
    extend: {
      colors: {
        //Paleta principal
        background: "#0a0a0a", // Fondo general
        surface: "#111111", // Para cards y secciones
        accent: "#8B5CF6", // Violeta principal
        accentHover: "#7C3AED", // Hover violeta
        accentSoft: "#8B5CF61A", // Suave translúcido (para badges)
        cyanAccent: "#22D3EE", // Azul cian brillante
        textPrimary: "#EAEAEA", // Texto principal
        textSecondary: "#A1A1AA", // Texto secundario
        borderColor: "#27272A", // Bordes suaves
      },
      boxShadow: {
        glow: "0 0 20px rgba(139, 92, 246, 0.3)", // efecto violeta glow
      },
    },
  },
  plugins: [],
}
export default config
