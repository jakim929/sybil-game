import { SybilGameAbi } from '@/constants/SybilGameAbi'
import { useSubmissionPayloadState } from '@/lib/SubmissionPayloadState'
import { useCurrentGameContractAddressContext } from '@/lib/useCurrentGameContext'
import { toHex } from 'viem'
import { useAccount, useContractRead } from 'wagmi'

export const useCurrentRoundCommitment = () => {
  const gameAddress = useCurrentGameContractAddressContext()

  const { address } = useAccount()
  const { data: currentRoundIndex, isLoading: isCurrentRoundIndexLoading } =
    useContractRead({
      address: gameAddress,
      abi: SybilGameAbi,
      functionName: 'currentRoundIndex',
    })

  const { data: commitment, isLoading: isRoundRegisteredPlayersLoading } =
    useContractRead({
      address: gameAddress,
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
