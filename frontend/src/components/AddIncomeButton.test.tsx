import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import AddIncomeButton from "./AddIncomeButton";

describe("AddIncomeButton", () => {
  it("renders button", () => {
    render(<AddIncomeButton />);
    expect(screen.getByText("Add Income")).toBeInTheDocument();
  });

  it("renders the add income modal when clicked", async () => {
    const user = userEvent.setup();
    render(<AddIncomeButton />);
    await user.click(screen.getByText("Add Income"));
    expect(
      screen.getByRole("dialog", { name: /add income/i }) // regex to match aria-labelledby
    ).toBeInTheDocument();
  });

  it("closes the modal when close is clicked", async () => {
    const user = userEvent.setup();
    render(<AddIncomeButton />);
    await user.click(screen.getByText("Add Income"));
    expect(
      screen.getByRole("dialog", { name: /add income/i }) // regex to match aria-labelledby
    ).toBeInTheDocument();
    await user.click(screen.getByText("Cancel"));
    expect(
      screen.queryByRole("dialog", { name: /add income/i })
    ).not.toBeInTheDocument();
  });
});
