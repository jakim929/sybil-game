import { getSecondsFromMilliSeconds } from '@/lib/getSeconds'
import { useEffect, useState } from 'react'

const calculateRemainingSeconds = (deadline: number) => {
  return Math.max(deadline - getSecondsFromMilliSeconds(Date.now()), 0)
}

export const useRemainingSeconds = (deadline: number | undefined = 0) => {
  const [remainingSeconds, setRemainingSeconds] = useState(
    calculateRemainingSeconds(deadline),
  )

  useEffect(() => {
    if (remainingSeconds === 0) {
      // No need to set an interval if the remainingSeconds is already 0
      return
    }
    const intervalID = setInterval(() => {
      setRemainingSeconds(calculateRemainingSeconds(deadline))
    }, 1000)

    return () => clearInterval(intervalID)
  }, [deadline])

  return remainingSeconds
}
