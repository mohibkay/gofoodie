import {
  GET_CATEGORIES_FAILURE,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
} from "../utils/constants";

const initialState = {
  isLoading: false,
  isFailed: false,
  data: [],
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return { ...state, isLoading: true };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        isFailed: false,
        isLoading: false,
        data: action.categories,
      };
    case GET_CATEGORIES_FAILURE:
      return { ...state, isFailed: true, isLoading: false };
    default:
      return state;
  }
};

export default categoriesReducer;
