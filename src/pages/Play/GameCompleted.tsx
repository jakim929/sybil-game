import { CenteredCardLayout } from '@/components/CenteredCardLayout'
import { WidthRestrictedCard } from '@/components/WidthRestrictedCard'
import { CardHeader } from '@/components/ui/card'

export const GameCompleted = () => {
  return (
    <CenteredCardLayout>
      <WidthRestrictedCard>
        <CardHeader>Game completed</CardHeader>
      </WidthRestrictedCard>
    </CenteredCardLayout>
  )
}
