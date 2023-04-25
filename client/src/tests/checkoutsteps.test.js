import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

describe("CheckoutSteps component", () => {
  test("renders all steps disabled by default", () => {
    render(
      <Router>
        <CheckoutSteps />
      </Router>
    );

    expect(screen.getByText("Sign In")).toHaveClass("disabled");
    expect(screen.getByText("Shipping")).toHaveClass("disabled");
    expect(screen.getByText("Payment")).toHaveClass("disabled");
    expect(screen.getByText("Place Order")).toHaveClass("disabled");
  });

  test("renders active steps based on provided props", () => {
    render(
      <Router>
        <CheckoutSteps step1 step3 />
      </Router>
    );

    expect(screen.getByRole("link", { name: "Sign In" })).toHaveAttribute(
      "href",
      "/login"
    );
    expect(screen.getByText("Shipping")).toHaveClass("disabled");
    expect(screen.getByRole("link", { name: "Payment" })).toHaveAttribute(
      "href",
      "/payment"
    );
    expect(screen.getByText("Place Order")).toHaveClass("disabled");
  });
});
