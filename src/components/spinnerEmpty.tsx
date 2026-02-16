import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Spinner } from "@/components/ui/spinner"

export function SpinnerEmpty() {
  return (
    <Empty className="">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>Cargando los datos</EmptyTitle>
        <EmptyDescription>
            Por favor, espera mientras obtenemos los datos.
        </EmptyDescription>
      </EmptyHeader>
      
    </Empty>
  )
}
