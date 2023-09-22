import { Address } from 'wagmi'
import { optimism, optimismGoerli } from 'wagmi/chains'

export const WorldIdContractAddressByChainId: Record<number, Address> = {
  [optimism.id]: '0x57f928158C3EE7CDad1e4D8642503c4D0201f611',
  [optimismGoerli.id]: '0x515f06B36E6D3b707eAecBdeD18d8B384944c87f',
}
