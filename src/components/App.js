import React, { useEffect } from 'react'
import { ethers } from 'ethers'
import Greeter from '../artifacts/contracts/Greeter.sol/Greeter.json'

export default function App() {
  useEffect(() => {
    loadBlockchainData();
  }, [])
  
  const loadBlockchainData = async () => {
    try {
      const { ethereum } = window;

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
      const greeter = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );

      const message = await greeter.greet();
      console.log(message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <p className='text-green-500'>temporary...</p>
    </div>
  )
}
