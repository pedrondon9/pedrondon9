import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github"; // Example provider

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // Add other providers here
  ],
  // This secret is required for production and helps encrypt cookies
  secret: process.env.NEXTAUTH_SECRET, 
});

export { handler as GET, handler as POST };