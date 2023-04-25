import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import ProductScreen from "../screens/ProductScreen";
import "@testing-library/jest-dom";

const mockStore = configureStore([thunk]);

const renderWithRouterAndRedux = (component) => {
  const store = mockStore({
    productDetails: {
      loading: false,
      error: null,
      product: {
        _id: "1",
        name: "Test Product",
        image: "test-image.jpg",
        description: "Test product description",
        brand: "Test Brand",
        category: "Test Category",
        price: 99.99,
        countInStock: 5,
        rating: 4.5,
        numReviews: 10,
      },
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>{component}</MemoryRouter>
    </Provider>
  );
};

describe("ProductScreen", () => {
  test("renders the ProductScreen component", () => {
    renderWithRouterAndRedux(<ProductScreen />);
    const productName = screen.getByRole("heading", { name: /Test Product/i });
    expect(productName).toBeInTheDocument();
  });
});
