import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";

describe("Button", () => {
  it("renders with primary variant by default", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button", { name: "Click Me" });
    expect(button).toHaveClass("bg-blue-500 text-white hover:bg-blue-600");
  });

  it("renders with secondary variant", () => {
    render(<Button variant="secondary">Click Me</Button>);
    const button = screen.getByRole("button", { name: "Click Me" });
    expect(button).toHaveClass("bg-gray-300 hover:bg-gray-400");
  });

  it("renders with danger variant", () => {
    render(<Button variant="danger">Click Me</Button>);
    const button = screen.getByRole("button", { name: "Click Me" });
    expect(button).toHaveClass("bg-red-500 text-white hover:bg-red-600");
  });

  it("applies additional class names", () => {
    render(<Button className="custom-class">Click Me</Button>);
    const button = screen.getByRole("button", { name: "Click Me" });
    expect(button).toHaveClass("custom-class");
  });
});
