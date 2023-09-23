import { SybilGameAbi } from '@/constants/SybilGameAbi'
import { useCurrentGameContractAddressContext } from '@/lib/useCurrentGameContext'
import { useAccount, useContractRead } from 'wagmi'

export const useIsPlayerRegisteredForCurrentRound = () => {
  const gameAddress = useCurrentGameContractAddressContext()

  const { address } = useAccount()
  const { data: currentRoundIndex, isLoading: isCurrentRoundIndexLoading } =
    useContractRead({
      address: gameAddress,
      abi: SybilGameAbi,
      functionName: 'currentRoundIndex',
    })

  const { data: isRegistered, isLoading: isRoundRegisteredPlayersLoading } =
    useContractRead({
      address: gameAddress,
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
