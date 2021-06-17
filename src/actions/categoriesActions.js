import axios from "axios";
import { GET_CATEGORIES } from "../utils/constants";

export const getCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/categories.json");
      dispatch(loadCategories(data));
    } catch (error) {
      console.log("error", error.message);
    }
  };
};

export const loadCategories = (categories) => ({
  type: GET_CATEGORIES,
  categories,
});
