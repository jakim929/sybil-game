import { SybilGameAbi } from '@/constants/SybilGameAbi'
import { useCurrentGameContractAddressContext } from '@/lib/useCurrentGameContext'
import { useContractReads } from 'wagmi'

export const useCurrentRound = () => {
  const gameAddress = useCurrentGameContractAddressContext()

  const { data, ...rest } = useContractReads({
    contracts: [
      {
        address: gameAddress,
        abi: SybilGameAbi,
        functionName: 'currentRound',
      },
      {
        address: gameAddress,
        abi: SybilGameAbi,
        functionName: 'currentRoundIndex',
      },
    ],
    allowFailure: false,
    enabled: !!gameAddress,
    watch: true,
  })
  return {
    currentRound: data?.[0],
    currentRoundIndex: data?.[1],
    ...rest,
  }
}
