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


export const addContentSchema = z.object({
  title: z
    .string()
    .min(10, "El título es requerido.")
    .trim(),

  description: z
    .string()
    .min(15, "La descripción debe tener 15 caracteres como minimino.")
    .trim(),
  images: z
    .array(z.instanceof(File))
    .min(1, "Debes subir al menos una imagen"),
  // RELACIÓN MUCHOS A MUCHOS: Array de IDs numéricos para la tabla Category
  categoryIds: z
    .array(z.number())
    .min(1, "Selecciona una categoría como minimino."),

  // ARRAY NATIVO: Transforma el string del input "React, Nextjs" en ["React", "Nextjs"]
  technologies: z
    .string()
    .optional()
    .or(z.literal("")),
  // Validaciones de URLs (permanecen iguales)
  projectLink: z
    .string()
    .url("URL no válida")
    .optional().or(z.literal("")),
  projectVideo: z
    .string().url("URL no válida")
    .optional().or(z.literal("")),
  githubLink: z
    .string()
    .url("URL no válida")
    .optional()
    .or(z.literal("")),
  imageLink: z
    .string()
    .url("URL no válida")
    .optional()
    .or(z.literal("")),
});

export const editContentSchema = z.object({
  title: z
    .string()
    .min(10, "El título es requerido.")
    .trim(),

  description: z
    .string()
    .min(15, "La descripción debe tener 15 caracteres como minimino.")
    .trim(),
  images: z
    .array(z.instanceof(File))
    .optional()
    .nullable(),
  // RELACIÓN MUCHOS A MUCHOS: Array de IDs numéricos para la tabla Category
  categoryIds: z
    .array(z.number())
    .min(1, "Selecciona una categoría como minimino."),

  // ARRAY NATIVO: Transforma el string del input "React, Nextjs" en ["React", "Nextjs"]
  technologies: z
    .string()
    .optional()
    .or(z.literal("")),
  // Validaciones de URLs (permanecen iguales)
  projectLink: z
    .string()
    .url("URL no válida")
    .optional().or(z.literal("")),
  projectVideo: z
    .string().url("URL no válida")
    .optional().or(z.literal("")),
  githubLink: z
    .string()
    .url("URL no válida")
    .optional()
    .or(z.literal("")),
  imageLink: z
    .string()
    .url("URL no válida")
    .optional()
    .or(z.literal("")),
});

export const emailSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El correo electrónico es requerido." })
    .email({ message: "Introduce un formato de email válido (ej: usuario@correo.com)." })
    .trim() // Elimina espacios accidentales al inicio o final
    .toLowerCase(), // Normaliza para evitar problemas de duplicados por mayúsculas

});

export const newPassSchema = z.object({
  token: z
    .string(),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
    .max(100, { message: "La contraseña es demasiado larga." })
    // Reglas de complejidad (Opcional pero profesional)
    .regex(/[A-Z]/, { message: "Debe contener una mayúscula como mínimo." })
    .regex(/[a-z]/, { message: "Debe contener una minúscula como mínimo." })
    .regex(/[0-9]/, { message: "Debe contener un número como mínimo." })
    .regex(/[^A-Za-z0-9]/, { message: "Debe contener un carácter especial como mínimo." }),

  password_confirm: z.string(), // No necesitas repetir las reglas aquí si vas a usar refine
})
  .refine((data) => data.password === data.password_confirm, {
    message: "Las contraseñas no coinciden",
    path: ["password_confirm"], // El error se marcará en este campo
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


