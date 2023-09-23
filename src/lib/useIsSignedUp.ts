import { SybilGameAbi } from '@/constants/SybilGameAbi'
import { useAccount, useContractRead } from 'wagmi'

export const useIsSignedUp = () => {
  const { address } = useAccount()
  const { data } = useContractRead({
    address: import.meta.env.VITE_GAME_CONTRACT_ADDRESS,
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
