import { Hex } from 'viem'

export type SubmissionPayload = {
  answer: string
  nonce: Hex
  commitment: Hex
}
