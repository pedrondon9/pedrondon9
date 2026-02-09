import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El correo electrónico es requerido." })
    .email({ message: "Introduce un formato de email válido (ej: usuario@correo.com)." })
    .trim() // Elimina espacios accidentales al inicio o final
    .toLowerCase(), // Normaliza para evitar problemas de duplicados por mayúsculas

  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
    .max(100, { message: "La contraseña es demasiado larga." })
    // Reglas de complejidad (Opcional pero profesional)
    .regex(/[A-Z]/, { message: "Debe contener una mayúscula como mínimo." })
    .regex(/[a-z]/, { message: "Debe contener una minúscula como mínimo." })
    .regex(/[0-9]/, { message: "Debe contener un número como mínimo." })
    .regex(/[^A-Za-z0-9]/, { message: "Debe contener un carácter especial como mínimo." }),
});


export const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre es requerido." })
    .trim(), 

  email: z
    .string()
    .min(1, { message: "El correo electrónico es requerido." })
    .email({ message: "Introduce un formato de email válido (ej: usuario@correo.com)." })
    .trim() // Elimina espacios accidentales al inicio o final
    .toLowerCase(), // Normaliza para evitar problemas de duplicados por mayúsculas

  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
    .max(100, { message: "La contraseña es demasiado larga." })
    // Reglas de complejidad (Opcional pero profesional)
    .regex(/[A-Z]/, { message: "Debe contener una mayúscula como mínimo." })
    .regex(/[a-z]/, { message: "Debe contener una minúscula como mínimo." })
    .regex(/[0-9]/, { message: "Debe contener un número como mínimo." })
    .regex(/[^A-Za-z0-9]/, { message: "Debe contener un carácter especial como mínimo." }),
});


