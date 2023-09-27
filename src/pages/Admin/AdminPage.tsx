import {
  GameAvailableBaseLayout,
  GameAvailableLayout,
} from '@/components/GameAvailableLayout'
import { NavBar } from '@/components/NavBar'
import { WaitingForHostCard } from '@/components/WaitingForHostCard'
import { WaitingForOthersCard } from '@/components/WaitingForOthersCard'
import { WidthRestrictedCard } from '@/components/WidthRestrictedCard'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { SybilGameAbi } from '@/constants/SybilGameAbi'
import { SybilGameLauncherAbi } from '@/constants/SybilGameLauncherAbi'
import { getSecondsFromMilliSeconds } from '@/lib/getSeconds'
import { questionsByRound } from '@/lib/questionsByRound'
import { useCurrentGameContractAddressContext } from '@/lib/useCurrentGameContext'
import { useCurrentGameContractAddress } from '@/lib/useCurrentGameContractAddress'
import { useCurrentRound } from '@/lib/useCurrentRound'
import { useCurrentRoundRegisteredPlayersCount } from '@/lib/useCurrentRoundRegisteredPlayersCount'
import { useGameState } from '@/lib/useGameState'
import { useRemainingSeconds } from '@/lib/useRemainingSeconds'
import { CommitStage } from '@/pages/Play/CommitStage'
import { GameCompleted } from '@/pages/Play/GameCompleted'
import { RevealStage } from '@/pages/Play/RevealStage'
import { useState } from 'react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'

const Playground = () => {
  const [startTime] = useState(BigInt(getSecondsFromMilliSeconds(Date.now())))
  return (
    <>
      <GameCompleted />
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
  const { config, isLoading: isConfigLoading } = usePrepareContractWrite({
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

  return {
    ...useContractWrite(config),
    isConfigLoading,
  }
}

const LaunchGameButton = ({
  numRounds,
  commitDuration,
  revealDuration,
}: {
  numRounds: number
  commitDuration: number
  revealDuration: number
}) => {
  const { write, isLoading, isConfigLoading } = useLaunchGame({
    numRounds,
    commitDuration,
    revealDuration,
  })
  return (
    <Button
      disabled={isConfigLoading || isLoading}
      onClick={() => write?.()}
      className="w-full"
    >
      Launch game
    </Button>
  )
}

const defaultDuration = 30
const defaultNumRounds = 2

const LaunchCard = () => {
  const [selectedDuration, setSelectedDuration] = useState(defaultDuration)
  const [selectedNumRounds, setSelectedNumRounds] = useState(defaultNumRounds)

  return (
    <WidthRestrictedCard>
      <CardHeader>
        <CardTitle>Launcher</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <div className="text-lg flex flex-col gap-2 font-semibold">
          Commit & Reveal durations
          <div className="text-sm font-light">{selectedDuration} seconds</div>
          <Slider
            defaultValue={[defaultDuration]}
            step={1}
            max={100}
            min={20}
            value={[selectedDuration]}
            onValueChange={(value) => setSelectedDuration(value[0])}
          />
        </div>
        <div className="text-lg flex flex-col gap-2 font-semibold">
          Number of rounds
          <div className="text-sm font-light">{selectedNumRounds} rounds</div>
          <Slider
            defaultValue={[defaultNumRounds]}
            step={1}
            max={10}
            min={2}
            value={[selectedNumRounds]}
            onValueChange={(value) => setSelectedNumRounds(value[0])}
          />
        </div>
      </CardContent>
      <CardFooter>
        <LaunchGameButton
          numRounds={selectedNumRounds}
          commitDuration={selectedDuration}
          revealDuration={selectedDuration}
        />
      </CardFooter>
    </WidthRestrictedCard>
  )
}

export const AdminPage = () => {
  return (
    <div className="flex flex-col flex-1 ">
      <NavBar />
      <div className="flex-1 flex flex-col justify-center items-center gap-4">
        <GameAvailableBaseLayout>
          <GameStatusBoard />
        </GameAvailableBaseLayout>
        <LaunchCard />
      </div>

      <Playground />
    </div>
  )
}

const RoundState = ({
  state,
}: {
  state: 0 | 1
}) => {
  switch (state) {
    case 0:
      return <div>Commit stage</div>
    case 1:
      return <div>Reveal stage</div>
  }
}

const GameState = ({
  state,
}: {
  state: 0 | 1 | 2
}) => {
  switch (state) {
    case 0:
      return <div>Game not started</div>
    case 1:
      return <div>Game in progress</div>
    case 2:
      return <div>Game completed</div>
  }
}

const GameStatusBoard = () => {
  const gameAddress = useCurrentGameContractAddressContext()
  const {
    currentRound,
    currentRoundIndex,
    isLoading: isCurrentRoundLoading,
  } = useCurrentRound()

  const { gameState, isLoading: isGameStateLoading } = useGameState()

  const { roundRegisteredPlayersCount, isLoading: isPlayerCountLoading } =
    useCurrentRoundRegisteredPlayersCount()

  if (
    isCurrentRoundLoading ||
    !currentRound ||
    currentRoundIndex === undefined ||
    isGameStateLoading ||
    gameState === undefined ||
    isPlayerCountLoading ||
    roundRegisteredPlayersCount === undefined
  ) {
    console.log(
      isCurrentRoundLoading,
      currentRound,
      currentRoundIndex,
      isGameStateLoading,
      gameState,
      roundRegisteredPlayersCount,
      isPlayerCountLoading,
    )
    return <div>Loading...</div>
  }

  return (
    <WidthRestrictedCard>
      <CardHeader>
        <CardTitle>Game Status</CardTitle>
        <CardDescription>game address: {gameAddress}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          Game state: <GameState state={gameState as any} />
        </div>
        <div>Current round: {Number(currentRoundIndex)}</div>
        <div className="flex items-center gap-2">
          Current round state: <RoundState state={currentRound.state as any} />
        </div>
        <div>Current round question: {currentRound.question.toString()}</div>
        <div>Current answer: {currentRound.answer.toString()}</div>
        <div>Current round deadline: {currentRound.deadline.toString()}</div>
        <div># Remaining players: {roundRegisteredPlayersCount.toString()}</div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <SubmitQuestionButton />
        <RevealAnswerButton />
      </CardFooter>
    </WidthRestrictedCard>
  )
}

const SubmitQuestionButton = () => {
  const gameAddress = useCurrentGameContractAddressContext()
  const { currentRound, currentRoundIndex, isLoading } = useCurrentRound()
  const { gameState, isLoading: isGameStateLoading } = useGameState()

  const remainingSeconds = useRemainingSeconds(
    currentRound?.deadline !== undefined
      ? Number(currentRound?.deadline)
      : undefined,
  )
  if (
    isLoading ||
    currentRoundIndex === undefined ||
    !currentRound ||
    isGameStateLoading ||
    gameState === undefined
  ) {
    return <div>'Loading...'</div>
  }

  const enabled =
    (remainingSeconds <= 0 && currentRound.state === 1) || gameState === 0

  const question =
    gameState === 0
      ? questionsByRound[Number(currentRoundIndex)].question
      : questionsByRound[Number(currentRoundIndex) + 1].question

  const { write, isLoading: isWriteLoading } = useContractWrite({
    address: gameAddress,
    abi: SybilGameAbi,
    functionName: 'progressToNextRound',
    args: [question],
  })
  return (
    <Button
      disabled={!enabled || !write || isLoading}
      onClick={() => write?.()}
    >
      Submit question
    </Button>
  )
}

const RevealAnswerButton = () => {
  const gameAddress = useCurrentGameContractAddressContext()

  const {
    currentRound,
    currentRoundIndex,
    isLoading: isCurrentRoundLoading,
  } = useCurrentRound()

  const remainingSeconds = useRemainingSeconds(
    currentRound?.deadline !== undefined
      ? Number(currentRound?.deadline)
      : undefined,
  )

  if (
    isCurrentRoundLoading ||
    currentRoundIndex === undefined ||
    !currentRound
  ) {
    return <div>'Loading...'</div>
  }

  const enabled = remainingSeconds <= 0 && currentRound.state === 0

  const answer = questionsByRound[Number(currentRoundIndex)].answer
  const { write, isLoading } = useContractWrite({
    address: gameAddress,
    abi: SybilGameAbi,
    functionName: 'progressRoundToRevealStage',
    args: [answer],
  })
  return (
    <Button
      disabled={!enabled || !write || isLoading}
      onClick={() => write?.()}
    >
      Reveal answer
    </Button>
  )
}
