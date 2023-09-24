import { SybilGameAbi } from '@/constants/SybilGameAbi'
import { useCurrentGameContractAddressContext } from '@/lib/useCurrentGameContext'
import { useContractRead } from 'wagmi'

export const useGameState = () => {
  const gameAddress = useCurrentGameContractAddressContext()

  const { data: gameState, isLoading } = useContractRead({
    address: gameAddress,
    abi: SybilGameAbi,
    functionName: 'gameState',
    enabled: !!gameAddress,
    watch: true,
  })

  return {
    gameState,
    isLoading,
  }
}
