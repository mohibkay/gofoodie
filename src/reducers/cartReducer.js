import {
  ADD_TO_CART_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  SET_CART_REQUEST,
  SET_CART_SUCCESS,
  SET_CART_FAILURE,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAILURE,
  CHANGE_PRODUCT_COUNT,
} from "../utils/constants";

const initialState = {
  isLoading: false,
  isFailed: false,
  data: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
    case SET_CART_REQUEST:
    case REMOVE_FROM_CART_REQUEST:
      return { ...state, isLoading: true };

    case ADD_TO_CART_SUCCESS:
    case SET_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isFailed: false,
        data: action.products,
      };

    case ADD_TO_CART_FAILURE:
    case SET_CART_FAILURE:
    case REMOVE_FROM_CART_FAILURE:
      return { ...state, isFailed: true, isLoading: false };

    case REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isFailed: false,
        data: state.data.filter((item) => item.id !== action.id),
      };

    case CHANGE_PRODUCT_COUNT:
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.id === action.id) {
            if (action.isIncrement) {
              return {
                ...item,
                quantity: item.quantity + 1,
              };
            } else if (item.quantity > 1) {
              return {
                ...item,
                quantity: item.quantity - 1,
              };
            } else {
              return item;
            }
          } else {
            return item;
          }
        }),
      };
    default:
      return state;
  }
};

export default cartReducer;
