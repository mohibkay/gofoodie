import axios from "axios";
import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
} from "../utils/constants";

export const getCategories = () => {
  return async (dispatch) => {
    try {
      dispatch(loadCategoriesRequest());
      const { data } = await axios.get("/categories.json");
      dispatch(loadCategoriesSuccess(data));
    } catch (error) {
      dispatch(loadCategoriesFailure());
    }
  };
};

export const loadCategoriesRequest = () => ({
  type: GET_CATEGORIES_REQUEST,
});

export const loadCategoriesSuccess = (categories) => ({
  type: GET_CATEGORIES_SUCCESS,
  categories,
});

export const loadCategoriesFailure = () => ({
  type: GET_CATEGORIES_FAILURE,
});
