import { getGasPrice } from "../web3";
import { getGasFee } from "../../helper/contract";

export const getBattleFinishDateAsync = async (instance) => {
  return await instance.methods
    .battleFinishDate()
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getTeamIdPerUserAsync = async (instance, address) => {
  return await instance.methods
    .teamIdPerUser(address)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const selectTeamAsync = async (instance, web3, teamId, address) => {
  const prices = await getGasPrice();

  // Get gas limit
  const gasLimit = await instance.methods
    .selectTeam(teamId)
    .estimateGas({ from: address });

  return await instance.methods
    .selectTeam(teamId)
    .send({
      from: address,
      gasPrice: web3.utils.toWei(prices.medium.toString(), "gwei"),
      gas: getGasFee(gasLimit),
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};