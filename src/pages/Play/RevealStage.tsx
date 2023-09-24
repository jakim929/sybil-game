import { WidthRestrictedCard } from '@/components/WidthRestrictedCard'
import { CountdownLoader } from '@/components/CountdownLoader'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import { SybilGameAbi } from '@/constants/SybilGameAbi'
import { useRemainingSeconds } from '@/lib/useRemainingSeconds'
import { SubmissionPayload } from '@/pages/Play/types'
import { Loader2 } from 'lucide-react'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { WaitingForHostCard } from '@/components/WaitingForHostCard'
import { WaitingForOthersCard } from '@/components/WaitingForOthersCard'
import { useCurrentGameContractAddressContext } from '@/lib/useCurrentGameContext'

const useRevealAnswer = ({
  submissionPayload,
  onSubmit,
}: {
  submissionPayload: SubmissionPayload
  onSubmit: (payload: SubmissionPayload) => void
}) => {
  const gameAddress = useCurrentGameContractAddressContext()

  const { config } = usePrepareContractWrite({
    address: gameAddress,
    abi: SybilGameAbi,
    functionName: 'revealAnswer',
    args: [submissionPayload!.answer, submissionPayload!.nonce],
  })

  const {
    data,
    write,
    isLoading: isTransactionSubmissionLoading,
  } = useContractWrite(config)

  const { isLoading: isTransactionConfirmationLoading } = useWaitForTransaction(
    {
      hash: data?.hash,
      onSuccess: () => onSubmit(submissionPayload),
    },
  )

  const isLoading =
    isTransactionSubmissionLoading || isTransactionConfirmationLoading
  return {
    isLoading,
    write,
    hash: data?.hash,
  }
}

export const WaitingForHostToProgressHeader = () => {
  return (
    <CardHeader className="flex flex-col items-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin" />
      <div className="text-lg font-semibold">
        Reveal period over, waiting for host to start next round...
      </div>
    </CardHeader>
  )
}

const AnswerCard = ({
  question,
  userAnswer,
}: {
  question: string
  userAnswer: string
}) => {
  return (
    <Card className="flex flex-col items-center">
      <CardHeader className="flex flex-col items-center gap-4">
        <div className="text font-semibold">{question}</div>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-2">
        <div className="border-lime-400 border-solid px-8  py-2 rounded-lg border-2">
          {userAnswer}
        </div>
        <div className="text-sm text-neutral-400">Your answer</div>
      </CardContent>
    </Card>
  )
}

export const RevealStage = ({
  question,
  answer,
  deadline,
  startTime,
  submissionPayload,
}: {
  startTime: bigint
  deadline: bigint
  question: string
  answer: string
  submissionPayload: SubmissionPayload
}) => {
  const remainingSeconds = useRemainingSeconds(Number(deadline))

  const {
    isLoading: isRevealAnswerLoading,
    write,
    hash,
  } = useRevealAnswer({
    submissionPayload,
    onSubmit: (x) => console.log('successful submission', x),
  })

  const shouldDisableSubmit = isRevealAnswerLoading || remainingSeconds <= 0

  if (remainingSeconds <= 0) {
    return (
      <WaitingForHostCard
        title="Waiting for next round..."
        description="New round starting soon!"
      />
    )
  }

  if (hash) {
    return (
      <WaitingForOthersCard
        startTime={startTime}
        deadline={deadline}
        title="Other participants revealing..."
        description={'Waiting for other participants to reveal their answers'}
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
        <div className="text-lg font-semibold">Reveal your answer!</div>
        <CardDescription>
          You must reveal your answer to verify correctness onchain.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className=" flex-1">
          <AnswerCard
            question={question}
            userAnswer={submissionPayload.answer}
          />
        </div>
        <Button
          disabled={!write || shouldDisableSubmit}
          onClick={() => write?.()}
          className="w-full"
        >
          {isRevealAnswerLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Revealing answer...
            </>
          ) : (
            <>Reveal answer</>
          )}
        </Button>
      </CardContent>
    </WidthRestrictedCard>
  )
}
