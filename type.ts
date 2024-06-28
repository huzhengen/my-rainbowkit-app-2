import { Address } from 'viem';

export interface marketNFT {
  tokenId: bigint
  nftContract: Address
  seller: Address
  price: bigint
  isActive: boolean
}