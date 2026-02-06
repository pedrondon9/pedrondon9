'use client'

type TypographyH2Props = {
    title: string;
}

export function TypographyH2({title}: TypographyH2Props) {
    return (
        
        <h3 className="scroll-m-20 text-xl text-left text-neutral-400  font-semibold tracking-tight">
        {title}
      </h3>
    )
  }