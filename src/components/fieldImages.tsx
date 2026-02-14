// components/form/FormImageUploadField.tsx
'use client';

import { Control, Controller } from "react-hook-form";
import { Field, FieldLabel } from "@/components/ui/field";
import { UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface FormImageUploadFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  error?: { message?: string };
}

export function FormImageUploadField({ control, name, label, error }: FormImageUploadFieldProps) {
  const [previews, setPreviews] = useState<string[]>([]);

  // Limpiar URLs de memoria al desmontar para evitar fugas
  useEffect(() => {
    return () => previews.forEach(url => URL.revokeObjectURL(url));
  }, [previews]);

  return (
    <Field className="space-y-4">
      <FieldLabel>{label}</FieldLabel>
      
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = Array.from(e.target.files || []);
            if (files.length === 0) return;

            // Actualizar RHF (agrega a los archivos existentes si deseas acumular)
            const currentFiles = value || [];
            const updatedFiles = [...currentFiles, ...files];
            onChange(updatedFiles);

            // Actualizar Previsualizaciones
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setPreviews(prev => [...prev, ...newPreviews]);
          };

          const removeImage = (index: number) => {
            // Remover de RHF
            const updatedFiles = (value as File[]).filter((_, i) => i !== index);
            onChange(updatedFiles);

            // Remover de Previews
            const urlToRemove = previews[index];
            URL.revokeObjectURL(urlToRemove); // Liberar memoria
            setPreviews(prev => prev.filter((_, i) => i !== index));
          };

          return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Slot de Subida */}
              <label className={cn(
                "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent/50 transition-all",
                error ? "border-red-500 bg-red-50/10" : "border-muted-foreground/25"
              )}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-2">
                  <UploadCloud className="w-8 h-8 text-muted-foreground mb-2" />
                  <p className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Añadir fotos
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>

              {/* Previsualizaciones */}
              {previews.map((url, index) => (
                <div key={`${url}-${index}`} className="relative group h-32 rounded-lg overflow-hidden border border-border bg-muted">
                  <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="p-2 bg-destructive text-destructive-foreground rounded-full hover:scale-110 transition-transform"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          );
        }}
      />
      
      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </Field>
  );
}