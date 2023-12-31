import { SybilGameAbi } from '@/constants/SybilGameAbi'
import { WorldIdVerificationResponse } from '@/lib/worldIdVerification'
import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import MascotImage from '@/assets/mascot.jpg'
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
import { useSubmissionPayloadState } from '@/lib/SubmissionPayloadState'
import { useCurrentGameContractAddressContext } from '@/lib/useCurrentGameContext'

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
  const gameAddress = useCurrentGameContractAddressContext()

  const {
    config,
    error,
    isLoading: isConfigLoading,
  } = usePrepareContractWrite({
    address: gameAddress,
    abi: SybilGameAbi,
    functionName: 'signUp',
    args: [address!, merkleRoot, nullifierHash, proof],
    onSuccess: () => {
      useSubmissionPayloadState.getState().reset()
    },
  })

  const { write, isLoading: isWriteLoading, data } = useContractWrite(config)

  const isLoading = isConfigLoading || isWriteLoading || !!data
  const isButtonDisabled = !write || isLoading

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
          src={MascotImage}
          className="w-full rounded-lg"
          aria-label="mascot image"
        />
        <Button
          disabled={isButtonDisabled}
          onClick={() => write!()}
          className="w-full"
        >
          {/* redirect will occur */}
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isConfigLoading ? 'Loading... ' : 'Signing up...'}
            </>
          ) : (
            <>Sign up</>
          )}{' '}
        </Button>
      </CardContent>
    </WidthRestrictedCard>
  )
}
