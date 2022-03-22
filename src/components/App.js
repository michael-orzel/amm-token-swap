import React, { useEffect } from 'react'
import Greeter from '../../artifacts/contracts/Greeter.sol'
import { ethers } from "ethers"

export default function App() {
  useEffect(() => {
    loadBlockchainData();
  }, [])
  
  const loadBlockchainData = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please install MetaMask!");
        window.location.assign("https://metamask.io/");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected", accounts[0]);
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
