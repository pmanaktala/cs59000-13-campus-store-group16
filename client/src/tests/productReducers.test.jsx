import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";
import {
  productListReducer,
  productDetailsReducer,
} from "../reducers/productReducers";

describe("productListReducer", () => {
  it("should return the initial state", () => {
    expect(productListReducer(undefined, {})).toEqual({
      products: [],
    });
  });

  it("should handle PRODUCT_LIST_REQUEST", () => {
    expect(
      productListReducer(
        { products: [] },
        { type: PRODUCT_LIST_REQUEST, payload: {} }
      )
    ).toEqual({ loading: true, products: [] });
  });

  it("should handle PRODUCT_LIST_SUCCESS", () => {
    const products = [{ id: 1, name: "Product 1" }];
    expect(
      productListReducer(
        { products: [] },
        { type: PRODUCT_LIST_SUCCESS, payload: products }
      )
    ).toEqual({ loading: false, products });
  });

  it("should handle PRODUCT_LIST_FAIL", () => {
    const error = "Error fetching products";
    expect(
      productListReducer(
        { products: [] },
        { type: PRODUCT_LIST_FAIL, payload: error }
      )
    ).toEqual({ loading: false, error });
  });
});

describe("productDetailsReducer", () => {
  it("should return the initial state", () => {
    expect(productDetailsReducer(undefined, {})).toEqual({
      product: { reviews: [] },
    });
  });

  it("should handle PRODUCT_DETAILS_REQUEST", () => {
    expect(
      productDetailsReducer(
        { product: { reviews: [] } },
        { type: PRODUCT_DETAILS_REQUEST, payload: {} }
      )
    ).toEqual({ loading: true, product: { reviews: [] } });
  });

  it("should handle PRODUCT_DETAILS_SUCCESS", () => {
    const product = { id: 1, name: "Product 1" };
    expect(
      productDetailsReducer(
        { product: { reviews: [] } },
        { type: PRODUCT_DETAILS_SUCCESS, payload: product }
      )
    ).toEqual({ loading: false, product });
  });

  it("should handle PRODUCT_DETAILS_FAIL", () => {
    const error = "Error fetching product details";
    expect(
      productDetailsReducer(
        { product: { reviews: [] } },
        { type: PRODUCT_DETAILS_FAIL, payload: error }
      )
    ).toEqual({ loading: false, error });
  });
});
