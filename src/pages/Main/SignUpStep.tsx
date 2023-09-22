import { SybilGameAbi } from '@/constants/SybilGameAbi'
import { WorldIdVerificationResponse } from '@/lib/worldIdVerification'
import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import WorldIDAppImage from '@/assets/worldid-app.jpg'
import { Address } from 'viem'

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { WidthRestrictedCard } from '@/components/WidthRestrictedCard'

export const SignUpStep = ({
  address,
  verificationResponse,
  reset,
}: {
  address: Address
  verificationResponse: WorldIdVerificationResponse
  reset: () => void
}) => {
  const { merkleRoot, nullifierHash, proof } = verificationResponse
  const { config, error } = usePrepareContractWrite({
    address: import.meta.env.VITE_GAME_CONTRACT_ADDRESS,
    abi: SybilGameAbi,
    functionName: 'signUp',
    args: [address!, merkleRoot, nullifierHash, proof],
  })

  const { write } = useContractWrite(config)

  return (
    <WidthRestrictedCard>
      <CardHeader className="gap-2">
        <CardTitle>Sign up</CardTitle>
        <CardDescription>
          Thank you for verifying with WorldID. Register to play the game!
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-8">
        <img
          src={WorldIDAppImage}
          className="w-full rounded-lg"
          aria-label="World ID image"
        />
        <Button disabled={!write} onClick={() => write!()} className="w-full">
          Sign up
        </Button>
      </CardContent>
    </WidthRestrictedCard>
  )
}
