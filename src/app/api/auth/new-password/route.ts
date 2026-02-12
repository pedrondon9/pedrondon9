import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json();


        // 1. Validar el token
        const existingToken = await prisma.passwordResetToken.findUnique({
            where: { token }
        });

        if (!existingToken || existingToken.expires < new Date()) {
            return NextResponse.json({ error: "Token inválido o expirado" }, { status: 400 });
        }

        // 2. Encriptar nueva contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Actualizar usuario y borrar token (Transacción)
        await prisma.$transaction([
            prisma.user.update({
                where: { email: existingToken.email },
                data: { passwordHash: hashedPassword }
            }),
            prisma.passwordResetToken.delete({ where: { id: existingToken.id } })
        ]);

        return NextResponse.json({ message: "Contraseña actualizada con éxito" });

    } catch (error) {

        return NextResponse.json({ error: "Error al actualizar la contraseña" }, { status: 500 });
    }
}