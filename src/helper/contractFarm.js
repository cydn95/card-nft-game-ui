import * as Contract from "./contract";

// NDR ERC20 STAKING (NDR-ETH)
import DEV_NDR_ERC20_STAKING_ABI from "./jsonFarm/NDR_ERC20_Staking_abi_dev.json";
import PROD_NDR_ERC20_STAKING_ABI from "./jsonFarm/NDR_ERC20_Staking_abi_prod.json";

// NDR-GHST
import NDR_GHST_LP_ABI from "./jsonFarm/NDR-GHST_LP_abi.json";
import NDR_GHST_STAKING_ABI from "./jsonFarm/NDR-GHST_LP_Staking.json";

// NDR-MEME
import NDR_MEME_LP_ABI from "./jsonFarm/NDR-MEME_LP_abi.json";
import NDR_MEME_STAKING_ABI from "./jsonFarm/NDR-MEME_Staking_abi.json";

// NDR-SUSHI
import NDR_SUSHI_SLP_ABI from "./jsonFarm/NDR-SUSHI_SLP_abi.json";
import NDR_SUSHI_STAKING_ABI from "./jsonFarm/NDR-SUSHI_SLP_Staking.json";

// Farms
// export const DEV_NDR_ERC20_STAKING_ADDRESS = "0x25bEc9DdC31684dCe863637A11792496C3a4B4eD";   // Rinkeby
export const DEV_NDR_ERC20_STAKING_ADDRESS = "0x38DA09fD791792D6a6285925F8030A52eF425E4e";    // Ropstein
export const PROD_NDR_ERC20_STAKING_ADDRESS = "0xC4B73419265B9DFcE7abdD0d8E33f99E565d0262";

export const farms = {
  NDR_ETH: {
    title: "ETH-NDR LP",
    link_title: "Obtain LP",
    link: "https://app.uniswap.org/#/add/0x739763a258640919981f9ba610ae65492455be53/ETH",
    dev: {
      staking: {
        address: DEV_NDR_ERC20_STAKING_ADDRESS,
        abi: DEV_NDR_ERC20_STAKING_ABI
      },
      token: {
        address: Contract.DEV_UNISWAPV2PAIR_ADDRESS,
        abi: Contract.DEV_UNISWAPV2PAIR_ABI
      }
    },
    prod: {
      staking: {
        address: PROD_NDR_ERC20_STAKING_ADDRESS,
        abi: PROD_NDR_ERC20_STAKING_ABI
      },
      token: {
        address: Contract.PROD_UNISWAPV2PAIR_ADDRESS,
        abi: Contract.PROD_UNISWAPV2PAIR_ABI
      }
    }
  },
  NDR_MEME: {
    title: "MEME-NDR LP",
    link_title: "Obtain LP",
    link: "https://app.uniswap.org/#/add/0x739763a258640919981f9ba610ae65492455be53/0xd5525d397898e5502075ea5e830d8914f6f0affe",
    dev: {
      staking: {
        address: "0xB9810C2fEcd6771A5052754479f347c3c2f58FF2",
        abi: NDR_MEME_STAKING_ABI
      },
      token: {
        address: "0x1e6d2a075b2e39641c02a616e574087b4a3b3577",
        abi: NDR_MEME_LP_ABI
      }
    },
    prod: {
      staking: {
        address: "0xB9810C2fEcd6771A5052754479f347c3c2f58FF2",
        abi: NDR_MEME_STAKING_ABI
      },
      token: {
        address: "0x1e6d2a075b2e39641c02a616e574087b4a3b3577",
        abi: NDR_MEME_LP_ABI
      }
    },
  },
  NDR_GHST: {
    title: "GHST-NDR LP",
    link_title: "Obtain LP",
    link: "https://app.uniswap.org/#/add/0x3f382dbd960e3a9bbceae22651e88158d2791550/0x739763a258640919981f9ba610ae65492455be53",
    dev: {
      staking: {
        address: "0x122402dF2f985f70277baf22cE9e67E2Ceb1892a",
        abi: NDR_GHST_STAKING_ABI
      },
      token: {
        address: "0x30d48eebf6f7602182798d1baaf8c00ade5d54a8",
        abi: NDR_GHST_LP_ABI
      }
    },
    prod: {
      staking: {
        address: "0x122402dF2f985f70277baf22cE9e67E2Ceb1892a",
        abi: NDR_GHST_STAKING_ABI
      },
      token: {
        address: "0x30d48eebf6f7602182798d1baaf8c00ade5d54a8",
        abi: NDR_GHST_LP_ABI
      }
    },
  },
  // NDR_SUSHI: {
  //   title: "SUSHI-NDR SLP",
  //   link_title: "Obtain SLP",
  //   link: "https://app.uniswap.org/#/add/0x739763a258640919981f9ba610ae65492455be53/ETH",
  //   dev: {
  //     staking: {
  //       address: "0xB85337f0A27203DC31205a715C342ED2dc580296",
  //       abi: NDR_SUSHI_STAKING_ABI
  //     },
  //     token: {
  //       address: "0x3b49d71b23d0a78612374541a3004ef2854fe1c5",
  //       abi: NDR_SUSHI_SLP_ABI
  //     }
  //   },
  //   prod: {
  //     staking: {
  //       address: "0xB85337f0A27203DC31205a715C342ED2dc580296",
  //       abi: NDR_SUSHI_STAKING_ABI
  //     },
  //     token: {
  //       address: "0x3b49d71b23d0a78612374541a3004ef2854fe1c5",
  //       abi: NDR_SUSHI_SLP_ABI
  //     }
  //   },
  // }
}
