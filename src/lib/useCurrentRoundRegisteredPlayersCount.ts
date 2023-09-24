import { SybilGameAbi } from '@/constants/SybilGameAbi'
import { useCurrentGameContractAddressContext } from '@/lib/useCurrentGameContext'
import { useContractRead } from 'wagmi'

export const useCurrentRoundRegisteredPlayersCount = () => {
  const gameAddress = useCurrentGameContractAddressContext()

  const { data: currentRoundIndex, isLoading: isCurrentRoundIndexLoading } =
    useContractRead({
      address: gameAddress,
      abi: SybilGameAbi,
      functionName: 'currentRoundIndex',
      watch: true,
    })

  const {
    data: roundRegisteredPlayersCount,
    isLoading: isRoundRegisteredPlayersLoading,
  } = useContractRead({
    address: gameAddress,
    abi: SybilGameAbi,
    functionName: 'roundRegisteredPlayersCount',
    args: [currentRoundIndex!],
    enabled:
      currentRoundIndex !== undefined &&
      currentRoundIndex !== null &&
      !!gameAddress,
    watch: true,
  })

  const isLoading =
    isCurrentRoundIndexLoading || isRoundRegisteredPlayersLoading

  return {
    roundRegisteredPlayersCount,
    isLoading,
  }
}
