import { Loader2 } from 'lucide-react'

export const GameNotStarted = () => {
  return (
    <div className="flex-1 flex flex-col bg-sky-400 items-center font-mono text-white justify-center">
      <div className="flex flex-col justify-center gap-8 items-center">
        <div className="text-5xl font-semibold ">Sybil Game Day 1</div>
        <Loader2 className="h-40 w-40 animate-spin" />
        <div className="text-3xl font-semibold">
          Deploying game - steady lads
        </div>
        <div className="text-xl">
          Game starting any moment now... go badger the host to start the game
        </div>
        <div className="font-bold text-4xl">$100 ETH Prize Pool</div>
      </div>
    </div>
  )
}
