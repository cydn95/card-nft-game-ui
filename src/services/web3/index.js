import Web3 from "web3";
import axios from "axios";

/**
 * Load Web3.js
 */
export const getWeb3 = () =>
  new Promise(async (resolve, reject) => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        // await window.ethereum.send('eth_requestAccounts')
        // Acccounts now exposed
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      // Use Mist/MetaMask's provider.
      const web3 = window.web3;

      resolve(web3);
    }
    // Fallback to localhost; use dev console port by default...
    else {
      const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
      const web3 = new Web3(provider);

      resolve(web3);
    }
  });

export const getGasPrice = async () => {
  const response = await axios.get(
    "https://ethgasstation.info/json/ethgasAPI.json"
  );
  let prices = {
    low: response.data.safeLow / 10,
    medium: response.data.average / 10,
    high: response.data.fast / 10,
    fastest: Math.round(response.data.fastest / 10),
  };
  return prices;
};

export const lookUpPrices = async function (id_array) {
  let ids = id_array.join('%2C')
  let res = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=' +
    ids +
    '&vs_currencies=usd',
  )
  return res.json()
}
