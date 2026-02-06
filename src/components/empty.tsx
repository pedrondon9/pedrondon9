import { ArrowUpRightIcon, EqualApproximatelyIcon, Folder, FolderOutput, FolderPen } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"

type EmptyComponentProps = {
    text:string,
    description?:string
}

export function EmptyComponent({text,description}:EmptyComponentProps) {
    return (
        <Empty className="border">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <Folder />
                </EmptyMedia>
                <EmptyTitle>{text}</EmptyTitle>
                <EmptyDescription>
                    {description}
                </EmptyDescription>
            </EmptyHeader>
            
           
        </Empty>
    )
}
