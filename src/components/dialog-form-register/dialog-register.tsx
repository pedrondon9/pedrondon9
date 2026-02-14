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
import {  Plus } from "lucide-react"
import { FormField } from "../form-field"
import { signInSchema } from "../forms-vadations"
import { AddContentForm } from "../form-add-content/add-content-form"
import Link from "next/link"

export function DialogDemo() {


    return (
        
        <Button className="bg-indigo-600 hover:bg-indigo-700 h-10 px-4">
            <Plus className="mr-2 size-4" />
            <Link className="font-bold text-sm" href="/home/add-content">
                Agregar
            </Link>
        </Button>

    )
}
