import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "@/lib/mail"; // Reutilizamos tu lógica

export async function POST(req: Request) {

  try {
    const { email } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } });

    // Seguridad: No confirmes si el email existe o no para evitar "user enumeration"
    if (!user) return NextResponse.json({ message: "Si el correo existe, recibirás un enlace de recuperación de tu contraseña." }); 

    const token = uuidv4();
    const expires = new Date(Date.now() + 3600 * 1000); // 1 hora de validez

    await prisma.passwordResetToken.create({
      data: { email, token, expires }
    });

    const resetLink = `${process.env.NEXTAUTH_URL}/new-password?token=${token}`;

    await sendVerificationEmail(
      email,
      resetLink,
      "Recuperar Contraseña",
      "Has solicitado restablecer tu contraseña. Haz clic en el botón para continuar. Este enlace expira en 1 hora.",
      "Restablecer Contraseña"
    );

    return NextResponse.json({ message: "Si el correo existe, recibirás un enlace de recuperación de tu contraseña." });
  } catch (error) {

    return NextResponse.json({ message: "Error al enviar el correo." }, { status: 500 });

  }
}