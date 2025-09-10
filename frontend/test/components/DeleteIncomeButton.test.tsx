import { render, screen } from "@testing-library/react";
import { queryClientWrapper } from "../utils/QueryClientProviderWrapper";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import DeleteIncomeButton from "../../src/components/DeleteIncomeButton";

describe("DeleteIncomeButton", () => {
  it("renders button", () => {
    const wrapper = queryClientWrapper();
    render(<DeleteIncomeButton id={1} />, { wrapper });
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  it("renders the add income modal when clicked", async () => {
    const user = userEvent.setup();
    const wrapper = queryClientWrapper();
    render(<DeleteIncomeButton id={1} />, { wrapper });
    await user.click(screen.getByText("Delete"));
    expect(
      screen.getByRole("dialog", { name: /are you sure/i })
    ).toBeInTheDocument();
  });

  it("closes the modal when close is clicked", async () => {
    const user = userEvent.setup();
    const wrapper = queryClientWrapper();
    render(<DeleteIncomeButton id={1} />, { wrapper });
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
