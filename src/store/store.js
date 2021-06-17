import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import categoriesReducer from "../reducers/categoriesReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    categories: categoriesReducer,
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
