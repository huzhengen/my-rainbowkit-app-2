import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useAccount, useBalance, useReadContract, useToken, useWriteContract } from 'wagmi';
import { formatEther, Address } from 'viem'
import { allenTokenAbi } from '../abis/allenTokenAbi'
import { allenNFTExchangeAbi } from '../abis/allenNFTExchangeAbi';
import { mainnet, sepolia } from 'wagmi/chains'
import { useState } from 'react';
import { contractAddress } from '../utils/address'
import { log } from 'console';
import { allenNFTTokenAbi } from '../abis/allenNFTTokenAbi';
import { marketNFT } from '../type';

type IProps = {
  marketNFTs: readonly marketNFT[]
}

const NftList: NextPage<IProps> = (props) => {
  const { marketNFTs } = props
  const { address } = useAccount()

  const { writeContract } = useWriteContract()

  // 购买 NFT
  const buyNFT = (nftAddress: Address, tokenId: bigint) => {
    console.log('buy nft', nftAddress, tokenId)
    const result = writeContract({
      abi: allenNFTExchangeAbi,
      address: contractAddress.marketAddress as Address,
      functionName: 'buyNFT',
      args: [nftAddress, tokenId],
    })
    console.log('buy nft end')
  }

  // 下架 NFT
  const unlist = (nftAddress: Address, tokenId: bigint, price: bigint) => {
    const result = writeContract({
      abi: allenNFTExchangeAbi,
      address: contractAddress.marketAddress as Address,
      functionName: 'unlistNFT',
      args: [nftAddress, tokenId, price],
    })
  }

  return (
    <div>
      <h3>市场中所有的 NFT</h3>
      {/* {result?.data?.map(item => ( */}
      {marketNFTs?.map(item => (
        <div key={item.tokenId}>
          <h5>token id：{Number(item.tokenId)}</h5>
          <span>NFT 合约地址：{item.nftContract}</span><br></br>
          <span>卖家地址：{item.seller}</span><br></br>
          <span>价格：{Number(item.price)}</span><br></br>
          {item.seller !== address &&
            <button onClick={() => buyNFT(item.nftContract, item.tokenId)}>购买</button>
          }
          {item.seller === address &&
            <button onClick={() => unlist(item.nftContract, item.tokenId, item.price)}>下架</button>}
        </div>
      ))}
    </div>
  );
};

export default NftList;
