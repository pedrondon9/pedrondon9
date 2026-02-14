// components/form/FormComboboxField.tsx
'use client';

import * as React from "react";
import { Control, Controller } from "react-hook-form";
import { Field, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    useComboboxAnchor,
} from "@/components/ui/combobox"

interface FormComboboxFieldProps {
    control: Control<any>;
    name: string;
    label: string;
    items: { id: number; name: string }[]; // Array de objetos con id y name
    placeholder?: string;
    error?: { message?: string };
}

export function FormComboboxField({
    control,
    name,
    label,
    items,
    placeholder,
    error
}: FormComboboxFieldProps) {
    const anchor = useComboboxAnchor();

    return (
        <Field>
            <FieldLabel>{label}</FieldLabel>

<Controller
    control={control}
    name={name}
    render={({ field: { onChange, value } }) => {
        // 1. Convertimos los IDs (numéricos) que vienen de RHF a Nombres (strings) 
        // para que el Combobox sepa qué mostrar como seleccionado.
        const selectedNames = items
            .filter(item => (value || []).includes(item.id))
            .map(item => item.name);

        return (
            <Combobox
                multiple
                autoHighlight
                // El Combobox trabaja internamente con los nombres (strings)
                items={items.map(f => f.name)} 
                value={selectedNames} 
                onValueChange={(names: string[]) => {
                    // 2. Cuando cambia, buscamos los IDs de esos nombres para enviarlos a RHF
                    const selectedIds = items
                        .filter(f => names.includes(f.name))
                        .map(f => f.id);

                    onChange(selectedIds); // RHF recibe [1, 2, 3]
                }}
            >
                <ComboboxChips 
                    ref={anchor} 
                    className={cn(
                        "w-full min-h-10 border rounded-md px-3 py-1 bg-background", 
                        error ? "border-red-500" : "border-input"
                    )}
                >
                    <ComboboxValue>
                        {(values) => (
                            <React.Fragment>
                                {values.map((name: string) => (
                                    <ComboboxChip key={name}>
                                        {name}
                                    </ComboboxChip>
                                ))}
                                <ComboboxChipsInput placeholder={placeholder} className="text-sm" />
                            </React.Fragment>
                        )}
                    </ComboboxValue>
                </ComboboxChips>

                <ComboboxContent anchor={anchor}>
                    <ComboboxEmpty>Sin resultados.</ComboboxEmpty>
                    <ComboboxList>
                        {(item) => (
                            <ComboboxItem key={item} value={item}>
                                {item}
                            </ComboboxItem>
                        )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
        );
    }}
/>

{
    error && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
    )
}
    </Field >
  );
}