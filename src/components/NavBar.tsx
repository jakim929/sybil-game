import SybilGameLogo from '@/assets/sybil-game-logo.jpg'
import { ConnectWalletButton } from '@/components/ConnectWalletButton'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useAccount } from 'wagmi'

const LogoBanner = () => {
  return (
    <Link to="/" className="flex items-center gap-3">
      <img
        src={SybilGameLogo}
        aria-label="sybil game logo"
        className="w-10 h-10"
      />
      <div className="text-2xl text-lime-400 font-bold font-mono">
        SYBIL GAME
      </div>
    </Link>
  )
}

const AccountStatus = () => {
  const { address } = useAccount()
  if (address) {
    return <w3m-account-button />
  }
  return <ConnectWalletButton />
}

export const NavBar = () => {
  const { address } = useAccount()

  return (
    <nav className="h-[72px] flex items-center justify-between border-b-[1px] p-4">
      <LogoBanner />
      <div className="flex items-center gap-4">
        {address && address === import.meta.env.VITE_OWNER_ADDRESS && (
          <Button asChild>
            <Link to="/admin">Admin</Link>
          </Button>
        )}

        <AccountStatus />
      </div>
    </nav>
  )
}
