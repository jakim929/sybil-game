import { SybilGameAbi } from '@/constants/SybilGameAbi'
import { useCurrentGameContractAddress } from '@/lib/useCurrentGameContractAddress'
import { useContractReads } from 'wagmi'

export const useConstantGameParams = () => {
  const { gameAddress } = useCurrentGameContractAddress()
  const { data, isLoading } = useContractReads({
    contracts: [
      {
        address: gameAddress,
        abi: SybilGameAbi,
        functionName: 'commitDuration',
      },
      {
        address: gameAddress,
        abi: SybilGameAbi,
        functionName: 'revealDuration',
      },
    ],
    staleTime: Infinity,
    allowFailure: false,
    enabled: !!gameAddress,
  })

  return {
    commitDuration: data?.[0],
    revealDuration: data?.[1],
    isLoading,
  }
}
