import { SybilGameAbi } from '@/constants/SybilGameAbi'
import { useCurrentGameContractAddressContext } from '@/lib/useCurrentGameContext'
import { useIsPlayerRegisteredForCurrentRound } from '@/lib/useIsPlayerRegisteredForCurrentRound'
import { GameCompleted } from '@/pages/Play/GameCompleted'
import { GameInProgress } from '@/pages/Play/GameInProgress'
import { GameNotStarted } from '@/pages/Play/GameNotStarted'
import { Navigate } from 'react-router-dom'
import { useContractRead } from 'wagmi'

const useGameState = () => {
  const gameAddress = useCurrentGameContractAddressContext()

  const { data: gameState, isLoading } = useContractRead({
    address: gameAddress,
    abi: SybilGameAbi,
    functionName: 'gameState',
  })

  return {
    gameState,
    isLoading,
  }
}

export const PlayPage = () => {
  const { isRegistered, isLoading: isPlayerRegisteredLoading } =
    useIsPlayerRegisteredForCurrentRound()

  const { gameState, isLoading: isGameStateLoading } = useGameState()

  if (isGameStateLoading || isPlayerRegisteredLoading) {
    return null //add better loading state
  }

  if (!isRegistered) {
    return <Navigate to="/" />
  }

  // // NOT_STARTED
  if (gameState === 0) {
    return <GameNotStarted />
  }

  if (gameState === 1) {
    return <GameInProgress />
  }

  if (gameState === 2) {
    return <GameCompleted />
  }

  return <div>Play</div>
}
