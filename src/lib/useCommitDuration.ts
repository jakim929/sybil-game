import { SybilGameAbi } from '@/constants/SybilGameAbi'
import { useContractRead } from 'wagmi'

export const useCommitDuration = () => {
  return useContractRead({
    address: import.meta.env.VITE_GAME_CONTRACT_ADDRESS,
    abi: SybilGameAbi,
    functionName: 'COMMIT_DURATION',
    staleTime: Infinity,
  })
}
