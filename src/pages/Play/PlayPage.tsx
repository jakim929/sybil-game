import { SybilGameAbi } from '@/constants/SybilGameAbi'
import { GameCompleted } from '@/pages/Play/GameCompleted'
import { GameInProgress } from '@/pages/Play/GameInProgress'
import { GameNotStarted } from '@/pages/Play/GameNotStarted'
import { Navigate } from 'react-router-dom'
import { useAccount, useContractRead } from 'wagmi'

const useIsPlayerRegisteredForCurrentRound = () => {
  const { address } = useAccount()
  const { data: currentRoundIndex, isLoading: isCurrentRoundIndexLoading } =
    useContractRead({
      address: import.meta.env.VITE_GAME_CONTRACT_ADDRESS,
      abi: SybilGameAbi,
      functionName: 'currentRoundIndex',
    })

  const { data: isRegistered, isLoading: isRoundRegisteredPlayersLoading } =
    useContractRead({
      address: import.meta.env.VITE_GAME_CONTRACT_ADDRESS,
      abi: SybilGameAbi,
      functionName: 'roundRegisteredPlayers',
      args: [currentRoundIndex!, address!],
      enabled: !!address && currentRoundIndex !== undefined,
    })

  const isLoading =
    isCurrentRoundIndexLoading || isRoundRegisteredPlayersLoading

  return {
    isRegistered,
    isLoading,
  }
}

const useGameState = () => {
  const { data: gameState, isLoading } = useContractRead({
    address: import.meta.env.VITE_GAME_CONTRACT_ADDRESS,
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
