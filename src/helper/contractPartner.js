import * as Contract from "./contract";

// MEME NFT
import MEME_ABI from "./jsonPartner/MEME_abi.json";

// Meme Staking abi
import DEV_MEME_STAKING_ABI from "./json/MEMEStaking_abi_dev.json";
import PROD_MEME_STAKING_ABI from "./json/MEMEStaking_abi_prod.json";

// MEME Staking
export const DEV_MEME_STAKING_ADDRESS = "0x177e145cE88FE047C3B6A57C59a19103257e7912";
export const PROD_MEME_STAKING_ADDRESS = "0xe7bc79960ef0b7c6b21cec91476a42678c90a37f";
export { DEV_MEME_STAKING_ABI, PROD_MEME_STAKING_ABI };

export const MEME_NFT_ADDRESS = "0xe4605d46fd0b3f8329d936a8b258d69276cba264";

// For dev: Test with nft
export const partnerNFTs = {
  MEME: {
    title: "MEME",
    dev: {
      token: Contract.DEV_NFT_ADDRESS,
      tokenAbi: Contract.DEV_NFT_ABI,
      staking: DEV_MEME_STAKING_ADDRESS,
      stakingAbi: DEV_MEME_STAKING_ABI
    },
    prod: {
      token: MEME_NFT_ADDRESS,
      tokenAbi: MEME_ABI,
      staking: PROD_MEME_STAKING_ADDRESS,
      stakingAbi: PROD_MEME_STAKING_ABI
    },
  },
};
