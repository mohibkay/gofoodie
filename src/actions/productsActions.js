import axios from "axios";
import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
} from "../utils/constants";

export const getAllProducts = (category) => {
  return async (dispatch) => {
    try {
      let result;

      dispatch(loadProductsRequest());
      const { data: products } = await axios.get("/products.json");
      if (category) {
        result = products.filter(
          (product) =>
            product.categories.cat_title.toLowerCase() ===
            category.toLowerCase()
        );
      } else {
        result = products;
      }

      dispatch(loadProductsSuccess(result));
    } catch (error) {
      dispatch(loadProductsFailure());
    }
  };
};

export const loadProductsRequest = () => ({
  type: GET_PRODUCTS_REQUEST,
});

export const loadProductsSuccess = (products) => ({
  type: GET_PRODUCTS_SUCCESS,
  products,
});

export const loadProductsFailure = () => ({
  type: GET_PRODUCTS_FAILURE,
});
