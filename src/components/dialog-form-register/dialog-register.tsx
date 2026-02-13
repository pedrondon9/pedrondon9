import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { FormField } from "../form-field"
import { signInSchema } from "../forms-vadations"
import { AddContentForm } from "../form-add-content/add-content-form"

export function DialogDemo() {


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-indigo-600 hover:bg-indigo-700 h-10 px-4">
                    <Plus className="mr-2 size-4" />
                    Agregar
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle className="text-center">Agregar nuevo contenido</DialogTitle>
                    <DialogDescription className="text-center">
                        Llena el formulario para agregar un nuevo contenido a tu sitio.
                    </DialogDescription>
                </DialogHeader>
                <FieldGroup>

                    <AddContentForm />
                    
                </FieldGroup>

            </DialogContent>
        </Dialog>
    )
}
