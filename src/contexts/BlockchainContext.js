import React, { useContext, useState, useEffect } from 'react'
import { ethers } from 'ethers'
import Greeter from '../artifacts/contracts/Greeter.sol/Greeter.json'

const BlockchainContext = React.createContext();

export function useBlockchain() {
  return useContext(BlockchainContext);
}

export function BlockchainProvider({ children }) {
  const { ethereum } = window;
  
  useEffect(() => {
    //
  });

  try {
    // Load Web3 Provider
    if (!ethereum) {
      alert("Please install MetaMask!");
      window.location.assign("https://metamask.io/");
      return;
    }
    const provider = new ethers.providers.Web3Provider(ethereum);

    // Load Accounts & Signer
    const accounts = await provider.send("eth_requestAccounts", []);
    console.log("Connected", accounts[0]);
    const signer = provider.getSigner();

    // Load Contracts
    const greeterAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"
    const greeterContract = new ethers.Contract(
      greeterAddress,
      Greeter.abi,
      provider
    );

    const message = await greeterContract.greet();
    console.log(message);
  } catch (error) {
    console.log(error);
  }

  const data = {
    //
  };

  return (
    <div>
      <BlockchainContext.Provider value={data}>
        { children }
      </BlockchainContext.Provider>
    </div>
  );
}
