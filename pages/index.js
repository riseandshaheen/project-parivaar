import {useEffect, useState} from "react";
import styles from '../styles/Home.module.css'

export default function Home(){

  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      /*
      * Check if we're authorized to access the user's wallet
      */
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const connectWallet = async () =>{
    try {
      const { ethereum } = window;
			if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
			//STARRED//
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      console.log("ethereum object", ethereum);
      setCurrentAccount(accounts[0]);

    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return(
    <div >
      {/* * If there is no currentAccount only then render this button * */}
        { !currentAccount && (
          <button className={styles.btnhover} onClick={connectWallet}>
            Connect wallet
          </button>
        )}
      
      {/* If there is currentAccount then tell you're already connected */}
			{currentAccount && (
        <div className={styles.connected}>
          <p className={styles.useradr}>{currentAccount}</p>
          <p className={styles.subtitle}>Connected</p>
        </div>    
      )}


    </div>
      )
}