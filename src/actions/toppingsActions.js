import axios from "axios";
import {
  GET_TOPPINGS_REQUEST,
  GET_TOPPINGS_SUCCESS,
  GET_TOPPINGS_FAILURE,
  STRAPI_API_URL,
} from "../utils/constants";

export const getToppings = () => {
  return async (dispatch) => {
    try {
      dispatch(loadToppingsRequest());
      const { data: toppings } = await axios.get(`${STRAPI_API_URL}/toppings`);
      dispatch(loadToppingsSuccess(toppings));
    } catch (error) {
      dispatch(loadToppingsFailure());
    }
  };
};

export const loadToppingsRequest = () => ({
  type: GET_TOPPINGS_REQUEST,
});

export const loadToppingsSuccess = (toppings) => ({
  type: GET_TOPPINGS_SUCCESS,
  toppings,
});

export const loadToppingsFailure = () => ({
  type: GET_TOPPINGS_FAILURE,
});
