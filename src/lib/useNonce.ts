import { randomStringForEntropy } from '@stablelib/random'
import { useState } from 'react'
import { Hex, toHex } from 'viem'

const getNonce = () => {
  const nonce = randomStringForEntropy(96)
  if (!nonce || nonce.length < 8) {
    throw new Error('Error during nonce creation.')
  }
  return toHex(nonce, { size: 32 })
}

export const useNonce = () => {
  const [nonce, setNonce] = useState<Hex>(getNonce())
  return {
    nonce,
    resetNonce: () => setNonce(getNonce()),
  }
}
