const actions = {
  GET_CARDS: "GET_CARDS",
  GET_CARDS_SUCCESS: "GET_CARDS_SUCCESS",

  BUY_HERO_CARD_ETH: "BUY_HERO_CARD_ETH",

  getCards: () => ({
    type: actions.GET_CARDS,
  }),
  buyHeroCardEth: (cardId, cardPrice, callback) => ({
    type: actions.BUY_HERO_CARD_ETH,
    payload: { cardId, cardPrice, callback },
  }),
};

export default actions;
