import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import EditIncomeButton from "./EditIncomeButton";
import type { Income } from "../types/IncomeData";

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

const income: Income = {
  id: 1,
  receivedFrom: "Client A",
  amount: 1000,
  account: {
    id: 1,
    name: "Bank A",
  },
  category: {
    id: 1,
    name: "Salary",
  },
  date: "2023-10-01",
  comments: "Monthly salary",
};
describe("EditIncomeButton", () => {
  beforeEach(() => {
    vi.stubEnv("DEV", false);
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });
  it("renders button", () => {
    render(<EditIncomeButton income={income} />);
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  it("renders the edit income modal when clicked", async () => {
    const user = userEvent.setup();
    render(<EditIncomeButton income={income} />, { wrapper });
    await user.click(screen.getByText("Edit"));
    expect(
      screen.getByRole("dialog", { name: /edit income/i }) // regex to match aria-labelledby and referenced by the id
    ).toBeInTheDocument();
  });

  it("closes the modal when close is clicked", async () => {
    const user = userEvent.setup();
    render(<EditIncomeButton income={income} />, { wrapper });
    await user.click(screen.getByText("Edit"));
    expect(
      screen.getByRole("dialog", { name: /edit income/i }) // regex to match aria-labelledby
    ).toBeInTheDocument();
    await user.click(screen.getByText("Cancel"));
    expect(
      screen.queryByRole("dialog", { name: /edit income/i })
    ).not.toBeInTheDocument();
  });
});
