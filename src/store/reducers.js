import actionTypes from './actionTypes';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_THEME:
      return {
        ...state,
        currentTheme: action.payload
      };

    default:
      return { ...state };
  }
};

export default reducer;
