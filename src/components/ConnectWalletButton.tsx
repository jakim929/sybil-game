import { Wallet, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'

export const ConnectWalletButton = ({
  className,
  variant = 'secondary',
}: {
  className?: string
  variant?: 'default' | 'secondary'
}) => {
  const { open } = useWeb3Modal()
  const { isConnecting, isReconnecting } = useAccount()
  if (isConnecting || isReconnecting) {
    return (
      <Button disabled>
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        Connecting...
      </Button>
    )
  }
  return (
    <Button onClick={() => open()} variant={variant} className={className}>
      Connect Wallet
      <Wallet className="w-4 h-4 ml-2" />
    </Button>
  )
}
