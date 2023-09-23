import { randomBytes } from '@stablelib/random'
import { useState } from 'react'
import { Hex, bytesToHex } from 'viem'

const createNonce = () => bytesToHex(randomBytes(32))

export const useNonce = () => {
  const [nonce, setNonce] = useState<Hex>(createNonce())
  return {
    nonce,
    resetNonce: () => setNonce(createNonce()),
  }
}
