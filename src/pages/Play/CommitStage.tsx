import { CountdownLoader } from '@/components/CountdownLoader'
import { OptionButtons } from '@/components/OptionButtons'
import { WaitingForHostCard } from '@/components/WaitingForHostCard'
import { WaitingForOthersCard } from '@/components/WaitingForOthersCard'
import { WidthRestrictedCard } from '@/components/WidthRestrictedCard'
import { Button } from '@/components/ui/button'
import { CardContent, CardHeader } from '@/components/ui/card'
import { SybilGameAbi } from '@/constants/SybilGameAbi'
import { useSubmissionPayloadState } from '@/lib/SubmissionPayloadState'
import { useCurrentGameContractAddressContext } from '@/lib/useCurrentGameContext'
import { useCurrentRoundCommitment } from '@/lib/useCurrentRoundCommitment'
import { useNonce } from '@/lib/useNonce'
import { useRemainingSeconds } from '@/lib/useRemainingSeconds'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { encodeAbiParameters, keccak256 } from 'viem'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'

const useSubmitAnswer = ({
  answer,
}: {
  answer?: string
}) => {
  const { setSubmissionPayload } = useSubmissionPayloadState()
  const gameAddress = useCurrentGameContractAddressContext()

  const { nonce } = useNonce()

  const commitment = answer
    ? keccak256(
        encodeAbiParameters(
          [{ type: 'string' }, { type: 'bytes32' }],
          [answer, nonce],
        ),
      )
    : undefined

  const { config, isLoading: isConfigLoading } = usePrepareContractWrite({
    address: gameAddress,
    abi: SybilGameAbi,
    functionName: 'commitAnswer',
    args: [commitment!],
    enabled: !!commitment,
  })

  const {
    data,
    write,
    isLoading: isTransactionSubmissionLoading,
  } = useContractWrite(config)

  const { data: receipt, isLoading: isTransactionConfirmationLoading } =
    useWaitForTransaction({
      hash: data?.hash,
    })

  const isLoading =
    isConfigLoading ||
    isTransactionSubmissionLoading ||
    isTransactionConfirmationLoading
  return {
    isLoading,
    write: write
      ? () => {
          setSubmissionPayload(commitment!, {
            answer: answer!,
            nonce,
            commitment: commitment!,
          })
          return write()
        }
      : undefined,
    transactionResponse: data,
    transactionReceipt: receipt,
  }
}

const SubmitAnswerButton = ({
  onClick,
  isLoading,
  isDisabled,
}: { onClick: () => void; isLoading?: boolean; isDisabled?: boolean }) => {
  return (
    <Button
      variant="default"
      disabled={isDisabled}
      className="w-full"
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submitting answer...
        </>
      ) : (
        <>Submit answer</>
      )}
    </Button>
  )
}

export const CommitStage = ({
  startTime,
  deadline,
  question,
  options,
}: {
  startTime: bigint
  deadline: bigint
  question: string
  options: string[]
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>()
  console.log('commitStage')

  const {
    isLoading: isSubmissionLoading,
    write,
    transactionReceipt,
  } = useSubmitAnswer({
    answer: selectedAnswer,
  })

  const { commitment } = useCurrentRoundCommitment()

  const remainingSeconds = useRemainingSeconds(Number(deadline))

  const shouldDisableSelect = isSubmissionLoading || remainingSeconds <= 0

  if (remainingSeconds <= 0) {
    return (
      <WaitingForHostCard
        title="Waiting for host to reveal answer..."
        description="Submission period over, the host will reveal the answer shortly"
      />
    )
  }

  if (commitment || transactionReceipt) {
    return (
      <WaitingForOthersCard
        startTime={startTime}
        deadline={deadline}
        title="Other participants submitting..."
        description={'Waiting for other participants to submit their answers'}
      />
    )
  }

  return (
    <WidthRestrictedCard>
      <CardHeader className="flex flex-col items-center gap-4">
        <CountdownLoader
          startTime={Number(startTime)}
          deadline={Number(deadline)}
        />
        <div className="text-lg font-semibold">{question}</div>
      </CardHeader>

      <CardContent className="flex flex-col gap-8">
        <OptionButtons
          options={options}
          onSelect={setSelectedAnswer}
          selectedOption={selectedAnswer}
          isDisabled={shouldDisableSelect}
        />
        <div className="flex px-4">
          <SubmitAnswerButton
            onClick={() => write?.()}
            isDisabled={!write || !selectedAnswer || isSubmissionLoading}
            isLoading={isSubmissionLoading}
          />
        </div>
      </CardContent>
    </WidthRestrictedCard>
  )
}
