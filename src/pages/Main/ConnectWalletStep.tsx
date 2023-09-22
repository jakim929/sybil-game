import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import VaultImage from '@/assets/vault.jpg'
import { ConnectWalletButton } from '@/components/ConnectWalletButton'
import { WidthRestrictedCard } from '@/components/WidthRestrictedCard'

export const ConnectWalletStep = () => {
  return (
    <WidthRestrictedCard>
      <CardHeader className="gap-2">
        <CardTitle>Connect your wallet</CardTitle>
        <CardDescription>
          Welcome to Sybil Game! Please connect your wallet to get started.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-8">
        <img
          src={VaultImage}
          className="w-[240px] h-[240px]"
          aria-label="connect wallet image"
        />
        <ConnectWalletButton className="w-full" variant="default" />
      </CardContent>
    </WidthRestrictedCard>
  )
}
