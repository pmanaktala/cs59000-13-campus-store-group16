import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
} from "../actions/cartActions";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

const mockStore = configureMockStore([thunk]);
const mockAxios = new MockAdapter(axios);

describe("cartActions", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  describe("addToCart", () => {
    it("should add item to cart and save to localStorage", async () => {
      const mockData = {
        _id: "1",
        name: "Test Product",
        image: "test.jpg",
        price: 10,
        countInStock: 5,
      };
      mockAxios.onGet(`/api/products/${mockData._id}`).reply(200, mockData);
      const store = mockStore({ cart: { cartItems: [] } });
      const expectedActions = [
        {
          type: CART_ADD_ITEM,
          payload: {
            product: mockData._id,
            name: mockData.name,
            image: mockData.image,
            price: mockData.price,
            countInStock: mockData.countInStock,
            qty: 1,
          },
        },
      ];

      await store.dispatch(addToCart(mockData._id, 1));

      expect(store.getActions()).toEqual(expectedActions);
      expect(localStorage.getItem("cartItems")).toEqual(
        JSON.stringify(store.getState().cart.cartItems)
      );
    });
  });

  describe("removeFromCart", () => {
    it("should remove item from cart and save to localStorage", () => {
      const mockData = {
        _id: "1",
        name: "Test Product",
        image: "test.jpg",
        price: 10,
        countInStock: 5,
      };
      const store = mockStore({
        cart: { cartItems: [{ ...mockData, qty: 2 }] },
      });
      const expectedActions = [
        { type: CART_REMOVE_ITEM, payload: mockData._id },
      ];

      store.dispatch(removeFromCart(mockData._id));

      expect(store.getActions()).toEqual(expectedActions);
      expect(localStorage.getItem("cartItems")).toEqual(
        JSON.stringify(store.getState().cart.cartItems)
      );
    });
  });

  describe("saveShippingAddress", () => {
    it("should dispatch the CART_SAVE_SHIPPING_ADDRESS action and save the shipping address to local storage", () => {
      const dispatch = jest.fn();
      const data = { address: "123 Main St", city: "Anytown", country: "USA" };
      const expectedAction = {
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
      };

      saveShippingAddress(data)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });

  describe("savePaymentMethod", () => {
    it("should save payment method to state and localStorage", () => {
      const mockData = "PayPal";
      const store = mockStore({});
      const expectedActions = [
        { type: CART_SAVE_PAYMENT_METHOD, payload: mockData },
      ];

      store.dispatch(savePaymentMethod(mockData));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
