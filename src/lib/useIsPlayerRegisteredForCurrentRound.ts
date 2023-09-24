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
      watch: true,
    })

  const { data: isRegistered, isLoading: isRoundRegisteredPlayersLoading } =
    useContractRead({
      address: gameAddress,
      abi: SybilGameAbi,
      functionName: 'roundRegisteredPlayers',
      args: [currentRoundIndex!, address!],
      enabled:
        !!address &&
        currentRoundIndex !== undefined &&
        currentRoundIndex !== null &&
        !!gameAddress,
      watch: true,
    })

  const isLoading =
    isCurrentRoundIndexLoading || isRoundRegisteredPlayersLoading

  return {
    isRegistered,
    isLoading,
  }
}
