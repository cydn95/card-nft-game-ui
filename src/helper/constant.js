export const NETWORK = {
  MAIN: 1,
  ROPSTEIN: 3,
  RINKEBY: 4,
  GOERLI: 5,
  KOVAN: 42,
};

export const getNetworkChainId = () => {
  const { REACT_APP_BUILD_MODE } = process.env;

  if (REACT_APP_BUILD_MODE === "production") {
    return NETWORK.MAIN;
  } else {
    return NETWORK.RINKEBY;
  }
};

export const STAKE_MIN_LIMIT = 2.25;
export const STAKE_MAX_LIMIT = 22.5;

export const STAKE_RESPONSE = {
  SUCCESS: 100,
  INSUFFICIENT: 200,
  ERROR: 300,
  SHOULD_APPROVE: 400,
  SHOULD_STAKE: 500,
};
