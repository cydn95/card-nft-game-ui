import actions from "./actions";
const initState = {
  cards: [] 
};

export default function pageReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_CARDS_SUCCESS:
      return {
        ...state,
        cards: action.cards
      };
    default:
      return state;
  }
}
