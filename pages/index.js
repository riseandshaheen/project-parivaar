import {useEffect, useState} from "react";
import styles from '../styles/Home.module.css';
import DeployedContracts from "./deployedContracts.js";

export default function Home(){

  const [currentAccount, setCurrentAccount] = useState("");
  const [currentBalance, setCurrentBalance] = useState("");
  const [currentNetwork, setCurrentNetwork] = useState("");

  const networks = {
   1: "MAINNET",
   3: "ROPSTEN",
   4: "RINKEBY",
   5: "GOERLI"
  };

  const fetchbalance = async () => {
  const { ethereum } = window;
  const accountss = await ethereum.request({ method: "eth_accounts" });
  const useraddr = accountss[0];

  
  const url = `https://api-rinkeby.etherscan.io/api?module=account&action=balance&address=${useraddr}&tag=latest&apikey=${process.env['API_KEY']}`

  const response = await fetch(url);
  const data = await response.json();
  console.log("Data : ", data );
  return (data);
  }

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have an Ethereum wallet installed!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      /** Checking if we're authorized to access the user's wallet **/
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)

        /** Checking for Network ID **/
        const networkId = await ethereum.request({method: "net_version"});
        console.log("Network ID: ", networkId);
        console.log("Network Name: ", `${networks[networkId]}`);
        setCurrentNetwork(`${networks[networkId]}`);

        /** Checking balance in the connected account **/
        const balance = await ethereum.request({method: "eth_getBalance", params:[accounts[0], 'latest'] });
        console.log("Account Balance: ", balance);
        setCurrentBalance(parseInt(balance, 16));
        
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
			/* Asking for authorization from the user*/
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected", accounts[0]);
      console.log("ethereum object", ethereum);
      setCurrentAccount(accounts[0]);

      /** Checking for Network ID **/
      const networkId = await ethereum.request({method: "net_version"});
      console.log("Network ID: ", networkId);
      console.log("Network Name: ", `${networks[networkId]}`);
      setCurrentNetwork(`${networks[networkId]}`);

      /** Checking balance in the connected account **/
      const balance = await ethereum.request({method: "eth_getBalance", params:[accounts[0], 'latest'] })
      console.log("Account Balance: ", balance);
      setCurrentBalance(parseInt(balance, 16));
      

    } catch (error) {
      console.log(error)
    }
  };

/* Check if wallet is connected everytime when page loads */
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return(
    <div >
      {/* * If account is NOT authorized, then render button UI * */}
        { !currentAccount && (
          <button className={styles.btnhover} onClick={connectWallet}>
            Connect wallet
          </button>
        )}
      
      {/* If account is authorized, then show connected card UI*/}
			{currentAccount && (
        <div className={styles.connected}>
          <div className={styles.connectedadr}>
            <p className={styles.infohead}><span>Address</span></p>
            <p className={styles.useradr}>{currentAccount}</p>
          </div>
          

          <div className={styles.connectedbal}>
            <div className={styles.baleth}>
              <p className={styles.infohead}><span>Balance</span></p>
              <div className={styles.connectedbal1}>
                <p className={styles.bal}>{(currentBalance/1000000000000000000).toFixed(4)}</p>
                <p className={styles.wei}>ETH</p>
              </div>
            </div>
            <div>
              <p className={styles.infohead}><span>Network</span></p>
              <p className={styles.bal}>{currentNetwork}</p>
            </div>
          </div>
        {/* Smart contracts deployed */}
        <div>{fetchbalance()}</div>
        </div>
      )}


    </div>
      )
}