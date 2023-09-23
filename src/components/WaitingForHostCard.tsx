import { WidthRestrictedCard } from '@/components/WidthRestrictedCard'
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import MascotImage from '@/assets/mascot.jpg'
import { Loader2 } from 'lucide-react'

export const WaitingForHostCard = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  return (
    <WidthRestrictedCard>
      <CardHeader className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin" />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-8">
        <img
          src={MascotImage}
          className="w-full rounded-lg"
          aria-label="World ID image"
        />
      </CardContent>
    </WidthRestrictedCard>
  )
}
