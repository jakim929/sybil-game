import { CenteredCardLayout } from '@/components/CenteredCardLayout'
import { WidthRestrictedCard } from '@/components/WidthRestrictedCard'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useIsPlayerRegisteredForCurrentRound } from '@/lib/useIsPlayerRegisteredForCurrentRound'
import TrophyImage from '@/assets/trophy.jpg'
import { Button } from '@/components/ui/button'
import { useCurrentRoundRegisteredPlayersCount } from '@/lib/useCurrentRoundRegisteredPlayersCount'

export const GameCompleted = () => {
  const { isRegistered, isLoading: isRegisteredLoading } =
    useIsPlayerRegisteredForCurrentRound()

  const { roundRegisteredPlayersCount, isLoading: isPlayerCountLoading } =
    useCurrentRoundRegisteredPlayersCount()

  if (
    isRegisteredLoading ||
    isPlayerCountLoading ||
    isRegistered === undefined ||
    roundRegisteredPlayersCount === undefined
  ) {
    return null
  }

  return (
    <CenteredCardLayout>
      <WidthRestrictedCard>
        <CardHeader>
          <CardTitle className="flex justify-center">
            You're a winner!
          </CardTitle>
          <CardDescription>
            You are one of {Number(roundRegisteredPlayersCount)} winners!
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center">
          <img
            src={TrophyImage}
            aria-label="trophy"
            className="w-[160px] h-[160px]"
          />
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => {}}>
            Claim prize
          </Button>
        </CardFooter>
      </WidthRestrictedCard>
    </CenteredCardLayout>
  )
}
