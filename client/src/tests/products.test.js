import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Product from "../components/Product";

const productMock = {
  _id: "1",
  name: "Test Product",
  image: "test-image.jpg",
  rating: 4.5,
  numReviews: 10,
  price: 99.99,
};

describe("Product component", () => {
  test("renders product details correctly", () => {
    render(
      <Router>
        <Product product={productMock} />
      </Router>
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText(/10 reviews/)).toBeInTheDocument();
    expect(screen.getByText(/\$99.99/)).toBeInTheDocument();
    expect(screen.getByAltText("Test Product")).toHaveAttribute(
      "src",
      "test-image.jpg"
    );
  });

  test("links to product details page", () => {
    render(
      <Router>
        <Product product={productMock} />
      </Router>
    );

    const links = screen.getAllByRole("link", { name: "Test Product" });
    links.forEach((link) => {
      expect(link).toHaveAttribute("href", "/product/1");
    });
  });
});
