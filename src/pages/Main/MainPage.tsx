import { ConnectWalletStep } from '@/pages/Main/ConnectWalletStep'
import { useAccount } from 'wagmi'
import { VerifyWithWorldIDStep } from '@/pages/Main/VerifyWithWorldIDStep'
import { WorldIdVerificationResponse } from '@/lib/worldIdVerification'
import { useState } from 'react'
import { useIsSignedUp } from '@/lib/useIsSignedUp'
import { SignUpStep } from '@/pages/Main/SignUpStep'
import { Navigate } from 'react-router-dom'
import { CenteredCardLayout } from '@/components/CenteredCardLayout'

const MainPageContent = () => {
  const { address } = useAccount()
  const [verificationResponse, setVerificationResponse] =
    useState<WorldIdVerificationResponse>()
  const isSignedUp = useIsSignedUp()

  if (!address) {
    return <ConnectWalletStep />
  }

  if (!verificationResponse) {
    return (
      <VerifyWithWorldIDStep
        onSuccess={setVerificationResponse}
        address={address}
      />
    )
  }

  if (!isSignedUp) {
    return (
      <SignUpStep
        verificationResponse={verificationResponse}
        address={address}
        reset={() => setVerificationResponse(undefined)}
      />
    )
  }

  return <Navigate to="/play" />
}

export const MainPage = () => {
  return (
    <CenteredCardLayout>
      <MainPageContent />
    </CenteredCardLayout>
  )
}
