import { SybilGameAbi } from '@/constants/SybilGameAbi'
import { useContractReads } from 'wagmi'

export const useCurrentRound = () => {
  const { data, ...rest } = useContractReads({
    contracts: [
      {
        address: import.meta.env.VITE_GAME_CONTRACT_ADDRESS,
        abi: SybilGameAbi,
        functionName: 'currentRound',
      },
      {
        address: import.meta.env.VITE_GAME_CONTRACT_ADDRESS,
        abi: SybilGameAbi,
        functionName: 'currentRoundIndex',
      },
    ],
    allowFailure: false,
  })
  return {
    currentRound: data?.[0],
    currentRoundIndex: data?.[1],
    ...rest,
  }
}
