import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import CartScreen from "../screens/CartScreen";
import "@testing-library/jest-dom";

const mockStore = configureStore([]);

const renderWithProviders = (store, ui) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

describe("CartScreen component", () => {
  test("renders empty cart message when cart is empty", () => {
    const store = mockStore({ cart: { cartItems: [] } });

    renderWithProviders(store, <CartScreen />);

    expect(screen.getByText(/Your cart is empty/)).toBeInTheDocument();
    expect(screen.getByText(/Go Back/)).toBeInTheDocument();
  });

  test("renders cart subtotal and proceed to checkout button", () => {
    const store = mockStore({
      cart: {
        cartItems: [
          {
            product: "1",
            name: "Test Product",
            image: "test-image.jpg",
            price: 99.99,
            countInStock: 5,
            qty: 2,
          },
        ],
      },
    });

    renderWithProviders(store, <CartScreen />);

    expect(screen.getByText(/Subtotal \(2\) items/)).toBeInTheDocument();
    expect(screen.getByText(/\$199.98/)).toBeInTheDocument();

    const checkoutButton = screen.getByRole("button", {
      name: /Proceed To Checkout/,
    });
    expect(checkoutButton).toBeInTheDocument();
    expect(checkoutButton).not.toBeDisabled();
  });

  test("disables proceed to checkout button when cart is empty", () => {
    const store = mockStore({ cart: { cartItems: [] } });

    renderWithProviders(store, <CartScreen />);

    const checkoutButton = screen.getByRole("button", {
      name: /Proceed To Checkout/,
    });
    expect(checkoutButton).toBeInTheDocument();
    expect(checkoutButton).toBeDisabled();
  });
});
