import { ConnectWalletStep } from '@/pages/Main/ConnectWalletStep'
import { useAccount } from 'wagmi'
import { VerifyWithWorldIDStep } from '@/pages/Main/VerifyWithWorldIDStep'
import { WorldIdVerificationResponse } from '@/lib/worldIdVerification'
import { useState } from 'react'
import { useIsSignedUp } from '@/lib/useIsSignedUp'
import { SignUpStep } from '@/pages/Main/SignUpStep'
import { Navigate } from 'react-router-dom'
import { CenteredCardLayout } from '@/components/CenteredCardLayout'
import WorldIdBackground from '@/assets/worldid-background.jpg'
import FairlyandBackground from '@/assets/fairlyland-background.jpg'

export const MainPage = () => {
  const { address } = useAccount()
  const [verificationResponse, setVerificationResponse] =
    useState<WorldIdVerificationResponse>()
  const isSignedUp = useIsSignedUp()

  if (!address) {
    return (
      <CenteredCardLayout imageSrc={FairlyandBackground}>
        <ConnectWalletStep />
      </CenteredCardLayout>
    )
  }

  if (!verificationResponse) {
    return (
      <CenteredCardLayout imageSrc={WorldIdBackground}>
        <VerifyWithWorldIDStep
          onSuccess={setVerificationResponse}
          address={address}
        />
      </CenteredCardLayout>
    )
  }

  if (!isSignedUp) {
    return (
      <CenteredCardLayout imageSrc={WorldIdBackground}>
        <SignUpStep
          verificationResponse={verificationResponse}
          address={address}
          reset={() => setVerificationResponse(undefined)}
        />
      </CenteredCardLayout>
    )
  }

  return <Navigate to="/play" />
}
