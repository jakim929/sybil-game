import { useConstantGameParams } from '@/lib/useConstantGameParams'
import { useCurrentRound } from '@/lib/useCurrentRound'
import { CommitStage } from '@/pages/Play/CommitStage'
import { RevealStage } from '@/pages/Play/RevealStage'
import { SubmissionPayload } from '@/pages/Play/types'
import { useState } from 'react'

export const GameInProgress = () => {
  const {
    currentRound,
    currentRoundIndex,
    isLoading: isCurrentRoundLoading,
  } = useCurrentRound()

  const {
    commitDuration,
    revealDuration,
    isLoading: isConstantGameParamsLoading,
  } = useConstantGameParams()

  console.log(currentRound, currentRoundIndex)

  const [submissionPayloadByRound, setSubmissionPayloadByRound] = useState<
    Record<number, SubmissionPayload>
  >({})

  if (
    isCurrentRoundLoading ||
    isConstantGameParamsLoading ||
    !currentRound ||
    !commitDuration ||
    !revealDuration
  ) {
    console.log({
      isCurrentRoundLoading,
      isConstantGameParamsLoading,
      currentRound,
      currentRoundIndex,
      commitDuration,
      revealDuration,
    })
    console.log('returning n')
    return null
  }

  const { state, question, deadline, answer } = currentRound

  if (state === 0) {
    return (
      <CommitStage
        deadline={deadline}
        question={question}
        startTime={deadline - commitDuration}
        onSuccess={(payload) => {
          console.log('setting submission payload')
          setSubmissionPayloadByRound((prev) => ({
            ...prev,
            [Number(currentRoundIndex!)]: payload,
          }))
        }}
      />
    )
  }

  console.log(submissionPayloadByRound, currentRoundIndex)
  if (state === 1) {
    return (
      <RevealStage
        deadline={deadline}
        question={question}
        answer={answer}
        startTime={deadline - commitDuration}
        submissionPayload={submissionPayloadByRound[Number(currentRoundIndex!)]}
      />
    )
  }

  return null
}
