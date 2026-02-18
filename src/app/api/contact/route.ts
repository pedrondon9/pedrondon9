import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "@/lib/mail";
import { sendContactEmail } from "@/lib/contact-email";

export async function POST(req: Request) {
  try {
    const { email, description, name } = await req.json();
    const email_trim = email.toLowerCase().trim();


    // 4. ENVIAR EL CORREO REAL
    await sendContactEmail(
      name,  
      email_trim, 
      `Me gustaría contactarte `, // Asunto breve basado en la
      description
    );

    await sendContactEmail(
      'pedrondong.com',
      '',
      "pedrondong.com - data science, AI y Full Stack Developer",
      'Gracias por contactarme. He recibido tu mensaje y me pondré en contacto contigo lo antes posible. Mientras tanto, puedes visitar mi portafolio para ver mis proyectos y habilidades. ¡Espero poder colaborar contigo pronto! '
    );

    return NextResponse.json({ message: "Mensaje enviado correctamente" }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}