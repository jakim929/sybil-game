import { SybilGameAbi } from '@/constants/SybilGameAbi'
import { useContractReads } from 'wagmi'

export const useConstantGameParams = () => {
  const { data, isLoading } = useContractReads({
    contracts: [
      {
        address: import.meta.env.VITE_GAME_CONTRACT_ADDRESS,
        abi: SybilGameAbi,
        functionName: 'COMMIT_DURATION',
      },
      {
        address: import.meta.env.VITE_GAME_CONTRACT_ADDRESS,
        abi: SybilGameAbi,
        functionName: 'REVEAL_DURATION',
      },
    ],
    staleTime: Infinity,
    allowFailure: false,
  })

  return {
    commitDuration: data?.[0],
    revealDuration: data?.[1],
    isLoading,
  }
}
