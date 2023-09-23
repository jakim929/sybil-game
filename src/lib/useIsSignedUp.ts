import { SybilGameAbi } from '@/constants/SybilGameAbi'
import { useCurrentGameContractAddressContext } from '@/lib/useCurrentGameContext'
import { useAccount, useContractRead } from 'wagmi'

export const useIsSignedUp = () => {
  const gameAddress = useCurrentGameContractAddressContext()

  const { address } = useAccount()
  const { data } = useContractRead({
    address: gameAddress,
    abi: SybilGameAbi,
    functionName: 'roundRegisteredPlayers',
    args: [0n, address!],
    enabled: !!address,
  })

  if (!address) {
    return false
  }

  return !!data
}
