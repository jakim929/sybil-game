import { Card } from '@/components/ui/card'

export const WidthRestrictedCard = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <Card className="max-w-[400px] w-[400px]">{children}</Card>
}
