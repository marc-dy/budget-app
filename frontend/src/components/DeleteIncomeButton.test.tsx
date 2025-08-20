import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import DeleteIncomeButton from "./DeleteIncomeButton";

describe("DeleteIncomeButton", () => {
  it("renders button", () => {
    render(<DeleteIncomeButton id={1} />);
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  it("renders the add income modal when clicked", async () => {
    const user = userEvent.setup();
    render(<DeleteIncomeButton id={1} />);
    await user.click(screen.getByText("Delete"));
    expect(
      screen.getByRole("dialog", { name: /are you sure/i })
    ).toBeInTheDocument();
  });

  it("closes the modal when close is clicked", async () => {
    const user = userEvent.setup();
    render(<DeleteIncomeButton id={1} />);
    await user.click(screen.getByText("Delete"));
    expect(
      screen.getByRole("dialog", { name: /are you sure/i }) // regex to match aria-labelledby
    ).toBeInTheDocument();
    await user.click(screen.getByText("Cancel"));
    expect(
      screen.queryByRole("dialog", { name: /are you sure/i })
    ).not.toBeInTheDocument();
  });
});
