import * as Contract from "./contract";

// NDR ERC20 STAKING
import DEV_NDR_ERC20_STAKING_ABI from "./jsonFarm/NDR_ERC20_Staking_abi_dev.json";
import PROD_NDR_ERC20_STAKING_ABI from "./jsonFarm/NDR_ERC20_Staking_abi_prod.json";

// Farms
export const DEV_NDR_ERC20_STAKING_ADDRESS = "0x25bEc9DdC31684dCe863637A11792496C3a4B4eD";
export const PROD_NDR_ERC20_STAKING_ADDRESS = "0x25bEc9DdC31684dCe863637A11792496C3a4B4eD";

export const farms = {
  NDR: {
    dev: {
      staking: {
        address: DEV_NDR_ERC20_STAKING_ADDRESS,
        abi: DEV_NDR_ERC20_STAKING_ABI
      },
      token: {
        address: Contract.DEV_NDR_ADDRESS,
        abi: Contract.DEV_NDR_ABI
      }
    },
    prod: {
      staking: {
        address: PROD_NDR_ERC20_STAKING_ADDRESS,
        abi: PROD_NDR_ERC20_STAKING_ABI
      },
      token: {
        address: Contract.PROD_NDR_ADDRESS,
        abi: Contract.PROD_NDR_ABI
      }
    }
  }
}
