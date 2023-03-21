import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ProductListReducer, ProductDetailsReducer } from "./reducers/reducers";

const reducer = combineReducers({
  productList: ProductListReducer,
  productDetails: ProductDetailsReducer,
});

const initialState = {
  products: [],
  error: null,
  loading: false,
};
const middleware = [thunk];

const store = configureStore(
  { reducer, initialState },
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
