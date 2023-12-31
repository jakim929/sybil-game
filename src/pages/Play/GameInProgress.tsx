import { CenteredCardLayout } from '@/components/CenteredCardLayout'
import { EliminatedCard } from '@/components/EliminatedCard'
import { questionsByRound } from '@/lib/questionsByRound'
import { useConstantGameParams } from '@/lib/useConstantGameParams'
import { useCurrentRound } from '@/lib/useCurrentRound'
import { useCurrentRoundCommitment } from '@/lib/useCurrentRoundCommitment'
import { useIsPlayerRegisteredForCurrentRound } from '@/lib/useIsPlayerRegisteredForCurrentRound'
import { CommitStage } from '@/pages/Play/CommitStage'
import { RevealStage } from '@/pages/Play/RevealStage'
import { Navigate } from 'react-router-dom'
import WorldIdBackground from '@/assets/worldid-background.jpg'

const GameInProgressContent = () => {
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

  const { isRegistered, isLoading: isPlayerRegisteredLoading } =
    useIsPlayerRegisteredForCurrentRound()

  const { submissionPayload, isLoading: isGetCurrentRoundCommitmentLoading } =
    useCurrentRoundCommitment()

  console.log('inprogress', currentRound, currentRoundIndex)

  if (
    isCurrentRoundLoading ||
    isConstantGameParamsLoading ||
    !currentRound ||
    currentRoundIndex === undefined ||
    !commitDuration ||
    !revealDuration ||
    isPlayerRegisteredLoading ||
    isRegistered === undefined
  ) {
    return null
  }

  if (!isRegistered) {
    if (currentRoundIndex === 0n) {
      return <Navigate to="/" />
    }

    return (
      <EliminatedCard
        title={
          currentRoundIndex === 0n
            ? 'Please sign up for this round'
            : 'You have been eliminated'
        }
        description={
          currentRoundIndex === 0n
            ? 'Please sign up for this round'
            : 'You can play again tomorrow!'
        }
      />
    )
  }

  const { state, question, deadline, answer } = currentRound

  const options = questionsByRound[Number(currentRoundIndex)].options

  // Commit stage
  if (state === 0) {
    return (
      <CommitStage
        deadline={deadline}
        question={question}
        startTime={deadline - commitDuration}
        options={options}
      />
    )
  }

  // Reveal stage
  if (state === 1) {
    if (isGetCurrentRoundCommitmentLoading) {
      // add better loading
      return null
    }

    // Didn't submit in time
    if (!submissionPayload) {
      return (
        <EliminatedCard
          title="You're eliminated"
          description={"You didn't answer in time. You can try again tomorrow!"}
        />
      )
    }

    // Wrong answer
    if (submissionPayload.answer !== answer) {
      return (
        <EliminatedCard
          title="You're eliminated"
          description={'Your answer was incorrect. You can try again tomorrow!'}
        />
      )
    }

    return (
      <RevealStage
        deadline={deadline}
        question={question}
        answer={answer}
        startTime={deadline - revealDuration}
        submissionPayload={submissionPayload}
      />
    )
  }

  return null
}

export const GameInProgress = () => {
  return (
    <CenteredCardLayout imageSrc={WorldIdBackground} opacity={0.85}>
      <GameInProgressContent />
    </CenteredCardLayout>
  )
}
