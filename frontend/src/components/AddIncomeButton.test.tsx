import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import AddIncomeButton from "./AddIncomeButton";

// TODO: Move QueryClient to a common utility file and maybe revert back to a TS file.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // turns retries off
      retry: false,
    },
  },
});
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("AddIncomeButton", () => {
  it("renders button", () => {
    render(<AddIncomeButton />);
    expect(screen.getByText("Add Income")).toBeInTheDocument();
  });

  it("renders the add income modal when clicked", async () => {
    const user = userEvent.setup();
    render(<AddIncomeButton />, { wrapper });
    await user.click(screen.getByText("Add Income"));
    expect(
      screen.getByRole("dialog", { name: /add income/i }) // regex to match aria-labelledby
    ).toBeInTheDocument();
  });

  it("closes the modal when close is clicked", async () => {
    const user = userEvent.setup();
    render(<AddIncomeButton />, { wrapper });
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
