import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useAccount, useBalance, useToken, useWriteContract } from 'wagmi';
import { formatEther, Address } from 'viem'
import { allenTokenAbi } from '../abis/allenTokenAbi'
import { allenNFTExchangeAbi } from '../abis/allenNFTExchangeAbi';
import { mainnet, sepolia } from 'wagmi/chains'
import { useState } from 'react';
import { contractAddress } from '../utils/address';
import { allenNFTTokenAbi } from '../abis/allenNFTTokenAbi';

const MintNFT: NextPage = () => {
  const { address } = useAccount()

  const { writeContract } = useWriteContract()

  // 铸造 NFT
  const handleMintNFT = () => {
    const result = writeContract({
      address: contractAddress.nftAddress as Address,
      abi: allenNFTTokenAbi,
      functionName: 'mint',
      args: [address as Address],
    })
  }

  // 给 NFT 市场授权
  const approvalForAll = () => {
    const result = writeContract({
      address: contractAddress.nftAddress as Address,
      abi: allenNFTTokenAbi,
      functionName: 'setApprovalForAll',
      args: [contractAddress.marketAddress as Address, true],
    })
  }

  return (
    <div>
      <h3>铸造一个 NFT</h3>
      <button onClick={handleMintNFT}>铸造一个 NFT</button>
      <h3>给 NFT 市场授权</h3>
      <button onClick={approvalForAll}>给 NFT 市场授权</button>
    </div>
  );
};

export default MintNFT;
