import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import categoriesReducer from "../reducers/categoriesReducer";
import productsReducer from "../reducers/productsReducer";
import toppingsReducer from "../reducers/toppingsReducer";
import cartReducer from "../reducers/cartReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    categories: categoriesReducer,
    products: productsReducer,
    toppings: toppingsReducer,
    cart: cartReducer,
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
