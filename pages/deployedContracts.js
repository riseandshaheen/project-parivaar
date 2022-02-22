

export default function DeployedContracts(){
  
  

  const { ethereum } = window;
  const accountss = ethereum.request({ method: "eth_accounts" });
  const useraddr = accountss[0];

  
  const url = `https://api-rinkeby.etherscan.io/api?module=account&action=balance&address=${useraddr}&tag=latest&apikey=9IIYAP1RY7KHZ3DDSBAJ6GNB1ITZ4K1XSP`

  const response = fetch(url);
  const data = response.json();
  console.log("Data : ", data );
  
  
  return (
   <h1>calling etherscan api
    </h1>
  )
}