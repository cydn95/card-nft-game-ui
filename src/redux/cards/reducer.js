import actions from "./actions";
import { CARD_RARITY } from "../../helper/constant";

const initState = {
  cards: [],
  cardPrice: {
    [CARD_RARITY.COMMON]: {
      hero: 0,
      support: 0,
    },
    [CARD_RARITY.RARE]: {
      hero: 0,
      support: 0,
    },
    [CARD_RARITY.EPIC]: {
      hero: 0,
      support: 0,
    },
    [CARD_RARITY.LEGENDARY]: {
      hero: 0,
      support: 0,
    },
  },
};

export default function pageReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_CARDS_SUCCESS:
      return {
        ...state,
        cards: action.cards,
      };
    case actions.GET_CARDS_PRICE_SUCCESS:
      return {
        ...state,
        cardPrice: action.cardPrice,
      };
    default:
      return state;
  }
}
