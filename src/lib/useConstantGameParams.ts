import { SybilGameAbi } from '@/constants/SybilGameAbi'
import { useCurrentGameContractAddressContext } from '@/lib/useCurrentGameContext'
import { useContractReads } from 'wagmi'

export const useConstantGameParams = () => {
  const gameAddress = useCurrentGameContractAddressContext()
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
    watch: true,
  })

  return {
    commitDuration: data?.[0],
    revealDuration: data?.[1],
    isLoading,
  }
}
