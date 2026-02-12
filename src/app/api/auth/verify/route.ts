import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) redirect("/login?error=InvalidToken");

  const verifiedToken = await prisma.verificationToken.findUnique({
    where: { token }
  });

  // Si el token no existe o expiró
  if (!verifiedToken || verifiedToken.expires < new Date()) {
    redirect("/login?error=TokenExpired");
  }

  // Actualizar usuario y borrar token
  await prisma.user.update({
    where: { email: verifiedToken.identifier },
    data: { emailVerified: new Date() }
  });

  await prisma.verificationToken.delete({ where: { token } });

  // Redirigir al login con mensaje de éxito
  redirect("/login?verified=true");
}