import { SybilGameAbi } from '@/constants/SybilGameAbi'
import { useSubmissionPayloadState } from '@/lib/SubmissionPayloadState'
import { toHex } from 'viem'
import { useAccount, useContractRead } from 'wagmi'

export const useCurrentRoundCommitment = () => {
  const { address } = useAccount()
  const { data: currentRoundIndex, isLoading: isCurrentRoundIndexLoading } =
    useContractRead({
      address: import.meta.env.VITE_GAME_CONTRACT_ADDRESS,
      abi: SybilGameAbi,
      functionName: 'currentRoundIndex',
    })

  const { data: commitment, isLoading: isRoundRegisteredPlayersLoading } =
    useContractRead({
      address: import.meta.env.VITE_GAME_CONTRACT_ADDRESS,
      abi: SybilGameAbi,
      functionName: 'roundPlayerCommitments',
      args: [currentRoundIndex!, address!],
      enabled: !!address && currentRoundIndex !== undefined,
    })

  const { submissionPayloadByCommitment } = useSubmissionPayloadState()

  const isLoading =
    isCurrentRoundIndexLoading || isRoundRegisteredPlayersLoading

  return {
    commitment: commitment === toHex('', { size: 32 }) ? null : commitment,
    submissionPayload: commitment
      ? submissionPayloadByCommitment[commitment]
      : undefined,
    isLoading,
  }
}
