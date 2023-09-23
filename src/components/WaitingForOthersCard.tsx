import { CountdownLoader } from '@/components/CountdownLoader'
import { WidthRestrictedCard } from '@/components/WidthRestrictedCard'
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import MascotImage from '@/assets/mascot.jpg'

export const WaitingForOthersCard = ({
  startTime,
  deadline,
  title,
  description,
}: {
  startTime: bigint
  deadline: bigint
  title: string
  description: string
}) => {
  return (
    <WidthRestrictedCard>
      <CardHeader className="flex flex-col items-center gap-4">
        <CountdownLoader
          startTime={Number(startTime)}
          deadline={Number(deadline)}
        />
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
