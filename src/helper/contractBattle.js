// Hash Wars
import DEV_ACTIVE_HASH_WARS_ABI from "./jsonBattle/HashWars_abi_dev.json";
import PROD_ACTIVE_HASH_WARS_ABI from "./jsonBattle/HashWars_abi_prod.json";

// Active Hash Wars
export const DEV_ACTIVE_HASH_WARS_ADDRESS = "0xb0FbF344C4334762435b3E8e90F83Bdb34C8b535";
export const PROD_ACTIVE_HASH_WARS_ADDRESS = "0xb0FbF344C4334762435b3E8e90F83Bdb34C8b535";

// Finished Hash Wars
export const DEV_FINISHED_HASH_WARS_ADDRESS_1 = "0xc6B707967fF085f9247E4367B051299D5d4e04CD";
export const PROD_FINISHED_HASH_WARS_ADDRESS_1 = "0xc6B707967fF085f9247E4367B051299D5d4e04CD";

export { DEV_ACTIVE_HASH_WARS_ABI, PROD_ACTIVE_HASH_WARS_ABI };

export const activeHashWars = {
  round: 3,
  dev: {
    address: DEV_ACTIVE_HASH_WARS_ADDRESS,
    abi: DEV_ACTIVE_HASH_WARS_ABI
  },
  prod: {
    address: PROD_ACTIVE_HASH_WARS_ADDRESS,
    abi: PROD_ACTIVE_HASH_WARS_ABI
  }
};

// need to change
export const finishedHashWars = [
  {
    round: 1,
    dev: {
      address: DEV_FINISHED_HASH_WARS_ADDRESS_1,
      abi: DEV_ACTIVE_HASH_WARS_ABI
    },
    prod: {
      address: PROD_FINISHED_HASH_WARS_ADDRESS_1,
      abi: PROD_ACTIVE_HASH_WARS_ABI
    }
  },
];