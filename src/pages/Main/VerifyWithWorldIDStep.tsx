import { Button } from '@/components/ui/button'
import { CredentialType, IDKitWidget, ISuccessResult } from '@worldcoin/idkit'
import WorldcoinLogo from '@/assets/worldcoin-logo.svg?react'
import WorldIDAppImage from '@/assets/worldid-app.jpg'
import { Address } from 'viem'

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  WorldIdVerificationResponse,
  decodeWorldIdVerificationResponsePayload,
} from '@/lib/worldIdVerification'
import { WidthRestrictedCard } from '@/components/WidthRestrictedCard'

const VerifyWithWorldIDButton = ({
  address,
  handleVerify,
}: {
  address: Address
  handleVerify: (params: ISuccessResult) => void
}) => {
  return (
    <IDKitWidget
      walletConnectProjectId={import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID}
      signal={address}
      app_id={import.meta.env.VITE_WORLDID_APP_ID} // obtained from the Developer Portal
      action={import.meta.env.VITE_WORLDID_ACTION_ID} // this is your action name from the Developer Portal
      onSuccess={console.log} // callback when the modal is closed
      handleVerify={handleVerify} // optional callback when the proof is received
      action_description="Test2"
      credential_types={[CredentialType.Orb]}
      autoClose
    >
      {({ open }) => (
        <Button onClick={() => open()} className="w-full">
          Verify with World ID
          <WorldcoinLogo className="w-4 h-4 ml-2" />
        </Button>
      )}
    </IDKitWidget>
  )
}

export const VerifyWithWorldIDStep = ({
  address,
  onSuccess,
}: {
  address: Address
  onSuccess: (response: WorldIdVerificationResponse) => void
}) => {
  return (
    <WidthRestrictedCard>
      <CardHeader className="gap-2">
        <CardTitle>Verify with World App</CardTitle>
        <CardDescription>
          Please verify your humanity using World ID
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-8">
        <img
          src={WorldIDAppImage}
          className="w-full rounded-lg"
          aria-label="World ID image"
        />
        <VerifyWithWorldIDButton
          address={address}
          handleVerify={(result: ISuccessResult) => {
            onSuccess(decodeWorldIdVerificationResponsePayload(result))
          }}
        />
      </CardContent>
    </WidthRestrictedCard>
  )
}
