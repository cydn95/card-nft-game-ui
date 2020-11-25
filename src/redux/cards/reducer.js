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
  myStakedStrength: 0,
  totalStakedStrength: 0,
  claimableNDR: 0,
  ndrPerDay: 0,
  stakedCardTokens: [],
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
    case actions.GET_MY_STAKED_STRENGTH_SUCCESS:
      return {
        ...state,
        myStakedStrength: action.myStakedStrength,
      };
    case actions.GET_TOTAL_STAKED_STRENGTH_SUCCESS:
      return {
        ...state,
        totalStakedStrength: action.totalStakedStrength,
      };
    case actions.GET_CLAIMABLE_NDR_SUCCESS:
      return {
        ...state,
        claimableNDR: action.claimableNDR,
      };
    case actions.GET_NDR_PER_DAY_SUCCESS:
      return {
        ...state,
        ndrPerDay: action.ndrPerDay,
      };
    case actions.GET_STAKED_CARDS_SUCCESS:
      return {
        ...state,
        stakedCardTokens: [...action.stakedCardTokens],
      };
    default:
      return state;
  }
}
