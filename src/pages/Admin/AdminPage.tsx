import { WaitingForHostCard } from '@/components/WaitingForHostCard'
import { WaitingForOthersCard } from '@/components/WaitingForOthersCard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SybilGameAbi } from '@/constants/SybilGameAbi'
import { SybilGameLauncherAbi } from '@/constants/SybilGameLauncherAbi'
import { getSecondsFromMilliSeconds } from '@/lib/getSeconds'
import { useCurrentGameContractAddressContext } from '@/lib/useCurrentGameContext'
import { CommitStage } from '@/pages/Play/CommitStage'
import { RevealStage } from '@/pages/Play/RevealStage'
import { useState } from 'react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'

const Playground = () => {
  const [startTime] = useState(BigInt(getSecondsFromMilliSeconds(Date.now())))
  return (
    <>
      {/* <RevealStage
        startTime={startTime}
        deadline={startTime + 100n}
        question="Which titan of industry tweeted on 5/9/22: “Deploying more capital - steady lads”?"
        answer="Do Kwon"
        submissionPayload={{
          answer: 'Do Kwon',
          nonce: '0x123',
          commitment: '0x456',
        }}
      /> */}
      {/* <WaitingForOthersCard
        startTime={startTime}
        deadline={startTime + 100n}
        title="Other participants revealing..."
        description={'Waiting for other participants to reveal their answers'}
      />

      <WaitingForHostCard
        title="Waiting for host to reveal answer..."
        description="Submission period over, the host will reveal the answer shortly"
      /> */}
    </>
  )
}

const useLaunchGame = ({
  numRounds,
  commitDuration,
  revealDuration,
}: {
  numRounds: number
  commitDuration: number
  revealDuration: number
}) => {
  const { config } = usePrepareContractWrite({
    address: import.meta.env.VITE_GAME_LAUNCHER_CONTRACT_ADDRESS,
    abi: SybilGameLauncherAbi,
    functionName: 'launchGame',
    args: [
      import.meta.env.VITE_WORLDID_APP_ID,
      import.meta.env.VITE_WORLDID_ACTION_ID,
      BigInt(numRounds),
      BigInt(commitDuration),
      BigInt(revealDuration),
    ],
  })

  return useContractWrite(config)
}

const LaunchGameButton = () => {
  const { write, isLoading } = useLaunchGame({
    numRounds: 2,
    commitDuration: 60,
    revealDuration: 60,
  })
  return <Button onClick={() => write?.()}>Launch game</Button>
}

export const AdminPage = () => {
  return (
    <>
      <Card className="flex flex-col gap-4">
        <LaunchGameButton />
        <SubmitQuestionButton />
        <RevealAnswerButton />
      </Card>
      <Playground />
    </>
  )
}

const SubmitQuestionButton = () => {
  const gameAddress = useCurrentGameContractAddressContext()

  const question =
    'Which titan of industry tweeted on 5/9/22: “Deploying more capital - steady lads”?'
  const { write } = useContractWrite({
    address: gameAddress,
    abi: SybilGameAbi,
    functionName: 'progressToNextRound',
    args: [question],
  })
  return <Button onClick={() => write?.()}>Submit question</Button>
}

const RevealAnswerButton = () => {
  const gameAddress = useCurrentGameContractAddressContext()

  const answer = 'Do Kwon'
  const { write } = useContractWrite({
    address: gameAddress,
    abi: SybilGameAbi,
    functionName: 'progressRoundToRevealStage',
    args: [answer],
  })
  return <Button onClick={() => write?.()}>Reveal answer</Button>
}
