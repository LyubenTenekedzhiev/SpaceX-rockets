import * as actionType from "../actions/actionTypes";

const initialState = {
  shouldStageBeCleared: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CLEAR_STAGE:
      return {
        ...state,
        shouldStageBeCleared: [...action.arr],
      };
    default:
      return state;
  }
};

export default reducer;
