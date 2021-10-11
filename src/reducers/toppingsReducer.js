import {
  GET_TOPPINGS_FAILURE,
  GET_TOPPINGS_REQUEST,
  GET_TOPPINGS_SUCCESS,
} from "../utils/constants";

const initialState = {
  isLoading: false,
  isFailed: false,
  data: [],
};

const toppingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOPPINGS_REQUEST:
      return { ...state, isLoading: true };
    case GET_TOPPINGS_SUCCESS:
      return { ...state, isLoading: false, data: action.toppings };
    case GET_TOPPINGS_FAILURE:
      return { ...state, isFailed: true, isLoading: false };
    default:
      return state;
  }
};

export default toppingsReducer;
