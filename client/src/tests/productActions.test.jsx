import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { listProducts, listProductDetails } from "../actions/productActions";

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockAxios = new MockAdapter(axios);

describe("productActions", () => {
  describe("listProducts", () => {
    afterEach(() => {
      mockAxios.reset();
    });

    it("dispatches PRODUCT_LIST_SUCCESS when fetching products is successful", async () => {
      const products = [{ id: 1, name: "Product 1" }];
      mockAxios.onGet("/api/products").reply(200, products);

      const expectedActions = [
        { type: PRODUCT_LIST_REQUEST },
        { type: PRODUCT_LIST_SUCCESS, payload: products },
      ];
      const store = mockStore({ products: [] });

      await store.dispatch(listProducts());
      expect(store.getActions()).toEqual(expectedActions);
    });

    it("dispatches PRODUCT_LIST_FAIL when fetching products fails", async () => {
      mockAxios.onGet("/api/products").reply(500, { message: "Error" });

      const expectedActions = [
        { type: PRODUCT_LIST_REQUEST },
        { type: PRODUCT_LIST_FAIL, payload: "Error" },
      ];
      const store = mockStore({ products: [] });

      await store.dispatch(listProducts());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe("listProductDetails", () => {
    afterEach(() => {
      mockAxios.reset();
    });

    it("dispatches PRODUCT_DETAILS_SUCCESS when fetching product details is successful", async () => {
      const product = { id: 1, name: "Product 1" };
      mockAxios.onGet("/api/products/1").reply(200, product);

      const expectedActions = [
        { type: PRODUCT_DETAILS_REQUEST },
        { type: PRODUCT_DETAILS_SUCCESS, payload: product },
      ];
      const store = mockStore({ productDetails: null });

      await store.dispatch(listProductDetails(1));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it("dispatches PRODUCT_DETAILS_FAIL when fetching product details fails", async () => {
      mockAxios.onGet("/api/products/1").reply(500, { message: "Error" });

      const expectedActions = [
        { type: PRODUCT_DETAILS_REQUEST },
        { type: PRODUCT_DETAILS_FAIL, payload: "Error" },
      ];
      const store = mockStore({ productDetails: null });

      await store.dispatch(listProductDetails(1));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
