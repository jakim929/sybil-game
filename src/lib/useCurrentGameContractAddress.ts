import { SybilGameLauncherAbi } from '@/constants/SybilGameLauncherAbi'
import { zeroAddress } from 'viem'
import { useContractRead } from 'wagmi'

export const useCurrentGameContractAddress = () => {
  const { data, ...rest } = useContractRead({
    address: import.meta.env.VITE_GAME_LAUNCHER_CONTRACT_ADDRESS,
    abi: SybilGameLauncherAbi,
    functionName: 'currentGame',
    watch: true,
  })

  const gameAddress = data === zeroAddress ? null : data
  return {
    gameAddress,
    ...rest,
  }
}
