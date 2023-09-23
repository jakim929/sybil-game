import { GameContractAddressContext } from '@/components/GameAvailableLayout'
import { useContext } from 'react'

export const useCurrentGameContractAddressContext = () => {
  return useContext(GameContractAddressContext)
}
