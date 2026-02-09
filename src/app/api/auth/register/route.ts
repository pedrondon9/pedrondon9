import { NextResponse } from "next/server"
import { prisma } from "../../../../lib/prisma" // El archivo que creamos antes
import bcrypt from "bcrypt"

export async function POST(req: Request) {

    try {
        const { name, email, password } = await req.json()

        const hashedPassword = await bcrypt.hash(password, 10)

        console.log({ name, email, password, hashedPassword, })



        const email_trim = email.toLowerCase().trim();

        // Buscar usuario
        const user = await prisma.user.findUnique({
            where: { email: email_trim }
        });

        console.log("Usuario encontrado:", user);

        if (user) {
            // No revelar que el usuario no existe
            return NextResponse.json({ error: "Credenciales inválidas" });

        }

        return NextResponse.json({ message: "Completa la actualizacion del password. Con el link que hemos enviado en tu correo." });


    } catch (error) {
        console.error("Error en el registro:", error);
                
        return NextResponse.json({ message: "Completa la actualizacion del password. Con el link que hemos enviado en tu correo." });


    }


}