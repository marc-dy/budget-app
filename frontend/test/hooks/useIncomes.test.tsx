import { renderHook, waitFor } from "@testing-library/react";
import { queryClientWrapper } from "../utils/QueryClientProviderWrapper";
import { vi, type Mock } from "vitest";
import { useIncomes } from "../../src/hooks/useIncomes";

describe("useIncomes", () => {
  beforeEach(() => {
    vi.stubEnv("DEV", false);
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("fetches and returns the list of income", async () => {
    const mockIncome = [
      {
        id: 1,
        receivedFrom: "Client A",
        amount: 1000,
        account: {
          id: 2,
          name: "Bank A",
        },
        category: {
          id: 4,
          name: "Salary",
        },
        date: "2023-10-01",
        comments: "Monthly salary",
      },
      {
        id: 2,
        receivedFrom: "Client B",
        amount: 500,
        account: {
          id: 3,
          name: "Bank B",
        },
        category: {
          id: 5,
          name: "Freelance",
        },
        date: "2023-10-05",
        comments: "Freelance work",
      },
    ];

    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockIncome,
    });
    const wrapper = queryClientWrapper();
    const { result } = renderHook(() => useIncomes(), { wrapper });
    await waitFor(() => {
      expect(result.current.data.length).toEqual(2);
    });
    expect(result.current.data).toEqual(mockIncome);
  });

  it("handles error gracefully", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
      json: async () => ({ message: "Not Found" }),
    });
    const wrapper = queryClientWrapper();
    const { result } = renderHook(() => useIncomes(), { wrapper });
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});
