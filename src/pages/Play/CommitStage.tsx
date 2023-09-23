import { CountdownLoader } from '@/components/CountdownLoader'
import { OptionButtons } from '@/components/OptionButtons'
import { WaitingForHostCard } from '@/components/WaitingForHostCard'
import { WaitingForOthersCard } from '@/components/WaitingForOthersCard'
import { WidthRestrictedCard } from '@/components/WidthRestrictedCard'
import { Button } from '@/components/ui/button'
import { CardContent, CardHeader } from '@/components/ui/card'
import { SybilGameAbi } from '@/constants/SybilGameAbi'
import { useNonce } from '@/lib/useNonce'
import { useRemainingSeconds } from '@/lib/useRemainingSeconds'
import { SubmissionPayload } from '@/pages/Play/types'
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
  onSubmit,
}: {
  answer?: string
  onSubmit: (payload: SubmissionPayload) => void
}) => {
  const { nonce } = useNonce()
  console.log(nonce)

  const commitHash = answer
    ? keccak256(
        encodeAbiParameters(
          [
            { type: 'string', name: 'x' },
            { type: 'bytes', name: 'y' },
          ],
          [answer, nonce],
        ),
      )
    : undefined

  const { config } = usePrepareContractWrite({
    address: import.meta.env.VITE_GAME_CONTRACT_ADDRESS,
    abi: SybilGameAbi,
    functionName: 'commitAnswer',
    args: [commitHash!],
    enabled: !!commitHash,
  })

  const {
    data,
    write,
    isLoading: isTransactionSubmissionLoading,
  } = useContractWrite(config)

  const { isLoading: isTransactionConfirmationLoading } = useWaitForTransaction(
    {
      hash: data?.hash,
      onSuccess: () =>
        onSubmit({ answer: answer!, nonce, commitment: commitHash! }),
    },
  )

  const isLoading =
    isTransactionSubmissionLoading || isTransactionConfirmationLoading
  return {
    isLoading,
    write,
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
  onSuccess,
}: {
  startTime: bigint
  deadline: bigint
  question: string
  onSuccess: (payload: SubmissionPayload) => void
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>()
  const [submissionPayload, setSubmissionPayload] =
    useState<SubmissionPayload>()

  const { isLoading: isSubmissionLoading, write } = useSubmitAnswer({
    answer: selectedAnswer,
    onSubmit: (submissionPayload) => {
      setSubmissionPayload(submissionPayload)
      onSuccess(submissionPayload)
    },
  })

  const remainingSeconds = useRemainingSeconds(Number(deadline))

  const shouldDisableSelect =
    isSubmissionLoading || !!submissionPayload || remainingSeconds <= 0

  if (remainingSeconds <= 0) {
    return (
      <WaitingForHostCard
        title="Waiting for host to reveal answer..."
        description="Submission period over, the host will reveal the answer shortly"
      />
    )
  }

  console.log(submissionPayload)
  if (submissionPayload) {
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
          options={[
            'Do Kwon',
            'Vitalik Buterin',
            'Brian Armstrong',
            'Satoshi Nakamoto',
          ]}
          onSelect={setSelectedAnswer}
          selectedOption={selectedAnswer}
          isDisabled={shouldDisableSelect}
        />
        <div className="flex px-4">
          <SubmitAnswerButton
            onClick={() => write?.()}
            isDisabled={!write || !selectedAnswer}
            isLoading={isSubmissionLoading}
          />
        </div>
      </CardContent>
    </WidthRestrictedCard>
  )
}
