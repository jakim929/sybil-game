import { ConnectWalletButton } from '@/components/ConnectWalletButton'
import { NavBar } from '@/components/NavBar'
import { useCurrentGameContractAddress } from '@/lib/useCurrentGameContractAddress'
import { createContext } from 'react'
import { Outlet } from 'react-router-dom'
import { Address, zeroAddress } from 'viem'

// zeroAddress should never be passed down
export const GameContractAddressContext = createContext<Address>(zeroAddress)

export const GameAvailableBaseLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { gameAddress, isLoading } = useCurrentGameContractAddress()

  if (isLoading) {
    return <div>loading...</div>
  }

  if (!gameAddress) {
    return <div>no game found</div>
  }

  return (
    <GameContractAddressContext.Provider value={gameAddress}>
      {children}
    </GameContractAddressContext.Provider>
  )
}

export const GameAvailableLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <GameAvailableBaseLayout>
      <div className="flex flex-col flex-1">
        <NavBar />
        <div className="flex-1 flex flex-col">{children}</div>
      </div>
    </GameAvailableBaseLayout>
  )
}
