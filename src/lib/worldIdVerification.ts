import { ISuccessResult } from '@worldcoin/idkit'
import { Hex, decodeAbiParameters } from 'viem'

export type WorldIdVerificationResponse = ReturnType<
  typeof decodeWorldIdVerificationResponsePayload
>

export const decodeWorldIdVerificationResponsePayload = ({
  nullifier_hash,
  proof,
  merkle_root,
}: ISuccessResult) => {
  return {
    nullifierHash: decodeAbiParameters(
      [{ type: 'uint256' }],
      nullifier_hash as Hex,
    )[0],
    merkleRoot: decodeAbiParameters(
      [{ type: 'uint256' }],
      merkle_root as Hex,
    )[0],
    proof: decodeAbiParameters([{ type: 'uint256[8]' }], proof as Hex)[0],
  }
}
