import { SybilGameAbi } from '@/constants/SybilGameAbi'
import { useContractRead } from 'wagmi'

export const useRevealDuration = () => {
  return useContractRead({
    address: import.meta.env.VITE_GAME_CONTRACT_ADDRESS,
    abi: SybilGameAbi,
    functionName: 'REVEAL_DURATION',
    staleTime: Infinity,
  })
}
