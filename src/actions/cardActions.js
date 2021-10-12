import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAILURE,
  SET_CART_REQUEST,
  SET_CART_SUCCESS,
  SET_CART_FAILURE,
  CHANGE_PRODUCT_COUNT,
} from "../utils/constants";

export const addToCartAction = (products) => {
  return (dispatch) => {
    try {
      dispatch(addToCartActionRequest());
      dispatch(addToCartActionSuccess(products));
    } catch (error) {
      dispatch(addToCartActionFailure());
    }
  };
};

export const addToCartActionRequest = () => ({
  type: ADD_TO_CART_REQUEST,
});

export const addToCartActionSuccess = (products) => ({
  type: ADD_TO_CART_SUCCESS,
  products,
});

export const addToCartActionFailure = () => ({
  type: ADD_TO_CART_FAILURE,
});

export const removeFromCartAction = (id) => {
  return (dispatch) => {
    try {
      dispatch(removeFromCartActionRequest());
      return dispatch(removeFromCartActionSuccess(id));
    } catch (error) {
      return dispatch(removeFromCartActionFailure());
    }
  };
};

export const removeFromCartActionRequest = () => ({
  type: REMOVE_FROM_CART_REQUEST,
});

export const removeFromCartActionSuccess = (id) => ({
  type: REMOVE_FROM_CART_SUCCESS,
  id,
});

export const removeFromCartActionFailure = () => ({
  type: REMOVE_FROM_CART_FAILURE,
});

export const setCartAction = (products) => {
  return (dispatch) => {
    try {
      dispatch(setCartActionRequest());
      dispatch(setCartActionSuccess(products));
    } catch (error) {
      dispatch(setCartActionFailure());
    }
  };
};

export const setCartActionRequest = () => ({
  type: SET_CART_REQUEST,
});

export const setCartActionSuccess = (products) => ({
  type: SET_CART_SUCCESS,
  products,
});

export const setCartActionFailure = () => ({
  type: SET_CART_FAILURE,
});

export const changeProductCountAction = (id, isIncrement) => {
  return (dispatch) => {
    try {
      dispatch(changeProductCount(id, isIncrement));
    } catch (error) {
      console.log("error while changing product count");
    }
  };
};

export const changeProductCount = (id, isIncrement) => ({
  type: CHANGE_PRODUCT_COUNT,
  id,
  isIncrement,
});
