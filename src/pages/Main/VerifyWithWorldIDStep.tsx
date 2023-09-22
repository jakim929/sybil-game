import { Button } from '@/components/ui/button'
import { CredentialType, IDKitWidget, ISuccessResult } from '@worldcoin/idkit'
import WorldcoinLogo from '@/assets/worldcoin-logo.svg?react'
import WorldIDAppImage from '@/assets/worldid-app.jpg'
import { Address, decodeAbiParameters } from 'viem'

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { optimism } from 'wagmi/chains'
import { WorldIdContractAddressByChainId } from '@/constants/WorldIdContractAddressByChainId'
import { useAccount, useContractRead, useContractWrite } from 'wagmi'
import { WorldIdAbi } from '@/constants/WorldIdAbi'
import { SybilGameAbi } from '@/constants/SybilGameAbi'
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

const Test = () => {
  const result: WorldIdVerificationResponsePayload = {
    merkle_root:
      '0x0ebe081ab77457501ea7bebe4fae7cdd58a88785f233242d4730e494724a49a7',
    nullifier_hash:
      '0x10cd1a7f55a867bbf8fd2676e3152e774cf0fac96324d982a1143bb738f3afd5',
    proof:
      '0x19d54e3aa70982d6ff77cb67d069e0b0637a67930c0ce337003b5b593d48e733153b000f7a4773045b6b5a7e51ea15e364c1be8023f812900eb4e01e433393b80d0affaf48e47f705503b3632f3227f5eac81f28b809fa9545a9f17eae6845b300c6408ed4e14dc0610ad139719532604c82f6b9bd49020c969e8ded38305bf62514c62aa04e0dea465995b72cf82bd1af2f8b95149498dfe960b092d32f47ab1d4a4e848eaa6f7e1e623a73ae16f6fcac89cd089d956f3acbe217580842aa8d0441d35110d3588d58ac82a931c9e2760d32886366784be0f5b494729a9732d11e2660a956404e1d149d63ceb6fd6224164c71efe10add37071df49df6397e88',
    credential_type: 'orb',
  }

  const { merkle_root, proof, nullifier_hash } =
    decodeWorldIdVerificationResponsePayload(result)

  const address = WorldIdContractAddressByChainId[optimism.id]

  const { data } = useContractRead({
    address,
    abi: WorldIdAbi,
    functionName: 'verifyProof',
    args: [
      merkle_root,
      decodeAbiParameters(
        [{ type: 'uint256' }],
        '0x20713008a2dd6e63a32c10ff4351338710b2f31913a6f106b9f3784495cefe',
      )[0],
      nullifier_hash,
      0n,
      proof,
    ],
  })
  console.log(data)
  return null
}

const Test4 = () => {
  const { data } = useContractRead({
    address: import.meta.env.VITE_GAME_CONTRACT_ADDRESS,
    abi: SybilGameAbi,
    functionName: 'appId',
  })

  console.log('appId', data)
  return null
}

const Test2 = ({
  verificationParams,
}: {
  verificationParams: WorldIdVerificationResponsePayload
}) => {
  const result = decodeWorldIdVerificationResponsePayload(verificationParams)
  const { address } = useAccount()
  const { write } = useContractWrite({
    address: import.meta.env.VITE_GAME_CONTRACT_ADDRESS,
    abi: SybilGameAbi,
    functionName: 'signUp',
    args: [address!, result.merkle_root, result.nullifier_hash, result.proof],
  })
  return <Button onClick={() => write()}>signup</Button>
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
