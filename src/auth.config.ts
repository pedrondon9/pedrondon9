// auth.config.ts
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        return null // Se llena en el archivo auth.ts
      },
    }),
  ],
} satisfies NextAuthConfig