import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "@/lib/mail"; // Ajusta la ruta a tu archivo de correo

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    const email_trim = email.toLowerCase().trim();

    // 1. Limpieza de usuario no verificado previo (tu lógica anterior)
    const existingUser = await prisma.user.findUnique({ where: { email: email_trim } });
    if (existingUser) {
      if (existingUser.emailVerified) {
        return NextResponse.json({ error: "Este correo ya está registrado." }, { status: 400 });
      }
      await prisma.user.delete({ where: { id: existingUser.id } });
      await prisma.verificationToken.deleteMany({ where: { identifier: email_trim } }); 
    }

    // 2. Generar datos
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = uuidv4();
    const expires = new Date(Date.now() + 3600 * 1000);
    const verificationLink = `${process.env.AUTH_URL}/api/auth/verify?token=${token}`;

    // 3. Guardar en DB
    await prisma.$transaction([
      prisma.verificationToken.create({
        data: { identifier: email_trim, token, expires }
      }),
      prisma.user.create({
        data: { name, email: email_trim, passwordHash: hashedPassword }
      }),
    ]);

    // 4. ENVIAR EL CORREO REAL
    await sendVerificationEmail(
      email_trim,
      verificationLink,
      "¡Bienvenido a PREDRO_NDONG !",
      "Gracias por registrarte. Para activar tu cuenta y empezar a gestionar tus proyectos de Full Stack y Data Science, haz clic en el botón de abajo.",
      "Verificar mi cuenta"
    );

    return NextResponse.json({ message: "Registro exitoso. Revisa tu correo para verificar tu cuenta." }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}