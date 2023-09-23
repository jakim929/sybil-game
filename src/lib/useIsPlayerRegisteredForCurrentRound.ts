import { SybilGameAbi } from '@/constants/SybilGameAbi'
import { useAccount, useContractRead } from 'wagmi'

export const useIsPlayerRegisteredForCurrentRound = () => {
  const { address } = useAccount()
  const { data: currentRoundIndex, isLoading: isCurrentRoundIndexLoading } =
    useContractRead({
      address: import.meta.env.VITE_GAME_CONTRACT_ADDRESS,
      abi: SybilGameAbi,
      functionName: 'currentRoundIndex',
    })

  const { data: isRegistered, isLoading: isRoundRegisteredPlayersLoading } =
    useContractRead({
      address: import.meta.env.VITE_GAME_CONTRACT_ADDRESS,
      abi: SybilGameAbi,
      functionName: 'roundRegisteredPlayers',
      args: [currentRoundIndex!, address!],
      enabled: !!address && currentRoundIndex !== undefined,
    })

  const isLoading =
    isCurrentRoundIndexLoading || isRoundRegisteredPlayersLoading

  return {
    isRegistered,
    isLoading,
  }
}
