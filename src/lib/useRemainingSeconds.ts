import { getSecondsFromMilliSeconds } from '@/lib/getSeconds'
import { useEffect, useState } from 'react'

const calculateRemainingSeconds = (deadline: number) => {
  return Math.max(deadline - getSecondsFromMilliSeconds(Date.now()), 0)
}

export const useRemainingSeconds = (deadline: number) => {
  const [remainingSeconds, setRemainingSeconds] = useState(
    calculateRemainingSeconds(deadline),
  )

  useEffect(() => {
    const intervalID = setInterval(() => {
      setRemainingSeconds(calculateRemainingSeconds(deadline))
    }, 1000)

    return () => clearInterval(intervalID)
  }, [deadline])

  return remainingSeconds
}
