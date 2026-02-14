// components/auth/FormTextareaField.tsx
'use client';

import { Textarea } from "@/components/ui/textarea"; // Asegúrate de tenerlo instalado
import { Field, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FormTextareaFieldProps {
    id: string;
    label: string;
    placeholder?: string;
    register: any;
    error?: { message?: string };
    className?: string;
    rows?: number; // Propiedad específica para el alto del textarea
    children?: ReactNode;
}

export function FormTextareaField({
    id,
    label,
    placeholder,
    register,
    error,
    className,
    rows = 4, // Valor por defecto
    children
}: FormTextareaFieldProps) {
    return (
        <Field>
            <div className="flex items-center">
                <FieldLabel htmlFor={id}>{label}</FieldLabel>
                {children ? children : ""}
            </div>
            <Textarea
                id={id}
                placeholder={placeholder}
                rows={rows}
                {...register(id)}
                className={cn(
                    "resize-none", // Evita que el usuario lo deforme si prefieres un diseño fijo
                    error ? "border-red-500" : "",
                    className
                )}
            />
            {error && (
                <p className="text-red-500 text-sm mt-1">{error.message}</p>
            )}
        </Field>
    );
}