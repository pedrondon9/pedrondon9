// components/auth/FormField.tsx
'use client';

import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Link from "next/link";

interface FormFieldProps {
    id: string;
    label: string;
    type: string;
    placeholder?: string;
    register: any;
    error?: { message?: string };
    className?: string;
    children?: ReactNode;
}

export function FormField({
    id,
    label,
    type,
    placeholder,
    register,
    error,
    className,
    children
}: FormFieldProps) {
    return (
        <Field>
            <div className="flex items-center">
                <FieldLabel htmlFor={id}>{label}</FieldLabel>
                
                    {children ? children : ""}
            </div>
            <Input
                id={id}
                type={type}
                placeholder={placeholder}
                {...register(id)}
                className={cn(error ? "border-red-500" : "", className)}
            />
            {error && (
                <p className="text-red-500 text-sm mt-1">{error.message}</p>
            )}
        </Field>
    );
}