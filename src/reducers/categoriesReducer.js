import { GET_CATEGORIES } from "../utils/constants";

const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
};

export default categoriesReducer;
