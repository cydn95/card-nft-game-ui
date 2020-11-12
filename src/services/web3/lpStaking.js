import BigNumber from "bignumber.js";
import axios from "axios";

export const getEarningAsync = async (instance, address) => {
  return await instance.methods
    .earned(address)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getBalanceAsync = async (instance, address) => {
  return await instance.methods
    .balanceOf(address)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getAllowanceAsync = async (instance, owner, sender) => {
  return await instance.methods
    .allowance(owner, sender)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const depositAsync = async (instance, web3, amount, address) => {
  const response = await axios.get(
    "https://ethgasstation.info/json/ethgasAPI.json"
  );
  let prices = {
    low: response.data.safeLow / 10,
    medium: response.data.average / 10,
    high: response.data.fast / 10,
    fastest: Math.round(response.data.fastest / 10),
  };

  // Get gas limit
  const gasLimit = await instance.methods
    .stake(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .estimateGas({ from: address });

  return await instance.methods
    .stake(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({
      from: address,
      gasPrice: web3.utils.toWei(prices.medium.toString(), "gwei"),
      gas: gasLimit * 2,
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const withdrawAsync = async (instance, web3, amount, address) => {
  const response = await axios.get(
    "https://ethgasstation.info/json/ethgasAPI.json"
  );
  let prices = {
    low: response.data.safeLow / 10,
    medium: response.data.average / 10,
    high: response.data.fast / 10,
    fastest: Math.round(response.data.fastest / 10),
  };

  // Get gas limit
  const gasLimit = await instance.methods
    .withdraw(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .estimateGas({ from: address });

  return await instance.methods
    .withdraw(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({
      from: address,
      gasPrice: web3.utils.toWei(prices.medium.toString(), "gwei"),
      gas: gasLimit * 2,
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const approveAsync = async (
  instance,
  web3,
  amount,
  address,
  spender
) => {
  const response = await axios.get(
    "https://ethgasstation.info/json/ethgasAPI.json"
  );
  let prices = {
    low: response.data.safeLow / 10,
    medium: response.data.average / 10,
    high: response.data.fast / 10,
    fastest: Math.round(response.data.fastest / 10),
  };

  // Get gas limit
  const gasLimit = await instance.methods
    .approve(
      spender,
      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    )
    .estimateGas({ from: address });

  return await instance.methods
    .approve(
      spender,
      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    )
    .send({
      from: address,
      gasPrice: web3.utils.toWei(prices.medium.toString(), "gwei"),
      gas: gasLimit * 2,
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};
