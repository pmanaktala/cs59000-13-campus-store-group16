import { render } from "@testing-library/react";
import Footer from "../components/Footer";

describe("Footer component", () => {
  //   it("renders footer text correctly", () => {
  //     const { getByText } = render(<Footer />);
  //     const text = getByText(/copyright &copy; group 16/i);
  //     expect(text).toBeInTheDocument();
  //   });

  it("renders a container element", () => {
    const { container } = render(<Footer />);
    const element = container.querySelector("footer > div.container");
    expect(element).toBeTruthy();
  });

  it("renders a row element", () => {
    const { container } = render(<Footer />);
    const element = container.querySelector("footer > div.container > div.row");
    expect(element).toBeTruthy();
  });

  //   it("renders a col element with correct class and text", () => {
  //     const { container } = render(<Footer />);
  //     const element = container.querySelector(
  //       "footer > div.container > div.row > div.col"
  //     );
  //     expect(element).toHaveClass("text-center", "py-3");
  //     expect(element.textContent).toMatch(/copyright &copy; group 16/i);
  //   });
});
