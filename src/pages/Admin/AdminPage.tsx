import { WaitingForHostCard } from '@/components/WaitingForHostCard'
import { WaitingForOthersCard } from '@/components/WaitingForOthersCard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SybilGameAbi } from '@/constants/SybilGameAbi'
import { getSecondsFromMilliSeconds } from '@/lib/getSeconds'
import { CommitStage } from '@/pages/Play/CommitStage'
import { RevealStage } from '@/pages/Play/RevealStage'
import { useState } from 'react'
import { useContractWrite } from 'wagmi'

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

export const AdminPage = () => {
  return (
    <>
      <Card className="flex flex-col gap-4">
        <Button>Deploy and start game</Button>
        <SubmitQuestionButton />
        <RevealAnswerButton />
      </Card>
      <Playground />
    </>
  )
}

const SubmitQuestionButton = () => {
  const question =
    'Which titan of industry tweeted on 5/9/22: “Deploying more capital - steady lads”?'
  const { write } = useContractWrite({
    address: import.meta.env.VITE_GAME_CONTRACT_ADDRESS,
    abi: SybilGameAbi,
    functionName: 'progressToNextRound',
    args: [question],
  })
  return <Button onClick={() => write?.()}>Submit question</Button>
}

const RevealAnswerButton = () => {
  const answer = 'Do Kwon'
  const { write } = useContractWrite({
    address: import.meta.env.VITE_GAME_CONTRACT_ADDRESS,
    abi: SybilGameAbi,
    functionName: 'progressRoundToRevealStage',
    args: [answer],
  })
  return <Button onClick={() => write?.()}>Reveal answer</Button>
}
