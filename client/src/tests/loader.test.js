import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Loader from "../components/Loader";

describe("Loader", () => {
  it("should render a spinner", () => {
    const { getByRole } = render(<Loader />);
    const spinner = getByRole("status");
    expect(spinner).toBeInTheDocument();
  });

  it("should have correct width and height styles", () => {
    const { getByRole } = render(<Loader />);
    const spinner = getByRole("status");
    expect(spinner).toHaveStyle("width: 100px");
    expect(spinner).toHaveStyle("height: 100px");
  });

  it("should have margin and display styles set to auto and block", () => {
    const { getByRole } = render(<Loader />);
    const spinner = getByRole("status");
    expect(spinner).toHaveStyle("margin: auto");
    expect(spinner).toHaveStyle("display: block");
  });

  it("should have a sr-only span for accessibility", () => {
    const { getByText } = render(<Loader />);
    const srOnlySpan = getByText("Loading...");
    expect(srOnlySpan).toHaveClass("sr-only");
  });
});
