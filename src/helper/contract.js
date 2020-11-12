/*

NodeRunnersToken 0x739763a258640919981F9bA610AE65492455bE53
HeroFactory 0xe74E12e5B70346025e7Fd95E68d6a6F8fD206C16
HeroStaking 0x29326F9050Be6DF0eC285d55476dF4906c82DA1e
VillainFactory 0xb3bbccac27cbf08ca4187ad6b840bdac5c9ef37d
VillainStaking 0x335ed0F48715E6CF86D46D630dAdddcF7cBDDb6A
HashToken 0x300496A0352e2E302a3d6df66e66B08625C305Be
Old LPStaking 0x7ECE965a34fA67c9647B4030fF3BDf1160c6163C
UniLP 0x65d0A154D2425CE2Fd5fED3BdaE94D9a9aFE55CE

*/
// LpStaking (NEW POOL)
import DEV_LPSTAKING_ABI from "./json/LpStaking_new_abi_dev.json";
import PROD_LPSTAKING_ABI from "./json/LpStaking_new_abi_prod.json";

// LpStaking (OLD POOL)
import DEV_LPSTAKING_OLD_ABI from "./json/LpStaking_old_abi_dev.json";
import PROD_LPSTAKING_OLD_ABI from "./json/LpStaking_old_abi_prod.json";

// UniswapV2Pair
import DEV_UNISWAPV2PAIR_ABI from "./json/UniswapV2Pair_abi_dev.json";
import PROD_UNISWAPV2PAIR_ABI from "./json/UniswapV2Pair_abi_prod.json";

// NDR
import DEV_NDR_ABI from "./json/NDR_abi_dev.json";
import PROD_NDR_ABI from "./json/NDR_abi_prod.json";

// LpStaking (new lp pool - mainnet is not ready)
export const DEV_LPSTAKING_ADDRESS = "0x1e94e09BaF1F9BB95e78DE116a7875e8870F9B0c";
export const PROD_LPSTAKING_ADDRESS = "0x0f5d42b4837e27cc7a7f3a0c59d982ff5598ce5d";
export { DEV_LPSTAKING_ABI, PROD_LPSTAKING_ABI };

// LpStaking (old lp pool - mainnet is not ready)
export const DEV_LPSTAKING_OLD_ADDRESS = "0xb7709fe03262bad4ef1976ce3ffd927d9861d9c2";
export const PROD_LPSTAKING_OLD_ADDRESS = "0x7ECE965a34fA67c9647B4030fF3BDf1160c6163C";
export { DEV_LPSTAKING_OLD_ABI, PROD_LPSTAKING_OLD_ABI };

// UniswapV2Pair (lp token NDRWETH)
export const DEV_UNISWAPV2PAIR_ADDRESS = "0x14c8177245407380d93c501b3e5bec4f228bcc69";
export const PROD_UNISWAPV2PAIR_ADDRESS = "0x65d0A154D2425CE2Fd5fED3BdaE94D9a9aFE55CE";
export { DEV_UNISWAPV2PAIR_ABI, PROD_UNISWAPV2PAIR_ABI };

// NDR (ndr token)
export const DEV_NDR_ADDRESS = "0x29326F9050Be6DF0eC285d55476dF4906c82DA1e";
export const PROD_NDR_ADDRESS = "0x739763a258640919981F9bA610AE65492455bE53";
export { DEV_NDR_ABI, PROD_NDR_ABI };

// web3 provider (not used for now)
export const DEV_WEB3_WEBSOCKET_PROVIDER = "wss://kovan.infura.io/ws/v3/235035a10d0a4a9eadc71fff0c1240dc";
export const PROD_WEB3_WEBSOCKET_PROVIDER = "wss://mainnet.infura.io/ws/v3/235035a10d0a4a9eadc71fff0c1240dc";
