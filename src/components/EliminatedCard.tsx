import { WidthRestrictedCard } from '@/components/WidthRestrictedCard'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { XCircle } from 'lucide-react'

// you didn't submit in time

export const EliminatedCard = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  return (
    <WidthRestrictedCard>
      <CardHeader className="flex flex-col items-center gap-4">
        <XCircle className="h-10 w-10 text-red-500" />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </WidthRestrictedCard>
  )
}
