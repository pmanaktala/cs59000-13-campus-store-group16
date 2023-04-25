import { cartReducer } from "../reducers/cartReducers";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
} from "../constants/cartConstants";

describe("cartReducer", () => {
  const initialState = {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: "",
  };

  it("should return the initial state", () => {
    expect(cartReducer(initialState, {})).toEqual(initialState);
  });

  it("should handle CART_ADD_ITEM", () => {
    const item = {
      product: "123",
      name: "Test Product",
      price: 9.99,
      quantity: 1,
    };
    const action = {
      type: CART_ADD_ITEM,
      payload: item,
    };
    const expectedState = {
      ...initialState,
      cartItems: [item],
    };
    expect(cartReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle CART_REMOVE_ITEM", () => {
    const state = {
      ...initialState,
      cartItems: [
        {
          product: "123",
          name: "Test Product",
          price: 9.99,
          quantity: 1,
        },
        {
          product: "456",
          name: "Another Product",
          price: 19.99,
          quantity: 2,
        },
      ],
    };
    const action = {
      type: CART_REMOVE_ITEM,
      payload: "456",
    };
    const expectedState = {
      ...initialState,
      cartItems: [
        {
          product: "123",
          name: "Test Product",
          price: 9.99,
          quantity: 1,
        },
      ],
    };
    expect(cartReducer(state, action)).toEqual(expectedState);
  });

  it("should handle CART_SAVE_SHIPPING_ADDRESS", () => {
    const address = {
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
    };
    const action = {
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: address,
    };
    const expectedState = {
      ...initialState,
      shippingAddress: address,
    };
    expect(cartReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle CART_SAVE_PAYMENT_METHOD", () => {
    const method = "paypal";
    const action = {
      type: CART_SAVE_PAYMENT_METHOD,
      payload: method,
    };
    const expectedState = {
      ...initialState,
      paymentMethod: method,
    };
    expect(cartReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle CART_CLEAR_ITEMS", () => {
    const state = {
      ...initialState,
      cartItems: [
        {
          product: "123",
          name: "Test Product",
          price: 9.99,
          quantity: 1,
        },
        {
          product: "456",
          name: "Another Product",
          price: 19.99,
          quantity: 2,
        },
      ],
    };
    const action = {
      type: CART_CLEAR_ITEMS,
    };
    const expectedState = {
      ...initialState,
      cartItems: [],
    };
    expect(cartReducer(state, action)).toEqual(expectedState);
  });
});
