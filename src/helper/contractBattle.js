// Hash Wars
import DEV_ACTIVE_HASH_WARS_ABI from "./jsonBattle/HashWars_abi_dev.json";
import PROD_ACTIVE_HASH_WARS_ABI from "./jsonBattle/HashWars_abi_prod.json";
import finish_1_dev from "./jsonBattle/finish_1_dev.json";
import finish_1_prod from "./jsonBattle/finish_1_prod.json";
import finish_2_dev from "./jsonBattle/finish_2_dev.json";
import finish_2_prod from "./jsonBattle/finish_2_prod.json";

// Active Hash Wars
export const DEV_ACTIVE_HASH_WARS_ADDRESS = "0x392f6FD88A991bFa23bcab29D49dd1f3a300e7c8";
export const PROD_ACTIVE_HASH_WARS_ADDRESS = "0x392f6FD88A991bFa23bcab29D49dd1f3a300e7c8";

// Finished Hash Wars
export const DEV_FINISHED_HASH_WARS_ADDRESS_1 = "0x533DB42284fBdDe47ED2Ce63a952290abBD2f312";
export const PROD_FINISHED_HASH_WARS_ADDRESS_1 = "0x533DB42284fBdDe47ED2Ce63a952290abBD2f312";
export const DEV_FINISHED_HASH_WARS_ADDRESS_2 = "0xb0FbF344C4334762435b3E8e90F83Bdb34C8b535";
export const PROD_FINISHED_HASH_WARS_ADDRESS_2 = "0xb0FbF344C4334762435b3E8e90F83Bdb34C8b535";

export { DEV_ACTIVE_HASH_WARS_ABI, PROD_ACTIVE_HASH_WARS_ABI };
export { finish_1_dev, finish_1_prod, finish_2_dev, finish_2_prod };

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
      abi: finish_1_dev
    },
    prod: {
      address: PROD_FINISHED_HASH_WARS_ADDRESS_1,
      abi: finish_1_prod
    }
  },
  {
    round: 2,
    dev: {
      address: DEV_FINISHED_HASH_WARS_ADDRESS_2,
      abi: finish_2_dev
    },
    prod: {
      address: PROD_FINISHED_HASH_WARS_ADDRESS_2,
      abi: finish_2_prod
    }
  },
];