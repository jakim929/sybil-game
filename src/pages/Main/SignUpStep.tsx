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
import { Loader2 } from 'lucide-react'

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

  const { write, isLoading, data } = useContractWrite(config)

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
        <Button
          disabled={!write || isLoading}
          onClick={() => write!()}
          className="w-full"
        >
          {/* redirect will occur */}
          {isLoading || data ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing up...
            </>
          ) : (
            <>Sign up</>
          )}{' '}
        </Button>
      </CardContent>
    </WidthRestrictedCard>
  )
}
