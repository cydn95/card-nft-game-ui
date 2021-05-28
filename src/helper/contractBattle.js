// Hash Wars
import DEV_ACTIVE_HASH_WARS_ABI from "./jsonBattle/HashWars_abi_dev.json";
import PROD_ACTIVE_HASH_WARS_ABI from "./jsonBattle/HashWars_abi_prod.json";

// Hash Wars
export const DEV_ACTIVE_HASH_WARS_ADDRESS = "0x40079EE7fC296E260B432DB34a7763D79b2e94Ce";
export const PROD_ACTIVE_HASH_WARS_ADDRESS = "0x40079EE7fC296E260B432DB34a7763D79b2e94Ce";
export { DEV_ACTIVE_HASH_WARS_ABI, PROD_ACTIVE_HASH_WARS_ABI };

export const activeHashWars = {
  round: 2,
  dev: {
    address: DEV_ACTIVE_HASH_WARS_ADDRESS,
    abi: DEV_ACTIVE_HASH_WARS_ABI
  },
  prod: {
    address: PROD_ACTIVE_HASH_WARS_ADDRESS,
    abi: PROD_ACTIVE_HASH_WARS_ABI
  }
};

export const finishedHashWars = [
  {
    round: 1,
    dev: {
      address: DEV_ACTIVE_HASH_WARS_ADDRESS,
      abi: DEV_ACTIVE_HASH_WARS_ABI
    },
    prod: {
      address: PROD_ACTIVE_HASH_WARS_ADDRESS,
      abi: PROD_ACTIVE_HASH_WARS_ABI
    }
  },
];