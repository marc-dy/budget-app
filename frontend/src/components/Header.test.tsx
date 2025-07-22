import { render, screen } from "@testing-library/react";
import Header from "./Header";
import "@testing-library/jest-dom"; // <-- Add this import for toBeInTheDocument

describe("Header", () => {
  it("renders logo and navigation links", () => {
    render(<Header />);
    expect(screen.getByText("Placeholder Logo")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Income")).toBeInTheDocument();
    expect(screen.getByText("Expenses")).toBeInTheDocument();
    expect(screen.getByText("Accounts")).toBeInTheDocument();
    expect(screen.getByText("Budget")).toBeInTheDocument();
  });

  it("renders user menu", () => {
    render(<Header />);
    expect(screen.getByText("Marc")).toBeInTheDocument();
  });
});
