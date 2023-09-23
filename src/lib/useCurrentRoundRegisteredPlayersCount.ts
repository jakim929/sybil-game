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
    })

  const {
    data: roundRegisteredPlayersCount,
    isLoading: isRoundRegisteredPlayersLoading,
  } = useContractRead({
    address: gameAddress,
    abi: SybilGameAbi,
    functionName: 'roundRegisteredPlayersCount',
    args: [currentRoundIndex!],
    enabled: currentRoundIndex !== undefined,
  })

  const isLoading =
    isCurrentRoundIndexLoading || isRoundRegisteredPlayersLoading

  return {
    roundRegisteredPlayersCount,
    isLoading,
  }
}
