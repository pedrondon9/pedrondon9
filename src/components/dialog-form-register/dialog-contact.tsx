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
import { ArrowRight, Link, Plus } from "lucide-react"
import { FormField } from "../form-field"
import { signInSchema } from "../forms-vadations"
import { AddContentForm } from "../form-add-content/add-content-form"
import { ContacForm } from "../form-contact/contact-form"

export function DialogContact() {


    return (
        <Dialog>
            <DialogTrigger asChild>
                
                <Button size="lg" className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-14 text-lg font-semibold shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                    ¿Quieres contactarme? <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle className="text-center">Contacto</DialogTitle>
                    <DialogDescription className="text-center">
                        Para contactar, por favor llena el formulario a continuación.
                    </DialogDescription>
                </DialogHeader>
                <FieldGroup>

                    <ContacForm />

                </FieldGroup>

            </DialogContent>
        </Dialog>
    )
}
