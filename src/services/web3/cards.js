export const getHeroPriceAsync = async (instance, rarity) => {
  return await instance.methods
    .getPriceHero(rarity)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getSupportPriceAsync = async (instance, rarity) => {
  return await instance.methods
    .getPriceSupport(rarity)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getCirculatingSupply = async (instance, tokenId) => {
  return await instance.methods
    .circulatingSupply(tokenId)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};
