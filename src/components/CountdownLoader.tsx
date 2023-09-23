import { useRemainingSeconds } from '@/lib/useRemainingSeconds'

// all in seconds not milliseconds
export const CountdownLoader = ({
  startTime,
  deadline,
}: {
  startTime: number
  deadline: number
}) => {
  const remainingSeconds = useRemainingSeconds(deadline)

  const progressPercentage = Math.floor(
    (remainingSeconds / (deadline - startTime)) * 100,
  )

  return (
    <div
      className="radial-progress text-red-500 text-xl"
      style={
        {
          '--value': progressPercentage,
          '--size': '3rem',
          '--thickness': '5px',
        } as React.CSSProperties
      }
    >
      {remainingSeconds}
    </div>
  )
}
