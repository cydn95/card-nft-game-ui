import {
  DEV_LPSTAKING_ADDRESS,
  PROD_LPSTAKING_ADDRESS,
  DEV_LPSTAKING_ABI,
  PROD_LPSTAKING_ABI,
  DEV_NFT_ADDRESS,
  PROD_NFT_ADDRESS,
  DEV_NFT_ABI,
  PROD_NFT_ABI,
  DEV_NFT_STAKING_ADDRESS,
  PROD_NFT_STAKING_ADDRESS,
  DEV_NFT_STAKING_ABI,
  PROD_NFT_STAKING_ABI,
} from "../../helper/contract";

const { REACT_APP_BUILD_MODE } = process.env;

export const getLPStakingInstance = (web3) => {
  let abi;
  let instance;
  let address;

  if (REACT_APP_BUILD_MODE === "development") {
    abi = DEV_LPSTAKING_ABI;
    address = DEV_LPSTAKING_ADDRESS;
  } else if (REACT_APP_BUILD_MODE === "production") {
    abi = PROD_LPSTAKING_ABI;
    address = PROD_LPSTAKING_ADDRESS;
  }

  instance = new web3.eth.Contract(abi, address);

  return {
    address,
    abi,
    instance,
  };
};

export const getNFTInstance = (web3) => {
  let abi;
  let instance;
  let address;

  if (REACT_APP_BUILD_MODE === "development") {
    abi = DEV_NFT_ABI;
    address = DEV_NFT_ADDRESS;
  } else if (REACT_APP_BUILD_MODE === "production") {
    abi = PROD_NFT_ABI;
    address = PROD_NFT_ADDRESS;
  }

  instance = new web3.eth.Contract(abi, address);

  return {
    address,
    abi,
    instance,
  };
};

export const getNFTStakingInstance = (web3) => {
  let abi;
  let instance;
  let address;

  if (REACT_APP_BUILD_MODE === "development") {
    abi = DEV_NFT_STAKING_ABI;
    address = DEV_NFT_STAKING_ADDRESS;
  } else if (REACT_APP_BUILD_MODE === "production") {
    abi = PROD_NFT_STAKING_ABI;
    address = PROD_NFT_STAKING_ADDRESS;
  }

  instance = new web3.eth.Contract(abi, address);

  return {
    address,
    abi,
    instance,
  };
};
