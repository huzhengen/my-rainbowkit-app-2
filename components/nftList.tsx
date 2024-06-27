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

const NftList: NextPage = () => {
  const { address } = useAccount()
  console.log('address', address);


  const { writeContract } = useWriteContract()

  const result = useReadContract({
    abi: allenNFTExchangeAbi,
    address: contractAddress.marketAddress as Address,
    functionName: 'getAllNFTs',
    args: [],
  })
  console.log('MARKET', result, result.data);

  const nft = useReadContract({
    abi: allenNFTTokenAbi,
    address: contractAddress.nftAddress as Address,
    functionName: 'getAllNFTs',
    args: [address!]
  })
  console.log('nft', nft, nft.data)


  const buyNFT = (nftAddress: Address, tokenId: bigint) => {
    const result = writeContract({
      abi: allenNFTExchangeAbi,
      address: contractAddress.marketAddress as Address,
      functionName: 'buyNFT',
      args: [nftAddress, tokenId],
    })
  }

  return (
    <div>
      <h3>NFT 列表</h3>
      {result.data?.map(item => (
        <div key={item.tokenId}>
          <h5>token id：{Number(item.tokenId)}</h5>
          <span>NFT 合约地址：{item.nftContract}</span><br></br>
          <span>卖家地址：{item.seller}</span><br></br>
          <span>价格：{Number(item.price)}</span><br></br>
          <button onClick={() => buyNFT(item.nftContract, item.tokenId)}>购买</button>
        </div>
      ))}
    </div>
  );
};

export default NftList;
